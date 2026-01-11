import type { User } from '../../../../shared/types/User';
import type { ServerError } from '../../../../shared/types/ServerError';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserPosts } from '../types/UserPosts';
import type { UserThreads } from '../types/UserThreads';
import type { UserSubscriptions } from '../types/UserSubscriptions';
import type { UserNotifications } from '../types/UserNotifications';
import { me } from '../thunks/me';
import { signup } from '../thunks/signup';
import { signin } from '../thunks/signin';
import { signout } from '../thunks/signout';
import { getUserPosts } from '../thunks/getUserPosts';
import { getUserThreads } from '../thunks/getUserThreads';
import { getUserSubscriptions } from '../thunks/getUserSubscriptions';
import { getUserNotifications } from '../thunks/getUserNotifications';
import { updateBio } from '../thunks/updateBio';
import { changeAvatar } from '../thunks/changeAvatar';
import { changePassword } from '../thunks/changePassword';
import { deleteAccount } from '../thunks/deleteAccount';

interface UserState {
  user: User | null;
  userPosts: UserPosts | null;
  userThreads: UserThreads | null;
  userSubscriptions: UserSubscriptions | null;
  userNotifications: UserNotifications | null;
  isLoading: boolean;
  error: ServerError | null;
  initialized: boolean;
}

const initialState: UserState = {
  user: null,
  userPosts: null,
  userThreads: null,
  userSubscriptions: null,
  userNotifications: null,
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

    builder.addCase(getUserPosts.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getUserPosts.fulfilled,
      (state, action: PayloadAction<UserPosts>) => {
        state.userPosts = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(getUserThreads.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getUserThreads.fulfilled,
      (state, action: PayloadAction<UserThreads>) => {
        state.userThreads = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getUserThreads.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(getUserSubscriptions.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getUserSubscriptions.fulfilled,
      (state, action: PayloadAction<UserSubscriptions>) => {
        state.userSubscriptions = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getUserSubscriptions.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(getUserNotifications.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getUserNotifications.fulfilled,
      (state, action: PayloadAction<UserNotifications>) => {
        state.userNotifications = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getUserNotifications.rejected, (state, action) => {
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

    builder.addCase(changePassword.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      changePassword.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = { type: 'general', message: 'Unknown error!' };
      }
    });

    builder.addCase(deleteAccount.pending, (state, _action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteAccount.fulfilled, (state, _action) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
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
