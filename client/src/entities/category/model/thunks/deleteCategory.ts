import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const deleteCategory = createAsyncThunk<
  number,
  { categoryId: number },
  { rejectValue: ServerError }
>('category/deleteCategory', async function ({ categoryId }, thunkAPI) {
  const response = await fetch(`${API_URL}/categories/${categoryId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  return categoryId;
});
