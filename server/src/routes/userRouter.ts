import { Router } from 'express';
import { protect } from '../middleware/protect';
import { validate } from '../middleware/validate';
import {
  userBioSchema,
  userChangePasswordSchema,
} from '../validators/userSchemas';
import {
  getUserThreads,
  updateBio,
  updatePassword,
  uploadAvatar,
  resizeAvatar,
  updateAvatar,
  deleteUser,
  getUserPosts,
  getUserSubscriptions,
  getUserNotifications,
} from '../controllers/userController';

const userRouter = Router();

userRouter.get('/:userId/posts', getUserPosts);
userRouter.get('/:userId/threads', getUserThreads);
userRouter.get('/subscriptions', protect, getUserSubscriptions);
userRouter.get('/notifications', protect, getUserNotifications);
userRouter.patch('/bio', protect, validate(userBioSchema), updateBio);
userRouter.patch(
  '/password',
  protect,
  validate(userChangePasswordSchema),
  updatePassword
);
userRouter.patch('/avatar', protect, uploadAvatar, resizeAvatar, updateAvatar);
userRouter.delete('/', protect, deleteUser);

export { userRouter };
