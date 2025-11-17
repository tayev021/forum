import { Router } from 'express';
import { protect } from '../middleware/protect';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';
import { forumSchema } from '../validators/forumValidator';
import { createForum } from '../controllers/forumController';

const forumRouter = Router();

forumRouter.post(
  '/',
  protect,
  restrictTo('admin', 'moderator'),
  validate(forumSchema),
  createForum
);

export { forumRouter };
