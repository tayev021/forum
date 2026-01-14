import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { DEFAULT_PAGE, PAGE_ITEMS_LIMIT } from '../constants';
import { Forum, Post, Subscription, Thread, User } from '../models';
import { AppError } from '../utils/AppError';
import { capitalize } from '../utils/capitalize';

export const getThread = catchAsync(async (req: Request, res: Response) => {
  const isSignedIn = req.isSignedIn;
  const user = req.user;
  const threadId = req.params.threadId;
  const page = Number(req.query.page) || DEFAULT_PAGE;
  const limit = Number(req.query.limit) || PAGE_ITEMS_LIMIT;
  const offset = (page - 1) * limit;

  const thread = await Thread.findByPk(threadId);

  if (!thread) {
    throw new AppError(400, 'Failed to get thread!', {
      type: 'general',
      message: 'You are trying to get a thread that does not exist',
    });
  }

  thread.views += 1;
  await thread.save({ silent: true });

  const { rows: posts, count } = await Post.findAndCountAll({
    where: { threadId },
    limit: limit,
    offset: offset,
    attributes: ['id', 'threadId', 'content', 'createdAt', 'updatedAt'],
    include: [
      {
        model: User,
        as: 'author',
        attributes: ['id', 'username', 'avatar', 'role', 'lastSignIn'],
      },
    ],
    order: [['createdAt', 'ASC']],
  });

  let isSubscribed = false;

  if (isSignedIn) {
    const subscription = await Subscription.findOne({
      where: { userId: user?.id, threadId },
    });

    if (subscription) {
      isSubscribed = true;

      subscription.lastReadAt = new Date();
      await subscription.save();
    }
  }

  res.status(200).json({
    thread: {
      id: thread.id,
      title: thread.title,
      views: thread.views,
      isSubscribed: isSubscribed,
      authorId: thread.authorId,
      forumId: thread.forumId,
      createdAt: thread.createdAt,
      updatedAt: thread.updatedAt,
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

  const createdPost = await Post.create({
    authorId: user.id,
    threadId: thread.id,
    content,
  });

  const post = await Post.findOne({
    where: { id: createdPost.id },
    attributes: ['id', 'threadId', 'content', 'createdAt', 'updatedAt'],
    include: [
      {
        model: User,
        as: 'author',
        attributes: ['id', 'username', 'avatar', 'role', 'lastSignIn'],
      },
    ],
  });

  res.status(200).json({
    thread: {
      id: thread.id,
      title: thread.title,
      views: thread.views,
      authorId: thread.authorId,
      forumId: thread.forumId,
      createdAt: thread.createdAt,
      updatedAt: thread.updatedAt,
      posts: [post],
      totalPosts: 1,
      page: 1,
      totalPages: 1,
    },
  });
});

export const updateThread = catchAsync(async (req: Request, res: Response) => {
  const threadId = req.params.threadId;
  const title = capitalize(req.body.title);

  const thread = await Thread.findByPk(threadId);

  if (!thread) {
    throw new AppError(400, 'Failed to update thread!', {
      type: 'general',
      message: 'You are trying to update a thread that does not exist',
    });
  }

  thread.title = title;

  await thread.save();

  res.status(200).json({ title: thread.title });
});

export const deleteThread = catchAsync(async (req: Request, res: Response) => {
  const threadId = req.params.threadId;

  const thread = await Thread.findByPk(threadId);

  if (!thread) {
    throw new AppError(400, 'Failed to delete thread!', {
      type: 'general',
      message: 'You are trying to delete a thread that does not exist',
    });
  }

  await thread.destroy();

  res.status(204).json({});
});

export const subscribeThread = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user!;
    const threadId = req.params.threadId;

    const thread = await Thread.findByPk(threadId);

    if (!thread) {
      throw new AppError(400, 'Failed to subscribe thread!', {
        type: 'general',
        message: 'You are trying to subscribe a thread that does not exist',
      });
    }

    const subscription = await Subscription.findOne({
      where: { userId: user.id, threadId },
    });

    if (subscription) {
      throw new AppError(400, 'Failed to subscribe thread!', {
        type: 'general',
        message: 'You already subscribed to this thread',
      });
    }

    await Subscription.create({
      userId: user.id,
      threadId,
    });

    res.status(204).json({});
  }
);

export const unsubscribeThread = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user!;
    const threadId = req.params.threadId;

    const subscription = await Subscription.findOne({
      where: { userId: user.id, threadId },
    });

    await subscription?.destroy();

    res.status(204).json({});
  }
);

export const readThread = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const threadId = req.params.threadId;

  const thread = await Thread.findByPk(threadId);

  if (!thread) {
    throw new AppError(400, 'Failed to read thread!', {
      type: 'general',
      message: 'You are trying to read a thread that does not exist',
    });
  }

  const subscription = await Subscription.findOne({
    where: { userId: user.id, threadId },
  });

  if (!subscription) {
    throw new AppError(400, 'Failed to read thread!', {
      type: 'general',
      message: 'You are not subscribed to this thread',
    });
  }

  subscription.lastReadAt = new Date();

  await subscription.save();

  res.status(204).json({});
});
