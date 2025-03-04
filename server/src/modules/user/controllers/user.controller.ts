import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserResponse } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';

@ApiTags('유저 API')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '비밀번호 변경 API' })
  @ApiOkResponse({ type: UserResponse })
  @Post('/change-password/:id')
  async changePassword(
    @Param('id') id: number,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.userService.changePassword({ ...dto, id });
  }

  @ApiOperation({ summary: '유저 조회 API' })
  @ApiOkResponse({ type: UserResponse })
  @Get('/:id')
  async get(@Param('id') id: number) {
    return this.userService.get(id);
  }

  @ApiOperation({ summary: '유저 생성 API' })
  @ApiCreatedResponse({ type: UserResponse })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOperation({ summary: '유저 수정 API' })
  @ApiOkResponse({ type: UserResponse })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update({ ...dto, id });
  }

  @ApiOperation({ summary: '유저 삭제 API' })
  @ApiNoContentResponse()
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
