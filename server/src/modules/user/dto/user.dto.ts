import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserGrade } from '../user.enum';

export class UserDto {
  @ApiProperty({ description: '이메일' })
  @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
  readonly email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,}$/, {
    message:
      '비밀번호는 8자리 이상이며, 최소 하나 이상의 영문자/숫자/특수문자를 입력해야 합니다.',
  })
  readonly password: string;

  @ApiProperty({ description: '전화번호' })
  @IsString()
  readonly phone: string;

  @ApiProperty({ description: '닉네임' })
  @IsString()
  @IsOptional()
  readonly nickname?: string;

  @ApiProperty({ description: '권한', enum: UserGrade })
  @IsString()
  @IsOptional()
  readonly grade: UserGrade;

  @ApiProperty({ description: '네이버 ID', nullable: true })
  @IsString()
  @IsOptional()
  readonly naverId?: string;

  @ApiProperty({ description: '카카오 ID', nullable: true })
  @IsString()
  @IsOptional()
  readonly kakaoId?: string;
}

export class UserResponse extends UserDto {
  @ApiProperty({ description: '유저 ID' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ description: '생성일자' })
  readonly createdDate: Date;

  @ApiProperty({ description: '수정일자', required: false, nullable: true })
  readonly updatedDate?: Date;

  @ApiProperty({ description: '삭제일자', required: false, nullable: true })
  readonly deletedDate?: Date;
}
