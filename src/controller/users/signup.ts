import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../../entity/User';
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { email, password, userName } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      res.status(400).send({ message: '중복된 이메일입니다.' });
    } else {
      const hashPass: string = bcryptjs.hashSync(password, 12);
      const newUser: object = await User.localRegister(
        email,
        hashPass,
        userName
      );
      if (!newUser) {
        res.status(401).send({ message: '회원가입에 실패하였습니다.' });
        return;
      } else {
        res.status(201).send('success');
        return;
      }
    }
  } catch (err) {
    next(err);
  }
};
