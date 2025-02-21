import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import {
  findPagination,
  responsePagination,
} from 'src/libs/helpers/pagination.helper';
import { IListResponse } from 'src/libs/interfaces/response.interface';
import { MenuService } from 'src/modules/menu/services/menu.service';
import { AddressService } from 'src/modules/address/address.service';

import { ShopEntity } from '../entities/shop.entity';
import { ShopCategoryEntity } from '../entities/shop-category.entity';
import { ShopResponse } from '../dto/shop.dto';
import { CreateShopDto } from '../dto/create-shop.dto';
import { UpdateShopDto } from '../dto/update-shop.dto';
import { ListShopQuery } from '../dto/list-shop.dto';
import { SearchShopQuery } from '../dto/search-shop.dto';

export interface IShopService {
  get(id: number): Promise<ShopResponse>;
  create(dto: CreateShopDto): Promise<ShopResponse>;
  update(dto: UpdateShopDto): Promise<ShopResponse>;
  delete(id: number): Promise<void>;
  list(query: ListShopQuery): Promise<IListResponse<ShopResponse>>;
  search(query: SearchShopQuery): Promise<IListResponse<ShopResponse>>;
}

@Injectable()
export class ShopService implements IShopService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(ShopCategoryEntity)
    private readonly shopCategoryRepository: Repository<ShopCategoryEntity>,

    private readonly menuService: MenuService,
    private readonly addressService: AddressService,
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

    const location = await this.addressService.getCoordinate(dto.address);
    const shop = await this.shopRepository.save({
      ...dto,
      lat: location.lat,
      lng: location.lng,
    });
    return shop;
  }

  async update(dto: UpdateShopDto): Promise<ShopResponse> {
    const shopCategory = await this.shopCategoryRepository.findOneBy({
      id: dto.shopCategoryId,
    });
    if (!shopCategory) {
      throw new NotFoundException(
        `카테고리가 존재하지 않습니다. (id: ${dto.shopCategoryId})`,
      );
    }

    if (dto.address) {
      const location = await this.addressService.getCoordinate(dto.address);
      dto.lat = location.lat;
      dto.lng = location.lng;
    }
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
      findOptions['businessName'] = Like(`%${data.businessName}%`);
    }
    if (data.phone) {
      findOptions['phone'] = Like(`%${data.phone}%`);
    }
    if (data.address) {
      findOptions['address'] = Like(`%${data.address}%`);
    }
    const [shops, total] = await this.shopRepository.findAndCount({
      where: findOptions,
      ...findPagination({ page, size, sortBy }),
    });
    const pagination = responsePagination(total, shops.length, query);

    return { list: shops, pagination };
  }

  async search(query: SearchShopQuery): Promise<IListResponse<ShopResponse>> {
    const { size, page, sortBy, ...data } = query;

    const paginationQuery = findPagination({ page, size, sortBy });
    const queryBuilder = this.shopRepository
      .createQueryBuilder('shop')
      .skip(paginationQuery.skip)
      .take(paginationQuery.take);

    // 카테고리 ID가 있는 경우
    if (data.shopCategoryId) {
      queryBuilder.andWhere('shop.shopCategoryId = :shopCategoryId', {
        shopCategoryId: data.shopCategoryId,
      });
    }

    // keyword가 있는 경우
    if (data.keyword) {
      // 1. 메뉴명 검색
      const shopIds = await this.menuService.getShopListByName(data.keyword);
      if (shopIds.length) {
        queryBuilder.andWhere('shop.id IN (:...shopIds', { shopIds });
      }

      // 2. 가게명 검색
      queryBuilder.andWhere('shop.name LIKE :keyword', {
        keyword: data.keyword,
      });
    }

    // 위도/경도가 있는 경우 Haversine 공식 적용하여 거리 필터링
    if (data.lat && data.lng) {
      const haversineFormula = `
        (
          6371 * ACOS(
            COS(RADIANS(:latitude)) * COS(RADIANS(shop.lat)) *
            COS(RADIANS(shop.lng) - RADIANS(:longitude)) +
            SIN(RADIANS(:latitude)) * SIN(RADIANS(shop.lat))
          )
        )
      `;
      queryBuilder.andWhere(`${haversineFormula} <= :radius`, {
        latitude: data.lat,
        longitude: data.lng,
        radius: data.deliveryKm || 2,
      });
    }

    // 정렬 조건 추가
    Object.entries(paginationQuery.order).forEach(([column, ordering]) => {
      queryBuilder.addOrderBy(`shop.${column}`, ordering as 'ASC' | 'DESC');
    });

    const [shops, total] = await queryBuilder.getManyAndCount();
    const pagination = responsePagination(total, shops.length, query);

    return { list: shops, pagination };
  }
}
