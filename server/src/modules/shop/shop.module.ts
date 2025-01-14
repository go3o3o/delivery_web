import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopCategoryEntity } from './entities/shop-category.entity';
import { ShopEntity } from './entities/shop.entity';
import { ShopCategoryController } from './controllers/shop-category.controller';
import { ShopCategoryService } from './services/shop-category.service';
import { ShopController } from './controllers/shop.controller';
import { ShopService } from './services/shop.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopCategoryEntity, ShopEntity])],
  controllers: [ShopCategoryController, ShopController],
  providers: [ShopCategoryService, ShopService],
})
export class ShopModule {}
