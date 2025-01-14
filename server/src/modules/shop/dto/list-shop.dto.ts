import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationQuery } from 'src/libs/dto/pagination.query';
import { ShopDto } from './shop.dto';

export class ListShopQuery extends IntersectionType(
  PaginationQuery,
  PartialType(ShopDto),
) {}
