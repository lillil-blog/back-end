import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from 'src/domain/board/repository/board.entity';
import { BoardLikeEntity } from 'src/domain/board/repository/board.like.entity';
import { TagEntity } from 'src/domain/tag/repository/tag.entity';
import { UserEntity } from 'src/domain/user/repository/user.entity';

@Module({
    imports: [
        NestTypeOrmModule.forRoot({
            type: 'mysql',
            host: 'osj-nas.synology.me',
            port: 3306,
            username: 'master',
            password: 'Master3306!',
            database: 'dstb',
            entities: [UserEntity, BoardEntity, BoardLikeEntity, TagEntity],
            synchronize: true, // 재시작 시 테이블 구조 항상 동기화
            logging: true // DB작업 콘솔에 로그 출력
        })
    ]
})
export class TypeOrmModule {
    constructor() {
        console.log(process.env.DB_HOST);
        console.log(process.env.DB_PORT);
        console.log(process.env.DB_USER);
        console.log(process.env.DB_PASSWORD);
        console.log(process.env.DB_DATABASE);
    }
}
