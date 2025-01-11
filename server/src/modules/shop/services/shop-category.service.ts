import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ShopCategoryEntity } from '../entities/shop-category.entity';
import { ShopCategoryResponse } from '../dto/shop-category.dto';
import { CreateShopCategoryDto } from '../dto/create-shop-category.dto';
import { UpdateShopCategoryDto } from '../dto/update-shop-category.dto';

export interface IShopCategoryService {
  get(id: number): Promise<ShopCategoryResponse>;
  create(dto: CreateShopCategoryDto): Promise<ShopCategoryResponse>;
  update(dto: UpdateShopCategoryDto): Promise<ShopCategoryResponse>;
  delete(id: number): Promise<void>;
  //   list(): Promise<ShopCategoryResponse[]>;
}

@Injectable()
export class ShopCategoryService implements IShopCategoryService {
  constructor(
    @InjectRepository(ShopCategoryEntity)
    private readonly shopCategoryRepository: Repository<ShopCategoryEntity>,
  ) {}

  async get(id: number): Promise<ShopCategoryResponse> {
    const shopCategory = await this.shopCategoryRepository.findOneBy({ id });

    if (!shopCategory) {
      throw new NotFoundException(`카테고리가 존재하지 않습니다. (id: ${id})`);
    }
    return shopCategory;
  }

  async create(dto: CreateShopCategoryDto): Promise<ShopCategoryResponse> {
    const shopCategory = await this.shopCategoryRepository.save(dto);
    return shopCategory;
  }

  async update(dto: UpdateShopCategoryDto): Promise<ShopCategoryResponse> {
    await this.shopCategoryRepository.update({ id: dto.id }, dto);
    return await this.shopCategoryRepository.findOneBy({ id: dto.id });
  }

  async delete(id: number): Promise<void> {
    await this.shopCategoryRepository.softDelete(id);
  }
}
