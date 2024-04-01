import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDTO } from '../dto/create.user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(createUserDTO: CreateUserDTO) {
        return await this.userRepository.create(createUserDTO);
    }
}
