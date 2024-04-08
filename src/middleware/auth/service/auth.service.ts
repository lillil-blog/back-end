import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDTO } from '../dto/auth.access.token.dto';
import { RefreshTokenDTO } from '../dto/auth.refresh.token.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async generateAccessToken(payload: AccessTokenDTO): Promise<string> {
        return this.jwtService.signAsync(
            {
                user_no: payload.user_no,
                id: payload.id
            },
            {
                secret: this.configService.get('AUTH_ACCESS_KEY'),
                expiresIn: this.configService.get('AUTH_ACCESS_EXPIRATION_TIME')
            }
        );
    }

    async generateRefreshToken(payload: RefreshTokenDTO): Promise<string> {
        return this.jwtService.signAsync(
            {
                user_no: payload.user_no,
                id: payload.id,
                accessToken: payload.accessToken
            },
            {
                secret: this.configService.get('AUTH_REFRESH_KEY'),
                expiresIn: this.configService.get('AUTH_REFRESH_EXPIRATION_TIME')
            }
        );
    }

    async verifyAccessToken(accessToken: string): Promise<AccessTokenDTO> {
        return this.jwtService.verifyAsync(accessToken, {
            secret: this.configService.get('AUTH_ACCESS_KEY')
        });
    }

    async verifyRefreshToken(refreshToken: string): Promise<RefreshTokenDTO> {
        return this.jwtService.verifyAsync(refreshToken, {
            secret: this.configService.get('AUTH_REFRESH_KEY')
        });
    }
}
