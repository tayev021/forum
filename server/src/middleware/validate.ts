import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

export function validate<T>(schema: ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));

      return res.status(400).json({ errors });
    }

    return next();
  };
}
