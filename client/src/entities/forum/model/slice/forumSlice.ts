import type { Forum } from '../types/Forum';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { getForum } from '../thunks/getForum';
import { addForum } from '../thunks/addForum';
import { deleteForum } from '../thunks/deleteForum';

interface forumState {
  forum: Forum | null;
  isLoading: boolean;
  error: ServerError | null;
}

const initialState: forumState = {
  forum: null,
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
    builder.addCase(getForum.pending, (state, _action) => {
      state.forum = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getForum.fulfilled,
      (state, action: PayloadAction<Forum>) => {
        state.forum = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getForum.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

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

    builder.addCase(deleteForum.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteForum.fulfilled, (state, _action) => {
      state.forum = null;
      state.isLoading = false;
    });
    builder.addCase(deleteForum.rejected, (state, action) => {
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
