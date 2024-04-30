import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateBoardDTO } from '../dto/create.board.dto';
import { UpdateBoardDTO } from '../dto/update.board.dto';
import { ReadBoardDTO } from '../dto/read.board.dto';
import { ReadTagDTO } from 'src/domain/tags/dto/read.tag.dto';
import { TagMappingEntity } from 'src/domain/tags/repository/tag.mapping.entity';
import { BoardLikeEntity } from './board.like.entity';
import { ListBoardDTO } from '../dto/list.board.dto';
import { ExceptionUtil } from 'src/utils/exception.util';
import { CheckerUtil } from 'src/utils/checker.util';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,
        @InjectRepository(BoardLikeEntity)
        private readonly boardLikeRepository: Repository<BoardLikeEntity>,
        private readonly dataSource: DataSource
    ) {}

    /**
     * 새 글 작성과 기존 글 업데이트를 수행하도록 한다.
     * 받아오는 DTO 형식에 따라 처리되며 업데이트 시 포함되지 않은 필드값은
     * 생략되어 업데이트가 수행된다.
     *
     * 트랜잭션을 사용해서 한 번에 커밋 작업을 하여 작업 시간을 단축시키도록 한다.
     */
    async save(boardDTO: CreateBoardDTO | UpdateBoardDTO): Promise<BoardEntity | object> {
        const { writer, tags, ...rest } = boardDTO;

        // 트랜잭션 시작
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            const boardEntity = queryRunner.manager.create(BoardEntity, {
                ...rest,
                ...(writer ? { writer: { id: writer } } : {})
            });

            const boardResult = await queryRunner.manager.save(boardEntity);

            if (tags?.length) {
                const tagMappings = await Promise.all(
                    tags.map((tag) =>
                        queryRunner.manager.save(TagMappingEntity, {
                            board: { board_no: boardResult.board_no },
                            tag: { tag_no: tag }
                        })
                    )
                );
                await queryRunner.commitTransaction(); // 트랜잭션 커밋
                return { board: boardResult, tagMapping: tagMappings };
            }

            await queryRunner.commitTransaction(); // 트랜잭션 커밋
            return boardResult;
        } catch (error) {
            await queryRunner.rollbackTransaction(); // 오류 발생시 롤백
        } finally {
            await queryRunner.release(); // 리소스 해제
        }
    }

    /**
     * 게시글 목록을 불러오도록 한다.
     */
    async list(page: number, limit: number): Promise<ListBoardDTO> {
        const offset = (page - 1) * limit;

        const boardListQuery = this.boardRepository
            .createQueryBuilder('board')
            .leftJoin('board.writer', 'writer')
            .select([
                'board.board_no',
                'board.thumbnail',
                'board.title',
                'board.summary',
                'board.created_at',
                'writer.id',
                'writer.nickname'
            ])
            // .leftJoinAndSelect('board.tagMappings', 'tagMappings') 태그 아티클 검색용으로 일단 놔둠
            // .leftJoinAndSelect('tagMappings.tag', 'tag')
            .orderBy('board.board_no', 'DESC');

        if (page > 0) {
            boardListQuery.skip(offset).take(limit);
        }

        const [boardEntities, totalCnt] = await Promise.all([
            boardListQuery.getMany(),
            this.boardRepository.createQueryBuilder('board').getCount()
        ]);

        const listBoardDTO: ListBoardDTO = {
            boards: boardEntities,
            totalcnt: totalCnt
        };

        return listBoardDTO;
    }

    /**
     * 매개변수로 받은 숫자만큼의 최근 글을 리턴시키도록 한다.
     */
    async listRecent(count: number): Promise<ReadBoardDTO[]> {
        const boardEntities = await this.boardRepository
            .createQueryBuilder('board')
            .leftJoinAndSelect('board.tagMappings', 'tagMappings')
            .leftJoinAndSelect('tagMappings.tag', 'tag')
            .loadRelationCountAndMap('board.likecnt', 'board.boardLikes')
            .orderBy('board.board_no', 'DESC')
            .take(count)
            .getMany();

        const listBoardDTO = boardEntities.map((boardItem) => {
            const readTagDTOArray: ReadTagDTO[] = boardItem.tagMappings.map((tagItem) => tagItem.tag);
            const readBoardDTO: ReadBoardDTO = {
                tags: readTagDTOArray,
                ...(() => {
                    delete boardItem.tagMappings;
                    return boardItem;
                })()
            };

            return readBoardDTO;
        });

        console.log(listBoardDTO);

        return listBoardDTO;
    }

    /**
     * board테이블의 PK를 받아와 해당 글번호의 포스트 정보와 연관된 데이터를 리턴해주도록 한다.
     */
    async read(board_no: number): Promise<ReadBoardDTO> {
        const boardEntity = await this.boardRepository
            .createQueryBuilder('board')
            .leftJoinAndSelect('board.tagMappings', 'tagMappings')
            .leftJoinAndSelect('tagMappings.tag', 'tag')
            .loadRelationCountAndMap('board.likecnt', 'board.boardLikes')
            .where('board.board_no = :board_no', { board_no })
            .getOne();

        ExceptionUtil.check(CheckerUtil.isNull(boardEntity), 'Post not found!', HttpStatus.NOT_FOUND);

        const readTagDTOArray: ReadTagDTO[] = boardEntity.tagMappings.map((item) => item.tag);
        const readBoardDTO: ReadBoardDTO = {
            tags: readTagDTOArray,
            ...(() => {
                delete boardEntity.tagMappings;
                return boardEntity;
            })()
        };

        return readBoardDTO;
    }

    /**
     * board테이블의 PK를 받아와 해당 글번호의 포스트를 삭제하도록 한다.
     */
    async delete(board_no: number): Promise<object> {
        return this.boardRepository.delete({ board_no });
    }

    /**
     * 포스트 번호와 ip를 저장하도록 한다.
     */
    async saveLike(board_no: number, ip: string) {
        const boardLikeEntity = this.boardLikeRepository.create({ board: { board_no: board_no }, ip: ip });

        return this.boardLikeRepository.save(boardLikeEntity);
    }

    /**
     * 포스트 번호와 아이피를 바탕으로 like 요소를 가져오도록 한다.
     */
    async getLike(board_no: number, ip: string) {
        return this.boardLikeRepository.findOne({
            where: { board: { board_no: board_no }, ip: ip }
        });
    }
}
