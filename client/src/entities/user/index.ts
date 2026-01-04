import { clearUserError, userReducer } from './model/slice/userSlice';
import { signup } from './model/thunks/signup';
import { signin } from './model/thunks/signin';
import { signout } from './model/thunks/signout';
import { changePassword } from './model/thunks/changePassword';
import { deleteAccount } from './model/thunks/deleteAccount';
import { changeAvatar } from './model/thunks/changeAvatar';
import { useUser } from './lib/hooks/useUser';
import { useRestrictTo } from './lib/hooks/useRestrictTo';
import { type SignupData } from './model/types/SignupData';
import { type PasswordData } from './model/types/PasswordData';

export {
  userReducer,
  clearUserError,
  signup,
  signin,
  signout,
  changePassword,
  deleteAccount,
  changeAvatar,
  useUser,
  useRestrictTo,
  type SignupData,
  type PasswordData,
};
