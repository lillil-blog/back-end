import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from 'src/domain/users/dto/create.user.dto';
import { UserService } from 'src/domain/users/service/user.service';
import { UserModule } from 'src/modules/domain/user.module';
import { TypeOrmModule } from 'src/modules/typeorm.module';

describe('create.user.spec', () => {
    let app: INestApplication;
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule, UserModule]
        }).compile();

        app = module.createNestApplication();
        service = module.get<UserService>(UserService);

        await app.init();
    }, 10000);

    afterAll(async () => {
        await app.close();
    });

    it('should create a new user', async () => {
        const createUserDTO: CreateUserDTO = {
            id: 'test6',
            password: 'test',
            nickname: '테스트닉네임',
            introduce: '테스트계정입니다.',
            thumbnail: 'default_Thumbnail'
        };

        await expect(await service.createUser(createUserDTO)).rejects.toThrow();
    });
});
