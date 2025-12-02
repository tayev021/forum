import type { Thread } from '../../../../entities/thread';

type InferPosts<T> = T extends { posts: (infer R)[] } ? R : never;

export type Post = InferPosts<Thread>;
