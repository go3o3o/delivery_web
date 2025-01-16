import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationQuery } from 'src/libs/dto/pagination.query';
import { MenuDto } from './menu.dto';

export class ListMenuQuery extends IntersectionType(
  PaginationQuery,
  PartialType(PickType(MenuDto, ['menuGroupId', 'name', 'isRecommend'])),
) {}
