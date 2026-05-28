import { apiClient } from './client';
import type { PaginatedResponse, SalesOrder, Quotation, SalesSummary } from '@/types';

export interface SalesOrderParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  salesPerson?: string;
}

export interface CreateSalesOrderPayload {
  namaCustomer: string;
  customer_id?: string;
  noHp?: string;
  alamat?: string;
  catatan?: string;
  salesName?: string;
  totalHarga: number;
  status?: string;
  items: {
    nama: string;
    product_id?: string;
    qty: number;
    harga: number;
    subtotal: number;
    unit?: string;
  }[];
}

export const salesApi = {
  getSummary: () =>
    apiClient.get<SalesSummary>('/sales/summary').then((r) => r.data),

  getOrders: (params?: SalesOrderParams) =>
    apiClient
      .get<PaginatedResponse<SalesOrder>>('/sales/orders', { params })
      .then((r) => r.data),

  getOrder: (id: string | number) =>
    apiClient.get<SalesOrder>(`/sales/orders/${id}`).then((r) => r.data),

  createOrder: (dto: CreateSalesOrderPayload) =>
    apiClient.post<SalesOrder>('/sales/orders', dto).then((r) => r.data),

  updateOrder: (id: string | number, dto: Partial<SalesOrder>) =>
    apiClient.put<SalesOrder>(`/sales/orders/${id}`, dto).then((r) => r.data),

  confirmOrder: (id: string | number) =>
    apiClient.post(`/sales/orders/${id}/confirm`).then((r) => r.data),

  cancelOrder: (id: string | number, reason?: string) =>
    apiClient.post(`/sales/orders/${id}/cancel`, { reason }).then((r) => r.data),

  getQuotations: (params?: { page?: number; limit?: number; status?: string }) =>
    apiClient
      .get<PaginatedResponse<Quotation>>('/sales/quotations', { params })
      .then((r) => r.data),

  createQuotation: (dto: Partial<Quotation>) =>
    apiClient.post<Quotation>('/sales/quotations', dto).then((r) => r.data),

  getFaktur: (params?: { page?: number; limit?: number; status?: string }) =>
    apiClient.get('/sales/faktur', { params }).then((r) => r.data),
};
