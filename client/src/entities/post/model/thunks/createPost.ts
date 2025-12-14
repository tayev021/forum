import { createAsyncThunk } from '@reduxjs/toolkit';
import type { PostData } from '../types/PostData';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const createPost = createAsyncThunk<
  void,
  PostData,
  { rejectValue: ServerError }
>('post/createPost', async function ({ threadId, content }, thunkAPI) {
  const response = await fetch(`${API_URL}/posts?threadId=${threadId}`, {
    method: 'POST',
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
});
