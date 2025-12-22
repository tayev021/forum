import { z } from 'zod';

export const userBioSchema = z.object({
  bio: z
    .string()
    .min(1, 'User bio must be at least 1 character long')
    .max(1024, 'User bio must be a maximum of 1024 characters long'),
});

export const userChangePasswordSchema = z.object({
  previousPassword: z
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .max(24, 'Password must be a maximum of 24 characters long'),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .max(24, 'Password must be a maximum of 24 characters long'),
});
