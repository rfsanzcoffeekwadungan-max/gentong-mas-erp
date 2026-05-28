import type { UserRole } from '@/types';
import type { AuthUser } from '@/types';

export const hasRole = (user: AuthUser | null, ...roles: UserRole[]): boolean => {
  if (!user) return false;
  const userRoles: string[] = [
    ...(user.roles ?? []),
    ...(user.role ? [user.role] : []),
  ];
  return roles.some((r) => userRoles.includes(r));
};

export const hasPermission = (user: AuthUser | null, permission: string): boolean => {
  if (!user) return false;
  if (hasRole(user, 'owner', 'admin')) return true;
  return (user.permissions ?? []).includes(permission);
};

export const isOwnerOrAdmin = (user: AuthUser | null): boolean =>
  hasRole(user, 'owner', 'admin');

export const canAccessSales = (user: AuthUser | null): boolean =>
  hasRole(user, 'owner', 'admin', 'sales');

export const canAccessFinance = (user: AuthUser | null): boolean =>
  hasRole(user, 'owner', 'admin', 'finance');

export const canAccessWarehouse = (user: AuthUser | null): boolean =>
  hasRole(user, 'owner', 'admin', 'warehouse');

export const canAccessHR = (user: AuthUser | null): boolean =>
  hasRole(user, 'owner', 'admin', 'hr');

export const canAccessPurchasing = (user: AuthUser | null): boolean =>
  hasRole(user, 'owner', 'admin', 'purchasing');

export const canAccessPOS = (user: AuthUser | null): boolean =>
  hasRole(user, 'owner', 'admin', 'cashier');

export const canAccessDelivery = (user: AuthUser | null): boolean =>
  hasRole(user, 'owner', 'admin', 'driver');

export const getDefaultRoute = (user: AuthUser | null): string => {
  if (!user) return '/login';
  const role = user.role ?? (user.roles?.[0] as UserRole);
  switch (role) {
    case 'sales':       return '/sales/orders';
    case 'warehouse':   return '/gudang';
    case 'cashier':     return '/pos/cashier';
    case 'finance':     return '/invoice/list';
    case 'driver':      return '/delivery/areas';
    case 'purchasing':  return '/purchasing/purchase-orders';
    case 'hr':          return '/hr/employees';
    default:            return '/';
  }
};
