import { createMulter } from '../config/multer';
import { POST_ATTACHMENTS_LIMIT } from '../constants';

export const uploadAvatar = createMulter().single('avatar');

export const uploadPostImages = createMulter({
  files: POST_ATTACHMENTS_LIMIT,
}).array('images', POST_ATTACHMENTS_LIMIT);
