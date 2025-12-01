import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Forum, Post, Thread, User } from '../models';
import { AppError } from '../utils/AppError';
import { capitalize } from '../utils/capitalize';

export const getThread = catchAsync(async (req: Request, res: Response) => {
  const threadId = req.params.threadId;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const thread = await Thread.findByPk(threadId);

  if (!thread) {
    throw new AppError(400, 'Failed to get thread!', {
      type: 'general',
      message: 'You are trying to get a thread that does not exist',
    });
  }

  const { rows: posts, count } = await Post.findAndCountAll({
    where: { threadId },
    limit: limit,
    offset: offset,
    attributes: ['id', 'threadId', 'content', 'createdAt', 'updatedAt'],
    include: [
      {
        model: User,
        as: 'author',
        attributes: ['id', 'username', 'avatar', 'lastSignIn'],
      },
    ],
    order: [['createdAt', 'ASC']],
  });

  res.status(200).json({
    thread: {
      id: thread.id,
      title: thread.title,
      authorId: thread.authorId,
      createdAt: thread.createdAt,
      posts: posts,
      totalPosts: count,
      page: page,
      totalPages: Math.ceil(count / limit),
    },
  });
});

export const createThread = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const title = req.body.title;
  const content = req.body.content;
  const forumId = Number(req.query.forumId);

  const forum = await Forum.findByPk(forumId);

  if (!forum) {
    throw new AppError(400, 'Failed to create thread!', {
      type: 'general',
      message:
        'You are trying to create a thread in a forum that does not exist',
    });
  }

  const existingThread = await Thread.findOne({
    where: { title: capitalize(title) },
  });

  if (existingThread) {
    throw new AppError(400, 'Failed to create thread!', {
      type: 'general',
      message: 'A thread with this title already exists',
    });
  }

  const thread = await Thread.create({
    authorId: user.id,
    forumId: forum.id,
    title: capitalize(title),
  });

  const post = await Post.create({
    authorId: user.id,
    threadId: thread.id,
    content,
  });

  res.status(201).json({
    thread: {
      id: thread.id,
      title: thread.title,
      posts: [
        {
          id: post.id,
          content: post.content,
          authorId: post.authorId,
          createdAt: post.createdAt,
        },
      ],
    },
  });
});
