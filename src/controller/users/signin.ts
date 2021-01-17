import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../../entity/User';
import { UserData } from '../../definitions/index';
import createToken from '../../utils/sign/createToken';
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
        const accessToken: string = createToken(
          user.id,
          user.email,
          user.userName,
          user.userImage,
          user.provider
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
