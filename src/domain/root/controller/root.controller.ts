import { Controller, Get } from '@nestjs/common';
import { RootService } from '../service/root.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/')
@ApiTags('Root API')
export class RootController {
    constructor(private readonly rootService: RootService) {}

    @Get('/main')
    @ApiOperation({
        summary: '메인페이지 Props',
        description: '메인페이지에 뿌려줄 props 뭉치입니다. (게시글 최근4개, 유저정보들)'
    })
    @ApiResponse({ status: 200, description: '성공적으로 불러왔습니다.' })
    async getMainPageProps() {
        return this.rootService.getMainPageProps(4);
    }
}
