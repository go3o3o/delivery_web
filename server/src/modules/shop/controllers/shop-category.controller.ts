import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ShopCategoryResponse } from '../dto/shop-category.dto';
import { ShopCategoryService } from '../services/shop-category.service';
import { CreateShopCategoryDto } from '../dto/create-shop-category.dto';
import { UpdateShopCategoryDto } from '../dto/update-shop-category.dto';

@ApiTags('가게 카테고리 API')
@Controller('shop/category')
export class ShopCategoryController {
  constructor(private readonly shopCategoryService: ShopCategoryService) {}

  @ApiOperation({ summary: '카테고리 조회 API' })
  @ApiOkResponse({ type: ShopCategoryResponse })
  @Get('/:id')
  async get(@Param('id') id: number) {
    return this.shopCategoryService.get(id);
  }

  @ApiOperation({ summary: '카테고리 생성 API' })
  @ApiCreatedResponse({ type: ShopCategoryResponse })
  @Post()
  async create(@Body() dto: CreateShopCategoryDto) {
    return this.shopCategoryService.create(dto);
  }

  @ApiOperation({ summary: '카테고리 수정 API' })
  @ApiOkResponse({ type: ShopCategoryResponse })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateShopCategoryDto) {
    return this.shopCategoryService.update({ ...dto, id });
  }

  @ApiOperation({ summary: '카테고리 삭제 API' })
  @ApiNoContentResponse()
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.shopCategoryService.delete(id);
  }
}
