import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/middleware/auth/service/auth.service';

@Module({
    imports: [JwtModule, PassportModule],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
