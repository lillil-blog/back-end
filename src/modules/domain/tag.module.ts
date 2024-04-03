import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from 'src/domain/tags/controller/tag.controller';
import { TagEntity } from 'src/domain/tags/repository/tag.entity';
import { TagMappingEntity } from 'src/domain/tags/repository/tag.mapping.entity';
import { TagRepository } from 'src/domain/tags/repository/tag.repository';
import { TagService } from 'src/domain/tags/service/tag.service';

@Module({
    imports: [TypeOrmModule.forFeature([TagEntity, TagMappingEntity])],
    controllers: [TagController],
    providers: [TagService, TagRepository],
    exports: []
})
export class TagModule {}
