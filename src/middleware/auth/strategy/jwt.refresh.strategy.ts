import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/domain/users/repository/user.repository';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(
        private userRepository: UserRepository,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.cookies?.refreshToken;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('AUTH_REFRESH_KEY')
        });
    }

    async validate(payload: { user_no: number }) {
        const user = await this.userRepository.readByUserNo(payload.user_no);

        if (!user) {
            throw new UnauthorizedException('There is no matching users.');
        }

        return user;
    }
}
