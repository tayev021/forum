import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const deletePost = createAsyncThunk<
  void,
  { postId: number },
  { rejectValue: ServerError }
>('post/deletePost', async function ({ postId }, thunkAPI) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }
});
