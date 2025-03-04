import { PartialType } from '@nestjs/swagger';
import { UserAddressDto } from './user-address.dto';

export class UpdateUserAddressDto extends PartialType(UserAddressDto) {
  readonly id?: number;
}
