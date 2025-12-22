import { Router } from 'express';
import { protect } from '../middleware/protect';
import { validate } from '../middleware/validate';
import { postContentSchema } from '../validators/postSchemas';
import {
  getLatestPosts,
  getAuthorPosts,
  createPost,
  updatePost,
} from '../controllers/postController';

const postRouter = Router();

postRouter.get('/latest', getLatestPosts);
postRouter.get('/author/:authorId', getAuthorPosts);
postRouter.post('/', protect, validate(postContentSchema), createPost);
postRouter.patch('/:postId', protect, validate(postContentSchema), updatePost);

export { postRouter };
