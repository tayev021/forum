import { NextFunction, Request, Response } from 'express';
import { verifyJwtAsync } from '../utils/verifyJwtAsync';
import { User } from '../models';

export async function isSignedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    req.isSignedIn = false;
    req.user = null;
    next();
  }

  const decoded = await verifyJwtAsync(token);
  const currentUser = await User.findByPk(decoded.id);

  if (!currentUser) {
    req.isSignedIn = false;
    req.user = null;
    next();
  }

  req.isSignedIn = true;
  req.user = currentUser;
  next();
}
