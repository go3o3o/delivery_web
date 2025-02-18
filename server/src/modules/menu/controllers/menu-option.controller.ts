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
import { MenuOptionService } from '../services/menu-option.service';
import { withListResponse } from 'src/libs/dto/response.dto';
import { MenuOptionResponse } from '../dto/menu-option.dto';
import { CreateMenuOptionDto } from '../dto/create-menu-option.dto';
import { UpdateMenuOptionDto } from '../dto/update-menu-option.dto';
import { ListMenuOptionQuery } from '../dto/list-menu-option.dto';

@ApiTags('메뉴 옵션 API')
@Controller('menu/option')
export class MenuOptionController {
  constructor(private readonly menuOptionService: MenuOptionService) {}

  @ApiOperation({ summary: '메뉴 옵션 생성 API' })
  @ApiCreatedResponse({ type: MenuOptionResponse })
  @Post()
  async create(@Body() dto: CreateMenuOptionDto) {
    return this.menuOptionService.create(dto);
  }

  @ApiOperation({ summary: '메뉴 옵션 수정 API' })
  @ApiOkResponse({ type: MenuOptionResponse })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateMenuOptionDto) {
    return this.menuOptionService.update({ ...dto, id });
  }

  @ApiOperation({ summary: '메뉴 옵션 삭제 API' })
  @ApiNoContentResponse()
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.menuOptionService.delete(id);
  }

  @ApiOperation({ summary: '메뉴 옵션 리스트 API' })
  @ApiOkResponse({ type: () => withListResponse(MenuOptionResponse) })
  @Get()
  async list(@Query() query: ListMenuOptionQuery) {
    return this.menuOptionService.list(query);
  }
}
