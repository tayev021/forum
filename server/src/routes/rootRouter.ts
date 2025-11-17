import { Router } from 'express';
import { authRouter } from './authRouter';
import { threadRouter } from './threadRouter';
import { postRouter } from './postRouter';
import { notFound } from '../controllers/notFoundController';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/threads', threadRouter);
rootRouter.use('/posts', postRouter);
rootRouter.use(notFound);

export { rootRouter };
