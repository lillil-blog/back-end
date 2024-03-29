import { Module } from '@nestjs/common';
import { TypeOrmModule } from './modules/typeorm.module';
import { ConfigModule } from './modules/config.module';

@Module({
    imports: [ConfigModule, TypeOrmModule],
    controllers: [],
    providers: []
})
export class AppModule {}
