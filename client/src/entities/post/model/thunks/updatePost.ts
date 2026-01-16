import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';
import type { Post } from '../types/Post';

export const updatePost = createAsyncThunk<
  Post,
  { postId: number; content: string },
  { rejectValue: ServerError }
>('post/updatePost', async function ({ postId, content }, thunkAPI) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { post: Post } = await response.json();

  return json.post;
});
