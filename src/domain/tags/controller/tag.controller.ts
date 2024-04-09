import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TagService } from '../service/tag.service';
import { CreateTagDTO } from '../dto/create.tag.dto';
import { TagEntity } from '../repository/tag.entity';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { JWTAccessGuard } from 'src/middleware/auth/guard/jwt.access.guard';

@Controller('/tags')
@ApiTags('Tag API')
@ApiBadRequestResponse({ description: '올바르지 않은 파라미터(Query, Body, Param) 값이 존재합니다.' })
@ApiUnauthorizedResponse({ description: '권한이 없거나 만료되었습니다. 로그인을 통해 토큰을 발급받아야 합니다.' })
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post('/')
    @ApiOperation({
        summary: '태그 생성',
        description: '수신한 CreateTagDTO 형식의 JSON 데이터를 바탕으로 새 태그를 생성합니다.'
    })
    @ApiBody({ type: CreateTagDTO })
    @ApiResponse({ status: 201, description: '성공적으로 새 태그를 생성하였습니다.' })
    // @UseGuards(JWTAccessGuard)
    async createTag(@Body() createTagDTO: CreateTagDTO): Promise<TagEntity> {
        return this.tagService.createTag(createTagDTO);
    }

    @Get('/')
    @ApiOperation({
        summary: '태그 목록',
        description: '모든 태그 목록을 불러옵니다.'
    })
    @ApiResponse({ status: 200, description: '성공적으로 모든 태그의 목록을 불러왔습니다.' })
    async listTags(): Promise<Array<TagEntity>> {
        return this.tagService.listTag();
    }

    @Delete('/:tag_no')
    @ApiOperation({
        summary: '태그 삭제',
        description: 'tag_no를 동적라우팅 파라미터로 받아 해당 태그를 삭제합니다.'
    })
    @ApiParam({
        name: 'tag_no',
        description: '삭제할 태그의 번호',
        example: 3
    })
    @ApiResponse({ status: 201, description: '성공적으로 해당 태그를 삭제하였습니다.' })
    // @UseGuards(JWTAccessGuard)
    async deleteTag(@Param('tag_no') tag_no: number): Promise<object> {
        return this.tagService.deleteTag(tag_no);
    }
}
