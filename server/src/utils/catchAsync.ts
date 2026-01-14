import { NextFunction, Request, Response } from 'express';

export function catchAsync(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log(`\x1b[31m[Server Error]:\x1b[33m ${err.message} \x1b[0m`);
      next(err);
    });
  };
}
