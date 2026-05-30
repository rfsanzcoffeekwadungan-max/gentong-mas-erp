import { useEffect } from 'react';
import { useLocation } from 'wouter';
import AppShell from '@/layout/AppShell';
import { ACCOUNTING_CONFIG, ACCOUNTING_NAV } from '@/nav-configs';
import { useAuthStore } from '@/store/useAuthStore';
import {
  DollarSign, TrendingUp, TrendingDown, FileText, Landmark,
  ArrowUpRight, ArrowDownRight, ChevronRight, Plus, AlertTriangle,
} from 'lucide-react';

const C = { primary: '#5B52D1', border: '#EDE9FE', card: '#FFFFFF', heading: '#1E1B4B', muted: '#9CA3AF', body: '#4B5563' };

const recentJournals = [
  { ref: 'JNL-2026-0392', desc: 'Penjualan SO-0142', debit: 'Rp 4,5 Jt', type: 'Pendapatan', color: '#10B981' },
  { ref: 'JNL-2026-0391', desc: 'Pembayaran Supplier', debit: 'Rp 12,2 Jt', type: 'Pengeluaran', color: '#EF4444' },
  { ref: 'JNL-2026-0390', desc: 'Pembayaran Gaji Mei', debit: 'Rp 45 Jt', type: 'Pengeluaran', color: '#EF4444' },
  { ref: 'JNL-2026-0389', desc: 'Penerimaan Piutang', debit: 'Rp 8,7 Jt', type: 'Penerimaan', color: '#3B82F6' },
  { ref: 'JNL-2026-0388', desc: 'Biaya Operasional', debit: 'Rp 2,1 Jt', type: 'Pengeluaran', color: '#EF4444' },
];

export default function FinancePage() {
  const { token } = useAuthStore();
  const [, navigate] = useLocation();
  useEffect(() => { if (!token) navigate('/login'); }, [token, navigate]);
  if (!token) return null;

  const kpis = [
    { label: 'Kas & Bank', value: 'Rp 284 Jt', icon: Landmark, color: '#5B52D1', bg: '#EDE9FE', change: 'Saldo saat ini', up: true },
    { label: 'Pendapatan Bulan Ini', value: 'Rp 412 Jt', icon: ArrowUpRight, color: '#10B981', bg: '#D1FAE5', change: '+18.4%', up: true },
    { label: 'Pengeluaran Bulan Ini', value: 'Rp 287 Jt', icon: ArrowDownRight, color: '#EF4444', bg: '#FEE2E2', change: '+5.2%', up: false },
    { label: 'Laba Bersih', value: 'Rp 125 Jt', icon: TrendingUp, color: '#3B82F6', bg: '#EFF6FF', change: '+31.7%', up: true },
    { label: 'Piutang Outstanding', value: 'Rp 68 Jt', icon: FileText, color: '#F59E0B', bg: '#FEF3C7', change: '12 invoice', up: false },
    { label: 'Hutang Jatuh Tempo', value: 'Rp 34 Jt', icon: AlertTriangle, color: '#EF4444', bg: '#FEE2E2', change: '7 hari lagi', up: false },
  ];

  const quickActions = [
    { label: 'Buat Invoice', href: '/invoice', color: C.primary },
    { label: 'Jurnal Entry', href: '/accounting/journal-entry', color: '#3B82F6' },
    { label: 'Laporan Keuangan', href: '/accounting/reports', color: '#10B981' },
    { label: 'Buku Besar', href: '/accounting/general-ledger', color: '#8B5CF6' },
    { label: 'Neraca Saldo', href: '/accounting/trial-balance', color: '#F59E0B' },
    { label: 'Kas & Bank', href: '/finance/bank-accounts', color: '#14B8A6' },
  ];

  return (
    <AppShell {...ACCOUNTING_CONFIG} navItems={ACCOUNTING_NAV} activeHref="/finance">
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ color: C.heading }}>Dashboard Keuangan</h1>
            <p className="text-sm mt-0.5" style={{ color: C.muted }}>Overview keuangan, jurnal, dan laporan akuntansi</p>
          </div>
          <a href="/accounting/journal-entry"
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: C.primary }}>
            <Plus className="h-4 w-4" /> Jurnal Baru
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

            <div className="mt-4 rounded-xl p-3.5" style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
                <div>
                  <p className="text-[12px] font-semibold" style={{ color: '#92400E' }}>7 Invoice Jatuh Tempo</p>
                  <p className="text-[11px] mt-0.5" style={{ color: '#78350F' }}>Dalam 3 hari ke depan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-3 rounded-2xl" style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, boxShadow: '0 1px 4px rgba(47,43,61,.06)' }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
              <h2 className="text-sm font-bold" style={{ color: C.heading }}>Jurnal Terbaru</h2>
              <a href="/accounting/journal-entry" className="text-xs font-medium" style={{ color: C.primary }}>Lihat Semua →</a>
            </div>
            <div>
              {recentJournals.map(({ ref, desc, debit, type, color }, i) => (
                <div key={ref} className="flex items-center gap-3 px-5 py-3.5"
                  style={{ borderBottom: i < recentJournals.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${color}15` }}>
                    <DollarSign style={{ color, width: 15, height: 15 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold" style={{ color: C.heading }}>{ref}</p>
                    <p className="text-[11px]" style={{ color: C.muted }}>{desc}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[13px] font-semibold" style={{ color: C.heading }}>{debit}</p>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${color}15`, color }}>{type}</span>
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
