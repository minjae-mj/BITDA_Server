import { Request, Response } from 'express';
import Drink from '../../entity/Drinks';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const drinkList = await Drink.allDrinkList();
    if (drinkList) {
      res.send(drinkList);
    }
  } catch (err) {
    res.send({ message: 'error message ' });
  }
};
