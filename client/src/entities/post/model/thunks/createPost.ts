import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Post } from '../types/Post';
import type { PostData } from '../types/PostData';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const createPost = createAsyncThunk<
  Post,
  PostData,
  { rejectValue: ServerError }
>('post/createPost', async function ({ threadId, formData }, thunkAPI) {
  const response = await fetch(`${API_URL}/posts?threadId=${threadId}`, {
    method: 'POST',
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
