import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDTO } from '../dto/create.tag.dto';

@Injectable()
export class TagRepository {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>
    ) {}

    /**
     * 태그 이름을 담은 DTO를 받아와 새 태그를 생성하도록 한다.
     */
    async create(createTagDTO: CreateTagDTO): Promise<TagEntity> {
        const tagEntity = this.tagRepository.create(createTagDTO);

        return this.tagRepository.save(tagEntity);
    }

    /**
     * 태그 이름을 받아와 일치하는 태그 정보를 리턴하도록 한다.
     */
    async readByName(name: string): Promise<TagEntity> {
        return this.tagRepository.findOne({
            where: { name: name }
        });
    }

    /**
     * 태그 번호를 받아와 일치하는 태그 정보를 리턴하도록 한다.
     */
    async readByTagNo(tag_no: number): Promise<TagEntity> {
        return this.tagRepository.findOne({
            where: { tag_no: tag_no }
        });
    }

    /**
     * 모든 태그 정보를 배열로 리턴하도록 한다.
     */
    async list(): Promise<TagEntity[]> {
        return this.tagRepository.find();
    }

    /**
     * 태그 번호를 받아 해당 태그를 삭제하도록 한다.
     */
    async delete(tag_no: number): Promise<object> {
        return this.tagRepository.delete({ tag_no });
    }
}
