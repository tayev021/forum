import type { User } from '../../../../shared/types/User';

export type Author = Pick<User, 'id' | 'username' | 'avatar' | 'bio'> & {
  totalPosts: number;
  totalThreads: number;
};
