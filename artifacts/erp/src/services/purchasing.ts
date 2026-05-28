import { purchasingApi } from '@/api/purchasing.api';
import type { PurchasingStats, PurchaseOrder, Supplier } from '@/types';

export type { PurchasingStats, PurchaseOrder, Supplier };

export const purchasingService = {
  getStats: () => purchasingApi.getStats(),

  getPurchaseOrders: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => purchasingApi.getPurchaseOrders(params),

  createPurchaseOrder: (dto: Partial<PurchaseOrder>) =>
    purchasingApi.createPO(dto as any),

  approvePO: (id: string) => purchasingApi.approvePO(id),

  getSuppliers: (params?: { search?: string }) =>
    purchasingApi.getSuppliers(params),
};
