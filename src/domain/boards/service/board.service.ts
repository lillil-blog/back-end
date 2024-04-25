import { Injectable } from '@nestjs/common';
import { CreateBoardDTO } from '../dto/create.board.dto';
import { BoardRepository } from '../repository/board.repository';
import { UpdateBoardDTO } from '../dto/update.board.dto';
import { BoardEntity } from '../repository/board.entity';
import { ReadBoardDTO } from '../dto/read.board.dto';
import { CheckerUtil } from 'src/utils/checker.util';
import { ExceptionUtil } from 'src/utils/exception.util';
import { ListBoardDTO } from '../dto/list.board.dto';
import { RedisCacheService } from 'src/infrastructure/cache/service/redis.cache.service';

@Injectable()
export class BoardService {
    constructor(
        private readonly redisCacheService: RedisCacheService,
        private readonly boardRepository: BoardRepository
    ) {}

    /**
     * 새 글 작성과 기존 글 업데이트를 수행하도록 한다.
     */
    async saveBoard(boardDTO: CreateBoardDTO | UpdateBoardDTO): Promise<BoardEntity | object> {
        const boardResult = await this.boardRepository.save(boardDTO);
        if (CheckerUtil.isNotNull(boardResult)) {
            this.redisCacheService.setBoard(boardResult as ReadBoardDTO);
        }
        return this.boardRepository.save(boardDTO);
    }

    /**
     * 글 번호로 해당 글의 상세정보를 불러오도록 한다.
     */
    async readBoard(board_no: number): Promise<ReadBoardDTO> {
        const readBoardCache = await this.redisCacheService.getBoard(board_no);

        if (CheckerUtil.isNull(readBoardCache)) {
            const readBoardDTO = await this.boardRepository.read(board_no);

            ExceptionUtil.check(CheckerUtil.isNotNull(readBoardDTO), 'Post not found!');

            this.redisCacheService.setBoard(readBoardDTO);

            return readBoardDTO;
        }

        return readBoardCache;
    }

    /**
     * 글 목록을 불러오도록 한다.
     */
    async listBoard(page: number, limit: number): Promise<ListBoardDTO> {
        return this.boardRepository.list(page, limit);
    }

    /**
     * 글 번호로 해당 글을 조회해보고 존재하는 글이라면 삭제시키도록 한다.
     */
    async deleteBoard(board_no: number): Promise<object> {
        const boardEntity = await this.boardRepository.read(board_no);

        ExceptionUtil.check(CheckerUtil.isNotNull(boardEntity), 'Post not found!');

        this.redisCacheService.deleteBoard(board_no);

        return this.boardRepository.delete(board_no);
    }

    /**
     * 테이블을 조회하여 내역이 없으면 좋아요 테이블에 추가하도록 한다.
     */
    async likeBoard(board_no: number, ip: string) {
        const requestIpv4 = ip.replace('::ffff:', '');
        const boardLikeEntity = await this.boardRepository.getLike(board_no, requestIpv4);

        ExceptionUtil.check(CheckerUtil.isNull(boardLikeEntity), 'Already liked it!');

        return this.boardRepository.saveLike(board_no, requestIpv4);
    }
}
