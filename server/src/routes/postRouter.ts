import { Router } from 'express';
import { protect } from '../middleware/protect';
import { validate } from '../middleware/validate';
import { createPostSchema } from '../validators/createPostValidator';
import { createPost } from '../controllers/postController';

const postRouter = Router();

postRouter.post('/', protect, validate(createPostSchema), createPost);

export { postRouter };
