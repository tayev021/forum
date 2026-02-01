import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const deletePostAttachment = createAsyncThunk<
  void,
  { attachmentId: number },
  { rejectValue: ServerError }
>('post/deletePostAttachment', async function ({ attachmentId }, thunkAPI) {
  const response = await fetch(`${API_URL}/attachments/${attachmentId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }
});
