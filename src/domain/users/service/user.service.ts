import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDTO } from '../dto/create.user.dto';
import { UserEntity } from '../repository/user.entity';
import { UpdateUserDTO } from '../dto/update.user.dto';
import { LoginUserDTO } from '../dto/login.user.dto';
import { CommonUtil } from 'src/utils/common.util';
import { AuthService } from 'src/middleware/auth/service/auth.service';
import { isJWT } from 'class-validator';
import { CheckerUtil } from 'src/utils/checker.util';
import { RedisTokenService } from 'src/middleware/redis/service/redis.token.service';
import { ConfigService } from '@nestjs/config';
import { ExceptionUtil } from 'src/utils/exception.util';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly redisTokenService: RedisTokenService
    ) {}

    /**
     * LoginUserDTO 형식의 JSON데이터를 바탕으로 로그인을 수행하도록 한다.
     */
    async loginUser(loginUserDTO: LoginUserDTO) {
        const user = await this.userRepository.readById(loginUserDTO.id);
        ExceptionUtil.check(CheckerUtil.isNotNull(user), 'User not found!');

        const passwordCompare = await CommonUtil.compareHash(loginUserDTO.password, user.password);
        ExceptionUtil.check(passwordCompare, 'User not found!');

        const accessToken = await this.authService.generateAccessToken({ user_no: user.user_no, id: user.id });
        const refreshToken = await this.authService.generateRefreshToken({
            user_no: user.user_no,
            id: user.id,
            accessToken: accessToken
        });

        this.redisTokenService.setToken(
            user.user_no,
            refreshToken,
            this.configService.get('AUTH_REFRESH_EXPIRATION_TIME')
        );

        const tokenObject: object = {
            accessToken: accessToken,
            refreshToken: refreshToken
        };

        return tokenObject;
    }

    /**
     * CreateUserDTO 형식의 JSON 데이터를 바탕으로 새 유저를 생성하도록 한다.
     */
    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const userEntity = await this.userRepository.readById(createUserDTO.id);

        ExceptionUtil.check(!CheckerUtil.isDefined(userEntity), `${createUserDTO.id} is already exist!`);

        createUserDTO.password = await CommonUtil.generateHash(createUserDTO.password);

        return this.userRepository.save(createUserDTO);
    }

    /**
     * id값을 매개변수로 받아 일치하는 유저의 정보를 리턴시키도록 한다.
     */
    async detailUser(accessToken: string): Promise<UserEntity> {
        ExceptionUtil.check(isJWT(accessToken), 'Wrong token');

        const accessTokenPayload = await this.authService.verifyAccessToken(accessToken);

        return this.userRepository.readByUserNo(accessTokenPayload.user_no);
    }

    /**
     * UpdateUserDTO 형식의 JSON 데이터를 바탕으로 기존 유저의 업데이트를 수행하도록 한다.
     * DTO 안의 Optinal 필드값 참고
     */
    async updateUser(updateUserDTO: UpdateUserDTO, accessToken: string): Promise<UserEntity> {
        ExceptionUtil.check(isJWT(accessToken), 'Wrong token');

        const accessTokenPayload = await this.authService.verifyAccessToken(accessToken);

        updateUserDTO.user_no = accessTokenPayload.user_no;
        updateUserDTO.password = updateUserDTO.password
            ? await CommonUtil.generateHash(updateUserDTO.password)
            : undefined;

        return this.userRepository.save(updateUserDTO);
    }

    /**
     * AccessToken이 만료되면 RefreshToken을 검증 후 새 토큰들을 발급한다.
     * 재발급 시 두 개의 토큰 모두를 재발급하며 RefreshToken은 Redis서버에 저장 후
     * RefreshTokenRotation 방식을 사용하도록 한다.
     */
    async reissueToken(tokens: { accessToken: string; refreshToken: string }) {
        const message = 'Invalid authentication. Please login again.';

        // 리프레시가 JWT 토큰은 맞는지?
        ExceptionUtil.check(isJWT(tokens['refreshToken']), message);

        const payload = await this.authService.verifyRefreshToken(tokens['refreshToken']);

        // 넘어온 리프레시에 들어있는 액세스와 현재 액세스가 일치하는지?
        ExceptionUtil.check(CheckerUtil.isEquals(tokens['accessToken'], payload.accessToken), message);

        const redisToken = await this.redisTokenService.getToken(payload.user_no);

        // 레디스에 해당 user_no의 리프레시가 들어는지?
        ExceptionUtil.check(CheckerUtil.isNotNull(redisToken), message);

        // 넘어온 리프레시가 레디스의 리프레시와 일치하는지?
        ExceptionUtil.check(CheckerUtil.isEquals(tokens['refreshToken'], redisToken), message);

        const newAccessToken = await this.authService.generateAccessToken({
            user_no: payload.user_no,
            id: payload.id
        });
        const newRefreshToken = await this.authService.generateRefreshToken({
            user_no: payload.user_no,
            id: payload.id,
            accessToken: newAccessToken
        });

        this.redisTokenService.setToken(
            payload.user_no,
            newRefreshToken,
            this.configService.get('AUTH_REFRESH_EXPIRATION_TIME')
        );

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
}
