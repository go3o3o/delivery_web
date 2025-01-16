import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { MenuOptionDto } from './menu-option.dto';
import {
  StringToBoolean,
  StringToNumber,
} from 'src/libs/decorators/transform/query.decorator';

export class MenuDto {
  @ApiProperty({ description: '메뉴 그룹 ID' })
  @IsNumber()
  @StringToNumber()
  readonly menuGroupId: number;

  @ApiProperty({ description: '메뉴명', maxLength: 100 })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '메뉴 이미지' })
  @IsString()
  @IsOptional()
  readonly imageUrl?: string;

  @ApiProperty({ description: '메뉴 설명' })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ description: '메뉴 가격' })
  @IsNumber()
  @StringToNumber()
  readonly price: number;

  @ApiProperty({ description: '추천 여부', default: false })
  @IsBoolean()
  @StringToBoolean()
  readonly isRecommend: boolean;
}

export class MenuResponse extends MenuDto {
  @ApiProperty({ description: '메뉴 ID' })
  @IsNumber()
  @StringToNumber()
  readonly id: number;

  // @ApiProperty({ type: MenuGroupDto, description: '메뉴 그룹' })
  // readonly menuGroup: MenuGroupDto;

  @ApiProperty({
    type: MenuOptionDto,
    isArray: true,
    required: false,
  })
  @IsOptional()
  readonly menuOptions?: MenuOptionDto[];

  @ApiProperty({ description: '생성일자' })
  readonly createdDate: Date;

  @ApiProperty({ description: '수정일자', required: false, nullable: true })
  readonly updatedDate?: Date;

  @ApiProperty({ description: '삭제일자', required: false, nullable: true })
  readonly deletedDate?: Date;
}
