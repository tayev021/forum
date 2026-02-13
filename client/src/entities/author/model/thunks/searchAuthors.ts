import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SearchedAuthor } from '../types/SearchedAuthor';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const searchAuthors = createAsyncThunk<
  SearchedAuthor[],
  { query: string },
  { rejectValue: ServerError }
>('post/searchAuthors', async function ({ query }, thunkAPI) {
  const response = await fetch(`${API_URL}/authors/search?query=${query}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const errors = await response.json();
    return thunkAPI.rejectWithValue(errors);
  }

  const json: { authors: SearchedAuthor[] } = await response.json();

  return json.authors;
});
