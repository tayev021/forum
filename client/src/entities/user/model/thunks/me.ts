import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../types/User';
import { API_URL } from '../../../../shared/constants';

export const me = createAsyncThunk<User, void, { rejectValue: any }>(
  'user/me',
  async function (_, thunkAPI) {
    const response = await fetch(`${API_URL}/auth/me`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const errors = await response.json();
      return thunkAPI.rejectWithValue(errors);
    }

    const json: { user: User } = await response.json();

    return json.user;
  }
);
