import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../../shared/constants';
import type { Category } from '../types/Category';

export const deleteCategory = createAsyncThunk<
  Category[],
  { categoryId: number },
  { rejectValue: any }
>('category/deleteCategory', async function ({ categoryId }, thunkAPI) {
  const response = await fetch(`${API_URL}/categories/${categoryId}`, {
    method: 'delete',
    credentials: 'include',
  });

  if (!response.ok) {
    const errors = await response.json();
    return thunkAPI.rejectWithValue(errors);
  }

  const json: { categories: Category[] } = await response.json();

  return json.categories;
});
