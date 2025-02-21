import { Module } from '@nestjs/common';

import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
