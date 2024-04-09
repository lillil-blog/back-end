import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDTO {
    @ApiProperty({ description: '아이디', example: 'test' })
    @IsString()
    id: string;

    @ApiProperty({ description: '비밀번호', example: 'password123' })
    @IsString()
    password: string;
}
