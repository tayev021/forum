import type { UserValidationError } from './UserValidationError';

export type UserError = { message: string } | UserValidationError;
