import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ForumData } from '../types/ForumData';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const createForum = createAsyncThunk<
  void,
  ForumData,
  { rejectValue: ServerError }
>('forum/createForum', async function (forumData, thunkAPI) {
  const response = await fetch(`${API_URL}/forums`, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(forumData),
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }
});
