import { IsString } from 'class-validator';

export class LoginUserDTO {
    @IsString()
    id: string;

    @IsString()
    password: string;
}
