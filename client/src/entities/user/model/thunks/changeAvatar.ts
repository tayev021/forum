import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../../../../shared/types/User';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const changeAvatar = createAsyncThunk<
  User,
  FormData,
  { rejectValue: ServerError }
>('user/changeAvatar', async function (formData, thunkAPI) {
  const response = await fetch(`${API_URL}/users/avatar`, {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { user: User } = await response.json();

  return json.user;
});
