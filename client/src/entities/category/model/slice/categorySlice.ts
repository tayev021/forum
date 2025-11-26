import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../types/Category';
import { getCategories } from '../thunks/getCategories';
import { addCategory } from '../thunks/addCategory';
import { deleteCategory } from '../thunks/deleteCategory';
import type { ServerError } from '../../../../shared/types/ServerError';

interface categoryState {
  categories: Category[];
  isLoading: boolean;
  error: ServerError | null;
}

const initialState: categoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearCategoryError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      getCategories.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getCategories.rejected, (state, _action) => {
      state.categories = [];
      state.isLoading = false;
    });

    builder.addCase(addCategory.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      addCategory.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(addCategory.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(deleteCategory.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteCategory.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });
  },
});

export const categoryReducer = categorySlice.reducer;
export const { clearCategoryError } = categorySlice.actions;
