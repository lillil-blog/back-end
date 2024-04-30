import { HttpStatus, Injectable } from '@nestjs/common';
import { TagRepository } from '../repository/tag.repository';
import { CreateTagDTO } from '../dto/create.tag.dto';
import { TagEntity } from '../repository/tag.entity';
import { ExceptionUtil } from 'src/utils/exception.util';
import { CheckerUtil } from 'src/utils/checker.util';

@Injectable()
export class TagService {
    constructor(private tagRepository: TagRepository) {}

    /**
     * 태그 이름을 담은 DTO를 받아와 중복되는 이름이 있는지 검사 후
     * 정상적인 값이면 태그를 생성하도록 한다.
     */
    async createTag(createTagDTO: CreateTagDTO): Promise<TagEntity> {
        const tagEntity = await this.tagRepository.readByName(createTagDTO.name);

        ExceptionUtil.check(CheckerUtil.isDefined(tagEntity), 'Tag name is already exist!', HttpStatus.CONFLICT);

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

        ExceptionUtil.check(CheckerUtil.isNull(tagEntity), 'Tag not found!', HttpStatus.NOT_FOUND);

        return this.tagRepository.delete(tag_no);
    }
}
