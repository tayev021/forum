import { Router } from 'express';
import { authRouter } from './authRouter';
import { userRouter } from './userRouter';
import { postRouter } from './postRouter';
import { threadRouter } from './threadRouter';
import { forumRouter } from './forumRouter';
import { categoryRouter } from './categoryRouter';
import { statisticRouter } from './statisticRouter';
import { notFound } from '../controllers/notFoundController';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/posts', postRouter);
rootRouter.use('/threads', threadRouter);
rootRouter.use('/forums', forumRouter);
rootRouter.use('/categories', categoryRouter);
rootRouter.use('/statistic', statisticRouter);
rootRouter.use(notFound);

export { rootRouter };
