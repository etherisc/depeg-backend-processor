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


## Deployment

### Dokku

We use [dokku](https://dokku.com/) for deployment. 

With the current setup (dokku repo is added as remote repo called `dokku` to the local git), deployment is triggered by running the following command in the root directory of the project:

```
git push dokku <branch-to-deploy>:main
```

#### Initial instance setup

Replace application name (`goerli-setup`) with whatever fits your need. DNS is expected to be prepared in advance.


```s
# create dokku application 
dokku apps:create mumbai-processor

# add new domain and remove default domain
dokku domains:add mumbai-processor processor.mumbai.etherisc.com
dokku domains:remove mumbai-processor mumbai-processor.depeg-test.etherisc.com

# set correct proxy ports for http and https
dokku proxy:ports-add mumbai-processor https:443:3000
dokku proxy:ports-add mumbai-processor http:80:3000
dokku proxy:ports-remove mumbai-processor http:80:5000

# link existing redis service from depeg-ui
dokku redis:link depeg-mumbai-redis mumbai-processor

# disable zero downtime deployments (to avoid duplicate queue listeners)
dokku checks:disable mumbai-processor

# configure environment variables (see above)
dokku config:set mumbai-processor ...

# now push deployment via git 
# 1. add new git remote 'git remote add dokku-mumbai dokku@<host>:mumbai-processor'
# 2. 'git push dokku-mumbai develop:main'

# enable let's encrypt for https certificates
dokku letsencrypt:enable mumbai-processor
```
