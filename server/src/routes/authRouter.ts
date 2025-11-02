import { Router } from 'express';
import { validate } from '../middleware/validate';
import { signupSchema } from '../validators/signupValidator';
import { signinSchema } from '../validators/signinValidator';
import { signin, signup } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', validate(signupSchema), signup);
authRouter.post('/signin', validate(signinSchema), signin);

export { authRouter };
