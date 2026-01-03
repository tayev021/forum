import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../../../../shared/types/User';
import type { SignupData } from '../types/SignupData';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const signup = createAsyncThunk<
  User,
  SignupData,
  { rejectValue: ServerError }
>('user/signup', async function (signupData, thunkAPI) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupData),
  });

  if (!response.ok) {
    const error: ServerError = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { user: User } = await response.json();

  return json.user;
});
