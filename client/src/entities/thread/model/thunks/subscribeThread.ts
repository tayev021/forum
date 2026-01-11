import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const subscribeThread = createAsyncThunk<
  void,
  { threadId: number },
  { rejectValue: ServerError }
>('thread/subscribeThread', async function ({ threadId }, thunkAPI) {
  const response = await fetch(`${API_URL}/threads/${threadId}/subscribe`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }
});
