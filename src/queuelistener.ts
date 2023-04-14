import { BigNumber, Signer } from 'ethers';
import { logger } from './logger';
import { redisClient } from './redisclient';
import { formatBytes32String, formatUnits } from 'ethers/lib/utils';
import { DepegProduct, DepegProduct__factory } from "./contracts/depeg-contracts";
import { getPendingTransactionRepository } from './pending_trx';

// TODO: make configurable
const APPLICATION_ID = "depeg-backend-processor";
const CONSUMER_ID = "depeg-backend-processor-consumer";
const STREAM_KEY = "application:signatures";

export default class QueueListener {

    async listen(depegProductAddress: string, signer: Signer) {
        try {
            await redisClient.xGroupCreate(STREAM_KEY, APPLICATION_ID, "0", { MKSTREAM: true });
        } catch (err) {
            logger.info("group already exists");
        }

        const product = DepegProduct__factory.connect(depegProductAddress, signer);
        const pendingTransactionRepository = await getPendingTransactionRepository();

        while(true) {
            try {
                const pendingMessage = await this.getNextPendingMessage();
                if (pendingMessage !== null) {
                    await this.processMessage(pendingMessage.id, pendingMessage.message, product, pendingTransactionRepository);
                    // repeat this while there are pending messages
                    continue;
                }
                
                const newMessage = await this.getNextNewMessage();
                if (newMessage !== null) {
                    await this.processMessage(newMessage.id, newMessage.message, product, pendingTransactionRepository);
                }
            } catch (e) {
                logger.error('caught error, blocking for 30s', e);
                await new Promise(f => setTimeout(f, 30 * 1000));
            }
        }
    }

    async getNextPendingMessage(): Promise<{ id: string, message: any } | null> {
        logger.debug("checking for pending messages");
        const r = await redisClient.xReadGroup(
            APPLICATION_ID,
            CONSUMER_ID,
            { key: "application:signatures", id: '0' },
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
            { key: "application:signatures", id: '>' },
            { COUNT: 1, BLOCK: 5000 }
        );

        if (r === null || r?.length === 0) {
            return null;
        }
        
        const obj = r[0].messages[0];
        return { id: obj.id, message: obj.message };
    }

    async processMessage(id: string, message: any, product: DepegProduct, pendingTransactionRepository: any) {
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
            signature
        );
        // TODO: set max gas price
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

        await redisClient.xAck("application:signatures", APPLICATION_ID, id);
    }

}