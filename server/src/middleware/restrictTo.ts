import { UserRole } from '../types/UserRole';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';

export function restrictTo(...roles: UserRole[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = req.user!;

    if (!roles.includes(user.role)) {
      throw new AppError(403, 'Failed to pass protection!', {
        type: 'general',
        message: 'You do not have permission to perform this action',
      });
    }

    next();
  };
}
