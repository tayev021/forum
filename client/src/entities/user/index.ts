import { clearUserError, userReducer } from './model/slice/userSlice';
import { signup } from './model/thunks/signup';
import { signin } from './model/thunks/signin';
import { signout } from './model/thunks/signout';
import { getUserPosts } from './model/thunks/getUserPosts';
import { getUserThreads } from './model/thunks/getUserThreads';
import { getUserSubscriptions } from './model/thunks/getUserSubscriptions';
import { getUserNotifications } from './model/thunks/getUserNotifications';
import { updateBio } from './model/thunks/updateBio';
import { changePassword } from './model/thunks/changePassword';
import { deleteAccount } from './model/thunks/deleteAccount';
import { changeAvatar } from './model/thunks/changeAvatar';
import { useUser } from './lib/hooks/useUser';
import { useRestrictTo } from './lib/hooks/useRestrictTo';
import { useUserPosts } from './lib/hooks/useUserPosts';
import { useUserThreads } from './lib/hooks/useUserThreads';
import { useUserSubscriptions } from './lib/hooks/useUserSubscriptions';
import { useUserNotifications } from './lib/hooks/useUserNotifications';
import { type SignupData } from './model/types/SignupData';
import { type PasswordData } from './model/types/PasswordData';
import { type UserPost } from './model/types/UserPost';
import { type UserThread } from './model/types/UserThread';
import { type UserSubscription } from './model/types/UserSubscription';
import { type UserNotification } from './model/types/UserNotification';

export {
  userReducer,
  clearUserError,
  signup,
  signin,
  signout,
  getUserPosts,
  getUserThreads,
  getUserSubscriptions,
  getUserNotifications,
  updateBio,
  changeAvatar,
  changePassword,
  deleteAccount,
  useUser,
  useRestrictTo,
  useUserPosts,
  useUserThreads,
  useUserSubscriptions,
  useUserNotifications,
  type SignupData,
  type PasswordData,
  type UserPost,
  type UserThread,
  type UserSubscription,
  type UserNotification,
};
