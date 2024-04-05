import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async generateAccessToken(payload: { id: string }): Promise<string> {
        return this.jwtService.signAsync(
            {
                id: payload.id
            },
            {
                secret: this.configService.get('AUTH_ACCESS_KEY'),
                expiresIn: this.configService.get('AUTH_ACCESS_EXPIRATION_TIME')
            }
        );
    }

    async generateRefreshToken(payload: { user_no: number }): Promise<string> {
        return this.jwtService.signAsync(
            {
                user_no: payload.user_no
            },
            {
                secret: this.configService.get('AUTH_REFRESH_KEY'),
                expiresIn: this.configService.get('AUTH_REFRESH_EXPIRATION_TIME')
            }
        );
    }

    async verifyRefreshToken(refreshToken: string): Promise<{ user_no: number }> {
        return this.jwtService.verifyAsync(refreshToken, {
            secret: this.configService.get('AUTH_REFRESH_KEY')
        });
    }
}
