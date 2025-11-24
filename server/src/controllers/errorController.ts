import { NextFunction, Request, Response } from 'express';
import { ErrorLog } from '../models/ErrorLogModel';
import { AppError } from '../utils/AppError';

export async function globalErrorHandler(
  error: AppError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    res.status(error.statusCode).json(error.details);
  } else {
    await ErrorLog.create({
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      type: 'general',
      message: 'Something went wrong!',
    });
  }
}
