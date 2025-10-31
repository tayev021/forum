import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { rootRouter } from './routes/rootRouter';

const app = express();

app.use(rootRouter);

export { app };
