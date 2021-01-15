import { Request, Response, NextFunction } from 'express';
import User from '../../entity/User';
import { UserData } from '../../definitions';
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = res.locals.decodedId;

    const user: UserData = await User.findOne({ id });
    console.log(user);
    if (user) {
      res.clearCookie('accessToken').status(200).send({ message: 'success' });
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } catch (err) {
    next(err);
  }
};
