import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PaginationQuery } from 'src/libs/dto/pagination.query';

export class SearchAddressQuery extends PaginationQuery {
  @ApiProperty({ description: '검색어', required: true })
  @IsString()
  readonly keyword?: string;
}
