import { createSlice } from '@reduxjs/toolkit';
import { addForum } from '../thunks/addForum';
import type { ServerError } from '../../../../shared/types/ServerError';

interface forumState {
  isLoading: boolean;
  error: ServerError | null;
}

const initialState: forumState = {
  isLoading: false,
  error: null,
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    clearForumError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addForum.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addForum.fulfilled, (state, _action) => {
      state.isLoading = false;
    });
    builder.addCase(addForum.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });
  },
});

export const forumReducer = forumSlice.reducer;
export const { clearForumError } = forumSlice.actions;
