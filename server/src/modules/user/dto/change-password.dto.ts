import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsString } from 'class-validator';

export class ChangePasswordDto extends PickType(UserDto, ['password']) {
  readonly id?: number;

  @ApiProperty({ description: '새 비밀번호' })
  @IsString()
  readonly newPassword: string;
}
