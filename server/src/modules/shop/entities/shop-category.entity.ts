import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShopEntity } from './shop.entity';

@Entity({ name: 'ShopCategory' })
export class ShopCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, comment: '카테고리명' })
  name: string;

  @Column({ type: 'text', comment: '카테고리 이미지', nullable: true })
  imageUrl: string;

  @OneToMany(() => ShopEntity, (shop) => shop.shopCategory)
  shops: ShopEntity[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;

  @DeleteDateColumn({ nullable: true })
  deletedDate: Date;
}
