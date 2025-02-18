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
import { MenuService } from '../services/menu.service';
import { MenuResponse } from '../dto/menu.dto';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { ListMenuQuery } from '../dto/list-menu.dto';

@ApiTags('메뉴 API')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '메뉴 생성 API' })
  @ApiCreatedResponse({ type: MenuResponse })
  @Post()
  async create(@Body() dto: CreateMenuDto) {
    return this.menuService.create(dto);
  }

  @ApiOperation({ summary: '메뉴 수정 API' })
  @ApiOkResponse({ type: MenuResponse })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateMenuDto) {
    return this.menuService.update({ ...dto, id });
  }

  @ApiOperation({ summary: '메뉴 삭제 API' })
  @ApiNoContentResponse()
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.menuService.delete(id);
  }

  @ApiOperation({ summary: '메뉴 리스트 API' })
  @ApiOkResponse({ type: () => withListResponse(MenuResponse) })
  @Get()
  async list(@Query() query: ListMenuQuery) {
    return this.menuService.list(query);
  }
}
