import { Router } from 'express';
import { authRouter } from './authRouter';
import { postRouter } from './postRouter';
import { notFound } from '../controllers/notFoundController';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/posts', postRouter);
rootRouter.use(notFound);

export { rootRouter };
