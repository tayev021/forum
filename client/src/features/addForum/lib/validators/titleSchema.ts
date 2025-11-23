import { z } from 'zod';

export const titleSchema = z
  .string()
  .min(3, 'Forum title must be at least 3 characters long')
  .max(64, 'Forum title must be a maximum of 64 characters long');
