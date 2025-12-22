import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { verifyJwtAsync } from '../utils/verifyJwtAsync';
import { User } from '../models';

export async function protect(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError(401, 'Failed to pass protection!', {
      type: 'general',
      message: 'You are not signed in! Please sign in to get access',
    });
  }

  const decoded = await verifyJwtAsync(token);
  const currentUser = await User.findByPk(decoded.id);

  if (!currentUser) {
    throw new AppError(401, 'Failed to pass protection!', {
      type: 'general',
      message: 'This token belongs to a user who does not exist',
    });
  }

  req.user = currentUser;
  next();
}
