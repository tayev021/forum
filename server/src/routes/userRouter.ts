import { Router } from 'express';
import { protect } from '../middleware/protect';
import { validate } from '../middleware/validate';
import {
  userBioSchema,
  userChangePasswordSchema,
} from '../validators/userSchemas';
import {
  resizeAvatar,
  updateAvatar,
  updateBio,
  updatePassword,
  uploadAvatar,
} from '../controllers/userController';

const userRouter = Router();

userRouter.patch('/bio', protect, validate(userBioSchema), updateBio);
userRouter.patch(
  '/password',
  protect,
  validate(userChangePasswordSchema),
  updatePassword
);
userRouter.patch('/avatar', protect, uploadAvatar, resizeAvatar, updateAvatar);

export { userRouter };
