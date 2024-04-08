import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create.user.dto';
import { UpdateUserDTO } from '../dto/update.user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    /**
     * 새 유저 생성과 기존 유저정보 업데이트를 수행하도록 한다.
     * 받아오는 DTO 형식에 따라 처리되며 업데이트 시 포함되지 않은 필드값은
     * 생략되어 업데이트가 수행된다.
     */
    async save(userDTO: CreateUserDTO | UpdateUserDTO): Promise<UserEntity> {
        const userEntity = this.userRepository.create(userDTO);

        return this.userRepository.save(userEntity);
    }

    /**
     * id값을 매개변수로 받아 일치하는 유저정보를 찾아 리턴시키도록 한다.
     */
    async readById(id: string): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: { id: id }
        });
    }

    /**
     * user_no 값을 매개변수로 받아 일치하는 유저정보를 찾아 리턴시키도록 한다.
     */
    async readByUserNo(user_no: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: { user_no: user_no }
        });
    }
}
