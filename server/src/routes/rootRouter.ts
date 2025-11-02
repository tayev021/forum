import { Router } from 'express';
import { authRouter } from './authRouter';
import { notFound } from '../controllers/notFoundController';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use(notFound);

export { rootRouter };
