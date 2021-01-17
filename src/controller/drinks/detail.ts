import { Request, Response } from 'express';
import { Connection, getRepository } from 'typeorm';
import Drink from '../../entity/Drinks';
import User from '../../entity/User';
export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id = res.locals.decodedId;
    console.log(id);
    const detail = await Drink.detailView(req.params.drinkId);
    const checkBookMark = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.drinks', 'drinks')
      .where('user.id = :id', { id: id })
      .getOne();
    console.log(checkBookMark);
    // const checkBookMark = await Drink.checkBookMark(id)
    for (let i = 0; i < checkBookMark.drinks.length; i++) {
      if (checkBookMark.drinks[i].id === Number(req.params.drinkId)) {
        res.send({ ...detail, bookmark: true });
      } else {
        res.send({ ...detail, bookmark: false });
      }
    }
  } catch (err) {
    res.status(404).send({ message: 'error message ' });
  }
};
