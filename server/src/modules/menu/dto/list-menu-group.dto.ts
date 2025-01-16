import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationQuery } from 'src/libs/dto/pagination.query';
import { MenuGroupDto } from './menu-group.dto';

export class ListMenuGroupQuery extends IntersectionType(
  PaginationQuery,
  PartialType(PickType(MenuGroupDto, ['shopId', 'name'])),
) {}
