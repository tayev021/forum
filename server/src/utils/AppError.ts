import { ErrorDetails } from '../types/ErrorDetails';

export class AppError extends Error {
  statusCode: number;
  details: ErrorDetails;

  constructor(statusCode: number, message: string, details: ErrorDetails) {
    super(message);

    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
