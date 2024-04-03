import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from 'src/domain/boards/service/board.service';
import { BoardModule } from 'src/modules/domain/board.module';
import { TypeOrmModule } from 'src/modules/typeorm.module';

describe('delete.board.spec', () => {
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
        app.close();
    });

    it('성공적으로 글이 지워져야함', async () => {
        const board_no: number = 4; //실제값

        expect(await service.deleteBoard(board_no));
    });

    it('없는 글 번호이기에 실패해야 함', async () => {
        await expect(service.deleteBoard(99999)).rejects.toThrow();
    });
});
