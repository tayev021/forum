import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SearchedPost } from '../types/SearchedPost';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const searchPosts = createAsyncThunk<
  SearchedPost[],
  { query: string },
  { rejectValue: ServerError }
>('post/searchPosts', async function ({ query }, thunkAPI) {
  const response = await fetch(`${API_URL}/posts/search?query=${query}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const errors = await response.json();
    return thunkAPI.rejectWithValue(errors);
  }

  const json: { posts: SearchedPost[] } = await response.json();

  return json.posts;
});
