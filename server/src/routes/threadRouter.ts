import { Router } from 'express';
import { protect } from '../middleware/protect';
import { validate } from '../middleware/validate';
import { threadSchema } from '../validators/threadValidator';
import { postSchema } from '../validators/postValidator';
import {
  createThread,
  deleteThread,
  getThread,
} from '../controllers/threadController';
import { restrictTo } from '../middleware/restrictTo';

const threadRouter = Router();

threadRouter.get('/:threadId', getThread);
threadRouter.post(
  '/',
  protect,
  validate(threadSchema, postSchema),
  createThread
);
threadRouter.delete('/:threadId', protect, restrictTo('admin'), deleteThread);

export { threadRouter };
