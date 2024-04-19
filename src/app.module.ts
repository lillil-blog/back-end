import { Module } from '@nestjs/common';
import { TypeOrmModule } from './modules/typeorm.module';
import { ConfigModule } from './modules/config.module';
import { UserModule } from './modules/domain/user.module';
import { BoardModule } from './modules/domain/board.module';
import { TagModule } from './modules/domain/tag.module';
import { ServeStaticModule } from './modules/serve.static.module';
import { RedisModule } from './modules/middleware/redis.module';
import { RootModule } from './modules/domain/root.module';
import { FileModule } from './modules/domain/file.module';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule,
        ServeStaticModule,
        RedisModule,
        FileModule,
        RootModule,
        UserModule,
        BoardModule,
        TagModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
