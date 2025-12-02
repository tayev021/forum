import { z } from 'zod';

export const titleSchema = z
  .string()
  .min(3, 'Category title must be at least three characters long')
  .max(64, 'Category title must be a maximum of 64 characters long');
