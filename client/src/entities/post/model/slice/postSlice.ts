import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '../types/Post';
import { getLatestPosts } from '../thunks/getLatestPosts';

interface PostState {
  latestPosts: Post[];
  isLoading: boolean;
}

const initialState: PostState = {
  latestPosts: [],
  isLoading: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLatestPosts.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      getLatestPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.latestPosts = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getLatestPosts.rejected, (state, _action) => {
      state.latestPosts = [];
      state.isLoading = false;
    });
  },
});

export const postReducer = postSlice.reducer;
