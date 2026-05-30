import { useEffect } from 'react';
import { useLocation } from 'wouter';
import AppShell from '@/layout/AppShell';
import { MARKETPLACE_CONFIG, MARKETPLACE_NAV } from '@/nav-configs';
import { useAuthStore } from '@/store/useAuthStore';
import {
  ShoppingBag, RefreshCw, Package, Percent, TrendingUp, TrendingDown,
  AlertTriangle, ChevronRight, Zap, RotateCcw,
} from 'lucide-react';

const C = { primary: '#5B52D1', border: '#EDE9FE', card: '#FFFFFF', heading: '#1E1B4B', muted: '#9CA3AF', body: '#4B5563' };

const recentSync = [
  { platform: 'Tokopedia', products: 248, status: 'Berhasil', time: '14:35', color: '#10B981' },
  { platform: 'Shopee', products: 312, status: 'Berhasil', time: '14:30', color: '#10B981' },
  { platform: 'Lazada', products: 156, status: 'Gagal', time: '14:20', color: '#EF4444' },
  { platform: 'TikTok Shop', products: 89, status: 'Berhasil', time: '14:15', color: '#10B981' },
  { platform: 'Blibli', products: 74, status: 'Menunggu', time: '14:00', color: '#F59E0B' },
];

export default function MarketplacePage() {
  const { token } = useAuthStore();
  const [, navigate] = useLocation();
  useEffect(() => { if (!token) navigate('/login'); }, [token, navigate]);
  if (!token) return null;

  const kpis = [
    { label: 'Total SKU Tersinkron', value: '879', icon: Package, color: '#5B52D1', bg: '#EDE9FE', change: '+12 baru', up: true },
    { label: 'Sinkronisasi Berhasil', value: '96.8%', icon: RefreshCw, color: '#10B981', bg: '#D1FAE5', change: '4 platform', up: true },
    { label: 'Reservasi Stok', value: '124', icon: ShoppingBag, color: '#3B82F6', bg: '#EFF6FF', change: 'Semua platform', up: true },
    { label: 'Sinkronisasi Gagal', value: '7', icon: AlertTriangle, color: '#EF4444', bg: '#FEE2E2', change: 'Perlu diperbaiki', up: false },
    { label: 'Retur Tertunda', value: '5', icon: RotateCcw, color: '#F59E0B', bg: '#FEF3C7', change: 'Menunggu proses', up: false },
    { label: 'Komisi Platform', value: 'Rp 4,2 Jt', icon: Percent, color: '#8B5CF6', bg: '#F5F3FF', change: 'Bulan ini', up: true },
  ];

  const quickActions = [
    { label: 'Sinkronisasi Harga', href: '/marketplace/price-sync', color: C.primary },
    { label: 'Reservasi Stok', href: '/marketplace/stock-reservation', color: '#3B82F6' },
    { label: 'Proses Retur', href: '/marketplace/returns', color: '#F59E0B' },
    { label: 'Komisi Platform', href: '/marketplace/commissions', color: '#8B5CF6' },
    { label: 'Log Kesalahan', href: '/marketplace/error-log', color: '#EF4444' },
    { label: 'Ulangi Sinkronisasi', href: '/marketplace/retry-sync', color: '#14B8A6' },
  ];

  return (
    <AppShell {...MARKETPLACE_CONFIG} navItems={MARKETPLACE_NAV} activeHref="/marketplace">
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ color: C.heading }}>Dashboard Marketplace</h1>
            <p className="text-sm mt-0.5" style={{ color: C.muted }}>Monitoring sinkronisasi produk & stok semua platform</p>
          </div>
          <button
            onClick={() => navigate('/marketplace/price-sync')}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: C.primary }}>
            <Zap className="h-4 w-4" /> Sinkronkan Sekarang
          </button>
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

            <div className="mt-4 rounded-xl p-3.5" style={{ backgroundColor: '#FEE2E2', border: '1px solid #FECACA' }}>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
                <div>
                  <p className="text-[12px] font-semibold" style={{ color: '#991B1B' }}>Gagal Sinkronisasi Lazada</p>
                  <p className="text-[11px] mt-0.5" style={{ color: '#7F1D1D' }}>7 produk gagal disinkronisasi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-3 rounded-2xl" style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, boxShadow: '0 1px 4px rgba(47,43,61,.06)' }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
              <h2 className="text-sm font-bold" style={{ color: C.heading }}>Riwayat Sinkronisasi Platform</h2>
              <a href="/marketplace/price-sync" className="text-xs font-medium" style={{ color: C.primary }}>Lihat Detail →</a>
            </div>
            <div>
              {recentSync.map(({ platform, products, status, time, color }, i) => (
                <div key={platform} className="flex items-center gap-3 px-5 py-3.5"
                  style={{ borderBottom: i < recentSync.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${color}15` }}>
                    <RefreshCw style={{ color, width: 15, height: 15 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold" style={{ color: C.heading }}>{platform}</p>
                    <p className="text-[11px]" style={{ color: C.muted }}>{products} produk disinkronisasi</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${color}15`, color }}>{status}</span>
                    <p className="text-[11px] mt-0.5" style={{ color: C.muted }}>{time}</p>
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
