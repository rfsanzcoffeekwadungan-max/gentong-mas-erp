import { useEffect, type ComponentType } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/store/useAuthStore';
import { hasRole } from '@/utils/roles';
import type { UserRole } from '@/types';

interface WithRoleOptions {
  roles?: UserRole[];
  redirectTo?: string;
}

export function withRole<P extends object>(
  Component: ComponentType<P>,
  options: WithRoleOptions = {},
): ComponentType<P> {
  const { roles = [], redirectTo = '/' } = options;

  function ProtectedComponent(props: P) {
    const { token, user } = useAuthStore();
    const [, navigate] = useLocation();

    useEffect(() => {
      if (!token) {
        navigate('/login');
        return;
      }
      if (roles.length > 0 && user && !hasRole(user, ...roles)) {
        navigate(redirectTo);
      }
    }, [token, user]);

    if (!token) return null;
    if (roles.length > 0 && user && !hasRole(user, ...roles)) return null;

    return <Component {...props} />;
  }

  ProtectedComponent.displayName = `withRole(${Component.displayName ?? Component.name ?? 'Component'})`;
  return ProtectedComponent;
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token]);

  if (!token) return null;
  return <>{children}</>;
}

export function RequireRole({
  roles,
  children,
  fallback = null,
}: {
  roles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { user } = useAuthStore();
  if (!hasRole(user, ...roles)) return <>{fallback}</>;
  return <>{children}</>;
}
