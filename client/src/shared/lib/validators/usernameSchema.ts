import { z } from 'zod';

export const usernameSchema = z
  .string()
  .min(3, 'Must be at least 3 characters long')
  .max(20, 'Must be a maximum of 20 characters');
