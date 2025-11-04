import { Router } from 'express';
import { authRouter } from './authRouter';
import { threadRouter } from './threadRouter';
import { notFound } from '../controllers/notFoundController';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/threads', threadRouter);
rootRouter.use(notFound);

export { rootRouter };
