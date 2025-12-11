import { Router } from 'express';
import { protect } from '../middleware/protect';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';
import { forumSchema } from '../validators/forumValidator';
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
  validate(forumSchema),
  createForum
);
forumRouter.patch(
  '/:forumId',
  protect,
  restrictTo('admin', 'moderator'),
  validate(forumSchema),
  updateForum
);
forumRouter.delete('/:forumId', protect, restrictTo('admin'), deleteForum);

export { forumRouter };
