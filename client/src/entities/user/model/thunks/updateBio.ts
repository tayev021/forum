import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../types/User';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const updateBio = createAsyncThunk<
  User,
  { bio: string },
  { rejectValue: ServerError }
>('user/updateBio', async function ({ bio }, thunkAPI) {
  const response = await fetch(`${API_URL}/users/bio`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bio }),
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { user: User } = await response.json();

  return json.user;
});
