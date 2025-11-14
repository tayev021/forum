import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../types/User';
import type { SignupData } from '../types/SignupData';
import { API_URL } from '../../../../shared/constants';

export const signup = createAsyncThunk<User, SignupData, { rejectValue: any }>(
  'user/signup',
  async function (signupData, thunkAPI) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      const errors = await response.json();
      return thunkAPI.rejectWithValue(errors);
    }

    const json: { user: User } = await response.json();

    return json.user;
  }
);
