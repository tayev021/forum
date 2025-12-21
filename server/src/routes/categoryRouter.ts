import { Router } from 'express';
import { protect } from '../middleware/protect';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';
import { categoryTitleSchema } from '../validators/categorySchemas';
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
  validate(categoryTitleSchema),
  createCategory
);
categoryRouter.patch(
  '/:categoryId',
  protect,
  restrictTo('admin', 'moderator'),
  validate(categoryTitleSchema),
  updateCategory
);
categoryRouter.delete(
  '/:categoryId',
  protect,
  restrictTo('admin'),
  deleteCategory
);

export { categoryRouter };
