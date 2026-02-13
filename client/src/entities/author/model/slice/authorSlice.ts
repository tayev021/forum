import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Author } from '../types/Author';
import type { SearchedAuthor } from '../types/SearchedAuthor';
import type { ServerError } from '../../../../shared/types/ServerError';
import { getAuthor } from '../thunks/getAuthor';
import { searchAuthors } from '../thunks/searchAuthors';

interface AuthorState {
  author: Author | null;
  searchedAuthors: SearchedAuthor[];
  isLoading: boolean;
  error: ServerError | null;
}

const initialState: AuthorState = {
  author: null,
  searchedAuthors: [],
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

    builder.addCase(searchAuthors.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      searchAuthors.fulfilled,
      (state, action: PayloadAction<SearchedAuthor[]>) => {
        state.searchedAuthors = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(searchAuthors.rejected, (state, action) => {
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
