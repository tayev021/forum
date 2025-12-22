import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';
import { AppError } from '../utils/AppError';

export function validate(...schemas: ZodType<any>[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      throw new AppError(400, 'Data error!', {
        type: 'general',
        message: 'Failed to parse received data',
      });
    }

    for (const schema of schemas) {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const fields = result.error.issues.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));

        throw new AppError(400, 'Validation fail!', {
          type: 'validation',
          fields,
        });
      }
    }

    return next();
  };
}
