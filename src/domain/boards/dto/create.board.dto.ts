import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBoardDTO {
    @ApiProperty({ description: '글 제목', example: '테스트 글 제목입니다.' })
    @IsString()
    title: string;

    @ApiProperty({ description: '글 내용', example: '테스트 글 내용입니다.' })
    @IsString()
    content: string;

    @ApiProperty({ description: '작성자', example: 'test' })
    @IsString()
    writer: string;

    @ApiProperty({ description: '카테고리', example: 'tech' })
    @IsString()
    category: string;

    @ApiProperty({ description: '썸네일 파일명', example: '/default_thumbnail.png' })
    @IsOptional()
    @IsString()
    thumbnail: string;
}
