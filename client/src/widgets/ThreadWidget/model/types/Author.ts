import type { Post } from './Post';

type InferAuthor<T> = T extends { author: infer R } ? R : never;

export type Author = InferAuthor<Post>;
