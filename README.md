# depeg-backend-processor

This service is a background processor that listens on a redis queue for new depeg applications that are to be submitted to the blockchain. 

This is used to provide a feeless service (if the applicant chooses the option 'I would like Etherisc to submit the transaction and pay fees on by behalf').


## Environment variables

- `REDIS_URL`: the URL of the Redis instance used
- `CHAIN_RPC_URL`: the URL of the Ethereum node used
- `NODE_ENV`: the environment of the application 

- `DEPEG_PRODUCT_ADDRESS`: the address of the Depeg product
- `PROCESSOR_EXPECTED_BALANCE`: the minimum expected balance of the processor (should be large enough to pay for one application at the given gas price)
- `PROCESSOR_MNEMONIC`: the mnemonic of the processor
- `MAX_FEE_PER_GAS`: the maximum fee per gas to use for the application


## Execution

### Local (for dev)

`npm run dev`

### Docker

```
docker build -t depeg-backend-processor .
docker run -d --name depeg-backend-processor -p 3000:3000 depeg-backend-processor
```

