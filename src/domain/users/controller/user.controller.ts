import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDTO } from '../dto/create.user.dto';
import { UserEntity } from '../repository/user.entity';
import { UpdateUserDTO } from '../dto/update.user.dto';

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/login')
    async userLogin() {
        /**
         * @TODO
         * JWT 토큰 구현해서 작성해야함
         */
    }

    @Post('/register')
    async userRegister(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity> {
        return await this.userService.saveUser(createUserDTO);
    }

    @Get('/me')
    async userDetail(@Body('id') id: string): Promise<UserEntity> {
        return this.userService.detailUser(id);
    }

    @Patch('/me')
    async userModify(@Body() updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
        return this.userService.saveUser(updateUserDTO);
    }
}
