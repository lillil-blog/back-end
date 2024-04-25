import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';
import { RedisTokenService } from 'src/middleware/redis/service/redis.token.service';
import { RedisTokenRepository } from 'src/middleware/redis/repository/redis.token.repository';
import { RedisCacheService } from 'src/infrastructure/cache/service/redis.cache.service';
import { RedisCacheRepository } from 'src/infrastructure/cache/repository/redis.cache.repository';

@Module({
    imports: [
        NestRedisModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                readyLog: true,
                config: [
                    {
                        namespace: configService.get('REDIS_TOKEN_NAMESPACE'),
                        host: configService.get('REDIS_TOKEN_HOST'),
                        port: configService.get('REDIS_TOKEN_PORT'),
                        password: configService.get('REDIS_TOKEN_PASSWORD')
                    },
                    {
                        namespace: configService.get('REDIS_CACHE_NAMESPACE'),
                        host: configService.get('REDIS_CACHE_HOST'),
                        port: configService.get('REDIS_CACHE_PORT'),
                        password: configService.get('REDIS_CACHE_PASSWORD')
                    }
                ]
            })
        })
    ],
    providers: [RedisTokenService, RedisTokenRepository, RedisCacheService, RedisCacheRepository],
    exports: [RedisTokenService, RedisTokenRepository, RedisCacheService, RedisCacheRepository]
})
export class RedisModule {}
