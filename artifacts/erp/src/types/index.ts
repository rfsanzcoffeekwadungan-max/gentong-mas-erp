export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export type UserRole =
  | 'owner'
  | 'admin'
  | 'sales'
  | 'warehouse'
  | 'cashier'
  | 'finance'
  | 'driver'
  | 'purchasing'
  | 'hr';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
  roles?: UserRole[];
  permissions?: string[];
  avatar?: string;
  phone?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category?: string;
  category_id?: string;
  stock: number;
  min_stock?: number;
  unit: string;
  price?: number;
  hargaJual?: number;
  hargaBeli?: number;
  warehouse?: string;
  brand?: string;
  description?: string;
  image?: string;
  status?: 'active' | 'inactive';
  barcode?: string;
  weight?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  parent_id?: string;
  product_count?: number;
}

export interface SalesOrder {
  id: string | number;
  order_number?: string;
  namaCustomer?: string;
  customer?: string | { name: string; id: string };
  customer_id?: string;
  noHp?: string;
  alamat?: string;
  catatan?: string;
  salesName?: string;
  sales_person?: string;
  total?: number;
  totalHarga?: number;
  amount?: number;
  status: 'draft' | 'pending' | 'confirmed' | 'delivered' | 'done' | 'cancelled';
  date?: string;
  created_at?: string;
  items?: SalesOrderItem[];
}

export interface SalesOrderItem {
  id?: string | number;
  nama?: string;
  product?: string;
  product_id?: string;
  qty: number;
  harga: number;
  subtotal: number;
  unit?: string;
}

export interface Quotation {
  id: string;
  quotation_number?: string;
  customer: string;
  amount: number;
  status: string;
  date?: string;
  expiry_date?: string;
  created_at?: string;
}

export interface SalesSummary {
  totalOrders?: number;
  total_orders?: number;
  totalRevenue?: number;
  total_revenue?: number;
  avg_order_value?: number;
  pendingOrders?: number;
  pending_orders?: number;
  growth_vs_last_month?: number;
}

export interface PurchaseOrder {
  id: string;
  po_number?: string;
  supplier?: string | { name: string; id: string };
  supplier_id?: string;
  total_amount?: number;
  status: 'draft' | 'waiting_approval' | 'approved' | 'received' | 'cancelled';
  order_date?: string;
  expected_date?: string;
  items?: POItem[];
  notes?: string;
}

export interface POItem {
  id?: string;
  product?: string;
  product_id?: string;
  quantity: number;
  unit_price: number;
  total: number;
  unit?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact?: string;
  email?: string;
  phone?: string;
  address?: string;
  payment_terms?: string;
  total_orders?: number;
  npwp?: string;
}

export interface PurchasingStats {
  total_po: number;
  pending_approval: number;
  total_value: number;
  overdue_po: number;
  top_supplier?: string;
}

export interface InventoryStats {
  total_products: number;
  low_stock_items: number;
  out_of_stock: number;
  total_value: number;
  movements_today: number;
}

export interface StockMovement {
  id: string;
  product?: string;
  product_id?: string;
  type: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  date?: string;
  created_at?: string;
  reference?: string;
  warehouse_from?: string;
  warehouse_to?: string;
  notes?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location?: string;
  address?: string;
  capacity?: number;
  used?: number;
  manager?: string;
}

export interface DashboardSummary {
  revenue_today: number;
  total_orders: number;
  invoice_outstanding: number;
  active_customers: number;
  low_stock_count: number;
  pending_po: number;
  revenue_growth: number;
  order_growth: number;
  recent_orders: RecentOrder[];
  alerts: DashboardAlert[];
  monthly_revenue: MonthlyData[];
}

export interface RecentOrder {
  id: string | number;
  order_number?: string;
  customer?: string | { name: string };
  namaCustomer?: string;
  amount?: number;
  total?: number;
  status: string;
  date?: string;
  created_at?: string;
}

export interface DashboardAlert {
  message?: string;
  msg?: string;
  type: 'danger' | 'warning' | 'info';
  href?: string;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  orders: number;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  type?: 'individual' | 'company';
  npwp?: string;
  credit_limit?: number;
  outstanding?: number;
  total_orders?: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}
