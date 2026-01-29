import { catchAsync } from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';

export const resizePostImages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !Array.isArray(req.files)) {
      return next();
    }

    const files = req.files as Express.Multer.File[];

    await Promise.all(
      files.map(async (file) => {
        const resizedImage = await sharp(file.buffer)
          .resize({
            width: 1000,
            height: 1000,
            fit: 'cover',
            withoutEnlargement: true,
          })
          .toFormat('jpeg')
          .toBuffer();

        file.buffer = resizedImage;
      })
    );

    next();
  }
);
