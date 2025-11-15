import { useEffect, type ReactElement } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../../entities/user/lib/hooks/useUser';

interface ProtectedRouteProps {
  children: ReactElement | ReactElement[];
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user) navigate('/signin');
  }, [user]);

  return children;
}
