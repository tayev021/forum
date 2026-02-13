export const options = ['posts', 'threads', 'authors'] as const;

export type Option = (typeof options)[number];
