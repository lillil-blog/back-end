import { Injectable } from '@nestjs/common';
import { CreateBoardDTO } from '../dto/create.board.dto';
import { BoardRepository } from '../repository/board.repository';
import { UpdateBoardDTO } from '../dto/update.board.dto';
import { BoardEntity } from '../repository/board.entity';

@Injectable()
export class BoardService {
    constructor(private readonly boardRepository: BoardRepository) {}

    /**
     * 새 글 작성과 기존 글 업데이트를 수행하도록 한다.
     */
    async saveBoard(boardDTO: CreateBoardDTO | UpdateBoardDTO): Promise<BoardEntity> {
        return await this.boardRepository.save(boardDTO);
    }
}
