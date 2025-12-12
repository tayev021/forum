import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Thread } from '../types/Thread';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const updateThread = createAsyncThunk<
  Thread,
  { threadId: number; title: string },
  { rejectValue: ServerError }
>('thread/updateThread', async function ({ threadId, title }, thunkAPI) {
  const response = await fetch(`${API_URL}/threads/${threadId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { thread: Thread } = await response.json();

  return json.thread;
});
