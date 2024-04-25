import { Injectable } from '@nestjs/common';
import { RedisCacheRepository } from '../repository/redis.cache.repository';
import { ReadBoardDTO } from 'src/domain/boards/dto/read.board.dto';

@Injectable()
export class RedisCacheService {
    constructor(private readonly redisCacheRepository: RedisCacheRepository) {}

    async getBoard(board_no: number) {
        const boardData = await this.redisCacheRepository.getBoardCache(board_no);
        return boardData ? JSON.parse(boardData) : null;
    }

    async setBoard(readBoardDTO: ReadBoardDTO) {
        return this.redisCacheRepository.setBoardCache(readBoardDTO);
    }

    async deleteBoard(board_no: number) {
        return this.redisCacheRepository.deleteBoardCache(board_no);
    }
}
