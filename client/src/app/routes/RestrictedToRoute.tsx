import { useEffect, type ReactElement } from 'react';
import { useUser } from '../../entities/user';
import { useNavigate } from 'react-router';
import type { UserRole } from '../../shared/types/UserRole';
import toast from 'react-hot-toast';

interface RestrictedToRouteProps {
  roles: UserRole[];
  children: ReactElement | ReactElement[];
}

export function RestrictedToRoute({ roles, children }: RestrictedToRouteProps) {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !roles.includes(user.role)) {
      navigate('/');
      toast.error('You do not have permission to perform this action');
    }
  }, [user, roles]);

  return children;
}
