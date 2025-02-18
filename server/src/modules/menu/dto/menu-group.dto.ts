import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { MenuDto } from './menu.dto';
import { ShopDto } from 'src/modules/shop/dto/shop.dto';
import { StringToNumber } from 'src/libs/decorators/transform/query.decorator';

export class MenuGroupDto {
  @ApiProperty({ description: '가게 ID' })
  @IsNumber()
  @StringToNumber()
  readonly shopId: number;

  @ApiProperty({ description: '메뉴 그룹명', maxLength: 100 })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '메뉴 그룹 설명' })
  @IsString()
  @IsOptional()
  readonly description: string;
}

export class MenuGroupResponse extends MenuGroupDto {
  @ApiProperty({ description: '메뉴 그룹 ID' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ type: ShopDto, description: '가게' })
  readonly shop: ShopDto;

  @ApiProperty({
    type: MenuDto,
    isArray: true,
    required: false,
  })
  @IsOptional()
  readonly menus?: MenuDto[];

  @ApiProperty({ description: '생성일자' })
  readonly createdDate: Date;

  @ApiProperty({ description: '수정일자', required: false, nullable: true })
  readonly updatedDate?: Date;

  @ApiProperty({ description: '삭제일자', required: false, nullable: true })
  readonly deletedDate?: Date;
}
