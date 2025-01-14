import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { ShopEntity } from '../entities/shop.entity';
import { ShopResponse } from '../dto/shop.dto';
import { CreateShopDto } from '../dto/create-shop.dto';
import { UpdateShopDto } from '../dto/update-shop.dto';
import { IListResponse } from 'src/libs/interfaces/response.interface';
import { ListShopQuery } from '../dto/list-shop.dto';
import {
  findPagination,
  responsePagination,
} from 'src/libs/helpers/pagination.helper';
import { ShopCategoryEntity } from '../entities/shop-category.entity';

export interface IShopService {
  get(id: number): Promise<ShopResponse>;
  create(dto: CreateShopDto): Promise<ShopResponse>;
  update(dto: UpdateShopDto): Promise<ShopResponse>;
  delete(id: number): Promise<void>;
  list(query: ListShopQuery): Promise<IListResponse<ShopResponse>>;
}

@Injectable()
export class ShopService implements IShopService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(ShopCategoryEntity)
    private readonly shopCategoryRepository: Repository<ShopCategoryEntity>,
  ) {}

  async get(id: number): Promise<ShopResponse> {
    const shop = await this.shopRepository.findOneBy({ id });

    if (!shop) {
      throw new NotFoundException(`가게가 존재하지 않습니다. (id: ${id})`);
    }
    return shop;
  }

  async create(dto: CreateShopDto): Promise<ShopResponse> {
    const shopCategory = await this.shopCategoryRepository.findOneBy({
      id: dto.shopCategoryId,
    });
    if (!shopCategory) {
      throw new NotFoundException(
        `카테고리가 존재하지 않습니다. (id: ${dto.shopCategoryId})`,
      );
    }
    const shop = await this.shopRepository.save(dto);
    return shop;
  }

  async update(dto: UpdateShopDto): Promise<ShopResponse> {
    await this.shopRepository.update({ id: dto.id }, dto);
    return await this.shopRepository.findOneBy({ id: dto.id });
  }

  async delete(id: number): Promise<void> {
    await this.shopRepository.softDelete(id);
  }

  async list(query: ListShopQuery): Promise<IListResponse<ShopResponse>> {
    const { size, page, sortBy, ...data } = query;

    const findOptions = {};
    if (data.name) {
      findOptions['name'] = Like(`%${data.name}%`);
    }
    if (data.businessName) {
      findOptions['name'] = Like(`%${data.businessName}%`);
    }
    if (data.phone) {
      findOptions['name'] = Like(`%${data.phone}%`);
    }
    if (data.address) {
      findOptions['name'] = Like(`%${data.address}%`);
    }
    const [shops, total] = await this.shopRepository.findAndCount({
      where: findOptions,
      ...findPagination({ page, size, sortBy }),
    });
    const pagination = responsePagination(total, shops.length, query);

    return { list: shops, pagination };
  }
}
