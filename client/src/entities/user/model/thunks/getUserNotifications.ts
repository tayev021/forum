import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserNotifications } from '../types/UserNotifications';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const getUserNotifications = createAsyncThunk<
  UserNotifications,
  { page?: number },
  { rejectValue: ServerError }
>('user/getUserNotifications', async function ({ page = 1 }, thunkAPI) {
  const response = await fetch(`${API_URL}/users/notifications?page=${page}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const userNotifications: UserNotifications = await response.json();

  return userNotifications;
});
