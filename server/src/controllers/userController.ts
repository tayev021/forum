import { DEFAULT_PAGE, PAGE_ITEMS_LIMIT } from '../constants';
import { Post, Thread, User } from '../models';
import sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { removeFile } from '../utils/removeFile';

export const getUserThreads = catchAsync(
  async (req: Request, res: Response) => {
    console.log(123);
    console.log(req.params);

    const userId = req.params.userId;
    const page = Number(req.query.page) || DEFAULT_PAGE;
    const limit = Number(req.query.limit) || PAGE_ITEMS_LIMIT;
    const offset = (page - 1) * limit;

    const user = await User.findByPk(userId);

    console.log(user);

    if (!user) {
      throw new AppError(400, 'Failed to get threads!', {
        type: 'general',
        message: 'An user with such an identifier does not exist',
      });
    }

    const threads = await Thread.findAll({
      where: { authorId: user.id },
      attributes: [
        'id',
        'title',
        'views',
        'createdAt',
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('posts.id')), 'postsCount'],
      ],
      include: [
        {
          model: Post,
          as: 'posts',
          attributes: [],
        },
      ],
      group: ['Thread.id'],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      threads: threads.slice(offset, offset + limit),
      totalThreads: threads.length,
      page: page,
      totalPages: Math.ceil(threads.length / limit),
    });
  }
);

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

    if (previousPassword === password) {
      throw new AppError(400, 'Fail to change password!', {
        type: 'validation',
        fields: [
          {
            field: 'password',
            message: 'Password must be different from the previous one',
          },
        ],
      });
    }

    const isCorrectPassword = await bcrypt.compare(
      previousPassword,
      user.password
    );

    if (!isCorrectPassword) {
      throw new AppError(400, 'Fail to change password!', {
        type: 'validation',
        fields: [
          {
            field: 'previousPassword',
            message: 'Wrong previous password',
          },
        ],
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

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;

  await user.destroy();

  res.status(204).json({});
});
