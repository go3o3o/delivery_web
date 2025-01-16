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
  OneToMany,
} from 'typeorm';
import { ShopEntity } from 'src/modules/shop/entities/shop.entity';
import { MenuEntity } from './menu.entity';

@Entity({ name: 'MenuGroup' })
export class MenuGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @RelationId((self: MenuGroupEntity) => self.shop)
  @Column()
  @Index('FK_SHOP_MENU_GROUP')
  shopId: number;

  @ManyToOne(() => ShopEntity, (shop) => shop.menuGroups)
  shop: ShopEntity;

  @Column({ type: 'varchar', length: 100, comment: '메뉴 그룹명' })
  name: string;

  @Column({ type: 'text', comment: '메뉴 그룹 설명', nullable: true })
  description: string;

  @OneToMany(() => MenuEntity, (menu) => menu.menuGroup)
  menus: MenuEntity[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;

  @DeleteDateColumn({ nullable: true })
  deletedDate: Date;
}
