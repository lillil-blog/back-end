import { IsOptional, IsString } from 'class-validator';

export class CreateBoardDTO {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    writer: string;

    @IsString()
    category: string;

    @IsOptional()
    @IsString()
    thumbnail: string;
}
