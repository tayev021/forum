import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import {
  DEFAULT_PAGE,
  LATEST_POSTS_LIMIT,
  PAGE_ITEMS_LIMIT,
} from '../constants';
import { Post, Thread, User } from '../models';
import { AppError } from '../utils/AppError';
import sequelize from 'sequelize';

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

export const getAuthorPosts = catchAsync(
  async (req: Request, res: Response) => {
    const authorId = req.params.authorId;
    const page = Number(req.query.page) || DEFAULT_PAGE;
    const limit = Number(req.query.limit) || PAGE_ITEMS_LIMIT;
    const offset = (page - 1) * limit;

    const author = await User.findByPk(authorId);

    if (!author) {
      throw new AppError(400, 'Failed to get posts!', {
        type: 'general',
        message: 'An author with such an identifier does not exist',
      });
    }

    const { rows: posts, count } = await Post.findAndCountAll({
      where: { authorId: authorId },
      limit: limit,
      offset: offset,
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: Thread,
          as: 'thread',
          attributes: ['id', 'title'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      posts: posts,
      totalPosts: count,
      page: page,
      totalPages: Math.ceil(count / limit),
    });
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

  thread.changed('updatedAt', true);
  await thread.save();

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
