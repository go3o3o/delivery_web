import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuGroupEntity } from './entities/menu-group.entity';
import { MenuEntity } from './entities/menu.entity';
import { MenuOptionEntity } from './entities/menu-option.entity';
import { MenuGroupController } from './controllers/menu-group.controller';
import { MenuGroupService } from './services/menu-group.service';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';
import { MenuOptionController } from './controllers/menu-option.controller';
import { MenuOptionService } from './services/menu-option.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuGroupEntity, MenuEntity, MenuOptionEntity]),
  ],
  controllers: [MenuGroupController, MenuController, MenuOptionController],
  providers: [MenuGroupService, MenuService, MenuOptionService],
  exports: [MenuService],
})
export class MenuModule {}
