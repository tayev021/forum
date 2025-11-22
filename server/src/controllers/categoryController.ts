import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Category, Forum } from '../models';
import { AppError } from '../utils/AppError';

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

    await Category.create({
      authorId: user.id,
      title: `${title[0].toUpperCase()}${title.slice(1).toLowerCase()}`,
    });

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
  }
);

export const deleteCategory = catchAsync(
  async (req: Request, res: Response) => {
    const category = await Category.findByPk(req.params.categoryId);

    if (!category) {
      throw new AppError(
        400,
        'You are trying to delete a category that does not exist'
      );
    }

    await category.destroy();

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
  }
);
