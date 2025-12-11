import { Router } from 'express';
import { protect } from '../middleware/protect';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';
import { categorySchema } from '../validators/categoryValidator';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.post(
  '/',
  protect,
  restrictTo('admin', 'moderator'),
  validate(categorySchema),
  createCategory
);
categoryRouter.patch(
  '/:categoryId',
  protect,
  restrictTo('admin', 'moderator'),
  validate(categorySchema),
  updateCategory
);
categoryRouter.delete(
  '/:categoryId',
  protect,
  restrictTo('admin'),
  deleteCategory
);

export { categoryRouter };
