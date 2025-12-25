import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthorPosts } from '../types/AuthorPosts';
import { API_URL } from '../../../../shared/constants';

export const getAuthorPosts = createAsyncThunk<
  AuthorPosts,
  { authorId: number; page: number },
  { rejectValue: any }
>('post/getAuthorPosts', async function ({ authorId, page }, thunkAPI) {
  const response = await fetch(
    `${API_URL}/posts/author/${authorId}?page=${page}`,
    {
      credentials: 'include',
    }
  );

  if (!response.ok) {
    const errors = await response.json();
    return thunkAPI.rejectWithValue(errors);
  }

  const authorPosts: AuthorPosts = await response.json();

  return authorPosts;
});
