import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Statistic } from '../types/Statistic';
import { getStatistic } from '../thunks/getStatistic';
import type { ServerError } from '../../../../shared/types/ServerError';

interface StatisticState extends Statistic {
  isLoading: boolean;
  error: ServerError | null;
}

const initialState: StatisticState = {
  posts: 0,
  threads: 0,
  forums: 0,
  members: 0,
  isLoading: false,
  error: null,
};

const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatistic.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getStatistic.fulfilled,
      (state, action: PayloadAction<Statistic>) => {
        state.posts = action.payload.posts;
        state.threads = action.payload.threads;
        state.forums = action.payload.forums;
        state.members = action.payload.members;
        state.isLoading = false;
        state.error = null;
      },
    );
    builder.addCase(getStatistic.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });
  },
});

export const statisticReducer = statisticSlice.reducer;
