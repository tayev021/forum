import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Post } from '../types/Post';
import { API_URL } from '../../../../shared/constants';

export const getLatestPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: any }
>('post/getLatestPosts', async function (_, thunkAPI) {
  const response = await fetch(`${API_URL}/posts/latest`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const errors = await response.json();
    return thunkAPI.rejectWithValue(errors);
  }

  const json: { posts: Post[] } = await response.json();

  return json.posts;
});
