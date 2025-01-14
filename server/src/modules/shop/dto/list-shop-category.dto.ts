import { PartialType, IntersectionType } from '@nestjs/swagger';
import { ShopCategoryDto } from './shop-category.dto';
import { PaginationQuery } from 'src/libs/dto/pagination.query';

export class ListShopCategoryQuery extends IntersectionType(
  PaginationQuery,
  PartialType(ShopCategoryDto),
) {}
