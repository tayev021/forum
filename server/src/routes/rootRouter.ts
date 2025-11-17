import { Router } from 'express';
import { authRouter } from './authRouter';
import { forumRouter } from './forumRouter';
import { threadRouter } from './threadRouter';
import { postRouter } from './postRouter';
import { notFound } from '../controllers/notFoundController';
import { categoryRouter } from './categoryRouter';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/forums', forumRouter);
rootRouter.use('/threads', threadRouter);
rootRouter.use('/posts', postRouter);
rootRouter.use('/categories', categoryRouter);
rootRouter.use(notFound);

export { rootRouter };
