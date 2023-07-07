import { createClient } from 'redis';
import { Client } from 'redis-om';
import { logger } from './logger';

export const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
redisClient.on('error', err => logger.error('Redis Client Error', err));
redisClient.connect();


export const redisOmClient = new Client().use(redisClient);
