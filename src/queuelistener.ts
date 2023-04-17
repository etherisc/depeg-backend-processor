import { BigNumber, Signer } from 'ethers';
import { logger } from './logger';
import { redisClient } from './redisclient';
import { formatBytes32String, formatUnits } from 'ethers/lib/utils';
import { DepegProduct, DepegProduct__factory } from "./contracts/depeg-contracts";
import { PendingTransaction, getPendingTransactionRepository } from './pending_trx';
import { Repository } from 'redis-om';

// TODO: make configurable
export const APPLICATION_ID = "depeg-backend-processor";
export const CONSUMER_ID = "depeg-backend-processor-consumer";
export const STREAM_KEY = "application:signatures";

export default class QueueListener {

    async listen(depegProductAddress: string, processorSigner: Signer, maxFeePerGas: BigNumber, processorExpectedBalance: BigNumber): Promise<void> {
        try {
            await redisClient.xGroupCreate(STREAM_KEY, APPLICATION_ID, "0", { MKSTREAM: true });
        } catch (err) {
            logger.info("group already exists");
        }

        const product = DepegProduct__factory.connect(depegProductAddress, processorSigner);
        const pendingTransactionRepository = await getPendingTransactionRepository();
        // initialize last-check with current timestamp
        await redisClient.set("last-check", new Date().toISOString());

        while(true) {
            if (! await hasExpectedBalance(processorSigner, processorExpectedBalance)) {
                logger.error('processor balance too low, waiting 60s');
                await new Promise(f => setTimeout(f, 60 * 1000));
                continue;
            }

            try {
                const pendingMessage = await this.getNextPendingMessage();
                if (pendingMessage !== null) {
                    await this.processMessage(pendingMessage.id, pendingMessage.message, product, pendingTransactionRepository, maxFeePerGas);
                    // repeat this while there are pending messages
                    continue;
                }
                
                const newMessage = await this.getNextNewMessage();
                if (newMessage !== null) {
                    await this.processMessage(newMessage.id, newMessage.message, product, pendingTransactionRepository, maxFeePerGas);
                }
            } catch (e) {
                logger.error('caught error, blocking for 30s', e);
                await new Promise(f => setTimeout(f, 30 * 1000));
            }

            await this.checkPendingTransactions(pendingTransactionRepository, processorSigner);
            // update last-check timestamp
            await redisClient.set("last-check", new Date().toISOString());
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
            { COUNT: 1, BLOCK: 30000 }
        );

        if (r === null || r?.length === 0) {
            return null;
        }
        
        const obj = r[0].messages[0];
        return { id: obj.id, message: obj.message };
    }

    async processMessage(id: string, message: any, product: DepegProduct, pendingTransactionRepository: any, maxFeePerGas: BigNumber) {
        logger.info("processing id: " + id);
        const policyHolder = message.policyHolder as string;
        const protectedWallet = message.protectedWallet as string;
        const protectedBalance = BigNumber.from(message.protectedBalance);
        const duration = parseInt(message.duration);
        const bundleId = parseInt(message.bundleId);
        const signatureId = message.signatureId as string;
        const signature = message.signature as string;

        logger.info("application - " 
            + "policyHolder: " + policyHolder 
            + ", protectedWallet: " + protectedWallet 
            + ", protectedBalance: " + formatUnits(protectedBalance, 6) 
            + ", duration: " + duration 
            + ", bundleId: " + bundleId 
            + ", signatureId: " + signatureId 
            + ", signature: " + signature
            );

        const tx = await product.applyForPolicyWithBundleAndSignature(
            policyHolder,
            protectedWallet,
            protectedBalance,
            duration,
            bundleId,
            formatBytes32String(signatureId),
            signature,
            {
                maxFeePerGas,
            }
        );
        logger.info("tx: " + tx.hash);

        pendingTransactionRepository.createAndSave({
            policyHolder: policyHolder,
            protectedWallet: protectedWallet,
            protectedBalance: protectedBalance.toString(),
            duration: duration,
            bundleId: bundleId,
            signatureId: signatureId,
            signature: signature,
            transactionHash: tx.hash,
            timestamp: new Date()
        });

        await redisClient.xAck(STREAM_KEY, APPLICATION_ID, id);
    }

    async checkPendingTransactions(pendingTransactionRepository: Repository<PendingTransaction>, signer: Signer) {
        logger.debug("checking state of pending trnsactions");
        const pendingTransactions = await pendingTransactionRepository.search().return.all();
        for (const pendingTransaction of pendingTransactions) {
            const rcpt = await signer.provider!.getTransactionReceipt(pendingTransaction.transactionHash);
            const wasMined = rcpt.status === 1 && rcpt.blockNumber !== null;
            logger.debug(`mined: ${wasMined}`);
            if (wasMined) {
                logger.info("transaction " + pendingTransaction.transactionHash + " has been mined");
                await pendingTransactionRepository.remove(pendingTransaction.entityId);
            }
        }
    }

}

export async function hasExpectedBalance(processorSigner: Signer, processorExpectedBalance: BigNumber): Promise<boolean> {
    const balance = await processorSigner.getBalance();
    return (balance).gte(processorExpectedBalance);
}
