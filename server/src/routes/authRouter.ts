import { Router } from 'express';
import { validate } from '../middleware/validate';
import { signupSchema } from '../validators/signupValidator';
import { signinSchema } from '../validators/signinValidator';
import { me, signin, signout, signup } from '../controllers/authController';
import { protect } from '../middleware/protect';

const authRouter = Router();

authRouter.get('/me', protect, me);
authRouter.post('/signup', validate(signupSchema), signup);
authRouter.post('/signin', validate(signinSchema), signin);
authRouter.post('/signout', signout);

export { authRouter };
