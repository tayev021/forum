import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Category } from '../types/Category';
import type { CategoryData } from '../types/CategoryData';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const addCategory = createAsyncThunk<
  Category[],
  CategoryData,
  { rejectValue: ServerError }
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
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { categories: Category[] } = await response.json();

  return json.categories;
});
