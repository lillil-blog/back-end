import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BoardEntity } from 'src/domain/board/repository/board.entity';
import { BoardService } from 'src/domain/board/service/board.service';
import { BoardModule } from 'src/modules/domain/board.module';
import { TypeOrmModule } from 'src/modules/typeorm.module';

describe('read.board.spec', () => {
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

    it('게시글 전체 목록 불러오기', async () => {
        const list = await service.listAllBoard();

        console.log(list);

        expect(list).toBeDefined();
        expect(list).toBeInstanceOf(Array<BoardEntity>);
    });

    it('게시글 한 개의 상세정보 불러오기', async () => {
        const read = await service.readBoard(16); //실제값

        console.log(read);

        expect(read).toBeDefined();
        expect(read).toBeInstanceOf(BoardEntity);
    });

    it('게시글 한 개의 정보를 불러오는데 없는 번호라 실패해야함', async () => {
        await expect(service.readBoard(99999)).rejects.toThrow();
    });
});
