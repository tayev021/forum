import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServerError } from '../../../../shared/types/ServerError';
import type { Author } from '../types/Author';
import { getAuthor } from '../thunks/getAuthor';

interface AuthorState {
  author: Author | null;
  isLoading: boolean;
  error: ServerError | null;
}

const initialState: AuthorState = {
  author: null,
  isLoading: false,
  error: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    clearAuthorError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthor.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getAuthor.fulfilled,
      (state, action: PayloadAction<Author>) => {
        state.author = action.payload;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(getAuthor.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });
  },
});

export const authorReducer = authorSlice.reducer;
export const { clearAuthorError } = authorSlice.actions;
