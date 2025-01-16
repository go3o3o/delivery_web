import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationQuery } from 'src/libs/dto/pagination.query';
import { MenuOptionDto } from './menu-option.dto';

export class ListMenuOptionQuery extends IntersectionType(
  PaginationQuery,
  PartialType(PickType(MenuOptionDto, ['menuId', 'name'])),
) {}
