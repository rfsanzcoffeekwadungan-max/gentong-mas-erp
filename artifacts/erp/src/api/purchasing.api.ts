import { apiClient } from './client';
import type { PaginatedResponse, PurchaseOrder, Supplier, PurchasingStats } from '@/types';

export interface PurchaseOrderParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  supplierId?: string;
}

export interface CreatePOPayload {
  supplier_id?: string;
  supplier?: string;
  expected_date?: string;
  notes?: string;
  items: {
    product_id?: string;
    product: string;
    quantity: number;
    unit_price: number;
    total: number;
    unit?: string;
  }[];
}

export const purchasingApi = {
  getStats: () =>
    apiClient.get<PurchasingStats>('/purchasing/stats').then((r) => r.data),

  getPurchaseOrders: (params?: PurchaseOrderParams) =>
    apiClient
      .get<PaginatedResponse<PurchaseOrder>>('/purchasing/purchase-orders', { params })
      .then((r) => r.data),

  getPurchaseOrder: (id: string) =>
    apiClient.get<PurchaseOrder>(`/purchasing/purchase-orders/${id}`).then((r) => r.data),

  createPO: (dto: CreatePOPayload) =>
    apiClient.post<PurchaseOrder>('/purchasing/purchase-orders', dto).then((r) => r.data),

  updatePO: (id: string, dto: Partial<PurchaseOrder>) =>
    apiClient.put<PurchaseOrder>(`/purchasing/purchase-orders/${id}`, dto).then((r) => r.data),

  approvePO: (id: string) =>
    apiClient.post(`/purchasing/purchase-orders/${id}/approve`).then((r) => r.data),

  rejectPO: (id: string, reason?: string) =>
    apiClient.post(`/purchasing/purchase-orders/${id}/reject`, { reason }).then((r) => r.data),

  getSuppliers: (params?: { search?: string; page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Supplier>>('/purchasing/suppliers', { params }).then((r) => r.data),

  getSupplier: (id: string) =>
    apiClient.get<Supplier>(`/purchasing/suppliers/${id}`).then((r) => r.data),

  createSupplier: (dto: Partial<Supplier>) =>
    apiClient.post<Supplier>('/purchasing/suppliers', dto).then((r) => r.data),

  getRFQs: (params?: { page?: number; limit?: number; status?: string }) =>
    apiClient.get('/purchasing/rfq', { params }).then((r) => r.data),
};
