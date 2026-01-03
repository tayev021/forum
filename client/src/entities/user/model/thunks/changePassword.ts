import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../../../../shared/types/User';
import type { PasswordData } from '../types/PasswordData';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const changePassword = createAsyncThunk<
  User,
  PasswordData,
  { rejectValue: ServerError }
>('user/changePassword', async function (passwordData, thunkAPI) {
  const response = await fetch(`${API_URL}/users/password`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(passwordData),
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { user: User } = await response.json();

  return json.user;
});
