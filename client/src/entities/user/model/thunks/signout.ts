import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../../shared/constants';

export const signout = createAsyncThunk<void, void, { rejectValue: any }>(
  'user/signout',
  async function (_, thunkAPI) {
    const response = await fetch(`${API_URL}/auth/signout`, {
      method: 'post',
      credentials: 'include',
    });

    if (!response.ok) {
      const errors = await response.json();
      return thunkAPI.rejectWithValue(errors);
    }
  }
);
