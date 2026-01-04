import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const deleteAccount = createAsyncThunk<
  void,
  void,
  { rejectValue: ServerError }
>('user/deleteAccount', async function (_, thunkAPI) {
  const response = await fetch(`${API_URL}/users/`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }
});
