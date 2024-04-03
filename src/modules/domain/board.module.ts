import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from 'src/domain/boards/controller/board.controller';
import { BoardEntity } from 'src/domain/boards/repository/board.entity';
import { BoardRepository } from 'src/domain/boards/repository/board.repository';
import { BoardService } from 'src/domain/boards/service/board.service';

@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity])],
    controllers: [BoardController],
    providers: [BoardService, BoardRepository],
    exports: []
})
export class BoardModule {}
