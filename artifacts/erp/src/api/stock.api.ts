import { apiClient } from './client';
import type { PaginatedResponse, StockMovement, Warehouse, InventoryStats } from '@/types';

export interface StockAdjustmentPayload {
  productId: string;
  quantity: number;
  type: 'in' | 'out' | 'adjustment';
  warehouseId?: string;
  reference?: string;
  notes?: string;
}

export interface StockTransferPayload {
  productId: string;
  quantity: number;
  fromWarehouseId: string;
  toWarehouseId: string;
  reference?: string;
}

export const stockApi = {
  getStats: () =>
    apiClient.get<InventoryStats>('/inventory/stats').then((r) => r.data),

  getMovements: (params?: { page?: number; limit?: number; productId?: string; type?: string }) =>
    apiClient
      .get<PaginatedResponse<StockMovement>>('/inventory/stock-movements', { params })
      .then((r) => r.data),

  adjust: (payload: StockAdjustmentPayload) =>
    apiClient.post('/inventory/stock-adjustments', payload).then((r) => r.data),

  transfer: (payload: StockTransferPayload) =>
    apiClient.post('/inventory/transfers', payload).then((r) => r.data),

  getWarehouses: () =>
    apiClient.get<Warehouse[]>('/inventory/warehouses').then((r) => r.data),

  getWarehouse: (id: string) =>
    apiClient.get<Warehouse>(`/inventory/warehouses/${id}`).then((r) => r.data),

  getLowStock: (threshold?: number) =>
    apiClient
      .get('/inventory/products/low-stock', { params: { threshold } })
      .then((r) => r.data),

  getExpiryAlerts: () =>
    apiClient.get('/inventory/expiry').then((r) => r.data),
};
