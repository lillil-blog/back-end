import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateBoardDTO } from 'src/domain/boards/dto/create.board.dto';
import { UpdateBoardDTO } from 'src/domain/boards/dto/update.board.dto';
import { BoardService } from 'src/domain/boards/service/board.service';
import { BoardModule } from 'src/modules/domain/board.module';
import { TypeOrmModule } from 'src/modules/typeorm.module';

describe('save.board.spec', () => {
    let app: INestApplication;
    let service: BoardService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule, BoardModule]
        }).compile();

        app = module.createNestApplication();
        service = module.get<BoardService>(BoardService);

        await app.init();
    }, 10000);

    afterAll(async () => {
        await app.close();
    });

    it('정상적으로 글 등록이 되어야 함', async () => {
        const createBoardDTO: CreateBoardDTO = {
            title: '테스트글제목',
            content: '테스트글내용',
            writer: 'test',
            category: 'tech',
            thumbnail: '/default_thumbnail.png'
        };

        expect(await service.saveBoard(createBoardDTO)).toBeDefined();
    });

    it('없는 사용자라 실패해야함', async () => {
        const createBoardDTO: CreateBoardDTO = {
            title: '테스트글제목',
            content: '테스트글내용',
            writer: '없는사용자',
            category: 'tech',
            thumbnail: '/default_thumbnail.png'
        };

        await expect(service.saveBoard(createBoardDTO)).rejects.toThrow();
    });

    it('비정상적인 값이라 실패해야함', async () => {
        const createBoardDTO: CreateBoardDTO = {
            title: '테스트글제목',
            content: null,
            writer: '없는사용자',
            category: 'tech',
            thumbnail: '/default_thumbnail.png'
        };

        await expect(service.saveBoard(createBoardDTO)).rejects.toThrow();
    });

    it('정상적으로 업데이트가 되어야 함', async () => {
        const updateBoardDTO: UpdateBoardDTO = {
            board_no: 10, //실제값
            title: '수정된제목',
            content: '수정된내용',
            category: '수정된카테고리',
            thumbnail: '수정된썸네일'
        };

        expect(await service.saveBoard(updateBoardDTO));
    });

    it('없는 글 번호라 실패해야 함', async () => {
        const updateBoardDTO: UpdateBoardDTO = {
            board_no: 99999
        };

        await expect(service.saveBoard(updateBoardDTO)).rejects.toThrow();
    });
});
