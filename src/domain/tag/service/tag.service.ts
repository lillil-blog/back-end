import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TagRepository } from '../repository/tag.repository';
import { CreateTagDTO } from '../dto/create.tag.dto';
import { TagEntity } from '../repository/tag.entity';

@Injectable()
export class TagService {
    constructor(private tagRepository: TagRepository) {}

    async createTag(createTagDTO: CreateTagDTO): Promise<TagEntity> {
        const tagEntity = await this.tagRepository.readByName(createTagDTO.name);

        if (tagEntity) {
            throw new ConflictException('Tag name is already exist!');
        }

        return this.tagRepository.create(createTagDTO);
    }

    async listTag(): Promise<TagEntity[]> {
        return this.tagRepository.list();
    }

    async deleteTag(tag_no: number): Promise<object> {
        const tagEntity = await this.tagRepository.readByTagNo(tag_no);

        if (!tagEntity) {
            throw new NotFoundException('Tag not found!');
        }

        return this.tagRepository.delete(tag_no);
    }
}
