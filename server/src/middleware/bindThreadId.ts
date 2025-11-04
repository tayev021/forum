import { NextFunction, Request, Response } from 'express';

export function bindThreadId(req: Request, res: Response, next: NextFunction) {
  req.threadId = Number(req.params.threadId);
  next();
}
