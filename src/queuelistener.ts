// import FromRegistryHarvester from './fromregistryharvester';
import { logger } from './logger';
import { redisClient } from './redisclient';

// TODO: make configurable
const APPLICATION_ID = "depeg-backend-processor";
const CONSUMER_ID = "depeg-backend-processor-consumer";
const STREAM_KEY = "application:signatures";

export default class QueueListener {
    // private client: RedisClient;
    // private queueName: string;

    // constructor(client: RedisClient, queueName: string) {
    //     this.client = client;
    //     this.queueName = queueName;
    // }

    async listen() {
        // const subscriber = redisClient.duplicate();
        // await subscriber.connect();
        // logger.info("Command queue listener starting ...");

        try {
            await redisClient.xGroupCreate(STREAM_KEY, APPLICATION_ID, "0", { MKSTREAM: true });
        } catch (err) {
            logger.info("group already exists");
        }


        while(true) {
            logger.info("waiting for message ...");
            // redisClient.xreadgroup('GROUP', APPLICATION_ID, CONSUMER_ID, 'BLOCK', 500, 'STREAMS',  STREAMS_KEY , '>', function (err, stream) {

            const messages = await redisClient.xReadGroup(
                APPLICATION_ID,
                CONSUMER_ID,
                { key: "application:signatures", id: '>' },
                { COUNT: 1, BLOCK: 5000 }
            );

            if (messages !== null) {
                const id = messages[0].messages[0].id;
                const object = messages[0].messages[0].message;
                logger.info("processing id: " + id);
                logger.info(object.signature as string);

                await redisClient.xAck("application:signatures", APPLICATION_ID, id);
            }
        }
        
    }
}