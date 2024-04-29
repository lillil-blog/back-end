import { Body, Controller, Delete, Get, Ip, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BoardEntity } from '../repository/board.entity';
import { CreateBoardDTO } from '../dto/create.board.dto';
import { BoardService } from '../service/board.service';
import { UpdateBoardDTO } from '../dto/update.board.dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { ReadBoardDTO } from '../dto/read.board.dto';
import { JWTAccessGuard } from 'src/middleware/auth/guard/jwt.access.guard';
import { ListBoardDTO } from '../dto/list.board.dto';

@Controller('/boards')
@ApiTags('Board API')
@ApiBadRequestResponse({ description: '올바르지 않은 파라미터(Query, Body, Param) 값이 존재합니다.' })
@ApiUnauthorizedResponse({ description: '권한이 없거나 만료되었습니다. 로그인을 통해 토큰을 발급받아야 합니다.' })
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post('/')
    @ApiOperation({
        summary: '새 글 생성',
        description: '수신한 CreateBoardDTO 형식의 JSON 데이터를 바탕으로 새 글 포스트를 생성합니다.'
    })
    @ApiBody({ type: CreateBoardDTO })
    @ApiResponse({ status: 201, description: '성공적으로 새 블로그 포스트를 등록했습니다.' })
    // @UseGuards(JWTAccessGuard)
    async createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<BoardEntity | object> {
        return this.boardService.createBoard(createBoardDTO);
    }

    @Get('/')
    @ApiOperation({
        summary: '글 목록',
        description: '해당 페이지의 글 목록을 가져옵니다. (page default = 1)'
    })
    @ApiQuery({ name: 'number', description: '불러올 페이지 번호', example: 2 })
    @ApiResponse({ status: 200, description: '성공적으로 글 목록을 불러왔습니다.' })
    async listBoards(@Query('page') page: number = 0): Promise<ListBoardDTO> {
        // (페이지번호, 가져올 개수)
        return this.boardService.listBoard(page, 6);
    }

    @Get('/:board_no')
    @ApiOperation({
        summary: '글 상세보기',
        description: 'board_no를 동적라우팅 파라미터로 수신하여 해당 글의 상세정보를 리턴합니다.'
    })
    @ApiParam({
        name: 'board_no',
        description: '확인할 블로그 포스트의 번호',
        example: 12
    })
    @ApiResponse({ status: 200, description: '성공적으로 해당 글의 상세정보를 불러왔습니다.' })
    async detailBoard(@Param('board_no') board_no: number): Promise<ReadBoardDTO> {
        return this.boardService.readBoard(board_no);
    }

    @Patch('/')
    @ApiOperation({
        summary: '글 수정',
        description: '수정할 데이터를 UpdateBoardDTO 형식의 Body JSON으로 수신하여 해당 글의 정보를 변경합니다.'
    })
    @ApiBody({ type: UpdateBoardDTO })
    @ApiResponse({ status: 201, description: '성공적으로 해당 글의 정보를 변경했습니다.' })
    // @UseGuards(JWTAccessGuard)
    async modifyBoard(@Body() updateBoardDTO: UpdateBoardDTO): Promise<BoardEntity | object> {
        return this.boardService.updateBoard(updateBoardDTO);
    }

    @Delete('/:board_no')
    @ApiOperation({
        summary: '글 삭제',
        description: 'board_no를 동적라우팅 파라미터로 수신하여 해당 글을 삭제합니다.'
    })
    @ApiParam({
        name: 'board_no',
        description: '삭제할 블로그 포스트의 번호',
        example: 12
    })
    @ApiResponse({ status: 201, description: '성공적으로 해당 글을 삭제하였습니다.' })
    // @UseGuards(JWTAccessGuard)
    async deleteBoard(@Param('board_no') board_no: number): Promise<object> {
        return this.boardService.deleteBoard(board_no);
    }

    @Post('/:board_no/like')
    @ApiOperation({
        summary: '글 좋아요 등록',
        description:
            '1인당 1개의 글에 한 번만 좋아요 등록이 가능하도록 접속자의 ip(req) 정보와 board_no를 파라미터로 받습니다.'
    })
    @ApiParam({
        name: 'board_no',
        description: '좋아요 등록할 포스트의 번호',
        example: 42
    })
    @ApiResponse({ status: 201, description: '성공적으로 해당 글에 좋아요를 등록했습니다.' })
    @ApiResponse({ status: 401, description: '이미 좋아요를 등록했습니다.' })
    async likeBoard(@Param('board_no') board_no: number, @Ip() ip: string) {
        return this.boardService.likeBoard(board_no, ip);
    }
}
