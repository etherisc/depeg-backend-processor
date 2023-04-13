import { createClient } from 'redis';
import { Client } from 'redis-om';
import { logger } from './logger';

// type RedisClient = ReturnType<typeof createClient>;
// type RedisOmClient = Client;

// let redisClient: RedisClient;
// let redisOmClient: Client;

// async function initializeRedis() {
//     logger.info(process.env.REDIS_URL);
//     redisClient = createClient({
//         url: process.env.REDIS_URL
//     });
//     redisClient.on('error', (err) => logger.error('Redis Client Error', err));
//     await redisClient.connect();
//     logger.info('Redis client connected');
    
//     redisOmClient = await new Client().use(redisClient);
// }

// export { initializeRedis, redisClient, redisOmClient, RedisClient, RedisOmClient };

export const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();


export const redisOmClient = new Client().use(redisClient);
