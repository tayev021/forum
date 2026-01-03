import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../../../../shared/types/User';
import type { SigninData } from '../types/SigninData';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const signin = createAsyncThunk<
  User,
  SigninData,
  { rejectValue: ServerError }
>('user/signin', async function (signinData, thunkAPI) {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signinData),
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { user: User } = await response.json();

  return json.user;
});
