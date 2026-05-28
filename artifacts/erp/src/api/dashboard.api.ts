import { apiClient } from './client';
import type { DashboardSummary } from '@/types';

export const dashboardApi = {
  getSummary: () =>
    apiClient.get<DashboardSummary>('/dashboard/summary').then((r) => r.data),

  getActivityFeed: (limit = 10) =>
    apiClient
      .get<{ action: string; user: string; time: string; color?: string }[]>(
        '/dashboard/activity',
        { params: { limit } },
      )
      .then((r) => r.data),

  getTopProducts: (limit = 5) =>
    apiClient
      .get<{ name: string; sold: number; revenue: number; pct: number }[]>(
        '/dashboard/top-products',
        { params: { limit } },
      )
      .then((r) => r.data),
};
