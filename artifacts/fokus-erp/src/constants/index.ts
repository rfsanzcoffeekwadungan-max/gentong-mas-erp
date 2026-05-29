export const APP_NAME = "Fokus ERP";
export const APP_VERSION = "1.0.0";

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/",
  PRODUCTS: "/products",
  INVENTORY: "/inventory",
} as const;

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/",
    icon: "LayoutDashboard",
  },
  {
    title: "Products",
    href: "/products",
    icon: "Package",
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: "Warehouse",
  },
] as const;

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Food & Beverage",
  "Home & Living",
  "Office Supplies",
  "Raw Materials",
];

export const PRODUCT_STATUSES = {
  active: "Active",
  inactive: "Inactive",
  discontinued: "Discontinued",
} as const;

export const INVENTORY_STATUSES = {
  in_stock: "In Stock",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
} as const;
