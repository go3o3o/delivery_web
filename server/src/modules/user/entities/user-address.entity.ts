import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'UserAddress' })
export class UserAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @RelationId((self: UserAddressEntity) => self.user)
  @Column()
  @Index('FK_USER_ADDRESS')
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user: UserEntity;

  @Column({ type: 'varchar', length: 255, comment: '주소' })
  address: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '주소 설명',
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;

  @DeleteDateColumn({ nullable: true })
  deletedDate: Date;
}
