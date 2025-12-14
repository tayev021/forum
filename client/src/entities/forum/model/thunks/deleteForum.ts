import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const deleteForum = createAsyncThunk<
  void,
  { forumId: number },
  { rejectValue: ServerError }
>('forum/deleteForum', async function ({ forumId }, thunkAPI) {
  const response = await fetch(`${API_URL}/forums/${forumId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }
});
