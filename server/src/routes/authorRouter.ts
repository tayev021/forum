import { Router } from 'express';
import { getAuthorProfile } from '../controllers/authorController';

const authorRouter = Router();

authorRouter.get('/:authorId/profile', getAuthorProfile);

export { authorRouter };
