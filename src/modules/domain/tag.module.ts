import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from 'src/domain/tag/repository/tag.entity';
import { TagMappingEntity } from 'src/domain/tag/repository/tag.mapping.entity';
import { TagRepository } from 'src/domain/tag/repository/tag.repository';
import { TagService } from 'src/domain/tag/service/tag.service';

@Module({
    imports: [TypeOrmModule.forFeature([TagEntity, TagMappingEntity])],
    controllers: [],
    providers: [TagService, TagRepository],
    exports: []
})
export class TagModule {}
