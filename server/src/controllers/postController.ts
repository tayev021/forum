import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import {
  LATEST_POSTS_LIMIT,
  PAGE_ITEMS_LIMIT,
  SEARCH_LIMIT,
} from '../constants';
import { Attachment, Like, Post, Report, Thread, User } from '../models';
import { AppError } from '../utils/AppError';
import sequelize, { col, fn, where, Op } from 'sequelize';
import { deletePostImages } from '../utils/deletePostImages';
import { savePostImages } from '../utils/savePostImages';

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
          attributes: [
            'id',
            'title',
            [
              sequelize.literal(`
                  CEIL(
                    (
                      SELECT COUNT(*)
                      FROM posts p2
                      WHERE p2.threadId = Post.threadId
                        AND p2.createdAt <= Post.createdAt
                    ) / ${PAGE_ITEMS_LIMIT}
                  ) 
              `),
              'page',
            ],
          ],
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

export const searchPosts = catchAsync(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || SEARCH_LIMIT;
  const query = String(req.query.query);

  if (!query) {
    throw new AppError(400, 'Failed to search posts!', {
      type: 'general',
      message: 'You are trying to search posts using the empty query',
    });
  }

  const posts = await Post.findAll({
    where: {
      [Op.and]: where(
        fn('LOWER', col('content')),
        'LIKE',
        `%${query.toLowerCase()}%`
      ),
    },
    order: [['createdAt', 'DESC']],
    limit: limit > 10 ? 10 : limit,
    attributes: ['id', 'content', 'createdAt'],
    include: [
      {
        model: Thread,
        as: 'thread',
        attributes: [
          'id',
          'title',
          [
            sequelize.literal(`
              CEIL(
                (
                  SELECT COUNT(*)
                  FROM posts p2
                  WHERE p2.threadId = Post.threadId
                    AND p2.createdAt <= Post.createdAt
                ) / ${PAGE_ITEMS_LIMIT}
              ) 
            `),
            'page',
          ],
        ],
      },
      {
        model: User,
        as: 'author',
        attributes: ['username', 'avatar'],
      },
    ],
  });

  res.status(200).json({ posts });
});

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

  thread.changed('updatedAt', true);
  await thread.save();

  if (Array.isArray(req.files) && req.files.length > 0) {
    await savePostImages(post.id, req.files);
  }

  const detailedPost = await Post.findOne({
    where: { id: post.id },
    include: [
      {
        model: Thread,
        as: 'thread',
        attributes: [
          'id',
          'title',
          [
            sequelize.literal(`
                CEIL(
                  (
                    SELECT COUNT(*)
                    FROM posts p
                    WHERE p.threadId = Post.threadId
                      AND p.createdAt <= Post.createdAt
                  ) * 1.0 / ${PAGE_ITEMS_LIMIT}
                )
              `),
            'page',
          ],
        ],
      },
      {
        model: Attachment,
        as: 'attachments',
        attributes: ['id', 'type', 'fileName', 'createdAt'],
        separate: true,
        order: [['id', 'ASC']],
      },
    ],
  });

  res.status(201).json({ post: detailedPost });
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

  if (Array.isArray(req.files) && req.files.length > 0) {
    await savePostImages(post.id, req.files);
  }

  const detailedPost = await Post.findOne({
    where: { id: post.id },
    include: [
      {
        model: Thread,
        as: 'thread',
        attributes: [
          'id',
          'title',
          [
            sequelize.literal(`
                CEIL(
                  (
                    SELECT COUNT(*)
                    FROM posts p
                    WHERE p.threadId = Post.threadId
                      AND p.createdAt <= Post.createdAt
                  ) * 1.0 / ${PAGE_ITEMS_LIMIT}
                )
              `),
            'page',
          ],
        ],
      },
      {
        model: Attachment,
        as: 'attachments',
        attributes: ['id', 'type', 'fileName', 'createdAt'],
        separate: true,
        order: [['id', 'ASC']],
      },
    ],
  });

  res.status(201).json({ post: detailedPost });
});

