import { z } from 'zod';

export const signinSchema = z.object({
  email: z.email('Email must be valid.'),
  password: z
    .string()
    .min(4, 'Password must be at least three characters long.')
    .max(24, 'Password must be a maximum of 24 characters.'),
});
