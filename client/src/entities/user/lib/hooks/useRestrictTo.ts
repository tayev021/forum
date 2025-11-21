import type { UserRole } from '../../model/types/UserRole';
import { useUser } from './useUser';

export function useRestrictTo(roles: UserRole[]): boolean {
  const { user } = useUser();

  if (!user) return false;

  return roles.includes(user.role);
}
