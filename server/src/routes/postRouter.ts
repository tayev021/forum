import { Router } from 'express';
import { protect } from '../middleware/protect';
import { validate } from '../middleware/validate';
import { postSchema } from '../validators/postValidator';
import { createPost } from '../controllers/postController';

const postRouter = Router();

postRouter.post('/', protect, validate(postSchema), createPost);

export { postRouter };
