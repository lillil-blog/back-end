import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDTO } from '../dto/create.user.dto';
import { UserEntity } from '../repository/user.entity';
import { UpdateUserDTO } from '../dto/update.user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async loginUser() {}

    /**
     * 새 유저 생성과 기존 유저정보 업데이트를 수행하도록 한다.
     * 받아오는 DTO 형식에 따라 처리되며 업데이트 시 포함되지 않은 필드값은
     * 생략되어 업데이트가 수행된다.
     */
    async saveUser(userDTO: CreateUserDTO | UpdateUserDTO): Promise<UserEntity> {
        return this.userRepository.save(userDTO);
    }

    /**
     * id값을 매개변수로 받아 일치하는 유저의 정보를 리턴시키도록 한다.
     */
    async detailUser(id: string): Promise<UserEntity> {
        return this.userRepository.readById(id);
    }
}
