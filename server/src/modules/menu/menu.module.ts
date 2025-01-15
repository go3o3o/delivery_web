import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuGroupEntity } from './entities/menu-group.entity';
import { MenuEntity } from './entities/menu.entity';
import { MenuOptionEntity } from './entities/menu-option.entity';
import { MenuGroupController } from './controllers/menu-group.controller';
import { MenuGroupService } from './services/menu-group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuGroupEntity, MenuEntity, MenuOptionEntity]),
  ],
  controllers: [MenuGroupController],
  providers: [MenuGroupService],
})
export class MenuModule {}
