import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../types/Category';
import { getCategories } from '../thunks/getCategories';

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
  },
});

export const categoryReducer = categorySlice.reducer;
