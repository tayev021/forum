import { Router } from 'express';
import { protect } from '../middleware/protect';
import { validate } from '../middleware/validate';
import { threadSchema } from '../validators/threadValidator';
import { postSchema } from '../validators/postValidator';
import { createThread, getThread } from '../controllers/threadController';

const threadRouter = Router();

threadRouter.get('/:threadId', getThread);
threadRouter.post(
  '/',
  protect,
  validate(threadSchema, postSchema),
  createThread
);

export { threadRouter };
