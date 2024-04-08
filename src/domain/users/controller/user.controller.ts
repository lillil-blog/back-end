import { Body, Controller, Get, Patch, Post, Req, Res } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDTO } from '../dto/create.user.dto';
import { UserEntity } from '../repository/user.entity';
import { UpdateUserDTO } from '../dto/update.user.dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { LoginUserDTO } from '../dto/login.user.dto';
import { Request, Response } from 'express';

@Controller('/users')
@ApiTags('User API')
@ApiBadRequestResponse({ description: '올바르지 않은 파라미터(Query, Body, Param) 값이 존재합니다.' })
@ApiUnauthorizedResponse({ description: '권한이 없거나 만료되었습니다. 로그인을 통해 토큰을 발급받아야 합니다.' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/login')
    @ApiOperation({
        summary: '로그인',
        description: '수신한 JSON 데이터를 바탕으로 로그인 처리 후 올바른 값이면 토큰을 발급합니다.'
    })
    @ApiBody({ type: LoginUserDTO })
    async userLogin(@Body() loginUserDTO: LoginUserDTO, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.userService.loginUser(loginUserDTO);

        res.cookie('accessToken', tokens.accessToken, { httpOnly: true, sameSite: 'none' });
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, sameSite: 'none' });

        return { message: 'login successful' };
    }

    @Post('/register')
    @ApiOperation({
        summary: '유저 생성',
        description: '수신한 CreateUserDTO 형식의 JSON 데이터를 바탕으로 새 유저를 생성합니다.'
    })
    @ApiBody({ type: CreateUserDTO })
    @ApiResponse({ status: 201, description: '성공적으로 새 유저를 생성하였습니다.' })
    async userRegister(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity> {
        return await this.userService.createUser(createUserDTO);
    }

    @Get('/me')
    @ApiOperation({
        summary: '내정보 상세',
        description: '현재 로그인 한 유저의 상세정보를 리턴합니다.'
    })
    @ApiResponse({ status: 200, description: '성공적으로 해당 유저의 정보를 불러왔습니다.' })
    async userDetail(@Req() req: Request): Promise<UserEntity> {
        return this.userService.detailUser(req.cookies.accessToken);
    }

    @Patch('/me')
    @ApiOperation({
        summary: '내정보 수정',
        description: '수신한 UpdateUserDTO 형식의 JSON 데이터를 바탕으로 해당 유저의 정보를 변경합니다.'
    })
    @ApiBody({ type: UpdateUserDTO })
    @ApiResponse({ status: 201, description: '성공적으로 해당 유저의 정보를 변경했습니다.' })
    async userModify(@Body() updateUserDTO: UpdateUserDTO, @Req() req: Request): Promise<UserEntity> {
        return this.userService.updateUser(updateUserDTO, req.cookies.accessToken);
    }
}
