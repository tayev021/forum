import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { rootRouter } from './routes/rootRouter';
import { globalErrorHandler } from './controllers/errorController';

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

app.use('/api/v1/', rootRouter);

app.use(globalErrorHandler);

export { app };
