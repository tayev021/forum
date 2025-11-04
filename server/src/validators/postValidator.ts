import { z } from 'zod';

export const postSchema = z.object({
  content: z
    .string()
    .max(1024, 'Post content must be a maximum of 1024 characters.'),
});
