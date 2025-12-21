import { Router } from 'express';
import { protect } from '../middleware/protect';
import { validate } from '../middleware/validate';
import { threadSchema } from '../validators/threadSchema';
import { postSchema } from '../validators/postSchema';
import {
  getThread,
  createThread,
  updateThread,
  deleteThread,
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
threadRouter.patch('/:threadId', protect, validate(threadSchema), updateThread);
threadRouter.delete('/:threadId', protect, restrictTo('admin'), deleteThread);

export { threadRouter };
