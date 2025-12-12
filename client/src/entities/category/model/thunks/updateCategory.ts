import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Category } from '../types/Category';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const updateCategory = createAsyncThunk<
  Category,
  { categoryId: number; title: string },
  { rejectValue: ServerError }
>('category/updateCategory', async function ({ categoryId, title }, thunkAPI) {
  const response = await fetch(`${API_URL}/categories/${categoryId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { category: Category } = await response.json();

  return json.category;
});
