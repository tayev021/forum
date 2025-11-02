import { NextFunction, Request, Response } from 'express';
import { ErrorLog } from '../models/ErrorLogModel';

export async function globalErrorHandler(
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error.statusCode) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  } else {
    await ErrorLog.create({
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      message: 'Something went wrong!',
    });
  }
}
