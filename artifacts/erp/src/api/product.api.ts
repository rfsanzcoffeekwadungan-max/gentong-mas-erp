import { apiClient } from './client';
import type { PaginatedResponse, Product, ProductCategory } from '@/types';

export interface ProductParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  warehouse?: string;
  status?: 'active' | 'inactive';
}

export const productApi = {
  list: (params?: ProductParams) =>
    apiClient
      .get<PaginatedResponse<Product>>('/inventory/products', { params })
      .then((r) => r.data),

  get: (id: string) =>
    apiClient.get<Product>(`/inventory/products/${id}`).then((r) => r.data),

  create: (dto: Partial<Product>) =>
    apiClient.post<Product>('/inventory/products', dto).then((r) => r.data),

  update: (id: string, dto: Partial<Product>) =>
    apiClient.put<Product>(`/inventory/products/${id}`, dto).then((r) => r.data),

  delete: (id: string) =>
    apiClient.delete(`/inventory/products/${id}`).then((r) => r.data),

  search: (query: string, limit = 8) =>
    apiClient
      .get<PaginatedResponse<Product>>('/inventory/products', {
        params: { search: query, limit },
      })
      .then((r) => r.data),

  getCategories: () =>
    apiClient.get<ProductCategory[]>('/inventory/products/categories').then((r) => r.data),
};
