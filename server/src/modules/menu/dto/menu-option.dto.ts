import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { StringToNumber } from 'src/libs/decorators/transform/query.decorator';

export class MenuOptionDto {
  @ApiProperty({ description: '메뉴 ID' })
  @IsNumber()
  @StringToNumber()
  readonly menuId: number;

  @ApiProperty({ description: '메뉴 옵션명', maxLength: 100 })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '메뉴 옵션 설명' })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ description: '메뉴 옵션 가격' })
  @IsNumber()
  @StringToNumber()
  readonly price: number;
}

export class MenuOptionResponse extends MenuOptionDto {
  @ApiProperty({ description: '메뉴 옵션 ID' })
  @IsNumber()
  @StringToNumber()
  readonly id: number;

  // @ApiProperty({ type: () => MenuDto, description: '메뉴' })
  // readonly menu: MenuDto;

  @ApiProperty({ description: '생성일자' })
  readonly createdDate: Date;

  @ApiProperty({ description: '수정일자', required: false, nullable: true })
  readonly updatedDate?: Date;

  @ApiProperty({ description: '삭제일자', required: false, nullable: true })
  readonly deletedDate?: Date;
}
