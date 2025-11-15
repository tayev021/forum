import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User } from '../types/User';
import type { UserError } from '../types/UserError';
import { me } from '../thunks/me';
import { signup } from '../thunks/signup';
import { signin } from '../thunks/signin';
import { signout } from '../thunks/signout';

interface UserState {
  user: User | null;
  isLoading: boolean;
  errors: UserError[] | null;
  initialized: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  errors: null,
  initialized: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(me.pending, (state, _action) => {
      state.user = null;
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(me.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.errors = null;
      state.initialized = true;
    });
    builder.addCase(me.rejected, (state, _action) => {
      state.user = null;
      state.isLoading = false;
      state.errors = null;
      state.initialized = true;
    });
    builder.addCase(signup.pending, (state, _action) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.errors = null;
    });
    builder.addCase(signup.rejected, (state, action: PayloadAction<any[]>) => {
      state.isLoading = false;

      if (action.payload) {
        state.errors = action.payload;
      } else {
        state.errors = [{ message: 'Unknown error!' }];
      }
    });

    builder.addCase(signin.pending, (state, _action) => {
      state.user = null;
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(signin.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.errors = null;
    });
    builder.addCase(signin.rejected, (state, action: PayloadAction<any[]>) => {
      state.user = null;
      state.isLoading = false;

      if (action.payload) {
        state.errors = action.payload;
      } else {
        state.errors = [{ message: 'Unknown error!' }];
      }
    });

    builder.addCase(signout.pending, (state, _action) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(signout.fulfilled, (state, _action) => {
      state.user = null;
      state.isLoading = false;
      state.errors = null;
    });
    builder.addCase(signout.rejected, (state, action: PayloadAction<any[]>) => {
      state.user = null;
      state.isLoading = false;

      if (action.payload) {
        state.errors = action.payload;
      } else {
        state.errors = [{ message: 'Unknown error!' }];
      }
    });
  },
});

export const userReducer = userSlice.reducer;
