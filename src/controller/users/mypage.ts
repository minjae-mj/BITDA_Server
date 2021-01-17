import { NextFunction, Request, Response } from 'express';
import { UserData } from '../../definitions';
import User from '../../entity/User';
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const id: number = res.locals.decodedId;
    const user: UserData = await User.findOne({ id });
    if (user) {
      const { userName, email, userImage, provider, admin, createdAt } = user;
      res
        .status(200)
        .send({ id, userName, email, userImage, provider, admin, createdAt });
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } catch (err) {
    next(err);
  }
};
