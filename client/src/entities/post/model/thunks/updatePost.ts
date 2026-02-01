import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';
import type { Post } from '../types/Post';

export const updatePost = createAsyncThunk<
  Post,
  { postId: number; formData: FormData },
  { rejectValue: ServerError }
>('post/updatePost', async function ({ postId, formData }, thunkAPI) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { post: Post } = await response.json();

  return json.post;
});
