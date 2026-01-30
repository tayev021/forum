import { catchAsync } from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import { DEFAULT_PAGE, PAGE_ITEMS_LIMIT } from '../constants';
import { Post, Report, Thread, User } from '../models';
import { AppError } from '../utils/AppError';
import sequelize from 'sequelize';
import { deletePostImages } from '../utils/deletePostImages';

export const getReports = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || DEFAULT_PAGE;
  const limit = Number(req.query.limit) || PAGE_ITEMS_LIMIT;
  const offset = (page - 1) * limit;

  const { rows: reports, count } = await Report.findAndCountAll({
    where: { status: 'pending' },
    limit: limit,
    offset: offset,
    attributes: ['id', 'reason', 'status', 'createdAt'],
    include: [
      {
        model: User,
        as: 'reporter',
        attributes: ['id', 'username', 'avatar', 'role'],
      },
      {
        model: Post,
        as: 'post',
        attributes: ['id', 'content', 'createdAt'],
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'avatar', 'role'],
          },
          {
            model: Thread,
            as: 'thread',
            attributes: ['id', 'title', 'createdAt'],
          },
        ],
      },
    ],
  });

  res.status(200).json({
    reports: {
      list: reports,
      totalReports: count,
      page: page,
      totalPages: Math.ceil(count / limit),
    },
  });
});

export const rejectReport = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reportId = req.params.reportId;

    const report = await Report.findByPk(reportId);

    if (!report) {
      throw new AppError(400, 'Failed to reject report!', {
        type: 'general',
        message: 'You are trying to reject a report that does not exist',
      });
    }

    if (report.status !== 'pending') {
      throw new AppError(400, 'Failed to reject report!', {
        type: 'general',
        message:
          'You are trying to reject a report that has already been reviewed',
      });
    }

    report.status = 'rejected';
    await report.save();

    next();
  }
);

export const banPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reportId = req.params.reportId;

    const report = await Report.findByPk(reportId);

    if (!report) {
      throw new AppError(400, 'Failed to ban post!', {
        type: 'general',
        message:
          'You are trying to ban post based on a report that does not exist',
      });
    }

    if (report.status !== 'pending') {
      throw new AppError(400, 'Failed to ban post!', {
        type: 'general',
        message:
          'You are trying to ban post based on a report that has already been reviewed',
      });
    }

    const post = await Post.findByPk(report.postId);

    if (!post) {
      throw new AppError(400, 'Failed to ban post!', {
        type: 'general',
        message: 'You are trying to ban post that does not exist',
      });
    }

    await deletePostImages(post.id);

    const thread = await Thread.findOne({
      where: { id: post.threadId },
      attributes: [
        'id',
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM posts p
            WHERE p.threadId = Thread.id
          )`),
          'posts',
        ],
      ],
    });

    if (Number(thread?.get('posts')) <= 1) {
      await thread?.destroy();
    }

    await post.destroy();

    report.status = 'banned post';
    await report.save();

    next();
  }
);

export const banUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reportId = req.params.reportId;

    const report = await Report.findByPk(reportId);

    if (!report) {
      throw new AppError(400, 'Failed to ban user!', {
        type: 'general',
        message:
          'You are trying to ban user based on a report that does not exist',
      });
    }

    if (report.status !== 'pending') {
      throw new AppError(400, 'Failed to ban user!', {
        type: 'general',
        message:
          'You are trying to ban user based on a report that has already been reviewed',
      });
    }

    const post = await Post.findByPk(report.postId);

    if (!post) {
      throw new AppError(400, 'Failed to delete post!', {
        type: 'general',
        message: 'You are trying to delete post that does not exist',
      });
    }

    if (post.authorId) {
      const user = await User.findByPk(post.authorId);
      await user?.destroy();
    }

    await deletePostImages(post.id);
    await post.destroy();

    report.status = 'banned user and post';
    await report.save();

    next();
  }
);
