import { z } from 'zod';

export const signinSchema = z.object({
  email: z.email('Email must be valid.'),
  password: z
    .string()
    .min(4, 'Password must be at least 3 characters long')
    .max(24, 'Password must be a maximum of 24 characters long'),
});

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be a maximum of 20 characters long'),
  email: z.email('Email must be valid'),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .max(24, 'Password must be a maximum of 24 characters long'),
});
