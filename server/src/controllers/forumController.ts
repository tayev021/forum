import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Category, Forum } from '../models';
import { AppError } from '../utils/AppError';

export const createForum = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const title = req.body.title;
  const categoryId = Number(req.query.categoryId);

  const category = await Category.findByPk(categoryId);

  if (!category) {
    throw new AppError(
      403,
      'You are trying to create a forum in a category that does not exist'
    );
  }

  const forum = await Forum.create({
    authorId: user.id,
    categoryId: category.id,
    title,
  });

  res.status(200).json({
    forum: {
      id: forum.id,
      title: forum.title,
    },
  });
});
