import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../../entity/User';
import { UserData } from '../../definitions/index';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { email, password } = req.body;

    const user: UserData = await User.findOne({ email });

    if (user) {
      const result: boolean = await bcryptjs.compare(password, user.password);
      if (result) {
        const accessToken: string = jwt.sign(
          {
            id: user.id,
            email: user.email,
            userName: user.userName,
            userImage: user.userImage,
            provider: user.provider,
          },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        res
          .status(200)
          .cookie('accessToken', accessToken)
          .send({ accessToken, admin: user.admin });
      } else {
        res.status(404).send({ message: '비밀번호가 일치하지 않습니다.' });
      }
    } else {
      res.status(404).send({ message: '가입되지 않은 회원입니다.' });
    }
  } catch (err) {
    next(err);
  }
};
