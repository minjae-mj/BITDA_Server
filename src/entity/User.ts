import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import Drink from './Drinks';
import Review from './Review';
@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'noPath' })
  userImage: string;

  @Column({ default: 'local' })
  provider: string;

  @Column({ default: 0 })
  admin: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany((type) => Drink)
  @JoinTable({
    name: 'drinks_bookmark',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'drinkId',
      referencedColumnName: 'id',
    },
  })
  drinks: Drink[];

  @OneToMany((type) => Review, (review) => review.user)
  review: Review[];
}
