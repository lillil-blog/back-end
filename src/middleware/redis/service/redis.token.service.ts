import { Injectable } from '@nestjs/common';
import { RedisTokenRepository } from '../repository/redis.token.repository';

@Injectable()
export class RedisTokenService {
    constructor(private readonly redisTokenRepository: RedisTokenRepository) {}

    async getToken(user_no: number) {
        return this.redisTokenRepository.get(`${user_no}`);
    }

    async setToken(user_no: number, token: string, expire?: string) {
        return this.redisTokenRepository.set(`${user_no}`, token, expire);
    }

    async delToken(user_no: number) {
        return this.redisTokenRepository.del(`${user_no}`);
    }
}
