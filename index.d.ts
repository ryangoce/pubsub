import { Redis, RedisOptions } from "ioredis";
import { PubSubClient } from "./lib/pubsub-client";

export interface PubSubOptions {
    createRedisClient?(type: 'client' | 'subscriber' | 'bclient', redisOpts?: RedisOptions): Redis;
}

export function createPubSubClient(options: PubSubOptions): PubSubClient {}