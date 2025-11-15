import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../types/User';
import type { SigninData } from '../types/SigninData';
import { API_URL } from '../../../../shared/constants';

export const signin = createAsyncThunk<User, SigninData, { rejectValue: any }>(
  'user/signin',
  async function (signinData, thunkAPI) {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signinData),
    });

    if (!response.ok) {
      const errors = await response.json();
      return thunkAPI.rejectWithValue(errors);
    }

    const json: { user: User } = await response.json();

    return json.user;
  }
);
