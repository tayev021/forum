import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Category } from '../models';

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
