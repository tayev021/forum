import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../types/Category';
import { getCategories } from '../thunks/getCategories';
import { addCategory } from '../thunks/addCategory';
import { deleteCategory } from '../thunks/deleteCategory';

interface categoryState {
  categories: Category[];
  isLoading: boolean;
}

const initialState: categoryState = {
  categories: [],
  isLoading: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
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
    builder.addCase(addCategory.rejected, (state, _action) => {
      state.isLoading = false;
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
    builder.addCase(deleteCategory.rejected, (state, _action) => {
      state.isLoading = false;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
