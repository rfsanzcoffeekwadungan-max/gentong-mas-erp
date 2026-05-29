import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber } from "@/utils";
import {
  TrendingUp,
  TrendingDown,
  Package,
  Warehouse,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

const STATS = [
  {
    title: "Total Revenue",
    value: formatCurrency(847_500_000),
    change: +12.4,
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Total Orders",
    value: formatNumber(1_284),
    change: +8.2,
    icon: ShoppingCart,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Total Products",
    value: formatNumber(342),
    change: +3.1,
    icon: Package,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Low Stock Items",
    value: formatNumber(17),
    change: -5,
    icon: Warehouse,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const RECENT_ORDERS = [
  {
    id: "ORD-2401",
    customer: "PT Maju Jaya",
    amount: 12_500_000,
    status: "completed",
    date: "29 Mei 2026",
  },
  {
    id: "ORD-2400",
    customer: "CV Berkah Abadi",
    amount: 8_750_000,
    status: "processing",
    date: "29 Mei 2026",
  },
  {
    id: "ORD-2399",
    customer: "UD Sejahtera",
    amount: 4_200_000,
    status: "pending",
    date: "28 Mei 2026",
  },
  {
    id: "ORD-2398",
    customer: "PT Karya Mandiri",
    amount: 21_000_000,
    status: "completed",
    date: "28 Mei 2026",
  },
  {
    id: "ORD-2397",
    customer: "CV Bintang Timur",
    amount: 6_300_000,
    status: "cancelled",
    date: "27 Mei 2026",
  },
];

const LOW_STOCK = [
  { name: "Kabel UTP Cat6", sku: "ELC-001", qty: 5, reorder: 20 },
  { name: "Switch 24 Port", sku: "ELC-012", qty: 2, reorder: 5 },
  { name: "Kertas HVS A4 80gr", sku: "OFF-034", qty: 8, reorder: 50 },
  { name: "Tinta Printer Black", sku: "OFF-021", qty: 3, reorder: 10 },
];

const STATUS_COLORS: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  processing: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<string, string> = {
  completed: "Selesai",
  processing: "Diproses",
  pending: "Menunggu",
  cancelled: "Dibatalkan",
};

export default function DashboardPage() {
  return (
    <div data-testid="page-dashboard">
      <PageHeader
        title="Dashboard"
        description="Ringkasan operasional bisnis hari ini"
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change > 0;
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;
          return (
            <Card key={stat.title} data-testid={`card-stat-${stat.title.toLowerCase().replace(/ /g, "-")}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-semibold mt-1 text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3">
                  <TrendIcon
                    className={`w-3.5 h-3.5 ${isPositive ? "text-emerald-500" : "text-red-500"}`}
                  />
                  <span
                    className={`text-xs font-medium ${isPositive ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {isPositive ? "+" : ""}
                    {stat.change}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    vs bulan lalu
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                Pesanan Terbaru
              </CardTitle>
              <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                Lihat semua <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-6 py-2.5 text-muted-foreground font-medium">
                      Order ID
                    </th>
                    <th className="text-left px-6 py-2.5 text-muted-foreground font-medium">
                      Customer
                    </th>
                    <th className="text-left px-6 py-2.5 text-muted-foreground font-medium hidden sm:table-cell">
                      Tanggal
                    </th>
                    <th className="text-right px-6 py-2.5 text-muted-foreground font-medium">
                      Nilai
                    </th>
                    <th className="text-center px-6 py-2.5 text-muted-foreground font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((order) => (
                    <tr
                      key={order.id}
                      data-testid={`row-order-${order.id}`}
                      className="border-b last:border-0 hover:bg-muted/40 transition-colors"
                    >
                      <td className="px-6 py-3 font-mono text-xs text-primary">
                        {order.id}
                      </td>
                      <td className="px-6 py-3 font-medium">{order.customer}</td>
                      <td className="px-6 py-3 text-muted-foreground hidden sm:table-cell">
                        {order.date}
                      </td>
                      <td className="px-6 py-3 text-right font-medium">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[order.status]}`}
                        >
                          {STATUS_LABELS[order.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <CardTitle className="text-sm font-semibold">
                Peringatan Stok Rendah
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {LOW_STOCK.map((item) => (
              <div
                key={item.sku}
                data-testid={`card-low-stock-${item.sku}`}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {item.sku}
                  </p>
                </div>
                <div className="text-right ml-3 shrink-0">
                  <p className="text-sm font-semibold text-orange-600">
                    {item.qty} unit
                  </p>
                  <p className="text-xs text-muted-foreground">
                    min. {item.reorder}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
