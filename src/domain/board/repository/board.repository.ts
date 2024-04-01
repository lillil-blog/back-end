import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDTO } from '../dto/create.board.dto';
import { UpdateBoardDTO } from '../dto/update.board.dto';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>
    ) {}

    /**
     * 새 글 작성과 기존 글 업데이트를 수행하도록 한다.
     * 받아오는 DTO 형식에 따라 처리되며 업데이트 시 포함되지 않은 필드값은
     * 생략되어 업데이트가 수행된다.
     */
    async save(boardDTO: CreateBoardDTO | UpdateBoardDTO) {
        const { writer, ...rest } = boardDTO;
        const boardEntity = this.boardRepository.create({
            ...rest,
            ...(writer && { writer: { id: writer } })
        });

        return await this.boardRepository.save(boardEntity);
    }
}
