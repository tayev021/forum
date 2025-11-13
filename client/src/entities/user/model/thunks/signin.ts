import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../../shared/constants';
import type { User } from '../types/User';

interface SigninData {
  email: string;
  password: string;
}

export const signin = createAsyncThunk<User, SigninData, { rejectValue: any }>(
  'user/signin',
  async function (signinData, thunkAPI) {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signinData),
    });

    if (!response.ok) {
      const errors = await response.json();
      return thunkAPI.rejectWithValue(errors);
    }

    const user: User = await response.json();

    return user;
  }
);
