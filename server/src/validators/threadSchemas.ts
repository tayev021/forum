import { z } from 'zod';

export const threadTitleSchema = z.object({
  title: z
    .string()
    .min(3, 'Thread title must be at least 3 characters long')
    .max(128, 'Thread title must be a maximum of 128 characters long'),
});
