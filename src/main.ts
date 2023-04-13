import * as dotenv from 'dotenv'
// import { initializeRedis, redisClient } from './redisclient';
import QueueListener from './queuelistener';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Signer, Wallet, logger } from 'ethers';

dotenv.config()

class Main {

    constructor() {
    }

    public async main(): Promise<void> {
        const depegProductAddress = process.env.DEPEG_PRODUCT_ADDRESS ?? "";
        const processorMnemonic = process.env.PROCESSOR_MNEMONIC ?? "";

        logger.info("depegProductAddress: " + depegProductAddress);
        
        const provider = new StaticJsonRpcProvider(process.env.CHAIN_RPC_URL);
        const signer: Signer = Wallet.fromMnemonic(processorMnemonic).connect(provider);

        logger.info("processor address: " + await signer.getAddress());

        // initializeRedis();
        new QueueListener().listen(depegProductAddress, signer);
    }

}

new Main().main();
