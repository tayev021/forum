import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Reports } from '../types/Reports';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const getReports = createAsyncThunk<
  Reports,
  { page?: number },
  { rejectValue: ServerError }
>('post/getReports', async function ({ page = 1 }, thunkAPI) {
  const response = await fetch(`${API_URL}/reports?page=${page}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const errors = await response.json();
    return thunkAPI.rejectWithValue(errors);
  }

  const json: { reports: Reports } = await response.json();

  return json.reports;
});
