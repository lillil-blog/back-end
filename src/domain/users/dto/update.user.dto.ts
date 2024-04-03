import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
    @ApiProperty({ description: '변경할 유저의 ID', example: 'test' })
    @IsString()
    id: string;

    @ApiPropertyOptional({ description: '변경할 패스워드', example: 'modifiedPassword' })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiPropertyOptional({ description: '변경할 닉네임', example: 'modifiedNickname' })
    @IsOptional()
    @IsString()
    nickname?: string;

    @ApiPropertyOptional({ description: '변경할 썸네일 파일명', example: 'modified_thumbnail.png' })
    @IsOptional()
    @IsString()
    thumbnail?: string;

    @ApiPropertyOptional({ description: '변경할 소개글', example: 'modifiedIntroduce' })
    @IsOptional()
    @IsString()
    introduce?: string;
}
