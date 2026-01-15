import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Author } from '../types/Author';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const getAuthor = createAsyncThunk<
  Author,
  { authorId: number },
  { rejectValue: ServerError }
>('author/GetAuthor', async function ({ authorId }, thunkAPI) {
  const response = await fetch(`${API_URL}/authors/${authorId}/profile`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { author: Author } = await response.json();

  return json.author;
});
