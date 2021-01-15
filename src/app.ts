import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import { createConnection } from 'typeorm';
import * as routes from './routes';

createConnection()
  .then(() => {
    console.log('typeorm connected');
  })
  .catch((err) => {
    console.log('typeorm error', err);
  });

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

app.use('/users', routes.users);
app.use('/drinks', routes.drinks);
app.use('/reviews', routes.reviews);

//Handle Error
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404));
  }
);
app.use((err: any, req: express.Request, res: express.Response) => {
  res.status(err.status || 500).send({
    message: '서버에 문제가 있습니다',
  });
});

app.listen(8080, () => {
  console.log('Server Start');
});
