import { Router } from 'express';
import { protect } from '../middleware/protect';
import { isSignedIn } from '../middleware/isSignedIn';
import { restrictTo } from '../middleware/restrictTo';
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
  searchThread,
} from '../controllers/threadController';
import { uploadPostImages } from '../middleware/upload';
import { resizePostImages } from '../middleware/resizePostImages';

const threadRouter = Router();

threadRouter.get('/search', searchThread);
threadRouter.get('/:threadId', isSignedIn, getThread);
threadRouter.post('/:threadId/subscribe', protect, subscribeThread);
threadRouter.post('/:threadId/unsubscribe', protect, unsubscribeThread);
threadRouter.post(
  '/',
  protect,
  uploadPostImages,
  resizePostImages,
  validate(threadTitleSchema, postContentSchema),
  createThread
);
threadRouter.patch(
  '/:threadId',
  protect,
  restrictTo('admin', 'moderator'),
  validate(threadTitleSchema),
  updateThread
);
threadRouter.delete('/:threadId', protect, restrictTo('admin'), deleteThread);

export { threadRouter };
