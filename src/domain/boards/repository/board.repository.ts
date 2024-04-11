import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDTO } from '../dto/create.board.dto';
import { UpdateBoardDTO } from '../dto/update.board.dto';
import { ReadBoardDTO } from '../dto/read.board.dto';
import { ReadTagDTO } from 'src/domain/tags/dto/read.tag.dto';
import { TagEntity } from 'src/domain/tags/repository/tag.entity';
import { TagMappingEntity } from 'src/domain/tags/repository/tag.mapping.entity';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,
        @InjectRepository(TagMappingEntity)
        private readonly tagMappingRepository: Repository<TagMappingEntity>
    ) {}

    /**
     * 새 글 작성과 기존 글 업데이트를 수행하도록 한다.
     * 받아오는 DTO 형식에 따라 처리되며 업데이트 시 포함되지 않은 필드값은
     * 생략되어 업데이트가 수행된다.
     */
    async save(boardDTO: CreateBoardDTO | UpdateBoardDTO): Promise<BoardEntity | object> {
        const { writer, ...rest } = boardDTO;
        const boardEntity = this.boardRepository.create({
            ...rest,
            ...(writer && { writer: { id: writer } })
        });

        const boardResult = await this.boardRepository.save(boardEntity);

        if (boardDTO.tags) {
            const tagTasks = boardDTO.tags.map((item) =>
                this.tagMappingRepository.save({ board: { board_no: boardResult.board_no }, tag: { tag_no: item } })
            );

            const tagMappingResult = await Promise.all(tagTasks);

            return Object.assign({ board: boardResult }, { tagMapping: tagMappingResult });
        }
        return boardResult;
    }

    /**
     * 게시글 목록 전체를 불러오도록 한다.
     * @TODO 페이징, 검색기능 생각해서 추가할 것
     */
    async listAll(): Promise<ReadBoardDTO[]> {
        const boardEntities = await this.boardRepository
            .createQueryBuilder('board')
            .leftJoinAndSelect('board.tagMappings', 'tagMappings')
            .leftJoinAndSelect('tagMappings.tag', 'tag')
            .loadRelationCountAndMap('board.likecnt', 'board.boardLikes')
            .orderBy('board.board_no', 'DESC')
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
            .innerJoinAndSelect('board.tagMappings', 'tagMappings')
            .innerJoinAndSelect('tagMappings.tag', 'tag')
            .loadRelationCountAndMap('board.likecnt', 'board.boardLikes')
            .where('board.board_no = :board_no', { board_no })
            .getOne();

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
}
