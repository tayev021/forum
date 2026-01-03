import type { User } from '../../../../shared/types/User';

export type ThreadPostAuthor = Pick<
  User,
  'id' | 'username' | 'avatar' | 'role' | 'lastSignIn'
>;
