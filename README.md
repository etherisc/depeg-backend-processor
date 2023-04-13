# GIF Monitor Harvester

## Description


## Run

```
npm run dev
```

```
npx tsc
node build/main.js
```

### Example .env file

```
REDIS_URL=redis://host.docker.internal:6379
DEFAULT_SIGNER=0x6330A553Fc93768F612722BB8c2eC78aC90B3bbc
PROVIDER_URL=http://host.docker.internal:7545
```

## Devcontainer config

```
docker network connect gif-monitor-api_devcontainer_default gif-monitor-harvester_devcontainer-code-1
```

### redis-cli queue mgmt

```
redis-cli -h 172.25.0.2

rpush queue:cmd "{\"cmd\":\"queryInstance\", \"registryAddress\": \"0x345cA3e014Aaf5dcA488057592ee47305D9B3e10\"}"
```
