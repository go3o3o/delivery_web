import { PartialType } from '@nestjs/swagger';
import { ShopCategoryDto } from './shop-category.dto';

export class UpdateShopCategoryDto extends PartialType(ShopCategoryDto) {
  readonly id?: number;
}
