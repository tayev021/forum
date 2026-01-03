import type { User } from '../../../../shared/types/User';

export type LatestPostAuthor = Pick<User, 'username' | 'avatar'>;
