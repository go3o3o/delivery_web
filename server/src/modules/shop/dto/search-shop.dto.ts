import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { StringToNumber } from 'src/libs/decorators/transform/query.decorator';
import { PaginationQuery } from 'src/libs/dto/pagination.query';

export class SearchShopQuery extends PaginationQuery {
  @ApiProperty({ description: '검색어', required: false })
  @IsString()
  @IsOptional()
  readonly query?: string;

  @ApiProperty({ description: '카테고리 ID', required: false })
  @IsNumber()
  @IsOptional()
  @StringToNumber()
  readonly shopCategoryId?: number;
}
