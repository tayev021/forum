import { ZodType } from 'zod';

export function validate(schema: ZodType<any>) {
  return (value: string) => {
    const result = schema.safeParse(value);

    return result.success ? '' : result.error.issues[0].message;
  };
}
