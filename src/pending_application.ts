import { Schema, Entity, Repository } from "redis-om";
import { redisOmClient } from "./redisclient";

export interface PendingApplication {
    policyHolder: string;
    protectedWallet: string;
    protectedBalance: string;
    duration: number;
    bundleId: number;
    signatureId: string;
    signature: string;
    transactionHash: string;
    timestamp: Date;
}

export class PendingApplication extends Entity {
}

export const PENDING_APPLICATION_SCHEMA = new Schema(PendingApplication, {
    policyHolder: { type: 'string', sortable: true },
    protectedWallet: { type: 'string' },
    protectedBalance: { type: 'string' },
    duration: { type: 'number' },
    bundleId: { type: 'number' },
    signatureId: { type: 'string', sortable: true },
    signature: { type: 'string' },
    transactionHash: { type: 'string', sortable: true },
    timestamp: { type: 'date', sortable: true },
}, {
    dataStructure: 'HASH'
});

export async function getPendingApplicationRepository(): Promise<Repository<PendingApplication>> {
    const repository = (await redisOmClient).fetchRepository(PENDING_APPLICATION_SCHEMA);
    await repository.createIndex();
    return repository;
}
