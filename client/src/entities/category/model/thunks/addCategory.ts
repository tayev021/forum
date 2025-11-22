import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../../shared/constants';
import type { CategoryData } from '../types/CategoryData';
import type { Category } from '../types/Category';

export const addCategory = createAsyncThunk<
  Category[],
  CategoryData,
  { rejectValue: any }
>('category/addCategory', async function (categoryData, thunkAPI) {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    const errors = await response.json();
    return thunkAPI.rejectWithValue(errors);
  }

  const json: { categories: Category[] } = await response.json();

  return json.categories;
});
