import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from 'src/domain/boards/repository/board.entity';
import { BoardLikeEntity } from 'src/domain/boards/repository/board.like.entity';
import { TagEntity } from 'src/domain/tags/repository/tag.entity';
import { TagMappingEntity } from 'src/domain/tags/repository/tag.mapping.entity';
import { UserEntity } from 'src/domain/users/repository/user.entity';

@Module({
    imports: [
        NestTypeOrmModule.forRoot({
            type: 'mysql',
            host: 'osj-nas.synology.me',
            port: 3306,
            username: 'master',
            password: 'Master3306!',
            database: 'dstb',
            entities: [UserEntity, BoardEntity, BoardLikeEntity, TagEntity, TagMappingEntity],
            synchronize: true, // 재시작 시 테이블 구조 항상 동기화
            logging: false // DB작업 콘솔에 로그 출력
        })
    ]
})
export class TypeOrmModule {}

/**
 * @TODO DB연결정보 환경변수로 변경
 */
