import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
    @ApiProperty({ description: '아이디', example: 'test' })
    @IsString()
    id: string;

    @ApiProperty({ description: '비밀번호', example: 'testPassword' })
    @IsString()
    password: string;

    @ApiProperty({ description: '닉네임', example: 'testNickname' })
    @IsString()
    nickname: string;

    @ApiProperty({ description: '썸네일 파일명', example: 'default_thumbnail.png' })
    @IsOptional()
    @IsString()
    thumbnail: string;

    @ApiProperty({ description: '소개글', example: 'Hi!' })
    @IsOptional()
    @IsString()
    introduce: string;
}
