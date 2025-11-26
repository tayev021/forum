import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Category } from '../types/Category';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const getCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: ServerError }
>('category/getCategories', async function (_, thunkAPI) {
  const response = await fetch(`${API_URL}/categories`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { categories: Category[] } = await response.json();

  return json.categories;
});
