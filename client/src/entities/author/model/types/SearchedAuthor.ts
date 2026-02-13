import type { User } from '../../../../shared/types/User';

export type SearchedAuthor = Pick<User, 'id' | 'username' | 'avatar'>;
