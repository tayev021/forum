import type { SearchedPost } from '../types/SearchedPost';
import type { ServerError } from '../../../../shared/types/ServerError';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../../shared/constants';

export const getLatestPosts = createAsyncThunk<
  SearchedPost[],
  void,
  { rejectValue: ServerError }
>('post/getLatestPosts', async function (_, thunkAPI) {
  try {
    const response = await fetch(`${API_URL}/posts/latest`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const errors = await response.json();
      return thunkAPI.rejectWithValue(errors);
    }

    const json: { posts: SearchedPost[] } = await response.json();

    return json.posts;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue({
        type: 'general',
        message: 'The server is not responding',
      });
    } else {
      return thunkAPI.rejectWithValue({
        type: 'general',
        message: 'Unknown error',
      });
    }
  }
});
