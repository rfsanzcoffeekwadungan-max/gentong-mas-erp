import { useEffect } from 'react';
import { useLocation } from 'wouter';
import AppShell from '@/layout/AppShell';
import { SALES_CONFIG, SALES_NAV } from '@/nav-configs';
import { useAuthStore } from '@/store/useAuthStore';
import {
  ShoppingCart, FileText, DollarSign, Users, TrendingUp, TrendingDown,
  Clock, ChevronRight, Plus, Target,
} from 'lucide-react';

const C = { primary: '#5B52D1', border: '#EDE9FE', card: '#FFFFFF', heading: '#1E1B4B', muted: '#9CA3AF', body: '#4B5563' };

const recentOrders = [
  { id: 'SO-2026-0142', customer: 'PT Sinar Jaya', amount: 'Rp 4,5 Jt', status: 'Dikonfirmasi', color: '#10B981' },
  { id: 'SO-2026-0141', customer: 'CV Maju Bersama', amount: 'Rp 1,25 Jt', status: 'Menunggu', color: '#F59E0B' },
  { id: 'SO-2026-0140', customer: 'UD Berkah Jaya', amount: 'Rp 8,75 Jt', status: 'Terkirim', color: '#3B82F6' },
  { id: 'SO-2026-0139', customer: 'Toko Bintang', amount: 'Rp 2,1 Jt', status: 'Dikonfirmasi', color: '#10B981' },
  { id: 'SO-2026-0138', customer: 'Toko Sejahtera', amount: 'Rp 675 rb', status: 'Draft', color: '#6B7280' },
];

export default function SalesPage() {
  const { token } = useAuthStore();
  const [, navigate] = useLocation();
  useEffect(() => { if (!token) navigate('/login'); }, [token, navigate]);
  if (!token) return null;

  const kpis = [
    { label: 'Revenue Hari Ini', value: 'Rp 48,7 Jt', icon: DollarSign, color: '#10B981', bg: '#D1FAE5', change: '+12.4%', up: true },
    { label: 'Sales Order', value: '127', icon: ShoppingCart, color: '#3B82F6', bg: '#EFF6FF', change: '+8 hari ini', up: true },
    { label: 'Quotation', value: '34', icon: FileText, color: '#8B5CF6', bg: '#F5F3FF', change: 'Menunggu konfirmasi', up: true },
    { label: 'Invoice Pending', value: 'Rp 18,7 Jt', icon: Clock, color: '#F59E0B', bg: '#FEF3C7', change: 'Belum lunas', up: false },
    { label: 'Pelanggan Aktif', value: '1.284', icon: Users, color: '#5B52D1', bg: '#EDE9FE', change: '+3.1%', up: true },
    { label: 'Target Bulanan', value: '87%', icon: Target, color: '#14B8A6', bg: '#CCFBF1', change: 'Rp 87/100 Jt', up: true },
  ];

  const quickActions = [
    { label: 'Buat Sales Order', href: '/sales/orders', color: C.primary },
    { label: 'Buat Quotation', href: '/sales/quotations', color: '#8B5CF6' },
    { label: 'Smart Order Input', href: '/sales/smart-order', color: '#10B981' },
    { label: 'Lihat Pelanggan', href: '/customers', color: '#3B82F6' },
    { label: 'Komisi Sales', href: '/sales/commission', color: '#F59E0B' },
    { label: 'Laporan Sales', href: '/sales/reports', color: '#64748B' },
  ];

  return (
    <AppShell {...SALES_CONFIG} navItems={SALES_NAV} activeHref="/sales">
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ color: C.heading }}>Dashboard Penjualan</h1>
            <p className="text-sm mt-0.5" style={{ color: C.muted }}>Monitoring performa sales & order hari ini</p>
          </div>
          <a href="/sales/orders"
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: C.primary }}>
            <Plus className="h-4 w-4" /> Buat Order
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map(({ label, value, icon: Icon, color, bg, change, up }) => (
            <div key={label} className="rounded-2xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer"
              style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, boxShadow: '0 1px 4px rgba(47,43,61,.06)' }}>
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: bg }}>
                  <Icon style={{ color, width: 18, height: 18 }} />
                </div>
                <span className="flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: up ? '#D1FAE5' : '#FEE2E2', color: up ? '#10B981' : '#EF4444' }}>
                  {up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                </span>
              </div>
              <div>
                <p className="text-lg font-bold leading-tight" style={{ color: C.heading }}>{value}</p>
                <p className="text-[11px] mt-0.5" style={{ color: C.muted }}>{label}</p>
                <p className="text-[11px]" style={{ color: C.body }}>{change}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
          <div className="xl:col-span-2 rounded-2xl p-5" style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, boxShadow: '0 1px 4px rgba(47,43,61,.06)' }}>
            <h2 className="text-sm font-bold mb-4" style={{ color: C.heading }}>Aksi Cepat</h2>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map(({ label, href, color }) => (
                <a key={href} href={href}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-medium hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: `${color}12`, color }}>
                  <span>{label}</span><ChevronRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="xl:col-span-3 rounded-2xl" style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, boxShadow: '0 1px 4px rgba(47,43,61,.06)' }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
              <h2 className="text-sm font-bold" style={{ color: C.heading }}>Order Terbaru</h2>
              <a href="/sales/orders" className="text-xs font-medium" style={{ color: C.primary }}>Lihat Semua →</a>
            </div>
            <div>
              {recentOrders.map(({ id, customer, amount, status, color }, i) => (
                <div key={id} className="flex items-center gap-3 px-5 py-3.5"
                  style={{ borderBottom: i < recentOrders.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${color}15` }}>
                    <ShoppingCart style={{ color, width: 15, height: 15 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold" style={{ color: C.heading }}>{id}</p>
                    <p className="text-[11px]" style={{ color: C.muted }}>{customer}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[13px] font-semibold" style={{ color: C.heading }}>{amount}</p>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${color}15`, color }}>{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
