import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDTO } from '../dto/create.user.dto';
import { UserEntity } from '../repository/user.entity';
import { UpdateUserDTO } from '../dto/update.user.dto';
import { LoginUserDTO } from '../dto/login.user.dto';
import { CommonUtil } from 'src/utils/common.util';
import { AuthService } from 'src/middleware/auth/service/auth.service';

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

        const tokens = {
            accessToken: await this.authService.generateAccessToken({ id: user.id }),
            refreshToken: await this.authService.generateRefreshToken({ user_no: user.user_no })
        };

        return tokens;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const userEntity = await this.userRepository.readById(createUserDTO.id);

        if (userEntity) {
            throw new UnauthorizedException(`${createUserDTO.id} is already exist!`);
        }

        createUserDTO.password = await CommonUtil.generateHash(createUserDTO.password);

        return this.userRepository.save(createUserDTO);
    }

    async updateUser(updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
        updateUserDTO.password = updateUserDTO.password
            ? await CommonUtil.generateHash(updateUserDTO.password)
            : undefined;

        return this.userRepository.save(updateUserDTO);
    }

    /**
     * id값을 매개변수로 받아 일치하는 유저의 정보를 리턴시키도록 한다.
     */
    async detailUser(id: string): Promise<UserEntity> {
        return this.userRepository.readById(id);
    }
}
