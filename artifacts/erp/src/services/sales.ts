import { salesApi } from '@/api/sales.api';
import type { SalesOrder, Quotation, SalesSummary, PaginatedResponse } from '@/types';

export type { SalesOrder, Quotation, SalesSummary };

export const salesService = {
  getSummary: () => salesApi.getSummary(),

  getOrders: (params?: { page?: number; limit?: number; status?: string; search?: string }) =>
    salesApi.getOrders(params),

  getOrder: (id: string) => salesApi.getOrder(id),

  createOrder: (dto: Partial<SalesOrder>) => salesApi.createOrder(dto as any),

  getQuotations: (params?: { page?: number; limit?: number }) =>
    salesApi.getQuotations(params),

  getFaktur: (params?: { page?: number; limit?: number }) =>
    salesApi.getFaktur(params),

  getList: () => salesApi.getOrders({ limit: 100 }),
};

export type { PaginatedResponse };
