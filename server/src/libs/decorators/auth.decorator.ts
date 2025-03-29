import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY, META_USER_TYPE } from '../constants/auth.constant';
import { UserType } from '../enums/auth.enum';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const UserTypes = (types: UserType[]) =>
  SetMetadata(META_USER_TYPE, types);
