import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import type { Thread } from '../types/Thread';
import { getThread } from '../thunks/getThread';
import { createThread } from '../thunks/createThread';
import { deleteThread } from '../thunks/deleteThread';
import { updateThread } from '../thunks/updateThread';
import { subscribeThread } from '../thunks/subscribeThread';
import { unsubscribeThread } from '../thunks/unsubscribeThread';
import type { ThreadPost } from '../types/ThreadPost';

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
    updateThreadPost: (
      state,
      action: PayloadAction<{ postId: number; post: Partial<ThreadPost> }>,
    ) => {
      if (!state.thread) return;

      state.thread.posts = state.thread?.posts.map((post) => {
        if (post.id === action.payload.postId) {
          return { ...post, ...action.payload.post };
        } else {
          return post;
        }
      });
    },
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
      },
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
      },
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
      },
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

    builder.addCase(subscribeThread.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(subscribeThread.fulfilled, (state, _action) => {
      if (state.thread) {
        state.thread.isSubscribed = true;
      }
      state.isLoading = false;
    });
    builder.addCase(subscribeThread.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(unsubscribeThread.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(unsubscribeThread.fulfilled, (state, _action) => {
      if (state.thread) {
        state.thread.isSubscribed = false;
      }
      state.isLoading = false;
    });
    builder.addCase(unsubscribeThread.rejected, (state, action) => {
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
export const { updateThreadPost, clearThreadError } = threadSlice.actions;
