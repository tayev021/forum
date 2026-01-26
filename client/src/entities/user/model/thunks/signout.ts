import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const signout = createAsyncThunk<
  void,
  void,
  { rejectValue: ServerError }
>('user/signout', async function (_, thunkAPI) {
  try {
    const response = await fetch(`${API_URL}/auth/signout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue({
        type: 'general',
        message: 'The server is not responding',
      });
    } else {
      return thunkAPI.rejectWithValue({
        type: 'general',
        message: 'Unknown error',
      });
    }
  }
});
