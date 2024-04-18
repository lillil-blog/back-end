import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

@Module({
    imports: [
        NestTypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                entities: [path.join(__dirname, '../domain/**/repository/*.entity.{ts,js}')],
                synchronize: true, // 재시작 시 테이블 구조 항상 동기화
                logging: false // DB작업 콘솔에 로그 출력
            })
        })
    ]
})
export class TypeOrmModule {}
