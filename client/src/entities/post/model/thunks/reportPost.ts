import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Post } from '../types/Post';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const reportPost = createAsyncThunk<
  Post,
  { postId: number; reason: string },
  { rejectValue: ServerError }
>('post/reportPost', async function ({ postId, reason }, thunkAPI) {
  const response = await fetch(`${API_URL}/posts/${postId}/report`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reason }),
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { post: Post } = await response.json();

  return json.post;
});
