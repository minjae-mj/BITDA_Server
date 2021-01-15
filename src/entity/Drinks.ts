import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import Review from './Review';

@Entity()
export default class Drink extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  drinkName: string;

  @Column()
  type: string;

  @Column()
  price: string;

  @Column()
  taste: string;

  @Column()
  ingredient: string;

  @Column()
  alcohol: number;

  @Column()
  origin: string;

  @Column()
  url: string;

  @Column()
  desc: string;

  @Column()
  drinkImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => Review, (review) => review.drink)
  review: Review[];

  static allDrinkList(){
   return this.createQueryBuilder("drink")
   .getMany();
  }
  static detailView(id){
    return this.createQueryBuilder("drink")
    .where("drink.id = :id", {id})
    .getOne();
  }
}
