import type { User } from '../../../../shared/types/User';

export type Reporter = Pick<User, 'id' | 'username' | 'avatar' | 'role'>;
