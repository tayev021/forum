import type { User } from '../../../../shared/types/User';

export type ReportedPostAuthor = Pick<
  User,
  'id' | 'username' | 'avatar' | 'role'
>;
