import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  RelationId,
  Index,
  Column,
  ManyToOne,
} from 'typeorm';
import { MenuEntity } from './menu.entity';

@Entity({ name: 'MenuOption' })
export class MenuOptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @RelationId((self: MenuOptionEntity) => self.menu)
  @Column()
  @Index('FK_MENU_OPTION')
  menuId: number;

  @ManyToOne(() => MenuEntity, (menu) => menu.menuOptions)
  menu: MenuEntity;

  @Column({ type: 'varchar', length: 100, comment: '메뉴 옵션명' })
  name: string;

  @Column({ type: 'text', comment: '메뉴 옵션 설명', nullable: true })
  description?: string;

  @Column({ type: 'int', comment: '메뉴 옵션 가격' })
  price: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;

  @DeleteDateColumn({ nullable: true })
  deletedDate: Date;
}
