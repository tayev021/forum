import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Post } from '../types/Post';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const likePost = createAsyncThunk<
  Post,
  { postId: number },
  { rejectValue: ServerError }
>('post/likePost', async function ({ postId }, thunkAPI) {
  const response = await fetch(`${API_URL}/posts/${postId}/like`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { post: Post } = await response.json();

  return json.post;
});
