import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Thread } from '../types/Thread';
import type { ThreadData } from '../types/ThreadData';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const createThread = createAsyncThunk<
  Thread,
  ThreadData,
  { rejectValue: ServerError }
>('thread/createThread', async function ({ forumId, formData }, thunkAPI) {
  const response = await fetch(`${API_URL}/threads?forumId=${forumId}`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { thread: Thread } = await response.json();

  return json.thread;
});
