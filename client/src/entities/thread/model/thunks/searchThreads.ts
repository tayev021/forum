import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SearchedThread } from '../types/SearchedThread';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const searchThreads = createAsyncThunk<
  SearchedThread[],
  { query: string },
  { rejectValue: ServerError }
>('post/searchThreads', async function ({ query }, thunkAPI) {
  const response = await fetch(`${API_URL}/threads/search?query=${query}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const errors = await response.json();
    return thunkAPI.rejectWithValue(errors);
  }

  const json: { threads: SearchedThread[] } = await response.json();

  return json.threads;
});
