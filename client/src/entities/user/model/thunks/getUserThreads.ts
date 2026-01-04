import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserThreads } from '../types/UserThreads';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const getUserThreads = createAsyncThunk<
  UserThreads,
  { userId: number; page?: number },
  { rejectValue: ServerError }
>('user/getUserThreads', async function ({ userId, page = 1 }, thunkAPI) {
  const response = await fetch(
    `${API_URL}/users/${userId}/threads?page=${page}`,
    {
      credentials: 'include',
    }
  );

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const userThreads: UserThreads = await response.json();

  return userThreads;
});
