import { z } from 'zod';

export const postSchema = z.object({
  content: z
    .string()
    .min(1, 'Post content must be at least 1 character long')
    .max(1024, 'Post content must be a maximum of 1024 characters long'),
});
