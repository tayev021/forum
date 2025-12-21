import { z } from 'zod';

export const forumSchema = z.object({
  title: z
    .string()
    .min(3, 'Forum title must be at least three characters long')
    .max(64, 'Forum title must be a maximum of 64 characters long'),
});
