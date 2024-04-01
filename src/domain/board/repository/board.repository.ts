import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDTO } from '../dto/create.board.dto';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>
    ) {}

    async create(createBoardDTO: CreateBoardDTO) {
        const { writer, ...rest } = createBoardDTO;
        const boardEntity = this.boardRepository.create({
            writer: { id: writer },
            ...rest
        });

        return await this.boardRepository.save(boardEntity);
    }
}
