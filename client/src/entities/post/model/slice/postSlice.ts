import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import type { LatestPost } from '../types/LatestPost';
import { getLatestPosts } from '../thunks/getLatestPosts';
import { createPost } from '../thunks/createPost';

interface PostState {
  latestPosts: LatestPost[];
  isLoading: boolean;
  error: ServerError | null;
}

const initialState: PostState = {
  latestPosts: [],
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPostError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLatestPosts.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      getLatestPosts.fulfilled,
      (state, action: PayloadAction<LatestPost[]>) => {
        state.latestPosts = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getLatestPosts.rejected, (state, _action) => {
      state.latestPosts = [];
      state.isLoading = false;
    });

    builder.addCase(createPost.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createPost.fulfilled, (state, _action) => {
      state.isLoading = false;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });
  },
});

export const postReducer = postSlice.reducer;
export const { clearPostError } = postSlice.actions;
