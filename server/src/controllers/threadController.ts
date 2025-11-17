import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Forum, Post, Thread } from '../models';
import { AppError } from '../utils/AppError';

export const createThread = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const title = req.body.title;
  const content = req.body.content;
  const forumId = Number(req.query.forumId);

  const forum = await Forum.findByPk(forumId);

  if (!forum) {
    throw new AppError(
      403,
      'You are trying to create a thread in a forum that does not exist'
    );
  }

  const thread = await Thread.create({
    authorId: user.id,
    forumId: forum.id,
    title,
  });

  const post = await Post.create({
    authorId: user.id,
    threadId: thread.id,
    content,
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
