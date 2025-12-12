import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Forum } from '../types/Forum';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const updateForum = createAsyncThunk<
  Forum,
  { forumId: number; title: string },
  { rejectValue: ServerError }
>('forum/updateForum', async function ({ forumId, title }, thunkAPI) {
  const response = await fetch(`${API_URL}/forums/${forumId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { forum: Forum } = await response.json();

  return json.forum;
});
