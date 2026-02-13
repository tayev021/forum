import { catchAsync } from '../utils/catchAsync';
import { Request, Response } from 'express';
import { User } from '../models';
import sequelize, { col, fn, where } from 'sequelize';
import { AppError } from '../utils/AppError';
import { SEARCH_LIMIT } from '../constants';
import { Op } from 'sequelize';

export const getAuthorProfile = catchAsync(
  async (req: Request, res: Response) => {
    const authorId = req.params.authorId;

    const author = await User.findOne({
      where: { id: authorId },
      attributes: {
        include: [
          [
            sequelize.literal(`
              (
                SELECT COUNT(*)
                FROM posts p
                WHERE p.authorId = User.id
              ) 
            `),
            'totalPosts',
          ],
          [
            sequelize.literal(`
              (
                SELECT COUNT(*)
                FROM threads t
                WHERE t.authorId = User.id
              ) 
            `),
            'totalThreads',
          ],
        ],
      },
    });

    if (!author) {
      throw new AppError(400, 'Fail to get author profile!', {
        type: 'general',
        message: 'You are trying to get an author profile that does not exist',
      });
    }

    res.status(200).json({
      author: {
        id: author.id,
        username: author.username,
        avatar: author.avatar,
        bio: author.bio,
        totalPosts: author.get('totalPosts'),
        totalThreads: author.get('totalThreads'),
      },
    });
  }
);

export const searchAuthors = catchAsync(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || SEARCH_LIMIT;
  const query = String(req.query.query);

  if (!query) {
    throw new AppError(400, 'Failed to search authors!', {
      type: 'general',
      message: 'You are trying to search authors using the empty query',
    });
  }

  const authors = await User.findAll({
    where: {
      [Op.and]: where(
        fn('LOWER', col('username')),
        'LIKE',
        `%${query.toLowerCase()}%`
      ),
    },
    order: [['username', 'DESC']],
    limit: limit > 10 ? 10 : limit,
    attributes: ['id', 'username', 'avatar'],
  });

  res.status(200).json({ authors });
});
