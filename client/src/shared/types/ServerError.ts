interface GeneralError {
  type: 'general';
  message: string;
}

interface ValidationError {
  type: 'validation';
  fields: {
    field: string;
    message: string;
  }[];
}

export type ServerError = GeneralError | ValidationError;
