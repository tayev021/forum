import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../../../../shared/types/User';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const me = createAsyncThunk<User, void, { rejectValue: ServerError }>(
  'user/me',
  async function (_, thunkAPI) {
    const response = await fetch(`${API_URL}/auth/me`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error);
    }

    const json: { user: User } = await response.json();

    return json.user;
  }
);
