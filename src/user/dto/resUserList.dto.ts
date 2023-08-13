import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { UserEntity } from '../entity/user.entity';

export class ResUserListDTO {
    @ApiProperty({ example: ['user1', 'user2'] })
    @ValidateNested()
    @IsArray()
    users: Array<UserEntity>;
}