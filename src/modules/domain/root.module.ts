import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from 'src/domain/boards/repository/board.entity';
import { BoardLikeEntity } from 'src/domain/boards/repository/board.like.entity';
import { BoardRepository } from 'src/domain/boards/repository/board.repository';
import { RootController } from 'src/domain/root/controller/root.controller';
import { RootService } from 'src/domain/root/service/root.service';
import { TagMappingEntity } from 'src/domain/tags/repository/tag.mapping.entity';
import { UserEntity } from 'src/domain/users/repository/user.entity';
import { UserRepository } from 'src/domain/users/repository/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, BoardEntity, BoardLikeEntity, TagMappingEntity])],
    controllers: [RootController],
    providers: [RootService, UserRepository, BoardRepository]
})
export class RootModule {}
