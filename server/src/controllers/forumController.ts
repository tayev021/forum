import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Category, Forum } from '../models';
import { AppError } from '../utils/AppError';
import { capitalize } from '../utils/capitalize';

export const createForum = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const { categoryId, title } = req.body;

  const category = await Category.findByPk(categoryId);

  if (!category) {
    throw new AppError(400, 'Failed to create forum!', {
      type: 'general',
      message:
        'You are trying to create a forum in a category that does not exist',
    });
  }

  const existingForum = await Forum.findOne({
    where: { title: capitalize(title) },
  });

  if (existingForum) {
    throw new AppError(400, 'Failed to create forum!', {
      type: 'general',
      message: 'A forum with this title already exists',
    });
  }

  const forum = await Forum.create({
    authorId: user.id,
    categoryId: category.id,
    title: capitalize(title),
  });

  res.status(201).json({
    forum: {
      id: forum.id,
      title: forum.title,
    },
  });
});
