import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { IListResponse } from 'src/libs/interfaces/response.interface';
import {
  findPagination,
  responsePagination,
} from 'src/libs/helpers/pagination.helper';

import { MenuOptionEntity } from '../entities/menu-option.entity';
import { CreateMenuOptionDto } from '../dto/create-menu-option.dto';
import { ListMenuOptionQuery } from '../dto/list-menu-option.dto';
import { MenuOptionResponse } from '../dto/menu-option.dto';
import { UpdateMenuOptionDto } from '../dto/update-menu-option.dto';
import { MenuEntity } from '../entities/menu.entity';

export interface IMenuOptionService {
  create(dto: CreateMenuOptionDto): Promise<MenuOptionResponse>;
  update(dto: UpdateMenuOptionDto): Promise<MenuOptionResponse>;
  delete(id: number): Promise<void>;
  list(query: ListMenuOptionQuery): Promise<IListResponse<MenuOptionResponse>>;
}

@Injectable()
export class MenuOptionService implements IMenuOptionService {
  constructor(
    @InjectRepository(MenuOptionEntity)
    private readonly menuOptionRepository: Repository<MenuOptionEntity>,

    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  async create(dto: CreateMenuOptionDto): Promise<MenuOptionResponse> {
    const menu = await this.menuRepository.findOneBy({ id: dto.menuId });
    if (!menu) {
      throw new NotFoundException(
        `메뉴가 존재하지 않습니다. (id: ${dto.menuId})`,
      );
    }
    const menuOption = await this.menuOptionRepository.save(dto);
    return menuOption;
  }

  async update(dto: UpdateMenuOptionDto): Promise<MenuOptionResponse> {
    const { id, ...data } = dto;
    const menu = await this.menuRepository.findOneBy({ id: data.menuId });
    if (!menu) {
      throw new NotFoundException(
        `메뉴가 존재하지 않습니다. (id: ${data.menuId})`,
      );
    }

    await this.menuOptionRepository.update({ id }, data);
    return await this.menuOptionRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.menuOptionRepository.softDelete(id);
  }

  async list(
    query: ListMenuOptionQuery,
  ): Promise<IListResponse<MenuOptionResponse>> {
    const { size, page, sortBy, ...data } = query;

    const findOptions = {};
    if (data.menuId) {
      findOptions['menuId'] = data.menuId;
    }
    if (data.name) {
      findOptions['name'] = Like(`%${data.name}%`);
    }

    const [menuOptions, total] = await this.menuOptionRepository.findAndCount({
      where: findOptions,
      relations: {},
      ...findPagination({ page, size, sortBy }),
    });
    const pagination = responsePagination(total, menuOptions.length, query);

    return { list: menuOptions, pagination };
  }
}
