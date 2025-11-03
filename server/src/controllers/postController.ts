import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Post } from '../models';

export const createPost = catchAsync(async (req: Request, res: Response) => {
  const post = await Post.create({
    content: req.body.content,
    authorId: req.user?.id,
  });

  res.status(200).json({ post });
});
