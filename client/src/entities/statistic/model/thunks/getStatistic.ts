import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Statistic } from '../types/Statistic';
import { API_URL } from '../../../../shared/constants';

export const getStatistic = createAsyncThunk<
  Statistic,
  void,
  { rejectValue: any }
>('statistic/getStatistic', async function (_, thunkAPI) {
  const response = await fetch(`${API_URL}/statistic`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const errors = await response.json();
    return thunkAPI.rejectWithValue(errors);
  }

  const statistic: Statistic = await response.json();

  return statistic;
});
