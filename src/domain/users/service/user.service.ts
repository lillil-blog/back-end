import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDTO } from '../dto/create.user.dto';
import { UserEntity } from '../repository/user.entity';
import { UpdateUserDTO } from '../dto/update.user.dto';
import { LoginUserDTO } from '../dto/login.user.dto';
import { CommonUtil } from 'src/utils/common.util';
import { AuthService } from 'src/middleware/auth/service/auth.service';
import { isJWT } from 'class-validator';
import { CheckerUtil } from 'src/utils/checker.util';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService
    ) {}

    async loginUser(loginUserDTO: LoginUserDTO) {
        const user = await this.userRepository.readById(loginUserDTO.id);
        const passwordCompare = await CommonUtil.compareHash(loginUserDTO.password, user.password);

        if (!user || !passwordCompare) {
            throw new NotFoundException('User not found!');
        }

        const accessToken = await this.authService.generateAccessToken({ user_no: user.user_no, id: user.id });
        const refreshToken = await this.authService.generateRefreshToken({
            user_no: user.user_no,
            id: user.id,
            accessToken: accessToken
        });

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const userEntity = await this.userRepository.readById(createUserDTO.id);

        if (userEntity) {
            throw new UnauthorizedException(`${createUserDTO.id} is already exist!`);
        }

        createUserDTO.password = await CommonUtil.generateHash(createUserDTO.password);

        return this.userRepository.save(createUserDTO);
    }

    /**
     * id값을 매개변수로 받아 일치하는 유저의 정보를 리턴시키도록 한다.
     */
    async detailUser(accessToken: string): Promise<UserEntity> {
        CheckerUtil.assertCheck(isJWT(accessToken), '올바른 토큰의 형식이 아닙니다.');

        const accessTokenPayload = await this.authService.verifyAccessToken(accessToken);

        return this.userRepository.readByUserNo(accessTokenPayload.user_no);
    }

    async updateUser(updateUserDTO: UpdateUserDTO, accessToken: string): Promise<UserEntity> {
        CheckerUtil.assertCheck(isJWT(accessToken), '올바른 토큰의 형식이 아닙니다.');

        const accessTokenPayload = await this.authService.verifyAccessToken(accessToken);

        updateUserDTO.user_no = accessTokenPayload.user_no;
        updateUserDTO.password = updateUserDTO.password
            ? await CommonUtil.generateHash(updateUserDTO.password)
            : undefined;

        return this.userRepository.save(updateUserDTO);
    }
}
