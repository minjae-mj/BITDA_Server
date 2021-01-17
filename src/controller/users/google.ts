import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import User from '../../entity/User';
import { UserData } from '../../definitions/index';
import createToken from '../../utils/sign/createToken';
import 'dotenv/config';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { authorizationCode } = req.body;
    const googleResponse = await axios.post(
      `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&code=${authorizationCode}&grant_type=authorization_code&redirect_uri=http://localhost:3000`
    );

    const googleAccessToken = googleResponse.data.access_token;
    const googleUserInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${googleAccessToken}`
    );

    const email: string = googleUserInfo.data.email;
    const userName: string = googleUserInfo.data.name;
    const userImage: string = googleUserInfo.data.picture;
    const provider: string = 'google';

    const user: UserData = await User.findOne({ email });

    if (user) {
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
      const newUser: UserData = await User.socialRegister(
        email,
        userName,
        userImage,
        provider
      );
      const accessToken: string = createToken(
        newUser.id,
        newUser.email,
        newUser.userName,
        newUser.userImage,
        newUser.provider
      );
      res
        .status(200)
        .cookie('accessToken', accessToken)
        .send({ accessToken, admin: newUser.admin });
    }
  } catch (err) {
    next(err);
  }
};
