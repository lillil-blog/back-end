import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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

    @ApiPropertyOptional({ description: '썸네일 파일명', example: '/default_thumbnail.png' })
    @IsOptional()
    @IsString()
    thumbnail: string;

    @ApiPropertyOptional({ description: '등록할 태그들의 PK 번호', example: [2, 3] })
    @IsOptional()
    @IsNumber()
    tags: number[];
}
