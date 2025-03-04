import { IntersectionType, PickType, PartialType } from '@nestjs/swagger';
import { PaginationQuery } from 'src/libs/dto/pagination.query';
import { UserAddressDto } from './user-address.dto';

export class ListUserAddressQuery extends IntersectionType(
  PaginationQuery,
  PartialType(PickType(UserAddressDto, ['userId', 'address'])),
) {}
