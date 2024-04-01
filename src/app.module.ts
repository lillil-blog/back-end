import { Module } from '@nestjs/common';
import { TypeOrmModule } from './modules/typeorm.module';
import { ConfigModule } from './modules/config.module';
import { UserModule } from './modules/domain/user.module';

@Module({
    imports: [ConfigModule, TypeOrmModule, UserModule],
    controllers: [],
    providers: []
})
export class AppModule {}
