import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import type { SearchedPost } from '../types/SearchedPost';
import { getLatestPosts } from '../thunks/getLatestPosts';
import { createPost } from '../thunks/createPost';
import { updatePost } from '../thunks/updatePost';
import type { Post } from '../types/Post';
import { likePost } from '../thunks/likePost';
import { deletePost } from '../thunks/deletePost';
import { reportPost } from '../thunks/reportPost';
import { deletePostAttachment } from '../thunks/deletePostAttachment';
import { searchPosts } from '../thunks/searchPosts';

interface PostState {
  post: Post | null;
  latestPosts: SearchedPost[];
  searchedPosts: SearchedPost[];
  isLoading: boolean;
  error: ServerError | null;
}

const initialState: PostState = {
  post: null,
  latestPosts: [],
  searchedPosts: [],
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPost(state) {
      state.post = null;
    },
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
      (state, action: PayloadAction<SearchedPost[]>) => {
        state.latestPosts = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getLatestPosts.rejected, (state, action) => {
      state.latestPosts = [];
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(searchPosts.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      searchPosts.fulfilled,
      (state, action: PayloadAction<SearchedPost[]>) => {
        state.searchedPosts = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(searchPosts.rejected, (state, action) => {
      state.searchedPosts = [];
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(createPost.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.post = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(updatePost.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      updatePost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.post = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(likePost.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      likePost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.post = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(likePost.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(reportPost.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      reportPost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.post = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(reportPost.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(deletePost.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deletePost.fulfilled, (state, _action) => {
      state.post = null;
      state.isLoading = false;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(deletePostAttachment.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deletePostAttachment.fulfilled, (state, _action) => {
      state.isLoading = false;
    });
    builder.addCase(deletePostAttachment.rejected, (state, action) => {
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
export const { clearPost, clearPostError } = postSlice.actions;
