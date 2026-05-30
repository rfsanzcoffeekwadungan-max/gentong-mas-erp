import { useEffect } from 'react';
import { useLocation } from 'wouter';
import AppShell from '@/layout/AppShell';
import { CRM_CONFIG, CRM_NAV } from '@/nav-configs';
import { useAuthStore } from '@/store/useAuthStore';
import {
  Users, Star, TrendingUp, TrendingDown, Phone, Calendar,
  ChevronRight, Plus, DollarSign, Target, AlertTriangle,
} from 'lucide-react';

const C = { primary: '#5B52D1', border: '#EDE9FE', card: '#FFFFFF', heading: '#1E1B4B', muted: '#9CA3AF', body: '#4B5563' };

const recentLeads = [
  { name: 'PT Karya Mandiri', contact: 'Hendra Wijaya', value: 'Rp 45 Jt', stage: 'Proposal', color: '#3B82F6' },
  { name: 'CV Sinar Terang', contact: 'Rina Astuti', value: 'Rp 12 Jt', stage: 'Negosiasi', color: '#F59E0B' },
  { name: 'Toko Berkah', contact: 'Dodi Kusuma', value: 'Rp 8,5 Jt', stage: 'Kualifikasi', color: '#8B5CF6' },
  { name: 'UD Prima Jaya', contact: 'Siska Lestari', value: 'Rp 22 Jt', stage: 'Won', color: '#10B981' },
  { name: 'PT Global Nusa', contact: 'Bambang Susilo', value: 'Rp 55 Jt', stage: 'Proposal', color: '#3B82F6' },
];

export default function CRMPage() {
  const { token } = useAuthStore();
  const [, navigate] = useLocation();
  useEffect(() => { if (!token) navigate('/login'); }, [token, navigate]);
  if (!token) return null;

  const kpis = [
    { label: 'Pipeline Value', value: 'Rp 342 Jt', icon: DollarSign, color: '#5B52D1', bg: '#EDE9FE', change: '+22.1%', up: true },
    { label: 'Leads Aktif', value: '87', icon: Star, color: '#F59E0B', bg: '#FEF3C7', change: '+12 minggu ini', up: true },
    { label: 'Opportunity', value: '34', icon: TrendingUp, color: '#3B82F6', bg: '#EFF6FF', change: 'Dalam proses', up: true },
    { label: 'Follow-up Hari Ini', value: '18', icon: Phone, color: '#EF4444', bg: '#FEE2E2', change: '7 overdue', up: false },
    { label: 'Aktivitas Planned', value: '25', icon: Calendar, color: '#10B981', bg: '#D1FAE5', change: 'Minggu ini', up: true },
    { label: 'Win Rate', value: '68%', icon: Target, color: '#14B8A6', bg: '#CCFBF1', change: '+4% bulan lalu', up: true },
  ];

  const quickActions = [
    { label: 'Tambah Lead', href: '/crm/leads', color: C.primary },
    { label: 'Lihat Pipeline', href: '/crm/pipeline', color: '#3B82F6' },
    { label: 'Opportunity', href: '/crm/opportunities', color: '#F59E0B' },
    { label: 'Follow-up', href: '/crm/followup', color: '#EF4444' },
    { label: 'Aktivitas', href: '/crm/activities', color: '#10B981' },
    { label: 'Laporan CRM', href: '/crm/reports', color: '#64748B' },
  ];

  return (
    <AppShell {...CRM_CONFIG} navItems={CRM_NAV} activeHref="/crm">
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ color: C.heading }}>Dashboard CRM</h1>
            <p className="text-sm mt-0.5" style={{ color: C.muted }}>Monitoring leads, pipeline, dan performa sales</p>
          </div>
          <a href="/crm/leads"
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: C.primary }}>
            <Plus className="h-4 w-4" /> Tambah Lead
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

            <div className="mt-4 rounded-xl p-3.5" style={{ backgroundColor: '#FEE2E2', border: '1px solid #FECACA' }}>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
                <div>
                  <p className="text-[12px] font-semibold" style={{ color: '#991B1B' }}>7 Follow-up Overdue</p>
                  <p className="text-[11px] mt-0.5" style={{ color: '#7F1D1D' }}>Segera hubungi prospects</p>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-3 rounded-2xl" style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, boxShadow: '0 1px 4px rgba(47,43,61,.06)' }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
              <h2 className="text-sm font-bold" style={{ color: C.heading }}>Leads & Opportunity Terbaru</h2>
              <a href="/crm/pipeline" className="text-xs font-medium" style={{ color: C.primary }}>Lihat Pipeline →</a>
            </div>
            <div>
              {recentLeads.map(({ name, contact, value, stage, color }, i) => (
                <div key={name} className="flex items-center gap-3 px-5 py-3.5"
                  style={{ borderBottom: i < recentLeads.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${color}15` }}>
                    <Users style={{ color, width: 15, height: 15 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold" style={{ color: C.heading }}>{name}</p>
                    <p className="text-[11px]" style={{ color: C.muted }}>{contact}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[13px] font-semibold" style={{ color: C.heading }}>{value}</p>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${color}15`, color }}>{stage}</span>
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
