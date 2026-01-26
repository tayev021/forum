import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Thread } from '../types/Thread';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const getThread = createAsyncThunk<
  Thread,
  { threadId: number; page?: number },
  { rejectValue: ServerError }
>('thread/getThread', async function ({ threadId, page = 1 }, thunkAPI) {
  try {
    const response = await fetch(
      `${API_URL}/threads/${threadId}?page=${page}`,
      {
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error);
    }

    const json: { thread: Thread } = await response.json();

    return json.thread;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue({
        type: 'general',
        message: 'The server is not responding',
      });
    } else {
      return thunkAPI.rejectWithValue({
        type: 'general',
        message: 'Unknown error',
      });
    }
  }
});
