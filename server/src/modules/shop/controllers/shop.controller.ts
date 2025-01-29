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
import { ShopService } from '../services/shop.service';
import { ShopResponse } from '../dto/shop.dto';
import { withListResponse } from 'src/libs/dto/response.dto';
import { ListShopQuery } from '../dto/list-shop.dto';
import { UpdateShopDto } from '../dto/update-shop.dto';
import { CreateShopDto } from '../dto/create-shop.dto';
import { SearchShopQuery } from '../dto/search-shop.dto';

@ApiTags('가게 API')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @ApiOperation({ summary: '가게 검색 API' })
  @Get('/search')
  async search(@Query() query: SearchShopQuery) {
    return this.shopService.search(query);
  }

  @ApiOperation({ summary: '가게 조회 API' })
  @ApiOkResponse({ type: ShopResponse })
  @Get('/:id')
  async get(@Param('id') id: number) {
    return this.shopService.get(id);
  }

  @ApiOperation({ summary: '가게 생성 API' })
  @ApiCreatedResponse({ type: ShopResponse })
  @Post()
  async create(@Body() dto: CreateShopDto) {
    return this.shopService.create(dto);
  }

  @ApiOperation({ summary: '가게 수정 API' })
  @ApiOkResponse({ type: ShopResponse })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateShopDto) {
    return this.shopService.update({ ...dto, id });
  }

  @ApiOperation({ summary: '가게 삭제 API' })
  @ApiNoContentResponse()
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.shopService.delete(id);
  }

  @ApiOperation({ summary: '가게 리스트 API' })
  @ApiOkResponse({ type: () => withListResponse(ShopResponse) })
  @Get()
  async list(@Query() query: ListShopQuery) {
    return this.shopService.list(query);
  }
}
