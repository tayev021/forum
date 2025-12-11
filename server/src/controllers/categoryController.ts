import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Category, Forum } from '../models';
import { AppError } from '../utils/AppError';
import { capitalize } from '../utils/capitalize';

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
    const title = capitalize(req.body.title);

    const existingCategory = await Category.findOne({ where: { title } });

    if (existingCategory) {
      throw new AppError(400, 'Failed to create category!', {
        type: 'general',
        message: 'A category with this title already exists',
      });
    }

    await Category.create({
      authorId: user.id,
      title: capitalize(title),
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

    res.status(201).json({ categories });
  }
);

export const updateCategory = catchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const title = capitalize(req.body.title);

    const category = await Category.findByPk(categoryId);

    if (!category) {
      throw new AppError(400, 'Failed to update category!', {
        type: 'general',
        message: 'You are trying to update a category that does not exist',
      });
    }

    category.title = title;

    await category.save();

    const updatedCategory = await Category.findOne({
      where: { id: categoryId },
      attributes: ['id', 'title'],
      include: [
        {
          model: Forum,
          as: 'forums',
          attributes: ['id', 'title'],
        },
      ],
    });

    res.status(201).json({ category: updatedCategory });
  }
);

export const deleteCategory = catchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      throw new AppError(400, 'Failed to delete category!', {
        type: 'general',
        message: 'You are trying to delete a category that does not exist',
      });
    }

    const forumsCount = await Forum.count({ where: { categoryId } });

    if (forumsCount > 0) {
      throw new AppError(400, 'Failed to delete category!', {
        type: 'general',
        message: 'You cannot delete a category that contains forums',
      });
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
