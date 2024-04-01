import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateBoardDTO } from 'src/domain/board/dto/create.board.dto';
import { BoardService } from 'src/domain/board/service/board.service';
import { BoardModule } from 'src/modules/domain/board.module';
import { TypeOrmModule } from 'src/modules/typeorm.module';

describe('create.board.spec', () => {
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

    it('should create a new board', async () => {
        const createBoardDTO: CreateBoardDTO = {
            title: '테스트글제목',
            content: '테스트글내용',
            writer: 'test',
            category: 'tech',
            thumbnail: '/default_thumbnail.png'
        };

        expect(await service.createBoard(createBoardDTO)).toBeDefined();
    });

    it('should fail a new board', async () => {
        const createBoardDTO: CreateBoardDTO = {
            title: '테스트글제목',
            content: '테스트글내용',
            writer: '없는사용자',
            category: 'tech',
            thumbnail: '/default_thumbnail.png'
        };
        await expect(service.createBoard(createBoardDTO)).rejects.toThrow();
    });
});
