import type { User } from '../../../../shared/types/User';

export type SearchedPostAuthor = Pick<User, 'username' | 'avatar'>;
