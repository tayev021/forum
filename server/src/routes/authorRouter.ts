import { Router } from 'express';
import {
  getAuthorProfile,
  searchAuthors,
} from '../controllers/authorController';

const authorRouter = Router();

authorRouter.get('/:authorId/profile', getAuthorProfile);
authorRouter.get('/search', searchAuthors);

export { authorRouter };
