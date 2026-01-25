import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';
import type { Reports } from '../types/Reports';

export const rejectReport = createAsyncThunk<
  Reports,
  { reportId: number; page?: number },
  { rejectValue: ServerError }
>('post/rejectReport', async function ({ reportId, page = 1 }, thunkAPI) {
  const response = await fetch(
    `${API_URL}/reports/${reportId}/reject?page=${page}`,
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
