import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User } from '../types/User';
import { me } from '../thunks/me';
import { signup } from '../thunks/signup';
import { signin } from '../thunks/signin';
import { signout } from '../thunks/signout';
import type { ServerError } from '../../../../shared/types/ServerError';
import { changeAvatar } from '../thunks/changeAvatar';
import { updateBio } from '../thunks/updateBio';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: ServerError | null;
  initialized: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  initialized: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.pending, (state, _action) => {
      state.user = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(me.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
      state.initialized = true;
    });
    builder.addCase(me.rejected, (state, _action) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.initialized = true;
    });
    builder.addCase(signup.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(signin.pending, (state, _action) => {
      state.user = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signin.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(signout.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signout.fulfilled, (state, _action) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(signout.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(changeAvatar.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      changeAvatar.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(changeAvatar.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(updateBio.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      updateBio.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(updateBio.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });
  },
});

export const userReducer = userSlice.reducer;
export const { clearUserError } = userSlice.actions;
