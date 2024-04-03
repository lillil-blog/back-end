import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    nickname?: string;

    @IsOptional()
    @IsString()
    thumbnail?: string;

    @IsOptional()
    @IsString()
    introduce?: string;
}
