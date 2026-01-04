import { clearUserError, userReducer } from './model/slice/userSlice';
import { signup } from './model/thunks/signup';
import { signin } from './model/thunks/signin';
import { signout } from './model/thunks/signout';
import { getUserThreads } from './model/thunks/getUserThreads';
import { changePassword } from './model/thunks/changePassword';
import { deleteAccount } from './model/thunks/deleteAccount';
import { changeAvatar } from './model/thunks/changeAvatar';
import { useUser } from './lib/hooks/useUser';
import { useUserThreads } from './lib/hooks/useUserThreads';
import { useRestrictTo } from './lib/hooks/useRestrictTo';
import { type SignupData } from './model/types/SignupData';
import { type PasswordData } from './model/types/PasswordData';
import { type UserThread } from './model/types/UserThread';

export {
  userReducer,
  clearUserError,
  signup,
  signin,
  signout,
  getUserThreads,
  changePassword,
  deleteAccount,
  changeAvatar,
  useUser,
  useUserThreads,
  useRestrictTo,
  type SignupData,
  type PasswordData,
  type UserThread,
};
