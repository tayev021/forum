import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Post, Thread, User } from '../models';
import { AppError } from '../utils/AppError';

export const getLatestPosts = catchAsync(
  async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 5;

    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      limit: limit > 10 ? 10 : limit,
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: Thread,
          as: 'thread',
          attributes: ['id', 'title'],
        },
        {
          model: User,
          as: 'author',
          attributes: ['username', 'avatar'],
        },
      ],
    });

    const sortByDateAscending = posts.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    res.status(200).json({ posts: sortByDateAscending });
  }
);

export const createPost = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const threadId = Number(req.query.threadId);
  const content = req.body.content;

  const thread = await Thread.findByPk(threadId);

  if (!thread) {
    throw new AppError(400, 'Failed to create post!', {
      type: 'general',
      message:
        'You are trying to create a post in a thread that does not exist',
    });
  }

  const post = await Post.create({
    authorId: user?.id,
    threadId,
    content,
  });

  res.status(201).json({ post });
});
