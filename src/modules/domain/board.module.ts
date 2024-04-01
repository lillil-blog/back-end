import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from 'src/domain/board/repository/board.entity';
import { BoardRepository } from 'src/domain/board/repository/board.repository';
import { BoardService } from 'src/domain/board/service/board.service';

@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity])],
    controllers: [],
    providers: [BoardService, BoardRepository],
    exports: []
})
export class BoardModule {}
