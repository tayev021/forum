import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Thread } from '../types/Thread';
import type { ThreadData } from '../types/ThreadData';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const createThread = createAsyncThunk<
  Thread,
  ThreadData,
  { rejectValue: ServerError }
>('forum/createForum', async function ({ forumId, title, content }, thunkAPI) {
  const response = await fetch(`${API_URL}/threads?forumId=${forumId}`, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }

  const json: { thread: Thread } = await response.json();

  return json.thread;
});
