import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { LATEST_POSTS_LIMIT } from '../constants';
import { Post, Thread, User } from '../models';
import { AppError } from '../utils/AppError';

export const getLatestPosts = catchAsync(
  async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || LATEST_POSTS_LIMIT;

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

    res.status(200).json({ posts });
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

export const updatePost = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const postId = req.params.postId;
  const content = req.body.content;

  const post = await Post.findByPk(postId);

  if (!post) {
    throw new AppError(400, 'Failed to update post!', {
      type: 'general',
      message: 'You are trying to update a post that does not exist',
    });
  }

  if (post.authorId !== user.id) {
    throw new AppError(403, 'Failed to update post!', {
      type: 'general',
      message: 'You do not have permission to update this post',
    });
  }

  post.content = content;

  await post.save();

  res.status(201).json({ post });
});
