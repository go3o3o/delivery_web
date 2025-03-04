import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserAddressEntity } from './entities/user-address.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserAddressController } from './controllers/user-address.controller';
import { UserAddressService } from './services/user-address.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserAddressEntity])],
  controllers: [UserAddressController, UserController],
  providers: [UserService, UserAddressService],
  exports: [UserService],
})
export class UserModule {}
