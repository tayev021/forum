import { Router } from 'express';
import {
  getReports,
  rejectReport,
  banPost,
  banUser,
} from '../controllers/reportController';
import { protect } from '../middleware/protect';
import { restrictTo } from '../middleware/restrictTo';

const reportRouter = Router();

reportRouter.get('/', protect, restrictTo('admin', 'moderator'), getReports);
reportRouter.post(
  '/:reportId/reject',
  protect,
  restrictTo('admin', 'moderator'),
  rejectReport,
  getReports,
);
reportRouter.post(
  '/:reportId/ban/post',
  protect,
  restrictTo('admin', 'moderator'),
  banPost,
  getReports,
);
reportRouter.post(
  '/:reportId/ban/user',
  protect,
  restrictTo('admin', 'moderator'),
  banUser,
  getReports,
);

export { reportRouter };
