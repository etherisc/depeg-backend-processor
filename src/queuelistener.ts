import { BigNumber, Signer } from 'ethers';
import { formatBytes32String, formatEther, formatUnits, parseUnits } from 'ethers/lib/utils';
import { EntityId, Repository } from 'redis-om';
import { APPLICATION_ID, BALANCE_TOO_LOW_TIMEOUT, CHAIN_MINUMUM_REQUIRED_CONFIRMATIONS, CONSUMER_ID, ERROR_TIMEOUT, REDIS_READ_BLOCK_TIMEOUT, STREAM_KEY } from './constants';
import { DepegProduct, DepegProduct__factory } from "./contracts/depeg-contracts";
import { logger } from './logger';
import { getPendingApplicationRepository } from './pending_application';
import { redisClient } from './redisclient';

export default class QueueListener {

    async listen(depegProductAddress: string, processorSigner: Signer, maxFeePerGas: BigNumber, maxPriorityFeePerGas: BigNumber | undefined, processorExpectedBalance: BigNumber): Promise<void> {
        try {
            await redisClient.xGroupCreate(STREAM_KEY, APPLICATION_ID, "0", { MKSTREAM: true });
        } catch (err) {
            logger.info("group already exists");
        }

        const product = DepegProduct__factory.connect(depegProductAddress, processorSigner);
        const pendingTransactionRepository = await getPendingApplicationRepository();
        // initialize last-check with current timestamp
        await redisClient.set("last-check", new Date().toISOString());
        logger.info("attaching to queue " + STREAM_KEY + " with group " + APPLICATION_ID + " and consumer " + CONSUMER_ID);

        while(true) {
            // always clean up first
            await this.checkPendingTransactions(pendingTransactionRepository, processorSigner);

            const balanceState = await hasExpectedBalance(processorSigner, processorExpectedBalance);
            if (! balanceState.hasBalance) {
                logger.error('processor balance too low, waiting ' + BALANCE_TOO_LOW_TIMEOUT + 'ms. balance: ' + formatEther(balanceState.balance) + ' ETH');
                await new Promise(f => setTimeout(f, BALANCE_TOO_LOW_TIMEOUT));
                continue;
            }

            try {
                const pendingMessage = await this.getNextPendingMessage();
                if (pendingMessage !== null) {
                    await this.processMessage(pendingMessage.id, pendingMessage.message, product, pendingTransactionRepository, maxFeePerGas, maxPriorityFeePerGas);
                    // repeat this while there are pending messages
                    continue;
                }
                
                const newMessage = await this.getNextNewMessage();
                if (newMessage !== null) {
                    await this.processMessage(newMessage.id, newMessage.message, product, pendingTransactionRepository, maxFeePerGas, maxPriorityFeePerGas);
                }
            } catch (e) {
                logger.error('caught error, blocking for ' + ERROR_TIMEOUT + 'ms', e);
                await new Promise(f => setTimeout(f, ERROR_TIMEOUT));
            } finally {
                // update last-check timestamp
                await redisClient.set("last-check", new Date().toISOString());
            }

        }
    }

    async getNextPendingMessage(): Promise<{ id: string, message: any } | null> {
        logger.debug("checking for pending messages");
        const r = await redisClient.xReadGroup(
            APPLICATION_ID,
            CONSUMER_ID,
            { key: STREAM_KEY, id: '0' },
            { COUNT: 1, BLOCK: 10 }
        );

        if (r === null || r?.length === 0 || r[0].messages.length === 0) {
            return null;
        }
        
        const obj = r[0].messages[0];
        return { id: obj.id, message: obj.message };
    }

    async getNextNewMessage(): Promise<{ id: string, message: any } | null> {
        logger.debug("checking for new messages");
        const r = await redisClient.xReadGroup(
            APPLICATION_ID,
            CONSUMER_ID,
            { key: STREAM_KEY, id: '>' },
            { COUNT: 1, BLOCK: REDIS_READ_BLOCK_TIMEOUT }
        );

        if (r === null || r?.length === 0) {
            return null;
        }
        
        const obj = r[0].messages[0];
        return { id: obj.id, message: obj.message };
    }

