import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Category } from '../types/Category';
import { API_URL } from '../../../../shared/constants';

export const getCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: any }
>('category/getCategories', async function (_, thunkAPI) {
  const response = await fetch(`${API_URL}/categories`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const errors = await response.json();
    return thunkAPI.rejectWithValue(errors);
  }

  const json: { categories: Category[] } = await response.json();

  return json.categories;
});
