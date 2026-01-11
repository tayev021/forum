import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserSubscriptions } from '../types/UserSubscriptions';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const getUserSubscriptions = createAsyncThunk<
  UserSubscriptions,
  { page?: number },
  { rejectValue: ServerError }
>('user/getUserSubscriptions', async function ({ page = 1 }, thunkAPI) {
  const response = await fetch(`${API_URL}/users/subscriptions?page=${page}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const userSubscriptions: UserSubscriptions = await response.json();

  return userSubscriptions;
});
