import { OmitType, PartialType } from '@nestjs/swagger';
import { MenuGroupDto } from './menu-group.dto';

export class UpdateMenuGroupDto extends PartialType(
  OmitType(MenuGroupDto, ['shopId']),
) {
  readonly id?: number;
}
