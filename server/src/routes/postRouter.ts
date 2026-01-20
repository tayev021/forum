import { Router } from 'express';
import { protect } from '../middleware/protect';
import { validate } from '../middleware/validate';
import { postContentSchema } from '../validators/postSchemas';
import {
  getLatestPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/postController';
import { restrictTo } from '../middleware/restrictTo';

const postRouter = Router();

postRouter.get('/latest', getLatestPosts);
postRouter.post('/', protect, validate(postContentSchema), createPost);
postRouter.post('/:postId/like', protect, likePost);
postRouter.patch('/:postId', protect, validate(postContentSchema), updatePost);
postRouter.delete(
  '/:postId',
  protect,
  restrictTo('admin', 'moderator'),
  deletePost,
);

export { postRouter };
