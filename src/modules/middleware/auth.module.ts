import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/domain/users/repository/user.repository';
import { AuthService } from 'src/middleware/auth/service/auth.service';
import { JwtAccessStrategy } from 'src/middleware/auth/strategy/jwt.access.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/users/repository/user.entity';
import { JwtRefreshStrategy } from 'src/middleware/auth/strategy/jwt.refresh.strategy';

@Module({
    imports: [JwtModule, PassportModule, TypeOrmModule.forFeature([UserEntity])],
    providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy, UserRepository],
    exports: [AuthService]
})
export class AuthModule {}
