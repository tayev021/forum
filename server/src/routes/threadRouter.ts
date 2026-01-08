import { Router } from 'express';
import { protect } from '../middleware/protect';
import { validate } from '../middleware/validate';
import { threadTitleSchema } from '../validators/threadSchemas';
import { postContentSchema } from '../validators/postSchemas';
import {
  getThread,
  createThread,
  updateThread,
  deleteThread,
  subscribeThread,
  unsubscribeThread,
  readThread,
} from '../controllers/threadController';
import { restrictTo } from '../middleware/restrictTo';

const threadRouter = Router();

threadRouter.get('/:threadId', getThread);
threadRouter.post('/:threadId/subscribe', protect, subscribeThread);
threadRouter.post('/:threadId/unsubscribe', protect, unsubscribeThread);
threadRouter.patch('/:threadId/read', protect, readThread);
threadRouter.post(
  '/',
  protect,
  validate(threadTitleSchema, postContentSchema),
  createThread
);
threadRouter.patch(
  '/:threadId',
  protect,
  validate(threadTitleSchema),
  updateThread
);
threadRouter.delete('/:threadId', protect, restrictTo('admin'), deleteThread);

export { threadRouter };
