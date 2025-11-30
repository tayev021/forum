import {
  categoryReducer,
  clearCategoryError,
} from './model/slice/categorySlice';
import { useCategories } from './lib/hooks/useCategories';
import { getCategories } from './model/thunks/getCategories';
import { addCategory } from './model/thunks/addCategory';
import { deleteCategory } from './model/thunks/deleteCategory';

export {
  categoryReducer,
  clearCategoryError,
  useCategories,
  getCategories,
  addCategory,
  deleteCategory,
};
