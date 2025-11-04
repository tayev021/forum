import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Post } from '../models';

export const createPost = catchAsync(async (req: Request, res: Response) => {
  const post = await Post.create({
    authorId: req.user?.id,
    threadId: req.threadId,
    content: req.body.content,
  });

  res.status(200).json({ post });
});
