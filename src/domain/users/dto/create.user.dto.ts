import { IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    id: string;

    @IsString()
    password: string;

    @IsString()
    nickname: string;

    @IsOptional()
    @IsString()
    thumbnail: string;

    @IsOptional()
    @IsString()
    introduce: string;
}
