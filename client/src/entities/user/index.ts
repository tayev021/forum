import { clearUserError, userReducer } from './model/slice/userSlice';
import { signup } from './model/thunks/signup';
import { signin } from './model/thunks/signin';
import { signout } from './model/thunks/signout';
import { changeAvatar } from './model/thunks/changeAvatar';
import { type SignupData } from './model/types/SignupData';
import { useUser } from './lib/hooks/useUser';
import { useRestrictTo } from './lib/hooks/useRestrictTo';

export {
  userReducer,
  clearUserError,
  signup,
  signin,
  signout,
  changeAvatar,
  type SignupData,
  useUser,
  useRestrictTo,
};
