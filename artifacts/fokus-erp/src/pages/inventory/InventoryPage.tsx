import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { InventoryItem } from "@/types";
import { formatNumber } from "@/utils";
import { Search, Download, RefreshCw, Warehouse } from "lucide-react";

const MOCK_INVENTORY: InventoryItem[] = [
  { id: "1", productId: "1", productName: "Kabel UTP Cat6 (per meter)", sku: "ELC-001", warehouseLocation: "GDG-A1", quantityOnHand: 5, quantityReserved: 0, reorderPoint: 20, reorderQuantity: 100, lastUpdated: "2026-05-29", status: "low_stock" },
  { id: "2", productId: "2", productName: "Switch 24 Port Managed", sku: "ELC-012", warehouseLocation: "GDG-A3", quantityOnHand: 2, quantityReserved: 1, reorderPoint: 5, reorderQuantity: 10, lastUpdated: "2026-05-29", status: "low_stock" },
  { id: "3", productId: "3", productName: "Kertas HVS A4 80gr (Rim)", sku: "OFF-034", warehouseLocation: "GDG-B2", quantityOnHand: 8, quantityReserved: 5, reorderPoint: 50, reorderQuantity: 200, lastUpdated: "2026-05-28", status: "low_stock" },
  { id: "4", productId: "4", productName: "Tinta Printer Black 100ml", sku: "OFF-021", warehouseLocation: "GDG-B1", quantityOnHand: 3, quantityReserved: 2, reorderPoint: 10, reorderQuantity: 30, lastUpdated: "2026-05-28", status: "low_stock" },
  { id: "5", productId: "5", productName: "Router WiFi 6 Dual Band", sku: "ELC-023", warehouseLocation: "GDG-A2", quantityOnHand: 24, quantityReserved: 3, reorderPoint: 5, reorderQuantity: 15, lastUpdated: "2026-05-27", status: "in_stock" },
  { id: "6", productId: "6", productName: "Air Mineral 600ml (karton)", sku: "FNB-005", warehouseLocation: "GDG-C1", quantityOnHand: 0, quantityReserved: 0, reorderPoint: 20, reorderQuantity: 100, lastUpdated: "2026-05-26", status: "out_of_stock" },
  { id: "7", productId: "7", productName: "Kursi Ergonomis Mesh", sku: "HML-011", warehouseLocation: "GDG-D1", quantityOnHand: 15, quantityReserved: 4, reorderPoint: 3, reorderQuantity: 10, lastUpdated: "2026-05-25", status: "in_stock" },
  { id: "8", productId: "8", productName: "Laptop Stand Adjustable", sku: "ELC-045", warehouseLocation: "GDG-A4", quantityOnHand: 42, quantityReserved: 0, reorderPoint: 10, reorderQuantity: 25, lastUpdated: "2026-05-24", status: "in_stock" },
  { id: "9", productId: "9", productName: "Whiteboard 60x90cm", sku: "OFF-056", warehouseLocation: "GDG-B3", quantityOnHand: 11, quantityReserved: 2, reorderPoint: 5, reorderQuantity: 15, lastUpdated: "2026-05-23", status: "in_stock" },
  { id: "10", productId: "10", productName: "UPS 1200VA", sku: "ELC-067", warehouseLocation: "GDG-A5", quantityOnHand: 0, quantityReserved: 0, reorderPoint: 2, reorderQuantity: 5, lastUpdated: "2026-05-20", status: "out_of_stock" },
];

const STATUS_STYLES: Record<string, string> = {
  in_stock: "bg-emerald-100 text-emerald-700",
  low_stock: "bg-amber-100 text-amber-700",
  out_of_stock: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<string, string> = {
  in_stock: "Tersedia",
  low_stock: "Stok Rendah",
  out_of_stock: "Habis",
};

const FILTER_OPTIONS = ["Semua", "Tersedia", "Stok Rendah", "Habis"];

const FILTER_MAP: Record<string, string> = {
  "Tersedia": "in_stock",
  "Stok Rendah": "low_stock",
  "Habis": "out_of_stock",
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const summaryStats = {
    total: MOCK_INVENTORY.length,
    inStock: MOCK_INVENTORY.filter((i) => i.status === "in_stock").length,
    lowStock: MOCK_INVENTORY.filter((i) => i.status === "low_stock").length,
    outOfStock: MOCK_INVENTORY.filter((i) => i.status === "out_of_stock").length,
  };

  const filtered = MOCK_INVENTORY.filter((item) => {
    const matchSearch =
      item.productName.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.warehouseLocation.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "Semua" || item.status === FILTER_MAP[statusFilter];
    return matchSearch && matchStatus;
  });

  return (
    <div data-testid="page-inventory">
      <PageHeader
        title="Inventori"
        description="Pantau stok dan lokasi gudang semua produk"
        actions={
          <Button variant="outline" size="sm" data-testid="button-export-inventory">
            <Download className="w-4 h-4 mr-1.5" />
            Export
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Item", value: summaryStats.total, color: "text-foreground", bg: "bg-muted/50" },
          { label: "Tersedia", value: summaryStats.inStock, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Stok Rendah", value: summaryStats.lowStock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Habis", value: summaryStats.outOfStock, color: "text-red-600", bg: "bg-red-50" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4`}>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-semibold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-testid="input-search-inventory"
            placeholder="Cari produk, SKU, atau lokasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              data-testid={`filter-status-${opt}`}
              onClick={() => setStatusFilter(opt)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                statusFilter === opt
                  ? "bg-primary text-white border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Warehouse className="w-10 h-10 mb-3 opacity-40" />
              <p className="text-sm font-medium">Tidak ada item ditemukan</p>
              <p className="text-xs mt-1">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">SKU</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Nama Produk</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">Lokasi</th>
                    <th className="text-right px-5 py-3 font-medium text-muted-foreground">Stok</th>
                    <th className="text-right px-5 py-3 font-medium text-muted-foreground hidden sm:table-cell">Reservasi</th>
                    <th className="text-right px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Tersedia</th>
                    <th className="text-center px-5 py-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => {
                    const available = item.quantityOnHand - item.quantityReserved;
                    const isCritical = item.quantityOnHand <= item.reorderPoint;
                    return (
                      <tr
                        key={item.id}
                        data-testid={`row-inventory-${item.id}`}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-5 py-3.5 font-mono text-xs text-primary">{item.sku}</td>
                        <td className="px-5 py-3.5">
                          <span className="font-medium text-foreground">{item.productName}</span>
                          {isCritical && item.status !== "out_of_stock" && (
                            <span className="ml-2 text-xs text-amber-600">⚠ Perlu reorder</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted font-mono">
                            {item.warehouseLocation}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right font-semibold">
                          <span className={item.quantityOnHand === 0 ? "text-red-600" : item.quantityOnHand <= item.reorderPoint ? "text-amber-600" : "text-foreground"}>
                            {formatNumber(item.quantityOnHand)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right text-muted-foreground hidden sm:table-cell">
                          {formatNumber(item.quantityReserved)}
                        </td>
                        <td className="px-5 py-3.5 text-right font-medium hidden lg:table-cell">
                          {formatNumber(available)}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[item.status]}`}>
                            {STATUS_LABELS[item.status]}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {filtered.length > 0 && (
        <p className="text-xs text-muted-foreground mt-3">
          Menampilkan {filtered.length} dari {MOCK_INVENTORY.length} item inventori
        </p>
      )}
    </div>
  );
}
