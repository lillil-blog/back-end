import { Body, Controller, Param } from '@nestjs/common';
import { TagService } from '../service/tag.service';
import { CreateTagDTO } from '../dto/create.tag.dto';
import { TagEntity } from '../repository/tag.entity';

@Controller('/tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    async createTag(@Body() createTagDTO: CreateTagDTO): Promise<TagEntity> {
        return this.tagService.createTag(createTagDTO);
    }

    async listTags(): Promise<Array<TagEntity>> {
        return this.tagService.listTag();
    }

    async deleteTag(@Param('tag_no') tag_no: number): Promise<object> {
        return this.tagService.deleteTag(tag_no);
    }
}
