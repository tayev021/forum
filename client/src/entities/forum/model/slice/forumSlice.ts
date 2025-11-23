import { createSlice } from '@reduxjs/toolkit';
import { addForum } from '../thunks/addForum';

interface forumState {
  isLoading: boolean;
}

const initialState: forumState = {
  isLoading: false,
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addForum.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(addForum.fulfilled, (state, _action) => {
      state.isLoading = false;
    });
    builder.addCase(addForum.rejected, (state, _action) => {
      state.isLoading = false;
    });
  },
});

export const forumReducer = forumSlice.reducer;
