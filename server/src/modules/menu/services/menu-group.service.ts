import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { IListResponse } from 'src/libs/interfaces/response.interface';
import {
  findPagination,
  responsePagination,
} from 'src/libs/helpers/pagination.helper';

import { MenuGroupEntity } from '../entities/menu-group.entity';
import { CreateMenuGroupDto } from '../dto/create-menu-group.dto';
import { ListMenuGroupQuery } from '../dto/list-menu-group.dto';
import { MenuGroupResponse } from '../dto/menu-group.dto';
import { UpdateMenuGroupDto } from '../dto/update-menu-group.dto';

export interface IMenuGroupService {
  create(dto: CreateMenuGroupDto): Promise<MenuGroupResponse>;
  update(dto: UpdateMenuGroupDto): Promise<MenuGroupResponse>;
  delete(id: number): Promise<void>;
  list(query: ListMenuGroupQuery): Promise<IListResponse<MenuGroupResponse>>;
}

/**
 * TO-BE
 * - storeId 체크 로직 추가
 */
@Injectable()
export class MenuGroupService implements IMenuGroupService {
  constructor(
    @InjectRepository(MenuGroupEntity)
    private readonly menuGroupRepository: Repository<MenuGroupEntity>,
  ) {}

  async create(dto: CreateMenuGroupDto): Promise<MenuGroupResponse> {
    const menuGroup = await this.menuGroupRepository.save(dto);
    return menuGroup;
  }

  async update(dto: UpdateMenuGroupDto): Promise<MenuGroupResponse> {
    const { id, ...data } = dto;
    await this.menuGroupRepository.update({ id }, data);
    return await this.menuGroupRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.menuGroupRepository.softDelete(id);
  }

  async list(
    query: ListMenuGroupQuery,
  ): Promise<IListResponse<MenuGroupResponse>> {
    const { size, page, sortBy, ...data } = query;

    const findOptions = {};
    if (data.shopId) {
      findOptions['shopId'] = data.shopId;
    }
    if (data.name) {
      findOptions['name'] = Like(`%${data.name}%`);
    }

    const [menuGroups, total] = await this.menuGroupRepository.findAndCount({
      where: findOptions,
      relations: { menus: true },
      ...findPagination({ page, size, sortBy }),
    });
    const pagination = responsePagination(total, menuGroups.length, query);

    return { list: menuGroups, pagination };
  }
}
