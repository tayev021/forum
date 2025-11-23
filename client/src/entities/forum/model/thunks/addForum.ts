import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../../shared/constants';
import type { ForumData } from '../types/ForumData';

export const addForum = createAsyncThunk<void, ForumData, { rejectValue: any }>(
  'forum/addForum',
  async function (forumData, thunkAPI) {
    const response = await fetch(`${API_URL}/forums`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(forumData),
    });

    if (!response.ok) {
      const errors = await response.json();
      return thunkAPI.rejectWithValue(errors);
    }
  }
);
