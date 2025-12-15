import type { Forum } from '../types/Forum';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import { getForum } from '../thunks/getForum';
import { createForum } from '../thunks/createForum';
import { deleteForum } from '../thunks/deleteForum';
import { updateForum } from '../thunks/updateForum';

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

    builder.addCase(createForum.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createForum.fulfilled, (state, _action) => {
      state.isLoading = false;
    });
    builder.addCase(createForum.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(updateForum.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateForum.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.forum = { ...state.forum, title: action.payload } as Forum;
        state.isLoading = false;
      }
    );
    builder.addCase(updateForum.rejected, (state, action) => {
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
