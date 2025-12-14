import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const deleteThread = createAsyncThunk<
  void,
  { threadId: number },
  { rejectValue: ServerError }
>('thread/deleteThread', async function ({ threadId }, thunkAPI) {
  const response = await fetch(`${API_URL}/threads/${threadId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }
});
