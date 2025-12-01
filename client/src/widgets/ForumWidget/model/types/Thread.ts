import type { Forum } from '../../../../entities/forum';

type InferThread<T> = T extends { threads: (infer R)[] } ? R : never;

export type Thread = InferThread<Forum>;
