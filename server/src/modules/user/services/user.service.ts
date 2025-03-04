import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/user.entity';
import { UserResponse } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';

export interface IUserService {
  get(id: number): Promise<UserResponse>;
  create(dto: CreateUserDto): Promise<UserResponse>;
  update(dto: UpdateUserDto): Promise<UserResponse>;
  changePassword(dto: ChangePasswordDto): Promise<UserResponse>;
  delete(id: number): Promise<void>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async get(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { addresses: true },
    });
    if (!user) {
      throw new NotFoundException(`유저가 존재하지 않습니다. (id: ${id})`);
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<UserResponse> {
    const { email, password, ...data } = dto;
    const existEmail = await this.findByEmail(email);
    if (existEmail) {
      throw new ConflictException(`이미 존재하는 이메일 입니다.`);
    }
    const hashedPassword = await this.hashPassword(password);
    const user = await this.userRepository.save({
      email: email,
      password: hashedPassword,
      ...data,
    });
    return this.userRepository.save(user);
  }

  async update(dto: UpdateUserDto): Promise<UserResponse> {
    const { id, password, ...data } = dto;
    const updatedData = data;
    if (password) {
      const hashedPassword = await this.hashPassword(password);
      updatedData['password'] = hashedPassword;
    }
    await this.userRepository.update({ id }, { ...updatedData });
    return await this.userRepository.findOneBy({ id });
  }

  async changePassword(dto: ChangePasswordDto): Promise<UserResponse> {
    const { id, password, newPassword } = dto;
    const user = await this.userRepository.findOneBy({ id });
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userRepository.update({ id }, { password: hashedPassword });
    return await this.userRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async findByEmail(email: string): Promise<UserResponse> {
    return this.userRepository.findOneBy({ email });
  }
}
