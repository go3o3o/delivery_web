import { PartialType } from '@nestjs/swagger';
import { ShopDto } from './shop.dto';

export class UpdateShopDto extends PartialType(ShopDto) {
  readonly id?: number;
}
