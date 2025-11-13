import type { UserRole } from './UserRole';

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  role: UserRole;
  lastSignIn: Date;
  createdAt: Date;
}
