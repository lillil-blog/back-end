import { Module } from '@nestjs/common';
import { TypeOrmModule } from './modules/typeorm.module';
import { ConfigModule } from './modules/config.module';
import { UserModule } from './modules/domain/user.module';
import { BoardModule } from './modules/domain/board.module';

@Module({
    imports: [ConfigModule, TypeOrmModule, UserModule, BoardModule],
    controllers: [],
    providers: []
})
export class AppModule {}
