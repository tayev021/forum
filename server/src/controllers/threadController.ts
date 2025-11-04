import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Post, Thread } from '../models';

export const createThread = catchAsync(async (req: Request, res: Response) => {
  const thread = await Thread.create({
    title: req.body.title,
    authorId: req.user?.id,
  });

  const post = await Post.create({
    content: req.body.content,
    authorId: req.user?.id,
    threadId: thread.id,
  });

  res.status(200).json({
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
