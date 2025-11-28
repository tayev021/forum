import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Forum } from '../types/Forum';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const getForum = createAsyncThunk<
  Forum,
  { forumId: number; page?: number },
  { rejectValue: ServerError }
>('forum/getForum', async function ({ forumId, page = 1 }, thunkAPI) {
  const response = await fetch(`${API_URL}/forums/${forumId}?page=${page}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { forum: Forum } = await response.json();

  return json.forum;
});
