export const sortOrders = ['ASC', 'DESC'] as const;

export type SortOrder = (typeof sortOrders)[number];
