import { z } from 'zod';

export const createPostSchema = z.object({
  content: z
    .string()
    .max(1024, 'Password must be a maximum of 1024 characters.'),
});
