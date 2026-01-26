import type { Statistic } from '../types/Statistic';
import type { ServerError } from '../../../../shared/types/ServerError';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../../shared/constants';

export const getStatistic = createAsyncThunk<
  Statistic,
  void,
  { rejectValue: ServerError }
>('statistic/getStatistic', async function (_, thunkAPI) {
  try {
    const response = await fetch(`${API_URL}/statistic`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const errors = await response.json();
      return thunkAPI.rejectWithValue(errors);
    }

    const statistic: Statistic = await response.json();

    return statistic;
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
