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

    async create(createTagDTO: CreateTagDTO): Promise<TagEntity> {
        const tagEntity = this.tagRepository.create(createTagDTO);

        return this.tagRepository.save(tagEntity);
    }

    async readByName(name: string): Promise<TagEntity> {
        return this.tagRepository.findOne({
            where: { name: name }
        });
    }

    async readByTagNo(tag_no: number): Promise<TagEntity> {
        return this.tagRepository.findOne({
            where: { tag_no: tag_no }
        });
    }

    async list(): Promise<TagEntity[]> {
        return this.tagRepository.find();
    }

    async delete(tag_no: number): Promise<object> {
        return this.tagRepository.delete({ tag_no });
    }
}
