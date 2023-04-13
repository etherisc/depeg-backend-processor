import * as dotenv from 'dotenv'
// import { initializeRedis, redisClient } from './redisclient';
import QueueListener from './queuelistener';

dotenv.config()

class Main {

    constructor() {
    }

    public async main(): Promise<void> {
        // initializeRedis();
        new QueueListener().listen();
    }

}

new Main().main();
