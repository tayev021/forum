import { Router } from 'express';
import { protect } from '../middleware/protect';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';
import { forumTitleSchema } from '../validators/forumSchemas';
import {
  getForum,
  createForum,
  updateForum,
  deleteForum,
} from '../controllers/forumController';

const forumRouter = Router();

forumRouter.get('/:forumId', getForum);
forumRouter.post(
  '/',
  protect,
  restrictTo('admin', 'moderator'),
  validate(forumTitleSchema),
  createForum
);
forumRouter.patch(
  '/:forumId',
  protect,
  restrictTo('admin', 'moderator'),
  validate(forumTitleSchema),
  updateForum
);
forumRouter.delete('/:forumId', protect, restrictTo('admin'), deleteForum);

export { forumRouter };
