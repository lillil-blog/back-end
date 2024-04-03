import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBoardDTO {
    @IsNumber()
    board_no: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsString()
    writer?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    thumbnail?: string;
}
