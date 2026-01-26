import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Forum } from '../types/Forum';
import type { SortKey } from '../types/SortKey';
import type { SortOrder } from '../types/SortOrder';
import type { ServerError } from '../../../../shared/types/ServerError';
import { API_URL } from '../../../../shared/constants';

export const getForum = createAsyncThunk<
  Forum,
  { forumId: number; page?: number; sortKey?: SortKey; sortOrder?: SortOrder },
  { rejectValue: ServerError }
>(
  'forum/getForum',
  async function (
    { forumId, page = 1, sortKey = 'updatedAt', sortOrder = 'DESC' },
    thunkAPI,
  ) {
    try {
      const response = await fetch(
        `${API_URL}/forums/${forumId}?page=${page}&sortKey=${sortKey}&sortOrder=${sortOrder}`,
        {
          credentials: 'include',
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }

      const json: { forum: Forum } = await response.json();

      return json.forum;
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
  },
);
