import { NextFunction, Request, response, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { UserData } from '../../definitions';
import User from '../../entity/User';
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const id: number = res.locals.decodedId;
    const { password, newPassword } = req.body;

    const user: UserData = await User.findOne({ id });
    if (user) {
      const result: boolean = await bcryptjs.compare(password, user.password);
      if (result) {
        const hashPass: string = await bcryptjs.hash(newPassword, 12);
        await User.modifyPassword(id, hashPass);
        res.status(200).send({ message: 'success' });
      } else {
        res.status(400).send({ message: '비밀번호가 일치하지 않습니다.' });
      }
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } catch (err) {
    next(err);
  }
};
