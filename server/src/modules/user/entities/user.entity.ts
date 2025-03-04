import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserGrade } from '../user.enum';
import { UserAddressEntity } from './user-address.entity';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 100, comment: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 255, comment: '비밀번호' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 12, comment: '전화번호' })
  phone: string;

  @Column({ type: 'varchar', length: 100, comment: '닉네임', nullable: true })
  nickname?: string;

  @Column({
    type: 'varchar',
    length: 10,
    comment: '권한',
    default: UserGrade.Iron,
  })
  grade: UserGrade;

  @Column({ nullable: true })
  naverId?: string;

  @Column({ nullable: true })
  kakaoId?: string;

  @OneToMany(() => UserAddressEntity, (userAddress) => userAddress.user)
  addresses: UserAddressEntity[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;

  @DeleteDateColumn({ nullable: true })
  deletedDate: Date;
}
