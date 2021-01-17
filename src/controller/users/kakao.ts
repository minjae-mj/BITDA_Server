import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import User from '../../entity/User';
import { UserData } from '../../definitions/index';
import createToken from '../../utils/sign/createToken';
import 'dotenv/config';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { authorizationCode } = req.body;
    const kakaoResponse = await axios.post(
      `https://kauth.kakao.com/oauth/token?code=${authorizationCode}&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000&grant_type=authorization_code`
    );
    const kakaoAccessToken = kakaoResponse.data.access_token;
    const kakaoUserInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    });

    const kakao = kakaoUserInfo.data;
    const email: string = kakao.kakao_account.email;
    const userName: string = kakao.properties.nickname;
    const userImage: string = kakao.properties.thumbnail_image;
    const provider: string = 'kakao';

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
