import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils";
import type { Product } from "@/types";
import { Search, Plus, Filter, MoreHorizontal, Package } from "lucide-react";

const MOCK_PRODUCTS: Product[] = [
  { id: "1", sku: "ELC-001", name: "Kabel UTP Cat6 (per meter)", category: "Electronics", price: 8500, cost: 5200, unit: "meter", status: "active", createdAt: "2026-01-15" },
  { id: "2", sku: "ELC-012", name: "Switch 24 Port Managed", category: "Electronics", price: 1_850_000, cost: 1_200_000, unit: "unit", status: "active", createdAt: "2026-01-20" },
  { id: "3", sku: "OFF-034", name: "Kertas HVS A4 80gr (Rim)", category: "Office Supplies", price: 52_000, cost: 38_000, unit: "rim", status: "active", createdAt: "2026-02-01" },
  { id: "4", sku: "OFF-021", name: "Tinta Printer Black 100ml", category: "Office Supplies", price: 45_000, cost: 28_000, unit: "botol", status: "active", createdAt: "2026-02-10" },
  { id: "5", sku: "ELC-023", name: "Router WiFi 6 Dual Band", category: "Electronics", price: 750_000, cost: 480_000, unit: "unit", status: "active", createdAt: "2026-02-15" },
  { id: "6", sku: "FNB-005", name: "Air Mineral 600ml (karton)", category: "Food & Beverage", price: 38_000, cost: 25_000, unit: "karton", status: "active", createdAt: "2026-03-01" },
  { id: "7", sku: "HML-011", name: "Kursi Ergonomis Mesh", category: "Home & Living", price: 1_250_000, cost: 780_000, unit: "unit", status: "active", createdAt: "2026-03-10" },
  { id: "8", sku: "ELC-045", name: "Laptop Stand Adjustable", category: "Electronics", price: 185_000, cost: 95_000, unit: "unit", status: "inactive", createdAt: "2026-03-20" },
  { id: "9", sku: "OFF-056", name: "Whiteboard 60x90cm", category: "Office Supplies", price: 320_000, cost: 195_000, unit: "unit", status: "active", createdAt: "2026-04-01" },
  { id: "10", sku: "ELC-067", name: "UPS 1200VA", category: "Electronics", price: 850_000, cost: 560_000, unit: "unit", status: "discontinued", createdAt: "2025-12-01" },
];

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-gray-100 text-gray-600",
  discontinued: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Aktif",
  inactive: "Nonaktif",
  discontinued: "Dihentikan",
};

const CATEGORIES = ["Semua", "Electronics", "Office Supplies", "Food & Beverage", "Home & Living"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "Semua" || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div data-testid="page-products">
      <PageHeader
        title="Produk"
        description={`${MOCK_PRODUCTS.length} produk terdaftar`}
        actions={
          <Button size="sm" data-testid="button-add-product">
            <Plus className="w-4 h-4 mr-1.5" />
            Tambah Produk
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-testid="input-search-products"
            placeholder="Cari nama atau SKU produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              data-testid={`filter-category-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Package className="w-10 h-10 mb-3 opacity-40" />
              <p className="text-sm font-medium">Tidak ada produk ditemukan</p>
              <p className="text-xs mt-1">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">SKU</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Nama Produk</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">Kategori</th>
                    <th className="text-right px-5 py-3 font-medium text-muted-foreground hidden sm:table-cell">Harga</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Satuan</th>
                    <th className="text-center px-5 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-center px-5 py-3 font-medium text-muted-foreground w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((product) => (
                    <tr
                      key={product.id}
                      data-testid={`row-product-${product.id}`}
                      className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-mono text-xs text-primary">{product.sku}</td>
                      <td className="px-5 py-3.5 font-medium text-foreground">{product.name}</td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">{product.category}</td>
                      <td className="px-5 py-3.5 text-right font-medium hidden sm:table-cell">{formatCurrency(product.price)}</td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden lg:table-cell">{product.unit}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[product.status]}`}>
                          {STATUS_LABELS[product.status]}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <button
                          data-testid={`btn-product-action-${product.id}`}
                          className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {filtered.length > 0 && (
        <p className="text-xs text-muted-foreground mt-3">
          Menampilkan {filtered.length} dari {MOCK_PRODUCTS.length} produk
        </p>
      )}
    </div>
  );
}
