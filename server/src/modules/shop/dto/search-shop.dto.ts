import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { StringToNumber } from 'src/libs/decorators/transform/query.decorator';
import { PaginationQuery } from 'src/libs/dto/pagination.query';

export class SearchShopQuery extends PaginationQuery {
  @ApiProperty({ description: '검색어', required: false })
  @IsString()
  @IsOptional()
  readonly keyword?: string;

  @ApiProperty({ description: '카테고리 ID', required: false })
  @IsNumber()
  @IsOptional()
  @StringToNumber()
  readonly shopCategoryId?: number;

  @ApiProperty({ description: '위도', required: false })
  @IsNumber()
  @IsOptional()
  @StringToNumber()
  readonly lat?: number;

  @ApiProperty({ description: '경도', required: false })
  @IsNumber()
  @IsOptional()
  @StringToNumber()
  readonly lng?: number;

  @ApiProperty({ description: '배달거리(km)', default: 2, required: false })
  @IsNumber()
  @IsOptional()
  @StringToNumber()
  readonly deliveryKm?: number;
}
