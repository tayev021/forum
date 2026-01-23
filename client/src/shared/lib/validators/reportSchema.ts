import z from 'zod';

export const reportReasonSchema = z
  .string()
  .min(3, 'The report reason must be at least 3 characters long')
  .max(1024, 'The report reason must be a maximum 1024 characters long');
