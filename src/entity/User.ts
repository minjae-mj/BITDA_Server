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
  @Column({ default: 'socialPassword' })
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
  static async localRegister(
    email: string,
    password: string,
    userName: string
  ): Promise<User | undefined> {
    const { id } = (
      await this.createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            email,
            password,
            userName,
          },
        ])
        .execute()
    ).identifiers[0];
    return this.findOne({ id });
  }
}
