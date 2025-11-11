import { z } from 'zod';

export const emailSchema = z.email('Email must be valid');
