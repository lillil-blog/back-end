import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/domain/users/controller/user.controller';
import { UserEntity } from 'src/domain/users/repository/user.entity';
import { UserRepository } from 'src/domain/users/repository/user.repository';
import { UserService } from 'src/domain/users/service/user.service';
import { AuthModule } from '../middleware/auth.module';
import { RedisModule } from '../middleware/redis.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule, RedisModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: []
})
export class UserModule {}
