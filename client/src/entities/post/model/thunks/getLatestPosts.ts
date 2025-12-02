import { createAsyncThunk } from '@reduxjs/toolkit';
import type { LatestPost } from '../types/LatestPost';
import { API_URL } from '../../../../shared/constants';

export const getLatestPosts = createAsyncThunk<
  LatestPost[],
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

  const json: { posts: LatestPost[] } = await response.json();

  return json.posts;
});
