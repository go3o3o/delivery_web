import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { IListResponse } from 'src/libs/interfaces/response.interface';
import {
  findPagination,
  responsePagination,
} from 'src/libs/helpers/pagination.helper';

import { MenuEntity } from '../entities/menu.entity';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { ListMenuQuery } from '../dto/list-menu.dto';
import { MenuResponse } from '../dto/menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { MenuGroupEntity } from '../entities/menu-group.entity';

export interface IMenuService {
  create(dto: CreateMenuDto): Promise<MenuResponse>;
  update(dto: UpdateMenuDto): Promise<MenuResponse>;
  delete(id: number): Promise<void>;
  list(query: ListMenuQuery): Promise<IListResponse<MenuResponse>>;
}

@Injectable()
export class MenuService implements IMenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,

    @InjectRepository(MenuGroupEntity)
    private readonly menuGroupRepository: Repository<MenuGroupEntity>,
  ) {}

  async create(dto: CreateMenuDto): Promise<MenuResponse> {
    const menuGroup = await this.menuGroupRepository.findOneBy({
      id: dto.menuGroupId,
    });
    if (!menuGroup) {
      throw new NotFoundException(
        `메뉴 그룹이 존재하지 않습니다. (id: ${dto.menuGroupId})`,
      );
    }
    const menu = await this.menuRepository.save(dto);
    return menu;
  }

  async update(dto: UpdateMenuDto): Promise<MenuResponse> {
    const { id, ...data } = dto;
    const menuGroup = await this.menuGroupRepository.findOneBy({
      id: data.menuGroupId,
    });
    if (!menuGroup) {
      throw new NotFoundException(
        `메뉴 그룹이 존재하지 않습니다. (id: ${data.menuGroupId})`,
      );
    }

    await this.menuRepository.update({ id }, data);
    return await this.menuRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.menuRepository.softDelete(id);
  }

  async list(query: ListMenuQuery): Promise<IListResponse<MenuResponse>> {
    const { size, page, sortBy, ...data } = query;

    const findOptions = {};
    if (data.menuGroupId) {
      findOptions['menuGroupId'] = data.menuGroupId;
    }
    if (data.name) {
      findOptions['name'] = Like(`%${data.name}%`);
    }
    if (Object.keys(data).includes('isRecommend')) {
      findOptions['isRecommend'] = data.isRecommend;
    }

    const [menus, total] = await this.menuRepository.findAndCount({
      where: findOptions,
      relations: { menuOptions: true },
      ...findPagination({ page, size, sortBy }),
    });
    const pagination = responsePagination(total, menus.length, query);

    return { list: menus, pagination };
  }

  async getShopListByName(query: string) {
    const data = await this.menuGroupRepository.find({
      select: { shopId: true },
      where: {
        menus: { name: Like(`%${query}%`) },
      },
    });

    return data.map((el) => el.shopId);
  }
}
