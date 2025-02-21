import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ShopCategoryDto } from './shop-category.dto';
import { StringToNumber } from 'src/libs/decorators/transform/query.decorator';

export class ShopDto {
  @ApiProperty({ description: '카테고리 ID' })
  @IsNumber()
  readonly shopCategoryId: number;

  @ApiProperty({ description: '가게명', maxLength: 100 })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '상호명', maxLength: 100 })
  @IsString()
  readonly businessName: string;

  @ApiProperty({ description: '가게 전화번호', maxLength: 13 })
  @IsString()
  readonly phone: string;

  @ApiProperty({ description: '가게 주소', maxLength: 255 })
  @IsString()
  readonly address: string;

  @ApiProperty({ description: '가게 로고 이미지' })
  @IsString()
  @IsOptional()
  readonly imageUrl?: string;

  @ApiProperty({ description: '가게 설명' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ description: '최소주문금액', default: 0 })
  @StringToNumber()
  readonly minOrderPrice: number;

  @ApiProperty({ description: '배달비', default: 0 })
  @StringToNumber()
  readonly deliveryFee: number;

  @ApiProperty({ description: '배달예상시간', default: 0 })
  @StringToNumber()
  readonly deliveryTime: number;

  lat?: number;
  lng?: number;
}

export class ShopResponse extends ShopDto {
  @ApiProperty({ description: '가게 ID' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ description: '평점', default: 0 })
  @IsNumber()
  readonly rating?: number;

  @ApiProperty({ description: '주문 수', default: 0 })
  @IsNumber()
  readonly orderCount?: number;

  @ApiProperty({ description: '찜 수', default: 0 })
  @IsNumber()
  readonly dibsCount?: number;

  @ApiProperty({ description: '리뷰 수', default: 0 })
  @IsNumber()
  readonly reviewCount?: number;

  @ApiProperty({ type: ShopCategoryDto, description: '카테고리' })
  readonly shopCategory: ShopCategoryDto;

  @ApiProperty({ description: '생성일자' })
  readonly createdDate: Date;

  @ApiProperty({ description: '수정일자', required: false, nullable: true })
  readonly updatedDate?: Date;

  @ApiProperty({ description: '삭제일자', required: false, nullable: true })
  readonly deletedDate?: Date;
}
