import { apiClient } from '@/api/client';
import { dashboardApi } from '@/api/dashboard.api';
import type { DashboardSummary, RecentOrder, DashboardAlert, MonthlyData } from '@/types';

export type { DashboardSummary, RecentOrder, DashboardAlert, MonthlyData };

export const dashboardService = {
  getSummary: () => dashboardApi.getSummary(),
  getActivityFeed: (limit?: number) => dashboardApi.getActivityFeed(limit),
  getTopProducts: (limit?: number) => dashboardApi.getTopProducts(limit),
};

export { apiClient as api };
