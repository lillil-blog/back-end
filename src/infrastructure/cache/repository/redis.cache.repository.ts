import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ReadBoardDTO } from 'src/domain/boards/dto/read.board.dto';

@Injectable()
export class RedisCacheRepository {
    constructor(
        @InjectRedis('REDIS_CACHE')
        private readonly redis: Redis
    ) {}

    async getBoardCache(board_no: number): Promise<string> {
        return this.redis.get(`board_no:${board_no}`);
    }

    async setBoardCache(readBoardDTO: ReadBoardDTO): Promise<'OK'> {
        return this.redis.set(`board_no:${readBoardDTO.board_no}`, JSON.stringify(readBoardDTO), 'EX', 3600);
    }

    async deleteBoardCache(board_no: number): Promise<number> {
        return this.redis.del(`board_no:${board_no}`);
    }
}
