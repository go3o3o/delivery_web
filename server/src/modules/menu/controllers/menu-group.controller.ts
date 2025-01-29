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
import { MenuGroupResponse } from '../dto/menu-group.dto';
import { CreateMenuGroupDto } from '../dto/create-menu-group.dto';
import { MenuGroupService } from '../services/menu-group.service';
import { UpdateMenuGroupDto } from '../dto/update-menu-group.dto';
import { ListMenuGroupQuery } from '../dto/list-menu-group.dto';
import { withListResponse } from 'src/libs/dto/response.dto';

@ApiTags('메뉴 그룹 API')
@Controller('menu/group')
export class MenuGroupController {
  constructor(private readonly menuGroupService: MenuGroupService) {}

  @ApiOperation({ summary: '메뉴 그룹 생성 API' })
  @ApiCreatedResponse({ type: MenuGroupResponse })
  @Post()
  async create(@Body() dto: CreateMenuGroupDto) {
    return this.menuGroupService.create(dto);
  }

  @ApiOperation({ summary: '메뉴 그룹 수정 API' })
  @ApiOkResponse({ type: MenuGroupResponse })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateMenuGroupDto) {
    return this.menuGroupService.update({ id, ...dto });
  }

  @ApiOperation({ summary: '메뉴 그룹 삭제 API' })
  @ApiNoContentResponse()
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.menuGroupService.delete(id);
  }

  @ApiOperation({ summary: '메뉴 그룹 리스트 API' })
  @ApiOkResponse({ type: () => withListResponse(MenuGroupResponse) })
  @Get()
  async list(@Query() query: ListMenuGroupQuery) {
    return this.menuGroupService.list(query);
  }
}
