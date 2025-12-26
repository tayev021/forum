import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthorThreads } from '../types/AuthorThreads';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const getAuthorThreads = createAsyncThunk<
  AuthorThreads,
  { authorId: number; page?: number },
  { rejectValue: ServerError }
>('thread/getAuthorThreads', async function ({ authorId, page = 1 }, thunkAPI) {
  const response = await fetch(
    `${API_URL}/threads/author/${authorId}?page=${page}`,
    {
      credentials: 'include',
    }
  );

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const authorThreads: AuthorThreads = await response.json();

  return authorThreads;
});
