import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTagDTO } from 'src/domain/tags/dto/create.tag.dto';
import { TagEntity } from 'src/domain/tags/repository/tag.entity';
import { TagService } from 'src/domain/tags/service/tag.service';
import { TagModule } from 'src/modules/domain/tag.module';
import { TypeOrmModule } from 'src/modules/typeorm.module';

describe('tag.spec', () => {
    let app: INestApplication;
    let service: TagService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule, TagModule]
        }).compile();

        app = module.createNestApplication();
        service = module.get(TagService);

        await app.init();
    });

    afterAll(async () => {
        app.close();
    });

    it('정상적으로 태그가 생성되어야 함', async () => {
        const createTagDTO: CreateTagDTO = { name: 'AWS' };

        expect(await service.createTag(createTagDTO));
    });

    it('정상적으로 태그 리스트가 불러와져야 함', async () => {
        const tagList = await service.listTag();

        expect(tagList).toBeDefined();
        expect(tagList).toBeInstanceOf(Array<TagEntity>);
    });

    it('정상적으로 태그가 삭제되어야 함', async () => {
        expect(await service.deleteTag(2)); //실제값
    });

    it('없는 태그번호이기에 에러가 발생하여야 함', async () => {
        await expect(service.deleteTag(99999)).rejects.toThrow();
    });
});
