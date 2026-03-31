import type { UserRole } from '../../../../shared/types/UserRole';
import { useUser } from './useUser';

export function useRestrictTo(roles: UserRole[]): boolean {
  const { user } = useUser();

  if (!user) return false;

  return roles.includes(user.role);
}
