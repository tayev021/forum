import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import type { Thread } from '../types/Thread';
import { getThread } from '../thunks/getThread';
import { createThread } from '../thunks/createThread';

interface ThreadState {
  thread: Thread | null;
  isLoading: boolean;
  error: ServerError | null;
}

const initialState: ThreadState = {
  thread: null,
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
  },
});

export const threadReducer = threadSlice.reducer;
export const { clearThreadError } = threadSlice.actions;
