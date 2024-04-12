import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBoardDTO {
    @ApiProperty({ description: '대상 포스트 번호', example: 13 })
    @IsNumber()
    board_no: number;

    @ApiPropertyOptional({ description: '변경할 제목', example: 'modified Title' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: '변경할 본문', example: 'modified Content' })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiPropertyOptional({ description: '변경할 작성자', example: 'test2' })
    @IsOptional()
    @IsString()
    writer?: string;

    @ApiPropertyOptional({ description: '변경할 카테고리', example: 'daily' })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiPropertyOptional({ description: '변경할 썸네일 파일명', example: 'modified_thumbnail.png' })
    @IsOptional()
    @IsString()
    thumbnail?: string;

    @ApiPropertyOptional({ description: '등록할 태그들의 PK 번호', example: [1, 2] })
    @IsOptional()
    @IsNumber()
    tags?: number[];
}
