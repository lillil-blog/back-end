import { Injectable } from '@nestjs/common';
import { CreateBoardDTO } from '../dto/create.board.dto';
import { BoardRepository } from '../repository/board.repository';

@Injectable()
export class BoardService {
    constructor(private readonly boardRepository: BoardRepository) {}

    async createBoard(createBoardDTO: CreateBoardDTO) {
        return await this.boardRepository.create(createBoardDTO);
    }
}
