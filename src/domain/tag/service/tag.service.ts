import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TagRepository } from '../repository/tag.repository';
import { CreateTagDTO } from '../dto/create.tag.dto';
import { TagEntity } from '../repository/tag.entity';

@Injectable()
export class TagService {
    constructor(private tagRepository: TagRepository) {}

    /**
     * 태그 이름을 담은 DTO를 받아와 중복되는 이름이 있는지 검사 후
     * 정상적인 값이면 태그를 생성하도록 한다.
     */
    async createTag(createTagDTO: CreateTagDTO): Promise<TagEntity> {
        const tagEntity = await this.tagRepository.readByName(createTagDTO.name);

        if (tagEntity) {
            throw new ConflictException('Tag name is already exist!');
        }

        return this.tagRepository.create(createTagDTO);
    }

    /**
     * 모든 태그를 불러오도록 한다.
     */
    async listTag(): Promise<TagEntity[]> {
        return this.tagRepository.list();
    }

    /**
     * 태그 번호를 받아와 존재하는 태그인지 검사 후
     * 정상적인 값이면 해당 태그를 삭제하도록 한다.
     */
    async deleteTag(tag_no: number): Promise<object> {
        const tagEntity = await this.tagRepository.readByTagNo(tag_no);

        if (!tagEntity) {
            throw new NotFoundException('Tag not found!');
        }

        return this.tagRepository.delete(tag_no);
    }
}
