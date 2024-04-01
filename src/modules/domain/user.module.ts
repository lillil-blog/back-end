import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/user/repository/user.entity';
import { UserRepository } from 'src/domain/user/repository/user.repository';
import { UserService } from 'src/domain/user/service/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [],
    providers: [UserService, UserRepository],
    exports: []
})
export class UserModule {}
