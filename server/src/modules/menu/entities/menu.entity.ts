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
import { MenuGroupEntity } from './menu-group.entity';
import { MenuOptionEntity } from './menu-option.entity';

@Entity({ name: 'Menu' })
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @RelationId((self: MenuGroupEntity) => self.menus)
  @Column()
  @Index('FK_MENU_GROUP')
  menuGroupId: number;

  @ManyToOne(() => MenuGroupEntity, (menuGroup) => menuGroup.menus)
  menuGroup: MenuGroupEntity;

  @Column({ type: 'varchar', length: 100, comment: '메뉴명' })
  name: string;

  @Column({ type: 'text', comment: '메뉴 설명', nullable: true })
  description?: string;

  @Column({ type: 'text', comment: '메뉴 이미지', nullable: true })
  imageUrl?: string;

  @Column({ type: 'int', comment: '메뉴 가격' })
  price: number;

  @Column({ type: 'tinyint', comment: '추천 여부', default: 0 })
  isRecommend: boolean;

  @OneToMany(() => MenuOptionEntity, (menuOption) => menuOption.menu)
  menuOptions: MenuOptionEntity[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;

  @DeleteDateColumn({ nullable: true })
  deletedDate: Date;
}
