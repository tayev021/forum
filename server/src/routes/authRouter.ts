import { Router } from 'express';
import { validate } from '../middleware/validate';
import { signupSchema } from '../validators/signupSchema';
import { signinSchema } from '../validators/signinSchema';
import { me, signup, signin, signout } from '../controllers/authController';
import { protect } from '../middleware/protect';

const authRouter = Router();

authRouter.get('/me', protect, me);
authRouter.post('/signup', validate(signupSchema), signup);
authRouter.post('/signin', validate(signinSchema), signin);
authRouter.post('/signout', signout);

export { authRouter };
