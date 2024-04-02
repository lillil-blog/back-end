import { Injectable, NotFoundException } from '@nestjs/common';
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
    async save(boardDTO: CreateBoardDTO | UpdateBoardDTO): Promise<BoardEntity> {
        const { writer, ...rest } = boardDTO;
        const boardEntity = this.boardRepository.create({
            ...rest,
            ...(writer && { writer: { id: writer } })
        });

        return this.boardRepository.save(boardEntity);
    }

    /**
     * 게시글 목록 전체를 불러오도록 한다.
     * @TODO 페이징, 검색기능 생각해서 추가할 것
     */
    async listAll(): Promise<BoardEntity[]> {
        return this.boardRepository.find();
    }

    /**
     * board테이블의 PK를 받아와 해당 글번호의 포스트의 엔티티를 리턴해주도록 한다.
     */
    async read(board_no: number): Promise<BoardEntity> {
        const boardEntity = await this.boardRepository.findOne({
            where: { board_no: board_no }
        });

        return boardEntity;
    }

    /**
     * board테이블의 PK를 받아와 해당 글번호의 포스트를 삭제하도록 한다.
     */
    async delete(board_no: number): Promise<object> {
        return this.boardRepository.delete({ board_no });
    }
}
