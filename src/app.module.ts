import { Module } from '@nestjs/common';
import { TypeOrmModule } from './modules/typeorm.module';
import { ConfigModule } from './modules/config.module';
import { UserModule } from './modules/domain/user.module';
import { BoardModule } from './modules/domain/board.module';
import { TagModule } from './modules/domain/tag.module';

@Module({
    imports: [ConfigModule, TypeOrmModule, UserModule, BoardModule, TagModule],
    controllers: [],
    providers: []
})
export class AppModule {}
