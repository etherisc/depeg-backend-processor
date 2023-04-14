import { BigNumber, Signer } from 'ethers';
import { logger } from './logger';
import { redisClient } from './redisclient';
import { formatBytes32String, formatUnits } from 'ethers/lib/utils';
import { DepegProduct__factory } from "./contracts/depeg-contracts";

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

        while(true) {
            logger.debug("waiting for message ...");
            const messages = await redisClient.xReadGroup(
                APPLICATION_ID,
                CONSUMER_ID,
                { key: "application:signatures", id: '>' },
                { COUNT: 1, BLOCK: 10000 }
            );

            if (messages !== null) {
                const id = messages[0].messages[0].id;
                const applicationObject = messages[0].messages[0].message;
                logger.info("processing id: " + id);
                const policyHolder = applicationObject.policyHolder as string;
                const protectedWallet = applicationObject.protectedWallet as string;
                const protectedBalance = BigNumber.from(applicationObject.protectedBalance);
                const duration = parseInt(applicationObject.duration);
                const bundleId = parseInt(applicationObject.bundleId);
                const signatureId = applicationObject.signatureId as string;
                const signature = applicationObject.signature as string;

                logger.info("application - " 
                    + "policyHolder: " + policyHolder 
                    + ", protectedWallet: " + protectedWallet 
                    + ", protectedBalance: " + formatUnits(protectedBalance, 6) 
                    + ", duration: " + duration 
                    + ", bundleId: " + bundleId 
                    + ", signatureId: " + signatureId 
                    + ", signature: " + signature
                    );

                const product = DepegProduct__factory.connect(depegProductAddress, signer);
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

                await redisClient.xAck("application:signatures", APPLICATION_ID, id);
                // TODO: store tx hash in redis
            }
        }
        
    }
}