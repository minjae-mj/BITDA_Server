import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import 'dotenv/config';
import { Request } from 'express';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'bitda-images',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req: Request, file: Express.Multer.File, cb: Function) => {
      cb(null, `profile-images/${Date.now()}${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
