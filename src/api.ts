import { BigNumber, Signer } from 'ethers';
import express, { Express, Request, Response } from 'express';
import { hasExpectedBalance } from './queuelistener';
import { formatEther } from 'ethers/lib/utils';
import { redisClient } from './redisclient';
import { rmSync } from 'fs';
import { RedisClientType } from 'redis';
import { APPLICATION_ID, CONSUMER_ID, STREAM_KEY } from './constants';


export async function initializeApi(processorSigner: Signer, processorExpectedBalance: BigNumber) {
    const port = process.env.PORT || 3000;
    const lastCheckTimeout = 60 * 1000;
    const app = express();
    const monitorRedisClient = redisClient.duplicate();
    monitorRedisClient.connect();

    app.get('/api/monitor', async (req: Request, res: Response) => {
        const status = {
            balance: "ok",
            processor: "ok",
            nonAckPendingTx: "ok",
        }
        let statusCode = 200;

        const isExpectedBalance = await hasExpectedBalance(processorSigner, processorExpectedBalance);
        if (!isExpectedBalance) {
            const balance = await processorSigner.getBalance();
            status.balance = "error - " + formatEther(balance) + " ETH";
            statusCode = 500;
        }

        const nonAckMessages = await getNonAckMessages(monitorRedisClient);
        if (nonAckMessages > 5) {
            status.nonAckPendingTx = "error - " + nonAckMessages + " non-ack messages";
            statusCode = 500;
        }

        const lastCheckTimestamp = await getLastCheckTimestamp(monitorRedisClient);
        if(new Date().getTime() - lastCheckTimestamp.getTime() > lastCheckTimeout) {
            status.processor = "error - last check " + lastCheckTimestamp.toISOString();
            statusCode = 500;
        }
        
        res.status(statusCode).send(status);
    });

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
}

async function getNonAckMessages(monitorRedisClient: any) {
    const r = await monitorRedisClient.xReadGroup(
        APPLICATION_ID,
        CONSUMER_ID,
        { key: STREAM_KEY, id: '0' },
        { COUNT: 10, BLOCK: 10 }
    );

    if (r === null) {
        return 0;
    }

    return Math.max(r.length, r[0].messages.length);
}

async function getLastCheckTimestamp(monitorRedisClient: any) {
    const lastCheck = await monitorRedisClient.get("last-check");
    if (lastCheck === null) {
        return new Date(0);
    }

    return new Date(lastCheck);
}

