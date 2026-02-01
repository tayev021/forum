import { Router } from 'express';
import { protect } from '../middleware/protect';
import { deleteAttachment } from '../controllers/attachmentController';

const attachmentRouter = Router();

attachmentRouter.delete('/:attachmentId', protect, deleteAttachment);

export { attachmentRouter };
