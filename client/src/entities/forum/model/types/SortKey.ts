export const sortKeys = [
  'updatedAt',
  'createdAt',
  'title',
  'views',
  'postsCount',
] as const;

export type SortKey = (typeof sortKeys)[number];
