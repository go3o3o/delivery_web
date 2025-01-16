import { PickType } from '@nestjs/swagger';
import { MenuGroupDto } from './menu-group.dto';

export class UpdateMenuGroupDto extends PickType(MenuGroupDto, [
  'name',
  'description',
]) {
  readonly id?: number;
}
