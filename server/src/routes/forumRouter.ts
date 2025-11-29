import { Router } from 'express';
import { protect } from '../middleware/protect';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';
import { forumSchema } from '../validators/forumValidator';
import {
  getForum,
  createForum,
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
forumRouter.delete('/:forumId', protect, restrictTo('admin'), deleteForum);

export { forumRouter };
