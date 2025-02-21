import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { ShopCategoryEntity } from './shop-category.entity';
import { MenuGroupEntity } from 'src/modules/menu/entities/menu-group.entity';

@Entity({ name: 'Shop' })
export class ShopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @RelationId((self: ShopEntity) => self.shopCategory)
  @Column()
  @Index('FK_SHOP_CATEGORY')
  shopCategoryId: number;

  @ManyToOne(() => ShopCategoryEntity, (shopCategory) => shopCategory.shops)
  shopCategory: ShopCategoryEntity;

  @OneToMany(() => MenuGroupEntity, (menuGroup) => menuGroup.shop)
  menuGroups: MenuGroupEntity[];

  @Column({ type: 'varchar', length: 100, comment: '가게명' })
  name: string;

  @Column({ type: 'varchar', length: 100, comment: '상호명' })
  businessName: string;

  @Column({ type: 'varchar', length: 12, comment: '가게 전화번호' })
  phone: string;

  @Column({ type: 'varchar', length: 255, comment: '가게 주소' })
  address: string;

  @Column({ type: 'text', comment: '가게 로고 이미지', nullable: true })
  imageUrl: string;

  @Column({ type: 'text', comment: '가게 설명', nullable: true })
  description: string;

  @Column({
    type: 'decimal',
    precision: 2,
    scale: 1,
    comment: '평점',
    default: 0.0,
  })
  rating: number;

  @Column({ type: 'int', comment: '주문 수', default: 0 })
  orderCount: number;

  @Column({ type: 'int', comment: '찜 수', default: 0 })
  dibsCount: number;

  @Column({ type: 'int', comment: '리뷰 수', default: 0 })
  reviewCount: number;

  @Column({ type: 'int', comment: '최소주문금액', default: 0 })
  minOrderPrice: number;

  @Column({ type: 'int', comment: '배달비', default: 0 })
  deliveryFee: number;

  @Column({ type: 'int', comment: '배달예상시간', default: 0 })
  deliveryTime: number;

  @Column({ type: 'double', precision: 10, scale: 6, comment: '위도' })
  lat: number;

  @Column({ type: 'double', precision: 10, scale: 6, comment: '경도' })
  lng: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;

  @DeleteDateColumn({ nullable: true })
  deletedDate: Date;
}
