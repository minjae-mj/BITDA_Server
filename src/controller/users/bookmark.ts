
import { NextFunction, Request, Response } from 'express';
import User from '../../entity/User';
import { UserData } from '../../definitions';
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const id: number = res.locals.decodedId;
    const bookMarkList: UserData = await User.bookMarkList(id);
    res.status(200).send({ drinks: bookMarkList.drinks });
  } catch (err) {
    next(err);
  }
};
