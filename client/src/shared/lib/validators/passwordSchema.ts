import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(4, 'Password must be at least 4 characters long')
  .max(24, 'Password must be a maximum of 24 characters');
