import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/domain/users/repository/user.repository';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
    constructor(
        private userRepository: UserRepository,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.cookies?.accessToken;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('AUTH_ACCESS_KEY')
        });
    }

    async validate(payload: { id: string }) {
        const user = await this.userRepository.readById(payload.id);

        if (!user) {
            throw new UnauthorizedException('There is no matching users.');
        }

        return user;
    }
}
