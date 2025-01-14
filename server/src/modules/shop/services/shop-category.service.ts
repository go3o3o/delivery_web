import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ShopCategoryEntity } from '../entities/shop-category.entity';
import { ShopCategoryResponse } from '../dto/shop-category.dto';
import { CreateShopCategoryDto } from '../dto/create-shop-category.dto';
import { UpdateShopCategoryDto } from '../dto/update-shop-category.dto';
import { ListShopCategoryQuery } from '../dto/list-shop-category.dto';
import { IListResponse } from 'src/libs/interfaces/response.interface';
import {
  findPagination,
  responsePagination,
} from 'src/libs/helpers/pagination.helper';

export interface IShopCategoryService {
  get(id: number): Promise<ShopCategoryResponse>;
  create(dto: CreateShopCategoryDto): Promise<ShopCategoryResponse>;
  update(dto: UpdateShopCategoryDto): Promise<ShopCategoryResponse>;
  delete(id: number): Promise<void>;
  list(
    query: ListShopCategoryQuery,
  ): Promise<IListResponse<ShopCategoryResponse>>;
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

  async list(
    query: ListShopCategoryQuery,
  ): Promise<IListResponse<ShopCategoryResponse>> {
    const { size, page, sortBy, ...data } = query;

    const findOptions = {};
    if (data.name) {
      findOptions['name'] = Like(`%${data.name}%`);
    }
    const [shopCategories, total] =
      await this.shopCategoryRepository.findAndCount({
        where: findOptions,
        relations: { shops: true },
        ...findPagination({ page, size, sortBy }),
      });

    const pagination = responsePagination(total, shopCategories.length, query);

    return { list: shopCategories, pagination };
  }
}
