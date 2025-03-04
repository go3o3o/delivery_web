import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { withListResponse } from 'src/libs/dto/response.dto';
import { UserAddressService } from '../services/user-address.service';
import { UserAddressResponse } from '../dto/user-address.dto';
import { CreateUserAddressDto } from '../dto/create-user-address.dto';
import { UpdateUserAddressDto } from '../dto/update-user-address.dto';
import { ListUserAddressQuery } from '../dto/list-user-address.dto';

@ApiTags('유저 주소 API')
@Controller('user/address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @ApiOperation({ summary: '유저 주소 리스트 API' })
  @ApiOkResponse({ type: () => withListResponse(UserAddressResponse) })
  @Get()
  async list(@Query() query: ListUserAddressQuery) {
    console.log(query);
    return this.userAddressService.list(query);
  }

  @ApiOperation({ summary: '유저 주소 조회 API' })
  @ApiOkResponse({ type: UserAddressResponse })
  @Get('/:id')
  async get(@Param('id') id: number) {
    return this.userAddressService.get(id);
  }

  @ApiOperation({ summary: '유저 주소 생성 API' })
  @ApiCreatedResponse({ type: UserAddressResponse })
  @Post()
  async create(@Body() dto: CreateUserAddressDto) {
    return this.userAddressService.create(dto);
  }

  @ApiOperation({ summary: '유저 주소 수정 API' })
  @ApiOkResponse({ type: UserAddressResponse })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateUserAddressDto) {
    return this.userAddressService.update({ ...dto, id });
  }

  @ApiOperation({ summary: '유저 주소 삭제 API' })
  @ApiNoContentResponse()
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.userAddressService.delete(id);
  }
}
