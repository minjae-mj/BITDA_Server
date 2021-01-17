import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default (
  id: number,
  email: string,
  userName: string,
  userImage: string,
  provider: string
): string => {
  const accessToken: string = jwt.sign(
    {
      id,
      email,
      userName,
      userImage,
      provider,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return accessToken;
};
