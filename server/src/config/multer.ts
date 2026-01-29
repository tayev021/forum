import multer from 'multer';
import { AppError } from '../utils/AppError';

const storage = multer.memoryStorage();

const fileFilter: multer.Options['fileFilter'] = (req, file, callback) => {
  if (!file.mimetype.startsWith('image/')) {
    callback(
      new AppError(400, 'Fail to upload file!', {
        type: 'general',
        message: 'Not an image! Please upload only images',
      })
    );
  }

  callback(null, true);
};

export const createMulter = (limits?: multer.Options['limits']) =>
  multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024,
      ...limits,
    },
  });
