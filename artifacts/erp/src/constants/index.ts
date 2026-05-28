export const APP_NAME = 'Gentong Mas ERP';
export const APP_VERSION = '2.0.0';

export const STORAGE_KEYS = {
  TOKEN: 'erp_token',
  REFRESH_TOKEN: 'erp_refresh_token',
  USER: 'erp_user',
  THEME: 'erp_theme',
  SIDEBAR_COLLAPSED: 'erp_sidebar_collapsed',
} as const;

export const USER_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  SALES: 'sales',
  WAREHOUSE: 'warehouse',
  CASHIER: 'cashier',
  FINANCE: 'finance',
  DRIVER: 'driver',
  PURCHASING: 'purchasing',
  HR: 'hr',
} as const;

export const ROLE_LABELS: Record<string, string> = {
  owner: 'Owner',
  admin: 'Administrator',
  sales: 'Sales',
  warehouse: 'Warehouse',
  cashier: 'Kasir',
  finance: 'Finance',
  driver: 'Driver',
  purchasing: 'Purchasing',
  hr: 'HR',
};

export const ROLE_COLORS: Record<string, string> = {
  owner: '#7C3AED',
  admin: '#2563EB',
  sales: '#0891B2',
  warehouse: '#D97706',
  cashier: '#DC2626',
  finance: '#059669',
  driver: '#0369A1',
  purchasing: '#7C2D12',
  hr: '#BE185D',
};

export const ORDER_STATUSES = {
  DRAFT: 'draft',
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  DELIVERED: 'delivered',
  DONE: 'done',
  CANCELLED: 'cancelled',
} as const;

export const PO_STATUSES = {
  DRAFT: 'draft',
  WAITING_APPROVAL: 'waiting_approval',
  APPROVED: 'approved',
  RECEIVED: 'received',
  CANCELLED: 'cancelled',
} as const;

export const PAGINATION_DEFAULT = {
  PAGE: 1,
  LIMIT: 20,
} as const;

export const CURRENCY = 'IDR';
export const LOCALE = 'id-ID';

export const DATE_FORMAT = {
  DISPLAY: { day: 'numeric' as const, month: 'long' as const, year: 'numeric' as const },
  SHORT: { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const },
};
