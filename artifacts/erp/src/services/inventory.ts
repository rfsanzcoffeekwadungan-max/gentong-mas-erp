import { productApi } from '@/api/product.api';
import { stockApi } from '@/api/stock.api';
import type { Product, InventoryStats, StockMovement, Warehouse, PaginatedResponse } from '@/types';

export type { Product, InventoryStats, StockMovement, Warehouse };

export const inventoryService = {
  getStats: () => stockApi.getStats(),

  getProducts: (params?: { page?: number; limit?: number; search?: string; category?: string }) =>
    productApi.list(params),

  createProduct: (dto: Partial<Product>) => productApi.create(dto),

  updateStock: (id: string, quantity: number, type: 'in' | 'out') =>
    stockApi.adjust({ productId: id, quantity, type }),

  getMovements: (params?: { page?: number; limit?: number }) =>
    stockApi.getMovements(params),

  getWarehouses: () => stockApi.getWarehouses(),
};

export type { PaginatedResponse };
