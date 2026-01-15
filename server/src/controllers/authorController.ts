import { catchAsync } from '../utils/catchAsync';
import { Request, Response } from 'express';
import { User } from '../models';
import sequelize from 'sequelize';
import { AppError } from '../utils/AppError';

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