    async processMessage(redisId: string, message: any, product: DepegProduct, repo: Repository, maxFeePerGas: BigNumber, maxPriorityFeePerGas: BigNumber | undefined) {
        const entityId = message.entityId as string;
        logger.info("processing id: " + redisId + " entityId " + entityId);
        
        const pendingApplicationEntity = await repo.fetch(entityId);

        if (pendingApplicationEntity == null) {
            logger.error("no pending application found for entityId " + entityId + ", ignoring");
            await redisClient.xAck(STREAM_KEY, APPLICATION_ID, redisId);
            return;
        }

        try {
            const policyHolder = pendingApplicationEntity.policyHolder as string;
            const protectedWallet = pendingApplicationEntity.protectedWallet as string;
            const protectedBalance = BigNumber.from(pendingApplicationEntity.protectedBalance as string);
            const duration = pendingApplicationEntity.duration as number;
            const bundleId = pendingApplicationEntity.bundleId as number;
            const signatureIdB32s = formatBytes32String(pendingApplicationEntity.signatureId as string);
            const signature = pendingApplicationEntity.signature as string;
            logger.info("TX application - "
                + "policyHolder: " + policyHolder
                + ", protectedWallet: " + protectedWallet
                + ", protectedBalance: " + formatUnits(protectedBalance, 0)
                + ", duration: " + duration
                + ", bundleId: " + bundleId
                + ", signatureId: " + signatureIdB32s
                + ", signature: " + signature
            );
            const tx = await product.applyForPolicyWithBundleAndSignature(
                policyHolder,
                protectedWallet,
                protectedBalance,
                duration,
                bundleId,
                signatureIdB32s,
                signature,
                {
                    maxFeePerGas,
                    maxPriorityFeePerGas
                }
            );
            logger.info("tx: " + tx.hash);
        
            pendingApplicationEntity.transactionHash = tx.hash;
            await repo.save(pendingApplicationEntity);
            logger.info("updated PendingApplication (" + entityId + ") with tx hash " + tx.hash);
            await redisClient.xAck(STREAM_KEY, APPLICATION_ID, redisId);
            logger.debug("acked redis message " + redisId);
        } catch (e) {
            logger.info(e);
            // @ts-ignore
            if (e.error?.reason !== undefined) {
                // @ts-ignore
                const reason = e.error.reason as string;
                logger.error("tx failed. reason: " + reason);
                if (reason.includes("ERROR:SMH-001:SIGNATURE_USED")) {
                    logger.error("stake failed. reason: ERROR:SMH-001:SIGNATURE_USED ... ignoring");
                    await repo.remove(entityId);
                    logger.debug("removed pending stake " + entityId);
                    await redisClient.xAck(STREAM_KEY, APPLICATION_ID, redisId);
                    logger.debug("acked redis message " + redisId);
                    return;
                }
            // @ts-ignore
            } else if (e.error?.error?.error?.data?.reason !== undefined) {
                // @ts-ignore
                const reason = e.error.error.error.data.reason;
                logger.error("tx failed. reason: " + reason);
                await repo.remove(entityId);
                logger.debug("removed pending stake " + entityId);
                await redisClient.xAck(STREAM_KEY, APPLICATION_ID, redisId);
                logger.debug("acked redis message " + redisId);
                return;
            }              
            throw e;
        }
    }

    async checkPendingTransactions(pendingTransactionRepository: Repository, signer: Signer) {
        logger.debug("checking state of pending transactions");
        const pendingTransactions = await pendingTransactionRepository.search().return.all();
        for (const pendingTransaction of pendingTransactions) {
            if (pendingTransaction.transactionHash === undefined) {
                continue;
            }
            const rcpt = await signer.provider!.getTransaction(pendingTransaction.transactionHash as string);
            const wasMined = rcpt.blockHash !== null && rcpt.confirmations > CHAIN_MINUMUM_REQUIRED_CONFIRMATIONS;
            logger.debug(`mined: ${wasMined}`);
            if (wasMined) {
                logger.info("transaction " + pendingTransaction.transactionHash + " has been mined. removing pending application, signatureId " + pendingTransaction.signatureId);
                await pendingTransactionRepository.remove(pendingTransaction[EntityId] as string);
            }
        }
    }

}

export async function hasExpectedBalance(processorSigner: Signer, processorExpectedBalance: BigNumber): Promise<{ hasBalance: boolean, balance: BigNumber} > {
    const balance = await processorSigner.getBalance();
    const has = (balance).gte(processorExpectedBalance);
    return { hasBalance: has, balance };
}
