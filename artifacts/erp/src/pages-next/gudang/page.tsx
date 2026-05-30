import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import AppShell from '@/layout/AppShell';
import { WAREHOUSE_CONFIG, WAREHOUSE_NAV } from '@/nav-configs';
import { useAuthStore } from '@/store/useAuthStore';
import { api } from '@/api';
import {
  ArrowDownRight, ArrowUpRight, ClipboardList, ClipboardCheck,
  Truck, Clock, TrendingUp, TrendingDown, Package, AlertTriangle,
  ChevronRight, RefreshCw,
} from 'lucide-react';

const C = { primary: '#5B52D1', border: '#EDE9FE', bg: '#F5F4F9', card: '#FFFFFF', heading: '#1E1B4B', muted: '#9CA3AF', body: '#4B5563' };

const recentActivity = [
  { time: '14:32', text: 'Picking Order #PK-089 selesai diproses', type: 'success' },
  { time: '14:20', text: 'Barang masuk dari Supplier Sinar Jaya — 45 item', type: 'info' },
  { time: '14:05', text: 'Transfer stok ke Gudang B berhasil', type: 'info' },
  { time: '13:48', text: 'Stok Semen Portland di bawah minimum (5 sak)', type: 'warning' },
  { time: '13:30', text: 'Barang keluar untuk SO-2026-0141 — 12 item', type: 'success' },
];

export default function GudangPage() {
  const { token } = useAuthStore();
  const [, navigate] = useLocation();
  const [stats, setStats] = useState({ incoming: 12, outgoing: 8, picking: 5, transfers: 3, stockOpname: 2, pending: 4 });
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!token) navigate('/login'); }, [token, navigate]);

  useEffect(() => {
    if (!token) return;
    api.get('/inventory/summary')
      .then(res => {
        const d = res.data ?? {};
        setStats({ incoming: d.incoming_orders ?? 12, outgoing: d.outgoing_orders ?? 8, picking: d.picking_orders ?? 5, transfers: d.transfers ?? 3, stockOpname: d.stock_opname ?? 2, pending: d.pending_orders ?? 4 });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) return null;

  const kpis = [
    { label: 'Picking Order', value: stats.picking, icon: ClipboardList, color: '#5B52D1', bg: '#EDE9FE', change: '+2 baru', up: true },
    { label: 'Barang Masuk', value: stats.incoming, icon: ArrowDownRight, color: '#3B82F6', bg: '#EFF6FF', change: 'Hari ini', up: true },
    { label: 'Barang Keluar', value: stats.outgoing, icon: ArrowUpRight, color: '#10B981', bg: '#D1FAE5', change: 'Hari ini', up: true },
    { label: 'Transfer', value: stats.transfers, icon: Truck, color: '#F59E0B', bg: '#FEF3C7', change: 'Antar gudang', up: true },
    { label: 'Stock Opname', value: stats.stockOpname, icon: ClipboardCheck, color: '#8B5CF6', bg: '#F5F3FF', change: 'Aktif', up: true },
    { label: 'Order Pending', value: stats.pending, icon: Clock, color: '#EF4444', bg: '#FEE2E2', change: 'Belum proses', up: false },
  ];

  const quickActions = [
    { label: 'Picking Order', href: '/gudang/picking', color: C.primary },
    { label: 'Barang Masuk', href: '/gudang/inbound', color: '#3B82F6' },
    { label: 'Barang Keluar', href: '/gudang/outbound', color: '#10B981' },
    { label: 'Transfer Stok', href: '/gudang/transfer', color: '#F59E0B' },
    { label: 'Stock Opname', href: '/gudang/stock-opname', color: '#8B5CF6' },
    { label: 'Riwayat', href: '/gudang/history', color: '#64748B' },
  ];

  return (
    <AppShell {...WAREHOUSE_CONFIG} navItems={WAREHOUSE_NAV} activeHref="/gudang">
      <div className="p-6 space-y-6 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ color: C.heading }}>Dashboard Gudang</h1>
            <p className="text-sm mt-0.5" style={{ color: C.muted }}>Monitoring operasional gudang secara real-time</p>
          </div>
          <button
            onClick={() => navigate('/gudang/picking')}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: C.primary }}
          >
            <ClipboardList className="h-4 w-4" />
            Mulai Picking
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map(({ label, value, icon: Icon, color, bg, change, up }) => (
            <div key={label} className="rounded-2xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer"
              style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, boxShadow: '0 1px 4px rgba(47,43,61,.06)' }}>
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: bg }}>
                  <Icon className="h-4.5 w-4.5" style={{ color, width: 18, height: 18 }} />
                </div>
                <span className="flex items-center gap-0.5 text-[11px] font-medium" style={{ color: up ? '#10B981' : '#EF4444' }}>
                  {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: C.heading }}>{loading ? '…' : value}</p>
                <p className="text-[11px] mt-0.5" style={{ color: C.muted }}>{label}</p>
                <p className="text-[11px]" style={{ color: C.body }}>{change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">

          {/* Quick Actions */}
          <div className="xl:col-span-2 rounded-2xl p-5" style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, boxShadow: '0 1px 4px rgba(47,43,61,.06)' }}>
            <h2 className="text-sm font-bold mb-4" style={{ color: C.heading }}>Aksi Cepat</h2>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map(({ label, href, color }) => (
                <a key={href} href={href}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all hover:opacity-80"
                  style={{ backgroundColor: `${color}12`, color }}>
                  <span>{label}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="xl:col-span-3 rounded-2xl p-5" style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, boxShadow: '0 1px 4px rgba(47,43,61,.06)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold" style={{ color: C.heading }}>Aktivitas Terkini</h2>
              <button className="flex items-center gap-1 text-xs" style={{ color: C.primary }}>
                <RefreshCw className="h-3 w-3" /> Refresh
              </button>
            </div>
            <div className="space-y-0">
              {recentActivity.map(({ time, text, type }, i) => {
                const dot = type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#3B82F6';
                return (
                  <div key={i} className="flex items-start gap-3 py-2.5" style={{ borderBottom: i < recentActivity.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                    <div className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dot }} />
                    <p className="flex-1 text-[13px]" style={{ color: C.body }}>{text}</p>
                    <span className="flex-shrink-0 text-[11px]" style={{ color: C.muted }}>{time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stock Alert */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: '#FFFBEB', border: '1.5px solid #FDE68A' }}>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" style={{ color: '#F59E0B' }} />
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: '#92400E' }}>Peringatan Stok Menipis</p>
              <p className="text-xs mt-0.5" style={{ color: '#78350F' }}>8 produk mendekati batas minimum stok. Segera lakukan reorder.</p>
            </div>
            <a href="/inventory/reorder-rules" className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#F59E0B', color: '#FFFFFF' }}>
              Lihat Detail
            </a>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
