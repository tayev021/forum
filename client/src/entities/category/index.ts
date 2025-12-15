import {
  categoryReducer,
  clearCategoryError,
} from './model/slice/categorySlice';
import { useCategory } from './lib/hooks/useCategory';
import { useCategories } from './lib/hooks/useCategories';
import { getCategories } from './model/thunks/getCategories';
import { createCategory } from './model/thunks/createCategory';
import { updateCategory } from './model/thunks/updateCategory';
import { deleteCategory } from './model/thunks/deleteCategory';
import { type Category } from './model/types/Category';

export {
  categoryReducer,
  clearCategoryError,
  useCategory,
  useCategories,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type Category,
};
