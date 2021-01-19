import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default (image: string): Error | object => {
  const s3 = new AWS.S3();
  const result = s3.deleteObject(
    {
      Bucket: 'bitda-images',
      Key: `profile-images/${image}`,
    },
    (err, data) => {
      if (err) {
        return err;
      }
      return data;
    }
  );
  return result;
};
