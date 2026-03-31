import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path:
    process.env.NODE_ENV === 'docker'
      ? path.resolve(__dirname, './../../.env')
      : path.resolve(__dirname, './../.env.local'),
});
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { rootRouter } from './routes/rootRouter';
import { globalErrorHandler } from './controllers/errorController';

const app = express();

console.log('CORS origin:', process.env.ORIGIN);

app.set('trust proxy', 1);

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/', rootRouter);

app.use(globalErrorHandler);

export { app };
