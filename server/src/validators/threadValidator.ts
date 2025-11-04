import { z } from 'zod';

export const threadSchema = z.object({
  title: z
    .string()
    .min(3, 'Thread title must be at least three characters long.')
    .max(64, 'Thread title must be a maximum of 64 characters.'),
});
