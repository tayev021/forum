import { DEFAULT_PAGE, PAGE_ITEMS_LIMIT } from '../constants';
import { Post, Subscription, Thread, User } from '../models';
import sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { removeFile } from '../utils/removeFile';
import { Op } from 'sequelize';

export const getUserPosts = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const page = Number(req.query.page) || DEFAULT_PAGE;
  const limit = Number(req.query.limit) || PAGE_ITEMS_LIMIT;
  const offset = (page - 1) * limit;

  const user = await User.findByPk(userId);

  if (!user) {
    throw new AppError(400, 'Failed to get posts!', {
      type: 'general',
      message: 'User with such an identifier does not exist',
    });
  }

  const { rows: posts, count } = await Post.findAndCountAll({
    where: { authorId: user.id },
    limit: limit,
    offset: offset,
    attributes: ['id', 'content', 'createdAt'],
    include: [
      {
        model: Thread,
        as: 'thread',
        attributes: [
          'id',
          'title',
          [
            sequelize.literal(`
                  CEIL(
                    (
                      SELECT COUNT(*)
                      FROM posts p2
                      WHERE p2.threadId = Post.threadId
                        AND p2.createdAt <= Post.createdAt
                    ) / ${PAGE_ITEMS_LIMIT}
                  ) 
              `),
            'page',
          ],
        ],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    posts: posts,
    totalPosts: count,
    page: page,
    totalPages: Math.ceil(count / limit),
  });
});

export const getUserThreads = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const page = Number(req.query.page) || DEFAULT_PAGE;
    const limit = Number(req.query.limit) || PAGE_ITEMS_LIMIT;
    const offset = (page - 1) * limit;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new AppError(400, 'Failed to get threads!', {
        type: 'general',
        message: 'User with such an identifier does not exist',
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

export const getUserSubscriptions = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user!;
    const page = Number(req.query.page) || DEFAULT_PAGE;
    const limit = Number(req.query.limit) || PAGE_ITEMS_LIMIT;
    const offset = (page - 1) * limit;

    const { rows: subscriptions, count } = await Subscription.findAndCountAll({
      where: { userId: user.id },
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'lastReadAt', 'createdAt'],
      include: [
        {
          model: Thread,
          as: 'thread',
          attributes: ['id', 'title'],
        },
      ],
    });

    res.status(200).json({
      subscriptions: subscriptions,
      totalSubscriptions: count,
      page: page,
      totalPages: Math.ceil(count / limit),
    });
  }
);

export const getUserNotifications = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user!;
    const page = Number(req.query.page) || DEFAULT_PAGE;
    const limit = Number(req.query.limit) || PAGE_ITEMS_LIMIT;
    const offset = (page - 1) * limit;

    const { rows: notifications, count } = await Subscription.findAndCountAll({
      where: {
        userId: user.id,
        [Op.and]: sequelize.literal(`
          EXISTS (
            SELECT 1
            FROM posts p
            WHERE p.threadId = Subscription.threadId
              AND p.createdAt > Subscription.lastReadAt
          )
        `),
      },
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'lastReadAt'],
      include: [
        {
          model: Thread,
          as: 'thread',
          attributes: [
            'id',
            'title',
            [
              sequelize.literal(`
                (
                  SELECT p.id
                  FROM posts p
                  WHERE p.threadId = Subscription.threadId
                    AND p.createdAt > Subscription.lastReadAt
                  ORDER BY p.createdAt ASC
                  LIMIT 1
                )`),
              'unreadPostId',
            ],
            [
              sequelize.literal(`(
                SELECT p.content
                FROM posts p
                WHERE p.threadId = Subscription.threadId
                  AND p.createdAt > Subscription.lastReadAt
                ORDER BY p.createdAt ASC
                LIMIT 1
              )`),
              'unreadPostContent',
            ],
            [
              sequelize.literal(`(
                SELECT p.createdAt
                FROM posts p
                WHERE p.threadId = Subscription.threadId
                  AND p.createdAt > Subscription.lastReadAt
                ORDER BY p.createdAt ASC
                LIMIT 1
              )`),
              'unreadPostCreatedAt',
            ],
          ],
        },
      ],
    });

    res.status(200).json({
      notifications: notifications,
      totalNotifications: count,
      page: page,
      totalPages: Math.ceil(count / limit),
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
