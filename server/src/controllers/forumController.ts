import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { DEFAULT_PAGE, PAGE_ITEMS_LIMIT } from '../constants';
import { Category, Forum, Post, Thread } from '../models';
import { AppError } from '../utils/AppError';
import { capitalize } from '../utils/capitalize';
import sequelize from 'sequelize';

export const getForum = catchAsync(async (req: Request, res: Response) => {
  const forumId = req.params.forumId;

  const forum = await Forum.findByPk(forumId);

  if (!forum) {
    throw new AppError(400, 'Failed to get forum!', {
      type: 'general',
      message: 'You are trying to get a forum that does not exist',
    });
  }

  const page = Number(req.query.page) || DEFAULT_PAGE;
  const limit = Number(req.query.limit) || PAGE_ITEMS_LIMIT;
  const offset = (page - 1) * limit;
  const sortKey = [
    'updatedAt',
    'createdAt',
    'views',
    'postsCount',
    'title',
  ].includes(String(req.query.sortKey))
    ? String(req.query.sortKey)
    : 'updatedAt';
  const sortOrder = String(req.query.sortOrder) === 'ASC' ? 'ASC' : 'DESC';

  const threads = await Thread.findAll({
    where: { forumId },
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
    order: [[sortKey, sortOrder]],
  });

  res.status(200).json({
    forum: {
      id: forum.id,
      title: forum.title,
      createdAt: forum.createdAt,
      threads: threads.slice(offset, offset + limit),
      totalThreads: threads.length,
      page: page,
      totalPages: Math.ceil(threads.length / limit),
    },
  });
});

export const createForum = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const { categoryId, title } = req.body;

  const category = await Category.findByPk(categoryId);

  if (!category) {
    throw new AppError(400, 'Failed to create forum!', {
      type: 'general',
      message:
        'You are trying to create a forum in a category that does not exist',
    });
  }

  const existingForum = await Forum.findOne({
    where: { title: capitalize(title) },
  });

  if (existingForum) {
    throw new AppError(400, 'Failed to create forum!', {
      type: 'general',
      message: 'A forum with this title already exists',
    });
  }

  const forum = await Forum.create({
    authorId: user.id,
    categoryId: category.id,
    title: capitalize(title),
  });

  res.status(201).json({
    forum: {
      id: forum.id,
      title: forum.title,
    },
  });
});

export const updateForum = catchAsync(async (req: Request, res: Response) => {
  const forumId = req.params.forumId;
  const title = capitalize(req.body.title);

  const forum = await Forum.findByPk(forumId);

  if (!forum) {
    throw new AppError(400, 'Failed to update forum!', {
      type: 'general',
      message: 'You are trying to update a forum that does not exist',
    });
  }

  forum.title = title;

  await forum.save();

  res.status(200).json({ title: forum.title });
});

export const deleteForum = catchAsync(async (req: Request, res: Response) => {
  const forumId = req.params.forumId;

  const forum = await Forum.findByPk(forumId);

  if (!forum) {
    throw new AppError(400, 'Failed to delete forum!', {
      type: 'general',
      message: 'You are trying to delete a forum that does not exist',
    });
  }

  const threadsCount = await Thread.count({ where: { forumId } });

  if (threadsCount > 0) {
    throw new AppError(400, 'Failed to delete forum!', {
      type: 'general',
      message: 'You cannot delete a forum that contains threads',
    });
  }

  await forum.destroy();

  res.status(204).json({});
});
