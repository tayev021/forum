import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Reports } from '../types/Reports';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const banPost = createAsyncThunk<
  Reports,
  { reportId: number; page?: number },
  { rejectValue: ServerError }
>('post/banPost', async function ({ reportId, page = 1 }, thunkAPI) {
  const response = await fetch(
    `${API_URL}/reports/${reportId}/ban/post?page=${page}`,
    {
      method: 'POST',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const errors = await response.json();
    return thunkAPI.rejectWithValue(errors);
  }

  const json: { reports: Reports } = await response.json();

  return json.reports;
});
