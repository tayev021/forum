import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Statistic } from '../types/Statistic';
import { getStatistic } from '../thunks/getStatistic';

interface StatisticState extends Statistic {
  isLoading: boolean;
}

const initialState: StatisticState = {
  posts: 0,
  threads: 0,
  forums: 0,
  members: 0,
  isLoading: false,
};

const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatistic.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      getStatistic.fulfilled,
      (state, action: PayloadAction<Statistic>) => {
        state.posts = action.payload.posts;
        state.threads = action.payload.threads;
        state.forums = action.payload.forums;
        state.members = action.payload.members;
        state.isLoading = false;
      }
    );
    builder.addCase(getStatistic.rejected, (state, _action) => {
      state.posts = 0;
      state.threads = 0;
      state.forums = 0;
      state.members = 0;
      state.isLoading = false;
    });
  },
});

export const statisticReducer = statisticSlice.reducer;
