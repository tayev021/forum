import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Category, Forum } from '../models';

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    attributes: ['id', 'title'],
    include: [
      {
        model: Forum,
        as: 'forums',
        attributes: ['id', 'title'],
      },
    ],
  });

  res.status(200).json({ categories });
});

export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user!;
    const title = req.body.title;

    const category = await Category.create({
      authorId: user.id,
      title,
    });

    res.status(200).json({
      category: {
        id: category.id,
        title: category.title,
      },
    });
  }
);
