import bcrypt from 'bcryptjs';
import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { removeFile } from '../utils/removeFile';

export const updateBio = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const bio = req.body.bio;

  user.bio = bio;
  await user.save();

  res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      lastSignIn: user.lastSignIn,
      createdAt: user.createdAt,
    },
  });
});

export const updatePassword = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user!;
    const previousPassword = req.body.previousPassword;
    const password = req.body.password;

    const isCorrectPassword = await bcrypt.compare(
      previousPassword,
      user.password
    );

    if (!isCorrectPassword) {
      throw new AppError(400, 'Fail to change password!', {
        type: 'general',
        message: 'Wrong previous password',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
        lastSignIn: user.lastSignIn,
        createdAt: user.createdAt,
      },
    });
  }
);

const avatarFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(
      new AppError(400, 'Fail to upload avatar!', {
        type: 'general',
        message: 'Not an image! Please upload only images',
      })
    );
  }
};

export const uploadAvatar = multer({
  storage: multer.memoryStorage(),
  fileFilter: avatarFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single('avatar');

export async function resizeAvatar(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.file) return next();

  const resizedImage = await sharp(req.file.buffer)
    .resize(500, 500, { fit: 'cover' })
    .toFormat('jpg')
    .toBuffer();

  req.file.buffer = resizedImage;

  next();
}

export const updateAvatar = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError(400, 'Fail to upload avatar!', {
      type: 'general',
      message: 'Please upload only correct images',
    });
  }

  const user = req.user!;
  const avatarFileName = `avatar-${uuid()}.jpg`;
  const avatarPath = `public/images/avatars/${avatarFileName}`;

  if (user.avatar) {
    removeFile(`public/images/avatars/${user.avatar}`);
  }

  user.avatar = avatarFileName;

  await sharp(req.file.buffer).toFile(avatarPath);

  await user.save();

  res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      lastSignIn: user.lastSignIn,
      createdAt: user.createdAt,
    },
  });
});
