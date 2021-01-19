import { Response, NextFunction } from 'express';
import User from '../../entity/User';
import { UserData } from '../../definitions';
import createToken from '../../utils/sign/createToken';
import deleteProfile from '../../utils/upload/deleteProfile';

export default async (
  req,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const id: number = res.locals.decodedId;
    const user: UserData = await User.findOne({ id });

    if (user) {
      let userName: string = req.body.userName || user.userName;
      let userImage: string = user.userImage;

      if (req.file && user.userImage !== 'noPath') {
        const key = user.userImage.split('/');
        const delFileName = key[key.length - 1];
        deleteProfile(delFileName);
      }

      if (req.file) {
        userImage = req.file.location;
      }

      const updatedUser: UserData = await User.modifyUser(
        id,
        userName,
        userImage
      );

      const accessToken: string = createToken(
        updatedUser.id,
        updatedUser.email,
        updatedUser.userName,
        updatedUser.userImage,
        updatedUser.provider
      );
      res.status(200).cookie('accessToken', accessToken).send({ accessToken });
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } catch (err) {
    next(err);
  }
};
