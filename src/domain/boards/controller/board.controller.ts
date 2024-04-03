import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardEntity } from '../repository/board.entity';
import { CreateBoardDTO } from '../dto/create.board.dto';
import { BoardService } from '../service/board.service';
import { UpdateBoardDTO } from '../dto/update.board.dto';

@Controller('/boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post('/')
    async createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<BoardEntity> {
        return this.boardService.saveBoard(createBoardDTO);
    }

    @Get('/')
    async listBoards(): Promise<Array<BoardEntity>> {
        return this.boardService.listAllBoard();
    }

    @Get('/:board_no')
    async detailBoard(@Param('board_no') board_no: number): Promise<BoardEntity> {
        return this.boardService.readBoard(board_no);
    }

    @Patch('/:board_no')
    async modifyBoard(@Body() updateBoardDTO: UpdateBoardDTO): Promise<BoardEntity> {
        return this.boardService.saveBoard(updateBoardDTO);
    }

    @Delete('/:board_no')
    async deleteBoard(@Param('board_no') board_no: number): Promise<object> {
        return this.boardService.deleteBoard(board_no);
    }
}
