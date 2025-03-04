import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { StringToNumber } from 'src/libs/decorators/transform/query.decorator';

export class UserAddressDto {
  @ApiProperty({ description: '유저 ID' })
  @IsNumber()
  @StringToNumber()
  readonly userId: number;

  @ApiProperty({ description: '주소' })
  @IsString()
  readonly address: string;

  @ApiProperty({ description: '주소 설명', example: '우리집', required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}

export class UserAddressResponse extends UserAddressDto {
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
