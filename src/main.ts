import * as dotenv from 'dotenv'
import QueueListener from './queuelistener';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { BigNumber, Signer, Wallet, logger } from 'ethers';
import { formatEther, formatUnits, parseEther } from 'ethers/lib/utils';

dotenv.config()

class Main {

    constructor() {
    }

    public async main(): Promise<void> {
        const depegProductAddress = process.env.DEPEG_PRODUCT_ADDRESS ?? "";
        logger.info("depegProductAddress: " + depegProductAddress);
        const processorMnemonic = process.env.PROCESSOR_MNEMONIC ?? "";
        const maxFeePerGas = BigNumber.from(process.env.MAX_FEE_PER_GAS) ?? BigNumber.from(30).pow(9);
        logger.info("maxFeePerGas: " + formatUnits(maxFeePerGas, "gwei") + " gwei");
        const processorExpectedBalance = process.env.PROCESSOR_EXPECTED_BALANCE ? BigNumber.from(process.env.PROCESSOR_EXPECTED_BALANCE) : parseEther("1.0");
        logger.info("processorExpectedBalance: " + formatEther(processorExpectedBalance) + " eth");
        
        const provider = new StaticJsonRpcProvider(process.env.CHAIN_RPC_URL);
        const signer: Signer = Wallet.fromMnemonic(processorMnemonic).connect(provider);

        logger.info("processor address: " + await signer.getAddress());

        // initializeRedis();
        new QueueListener().listen(depegProductAddress, signer, maxFeePerGas, processorExpectedBalance);
    }

}

new Main().main();
