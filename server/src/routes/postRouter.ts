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
  reportPost,
} from '../controllers/postController';
import { restrictTo } from '../middleware/restrictTo';
import { reportSchema } from '../validators/reportSchemas';
import { uploadPostImages } from '../middleware/upload';
import { resizePostImages } from '../middleware/resizePostImages';

const postRouter = Router();

postRouter.get('/latest', getLatestPosts);
postRouter.post(
  '/',
  protect,
  uploadPostImages,
  resizePostImages,
  validate(postContentSchema),
  createPost
);
postRouter.post('/:postId/like', protect, likePost);
postRouter.post(
  '/:postId/report',
  protect,
  restrictTo('user'),
  validate(reportSchema),
  reportPost
);
postRouter.patch(
  '/:postId',
  protect,
  uploadPostImages,
  resizePostImages,
  validate(postContentSchema),
  updatePost
);
postRouter.delete(
  '/:postId',
  protect,
  restrictTo('admin', 'moderator'),
  deletePost
);

export { postRouter };
