import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from 'src/domain/boards/controller/board.controller';
import { BoardEntity } from 'src/domain/boards/repository/board.entity';
import { BoardRepository } from 'src/domain/boards/repository/board.repository';
import { BoardService } from 'src/domain/boards/service/board.service';
import { TagMappingEntity } from 'src/domain/tags/repository/tag.mapping.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity, TagMappingEntity])],
    controllers: [BoardController],
    providers: [BoardService, BoardRepository],
    exports: []
})
export class BoardModule {}
