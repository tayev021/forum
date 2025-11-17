import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Thread } from '../models';
import { AppError } from '../utils/AppError';
import { Post } from '../models';

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
