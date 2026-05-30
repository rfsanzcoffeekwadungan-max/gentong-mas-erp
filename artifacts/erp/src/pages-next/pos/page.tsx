import { useEffect } from 'react';
import { useLocation } from 'wouter';
import AppShell from '@/layout/AppShell';
import { POS_CONFIG, POS_NAV } from '@/nav-configs';
import { useAuthStore } from '@/store/useAuthStore';
import {
  Monitor, ShoppingCart, DollarSign, Users, TrendingUp, TrendingDown,
  Calendar, ChevronRight, Zap, Clock,
} from 'lucide-react';

const C = { primary: '#5B52D1', border: '#EDE9FE', card: '#FFFFFF', heading: '#1E1B4B', muted: '#9CA3AF', body: '#4B5563' };

const recentSessions = [
  { id: 'SES-0041', kasir: 'Budi Santoso', transaksi: 42, total: 'Rp 3,2 Jt', status: 'Aktif', color: '#10B981' },
  { id: 'SES-0040', kasir: 'Siti Rahayu', transaksi: 38, total: 'Rp 2,8 Jt', status: 'Tutup', color: '#6B7280' },
  { id: 'SES-0039', kasir: 'Ahmad Fauzi', transaksi: 55, total: 'Rp 4,1 Jt', status: 'Tutup', color: '#6B7280' },
  { id: 'SES-0038', kasir: 'Dewi Putri', transaksi: 29, total: 'Rp 1,9 Jt', status: 'Tutup', color: '#6B7280' },
];

export default function POSPage() {
  const { token } = useAuthStore();
  const [, navigate] = useLocation();
  useEffect(() => { if (!token) navigate('/login'); }, [token, navigate]);
  if (!token) return null;

  const kpis = [
    { label: 'Omset Hari Ini', value: 'Rp 12 Jt', icon: DollarSign, color: '#10B981', bg: '#D1FAE5', change: '+18.2%', up: true },
    { label: 'Total Transaksi', value: '164', icon: ShoppingCart, color: '#3B82F6', bg: '#EFF6FF', change: '+22 jam ini', up: true },
    { label: 'Sesi Aktif', value: '3', icon: Monitor, color: '#5B52D1', bg: '#EDE9FE', change: 'Kasir buka', up: true },
    { label: 'Rata-rata/Transaksi', value: 'Rp 73 rb', icon: TrendingUp, color: '#8B5CF6', bg: '#F5F3FF', change: '+5.3%', up: true },
    { label: 'Pelanggan Baru', value: '12', icon: Users, color: '#F59E0B', bg: '#FEF3C7', change: 'Hari ini', up: true },
    { label: 'Transaksi Dibatalkan', value: '2', icon: Clock, color: '#EF4444', bg: '#FEE2E2', change: 'Perlu disetujui', up: false },
  ];

  const quickActions = [
    { label: 'Buka Kasir', href: '/pos/cashier', color: C.primary },
    { label: 'Lihat Sesi', href: '/pos/sessions', color: '#8B5CF6' },
    { label: 'Semua Order', href: '/pos/orders', color: '#3B82F6' },
    { label: 'Kelola Produk', href: '/pos/products', color: '#10B981' },
    { label: 'Data Pelanggan', href: '/customers', color: '#F59E0B' },
    { label: 'Laporan POS', href: '/pos/reports', color: '#64748B' },
  ];

  return (
    <AppShell {...POS_CONFIG} navItems={POS_NAV} activeHref="/pos">
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ color: C.heading }}>Dashboard Kasir (POS)</h1>
            <p className="text-sm mt-0.5" style={{ color: C.muted }}>Monitoring sesi kasir & transaksi hari ini</p>
          </div>
          <a href="/pos/cashier"
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: C.primary }}>
            <Zap className="h-4 w-4" /> Buka Kasir
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
              <h2 className="text-sm font-bold" style={{ color: C.heading }}>Sesi Kasir Hari Ini</h2>
              <a href="/pos/sessions" className="text-xs font-medium" style={{ color: C.primary }}>Lihat Semua →</a>
            </div>
            <div>
              {recentSessions.map(({ id, kasir, transaksi, total, status, color }, i) => (
                <div key={id} className="flex items-center gap-3 px-5 py-3.5"
                  style={{ borderBottom: i < recentSessions.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${color}15` }}>
                    <Calendar style={{ color, width: 15, height: 15 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold" style={{ color: C.heading }}>{id} — {kasir}</p>
                    <p className="text-[11px]" style={{ color: C.muted }}>{transaksi} transaksi</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[13px] font-semibold" style={{ color: C.heading }}>{total}</p>
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
