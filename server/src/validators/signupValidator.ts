import { z } from 'zod';

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least three characters long.')
    .max(20, 'Username must be a maximum of 20 characters.'),
  email: z.email('Email must be valid.'),
  password: z
    .string()
    .min(4, 'Password must be at least three characters long.')
    .max(24, 'Password must be a maximum of 24 characters.'),
});
