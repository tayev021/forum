import type { Forum } from '../../../../entities/forum/model/types/Forum';

type InferThread<T> = T extends { threads: (infer R)[] } ? R : never;

export type Thread = InferThread<Forum>;
