import { PartialType } from '@nestjs/swagger';
import { MenuOptionDto } from './menu-option.dto';

export class UpdateMenuOptionDto extends PartialType(MenuOptionDto) {
  readonly id?: number;
}
