import { Router } from 'express';
import { protect } from '../middleware/protect';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';
import { categorySchema } from '../validators/categoryValidator';
import { createCategory } from '../controllers/categoryController';

const categoryRouter = Router();

categoryRouter.post(
  '/',
  protect,
  restrictTo('admin', 'moderator'),
  validate(categorySchema),
  createCategory
);

export { categoryRouter };
