import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagDTO {
    @ApiProperty({ description: '생성할 태그명', example: 'TestTag' })
    @IsString()
    name: string;
}
