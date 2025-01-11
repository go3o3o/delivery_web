import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopCategoryEntity } from './entities/shop-category.entity';
import { ShopEntity } from './entities/shop.entity';
import { ShopCategoryController } from './controllers/shop-category.controller';
import { ShopCategoryService } from './services/shop-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopCategoryEntity, ShopEntity])],
  controllers: [ShopCategoryController],
  providers: [ShopCategoryService],
})
export class ShopModule {}
