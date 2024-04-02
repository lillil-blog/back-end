import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from 'src/domain/board/service/board.service';
import { CreateTagDTO } from 'src/domain/tag/dto/create.tag.dto';
import { BoardModule } from 'src/modules/domain/board.module';
import { TypeOrmModule } from 'src/modules/typeorm.module';

describe('temp.spec', () => {
    let app: INestApplication;
    let service: BoardService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule, BoardModule]
        }).compile();

        app = module.createNestApplication();
        service = module.get(BoardService);

        await app.init();
    }, 20000);

    afterAll(async () => {
        app.close();
    });

    it('임시 테스트 구역', async () => {
        const read = await service.readBoard(6);

        console.log(read);

        expect(read).toBeDefined();
    });
});
