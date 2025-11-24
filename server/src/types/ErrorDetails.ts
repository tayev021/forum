interface Details {
  type: 'general';
  message: string;
}

interface ValidationDetails {
  type: 'validation';
  fields: {
    field: string;
    message: string;
  }[];
}

export type ErrorDetails = Details | ValidationDetails;
