import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;
}
