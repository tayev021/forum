import { Router } from 'express';
import { getStatistic } from '../controllers/statisticController';

const statisticRouter = Router();

statisticRouter.get('/', getStatistic);

export { statisticRouter };
