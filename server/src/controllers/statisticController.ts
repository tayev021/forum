import { catchAsync } from '../utils/catchAsync';
import { Request, Response } from 'express';
import { Forum, Post, Thread, User } from '../models';

export const getStatistic = catchAsync(async (req: Request, res: Response) => {
  const posts = await Post.count();
  const threads = await Thread.count();
  const forums = await Forum.count();
  const members = await User.count();

  res.status(200).json({
    posts,
    threads,
    forums,
    members,
  });
});
