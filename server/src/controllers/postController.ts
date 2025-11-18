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
          attributes: ['title'],
        },
        {
          model: User,
          as: 'author',
          attributes: [['username', 'name'], 'avatar'],
        },
      ],
    });

    res.status(200).json({ posts });
  }
);

export const createPost = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const threadId = Number(req.query.threadId);
  const content = req.body.content;

  const thread = await Thread.findByPk(threadId);

  if (!thread) {
    throw new AppError(
      403,
      'You are trying to post in a thread that does not exist.'
    );
  }

  const post = await Post.create({
    authorId: user?.id,
    threadId,
    content,
  });

  res.status(200).json({ post });
});