export const deletePost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.postId;

  const post = await Post.findByPk(postId);

  if (!post) {
    throw new AppError(400, 'Failed to delete post!', {
      type: 'general',
      message: 'You are trying to delete a post that does not exist',
    });
  }

  await deletePostImages(post.id);

  const thread = await Thread.findOne({
    where: { id: post.threadId },
    attributes: [
      'id',
      [
        sequelize.literal(`(
          SELECT COUNT(*)
          FROM posts p
          WHERE p.threadId = Thread.id
        )`),
        'posts',
      ],
    ],
  });

  if (Number(thread?.get('posts')) <= 1) {
    await thread?.destroy();
  }

  await post.destroy();

  res.status(200).json({});
});

export const likePost = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const postId = req.params.postId;

  const existingPost = await Post.findByPk(postId);

  if (!existingPost) {
    throw new AppError(400, 'Failed to like post!', {
      type: 'general',
      message: 'You are trying to like a post that does not exist',
    });
  }

  if (existingPost.authorId === user.id) {
    throw new AppError(400, 'Failed to like post!', {
      type: 'general',
      message: 'You are trying to like your own post',
    });
  }

  const existingLike = await Like.findOne({
    where: { userId: user.id, postId },
  });

  if (existingLike) {
    throw new AppError(400, 'Failed to like post!', {
      type: 'general',
      message: 'You are trying to like a post that you already liked',
    });
  }

  await Like.create({ userId: user.id, postId });

  const detailedPost = await Post.findOne({
    where: { id: postId },
    attributes: [
      'id',
      'threadId',
      'content',
      'createdAt',
      'updatedAt',
      [
        sequelize.literal(`(
            SELECT COUNT(*)
            FROM likes l
            WHERE l.postId = Post.id
          )`),
        'likes',
      ],
      [
        sequelize.literal(`EXISTS (
            SELECT 1
            FROM likes l
            WHERE l.postId = Post.id
              AND l.userId = ${user.id}
          )`),
        'isLiked',
      ],
      [
        sequelize.literal(`EXISTS (
          SELECT 1
          FROM reports r
          WHERE r.postId = Post.id
            AND r.reporterId = ${user.id}
        )`),
        'isReported',
      ],
    ],
    include: [
      {
        model: User,
        as: 'author',
        attributes: ['id', 'username', 'avatar', 'role', 'lastSignIn'],
      },
      {
        model: Thread,
        as: 'thread',
      },
      {
        model: Attachment,
        as: 'attachments',
        attributes: ['id', 'type', 'fileName', 'createdAt'],
        separate: true,
        order: [['id', 'ASC']],
      },
    ],
  });

  res.status(201).json({ post: detailedPost });
});

export const reportPost = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const postId = req.params.postId;
  const reason = req.body.reason;

  const existingPost = await Post.findByPk(postId);

  if (!existingPost) {
    throw new AppError(400, 'Failed to report post!', {
      type: 'general',
      message: 'You are trying to report a post that does not exist',
    });
  }

  if (existingPost.authorId === user.id) {
    throw new AppError(400, 'Failed to report post!', {
      type: 'general',
      message: 'You are trying to report your own post',
    });
  }

  const existingReport = await Report.findOne({
    where: { reporterId: user.id, postId },
  });

  if (existingReport) {
    throw new AppError(400, 'Failed to report post!', {
      type: 'general',
      message: 'You are trying to report a post that you already reported',
    });
  }

  await Report.create({ reporterId: user.id, postId, reason: reason });

  const detailedPost = await Post.findOne({
    where: { id: postId },
    attributes: [
      'id',
      'threadId',
      'content',
      'createdAt',
      'updatedAt',
      [
        sequelize.literal(`(
            SELECT COUNT(*)
            FROM likes l
            WHERE l.postId = Post.id
          )`),
        'likes',
      ],
      [
        sequelize.literal(`EXISTS (
            SELECT 1
            FROM likes l
            WHERE l.postId = Post.id
              AND l.userId = ${user.id}
          )`),
        'isLiked',
      ],
      [
        sequelize.literal(`EXISTS (
            SELECT 1
            FROM reports r
            WHERE r.postId = Post.id
              AND r.reporterId = ${user.id}
          )`),
        'isReported',
      ],
    ],
    include: [
      {
        model: User,
        as: 'author',
        attributes: ['id', 'username', 'avatar', 'role', 'lastSignIn'],
      },

      {
        model: Thread,
        as: 'thread',
      },
      {
        model: Attachment,
        as: 'attachments',
        attributes: ['id', 'type', 'fileName', 'createdAt'],
        separate: true,
        order: [['id', 'ASC']],
      },
    ],
  });

  res.status(201).json({ post: detailedPost });
});
