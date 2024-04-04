import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDTO } from '../dto/create.board.dto';
import { BoardRepository } from '../repository/board.repository';
import { UpdateBoardDTO } from '../dto/update.board.dto';
import { BoardEntity } from '../repository/board.entity';
import { ReadBoardDTO } from '../dto/read.board.dto';

@Injectable()
export class BoardService {
    constructor(private readonly boardRepository: BoardRepository) {}

    /**
     * 새 글 작성과 기존 글 업데이트를 수행하도록 한다.
     */
    async saveBoard(boardDTO: CreateBoardDTO | UpdateBoardDTO): Promise<BoardEntity> {
        return this.boardRepository.save(boardDTO);
    }

    /**
     * 글 번호로 해당 글의 상세정보를 불러오도록 한다.
     */
    async readBoard(board_no: number): Promise<ReadBoardDTO> {
        const readBoardDTO = await this.boardRepository.read(board_no);

        if (!readBoardDTO) {
            throw new NotFoundException('Post not found!');
        }

        return readBoardDTO;
    }

    /**
     * 글 목록을 불러오도록 한다.
     * @TODO 페이징, 검색 생각해볼것
     */
    async listAllBoard(): Promise<BoardEntity[]> {
        return this.boardRepository.listAll();
    }

    /**
     * 글 번호로 해당 글을 조회해보고 존재하는 글이라면 삭제시키도록 한다.
     */
    async deleteBoard(board_no: number): Promise<object> {
        const boardEntity = await this.boardRepository.read(board_no);

        if (!boardEntity) {
            throw new NotFoundException('Post not found!');
        }

        return this.boardRepository.delete(board_no);
    }
}
