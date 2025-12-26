import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import type { Thread } from '../types/Thread';
import type { AuthorThreads } from '../types/AuthorThreads';
import { getThread } from '../thunks/getThread';
import { getAuthorThreads } from '../thunks/getAuthorThreads';
import { createThread } from '../thunks/createThread';
import { deleteThread } from '../thunks/deleteThread';
import { updateThread } from '../thunks/updateThread';

interface ThreadState {
  thread: Thread | null;
  authorThreads: AuthorThreads | null;
  isLoading: boolean;
  error: ServerError | null;
}

const initialState: ThreadState = {
  thread: null,
  authorThreads: null,
  isLoading: false,
  error: null,
};

const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    clearThreadError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getThread.pending, (state, _action) => {
      state.thread = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getThread.fulfilled,
      (state, action: PayloadAction<Thread>) => {
        state.thread = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getThread.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(getAuthorThreads.pending, (state, _action) => {
      state.thread = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getAuthorThreads.fulfilled,
      (state, action: PayloadAction<AuthorThreads>) => {
        state.authorThreads = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getAuthorThreads.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(createThread.pending, (state, _action) => {
      state.thread = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      createThread.fulfilled,
      (state, action: PayloadAction<Thread>) => {
        state.thread = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(createThread.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(updateThread.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateThread.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.thread = { ...state.thread, title: action.payload } as Thread;
        state.isLoading = false;
      }
    );
    builder.addCase(updateThread.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(deleteThread.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteThread.fulfilled, (state, _action) => {
      state.thread = null;
      state.isLoading = false;
    });
    builder.addCase(deleteThread.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });
  },
});

export const threadReducer = threadSlice.reducer;
export const { clearThreadError } = threadSlice.actions;
