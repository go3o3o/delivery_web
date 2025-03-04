import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserAddressEntity } from '../entities/user-address.entity';
import { UserEntity } from '../entities/user.entity';
import { UserAddressResponse } from '../dto/user-address.dto';
import { CreateUserAddressDto } from '../dto/create-user-address.dto';
import { UpdateUserAddressDto } from '../dto/update-user-address.dto';
import { ListUserAddressQuery } from '../dto/list-user-address.dto';
import { IListResponse } from 'src/libs/interfaces/response.interface';
import {
  findPagination,
  responsePagination,
} from 'src/libs/helpers/pagination.helper';

export interface IUserAddressService {
  get(id: number): Promise<UserAddressResponse>;
  create(dto: CreateUserAddressDto): Promise<UserAddressResponse>;
  update(dto: UpdateUserAddressDto): Promise<UserAddressResponse>;
  delete(id: number): Promise<void>;
  list(
    query: ListUserAddressQuery,
  ): Promise<IListResponse<UserAddressResponse>>;
}

@Injectable()
export class UserAddressService implements IUserAddressService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserAddressEntity)
    private readonly userAddressRepository: Repository<UserAddressEntity>,
  ) {}

  async get(id: number): Promise<UserAddressResponse> {
    const userAddress = await this.userAddressRepository.findOneBy({ id });
    if (!userAddress) {
      throw new NotFoundException(`유저 주소가 존재하지 않습니다. (id: ${id})`);
    }
    return userAddress;
  }

  async create(dto: CreateUserAddressDto): Promise<UserAddressResponse> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user) {
      throw new NotFoundException(
        `유저가 존재하지 않습니다. (id: ${dto.userId})`,
      );
    }

    const userAddress = await this.userAddressRepository.save({
      ...dto,
    });
    return userAddress;
  }

  async update(dto: UpdateUserAddressDto): Promise<UserAddressResponse> {
    const { id, ...data } = dto;
    if (dto.userId) {
      const user = await this.userRepository.findOneBy({ id: data.userId });
      if (!user) {
        throw new NotFoundException(
          `유저가 존재하지 않습니다. (id: ${dto.userId})`,
        );
      }
    }

    await this.userAddressRepository.update({ id: id }, data);
    return await this.userAddressRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.userAddressRepository.softDelete(id);
  }

  async list(
    query: ListUserAddressQuery,
  ): Promise<IListResponse<UserAddressResponse>> {
    const { size, page, sortBy, ...data } = query;
    const findOptions = {};
    console.log(data.userId);
    if (data.userId) {
      findOptions['userId'] = data.userId;
    }
    if (data.address) {
      findOptions['name'] = Like(`%${data.address}%`);
    }
    const [userAddresses, total] =
      await this.userAddressRepository.findAndCount({
        where: findOptions,
        ...findPagination({ page, size, sortBy }),
      });

    const pagination = responsePagination(total, userAddresses.length, query);

    return { list: userAddresses, pagination };
  }
}
