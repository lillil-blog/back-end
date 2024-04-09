import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisTokenRepository {
    constructor(
        @InjectRedis('REDIS_TOKEN')
        private readonly redis: Redis
    ) {}

    async get(key: string): Promise<string> {
        return this.redis.get(key);
    }

    async set(key: string, value: string, expire?: string): Promise<string> {
        return this.redis.set(key, value, 'EX', parseInt(expire, 10));
    }

    async del(key: string): Promise<number> {
        return this.redis.del(key);
    }
}
