import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserPosts } from '../types/UserPosts';
import { API_URL } from '../../../../shared/constants';

export const getUserPosts = createAsyncThunk<
  UserPosts,
  { userId: number; page: number },
  { rejectValue: any }
>('user/getUserPosts', async function ({ userId, page }, thunkAPI) {
  const response = await fetch(
    `${API_URL}/users/${userId}/posts?page=${page}`,
    {
      credentials: 'include',
    }
  );

  if (!response.ok) {
    const errors = await response.json();
    return thunkAPI.rejectWithValue(errors);
  }

  const authorPosts: UserPosts = await response.json();

  return authorPosts;
});
