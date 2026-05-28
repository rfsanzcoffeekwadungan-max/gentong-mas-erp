import { ReactNode, useState } from 'react';
import { useLocation } from 'wouter';

import {
  LayoutDashboard, Package, ShoppingCart, Users, Truck, DollarSign,
  UserCheck, BarChart2, Settings, Bell, ShieldCheck, Store,
  ChevronRight, Zap, Search, Menu, X, LogOut, User, Monitor,
  FileText, Warehouse, ClipboardList, CreditCard, BookOpen, Building2, MapPin,
  Factory, Wrench, Car, UserPlus, ShoppingBag, RefreshCw, Globe,
  Bot, TrendingUp, Brain, Sparkles, LineChart, FlaskConical, MessageSquare,
  AlertCircle, FileBarChart, Activity, Cpu, Megaphone, Radio,
  Receipt, BanknoteIcon, Scale, PiggyBank, BookmarkCheck, BarChart3,
  HardHat, GraduationCap, HeartPulse, CalendarCheck, ClipboardCheck,
  Layers, GitBranch, Hash, HardDrive, Link2, Mail, Smartphone,
  Fuel, Navigation, Target, Percent, Tag, Clock,
  LayoutGrid, ExternalLink,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotificationStore } from '@/store/useNotificationStore';

interface NavChild {
  href: string;
  label: string;
}

interface NavItem {
  href?: string;
  label: string;
  icon: React.ElementType;
  children?: NavChild[];
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'UTAMA',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/notifications', label: 'Notifikasi', icon: Bell },
    ],
  },
  {
    label: 'PENJUALAN & CRM',
    items: [
      {
        label: 'Penjualan', icon: ShoppingCart,
        children: [
          { href: '/sales/quotations', label: 'Quotation' },
          { href: '/sales/orders', label: 'Sales Orders' },
          { href: '/sales/pricelists', label: 'Price List' },
          { href: '/sales/teams', label: 'Sales Team' },
          { href: '/sales/targets', label: 'Sales Target' },
          { href: '/sales/commission', label: 'Komisi Sales' },
        ],
      },
      {
        label: 'CRM', icon: Users,
        children: [
          { href: '/crm/leads', label: 'Leads' },
          { href: '/crm/pipeline', label: 'Pipeline Kanban' },
          { href: '/crm/opportunities', label: 'Opportunity' },
          { href: '/crm/activities', label: 'Aktivitas' },
          { href: '/crm/followup', label: 'Follow-up' },
        ],
      },
      {
        label: 'Invoice', icon: FileText,
        children: [
          { href: '/invoice/list', label: 'Invoice' },
          { href: '/invoice/down-payment', label: 'Down Payment' },
          { href: '/invoice/recurring', label: 'Recurring Invoice' },
          { href: '/invoice/payments', label: 'Pembayaran' },
          { href: '/invoice/aging', label: 'Aging Report' },
          { href: '/invoice/credit-notes', label: 'Kredit Nota' },
        ],
      },
      { href: '/pos/orders', label: 'Point of Sale', icon: Monitor },
      { href: '/customers', label: 'Pelanggan', icon: Users },
    ],
  },
  {
    label: 'OPERASIONAL',
    items: [
      {
        label: 'Inventory', icon: Package,
        children: [
          { href: '/inventory/products', label: 'Produk' },
          { href: '/inventory/lots', label: 'Lot & Serial Number' },
          { href: '/inventory/transfers', label: 'Transfer Stok' },
          { href: '/inventory/stock-movements', label: 'Mutasi Stok' },
          { href: '/inventory/stock-opnames', label: 'Stock Opname' },
          { href: '/inventory/warehouses', label: 'Multi Gudang' },
          { href: '/inventory/reorder-rules', label: 'Reorder Rules' },
        ],
      },
      {
        label: 'Pembelian', icon: Truck,
        children: [
          { href: '/purchasing/rfq', label: 'RFQ' },
          { href: '/purchasing/purchase-orders', label: 'Purchase Orders' },
          { href: '/purchasing/goods-receipts', label: 'Penerimaan Barang' },
          { href: '/purchasing/price-comparison', label: 'Perbandingan Harga' },
          { href: '/purchasing/approval-matrix', label: 'Approval Matrix' },
          { href: '/purchasing/suppliers', label: 'Supplier' },
        ],
      },
      {
        label: 'Manufaktur', icon: Factory,
        children: [
          { href: '/manufacturing/bom', label: 'Bill of Materials' },
          { href: '/manufacturing/orders', label: 'Work Order' },
          { href: '/manufacturing/mrp', label: 'MRP' },
          { href: '/manufacturing/work-centers', label: 'Work Center' },
          { href: '/manufacturing/scrap', label: 'Scrap' },
          { href: '/manufacturing/production-cost', label: 'Biaya Produksi' },
        ],
      },
      {
        label: 'Servis', icon: Wrench,
        children: [
          { href: '/service/work-orders', label: 'Work Order Servis' },
          { href: '/service/estimates', label: 'Estimasi Biaya' },
          { href: '/service/history', label: 'Riwayat Servis' },
          { href: '/service/warranties', label: 'Garansi Jasa' },
        ],
      },
      {
        label: 'Armada', icon: Car,
        children: [
          { href: '/fleet/vehicles', label: 'Kendaraan' },
          { href: '/fleet/documents', label: 'Dokumen Kendaraan' },
          { href: '/fleet/reminders', label: 'Reminder STNK/KIR' },
          { href: '/fleet/fuel-tracking', label: 'Tracking BBM' },
          { href: '/fleet/assignments', label: 'Penugasan Driver' },
        ],
      },
      {
        label: 'Marketplace', icon: ShoppingBag,
        children: [
          { href: '/marketplace/price-sync', label: 'Sinkronisasi Harga' },
          { href: '/marketplace/stock-reservation', label: 'Reservasi Stok' },
          { href: '/marketplace/returns', label: 'Retur' },
          { href: '/marketplace/commissions', label: 'Komisi Platform' },
          { href: '/marketplace/sync-logs', label: 'Sync Logs' },
        ],
      },
    ],
  },
  {
    label: 'KEUANGAN',
    items: [
      {
        label: 'Akuntansi', icon: DollarSign,
        children: [
          { href: '/finance/journal-entries', label: 'Jurnal Entry' },
          { href: '/finance/bank-reconciliation', label: 'Rekonsiliasi Bank' },
          { href: '/finance/coa', label: 'Chart of Accounts' },
          { href: '/finance/bank-accounts', label: 'Bank & Kas' },
          { href: '/finance/fixed-assets', label: 'Aset Tetap' },
          { href: '/finance/budget', label: 'Budget' },
          { href: '/finance/aged-receivable', label: 'Piutang Aging' },
          { href: '/finance/aged-payable', label: 'Hutang Aging' },
          { href: '/finance/tax-config', label: 'Konfigurasi Pajak' },
          { href: '/finance/currencies', label: 'Multi Mata Uang' },
        ],
      },
      {
        label: 'Laporan Keuangan', icon: BarChart2,
        children: [
          { href: '/finance/reports?type=pl', label: 'Laba & Rugi' },
          { href: '/finance/reports?type=bs', label: 'Neraca' },
          { href: '/finance/reports?type=cf', label: 'Cash Flow' },
          { href: '/finance/reports?type=tb', label: 'Trial Balance' },
          { href: '/finance/reports?type=gl', label: 'Buku Besar' },
        ],
      },
    ],
  },
  {
    label: 'SDM & PAYROLL',
    items: [
      {
        label: 'HR & Karyawan', icon: UserCheck,
        children: [
          { href: '/hr/employees', label: 'Data Karyawan' },
          { href: '/hr/organization', label: 'Struktur Organisasi' },
          { href: '/hr/attendances', label: 'Absensi' },
          { href: '/hr/leaves', label: 'Cuti & Izin' },
          { href: '/hr/training', label: 'Training' },
          { href: '/hr/certifications', label: 'Sertifikasi' },
          { href: '/hr/loans', label: 'Pinjaman Karyawan' },
          { href: '/hr/bpjs', label: 'BPJS' },
          { href: '/hr/appraisals', label: 'Penilaian KPI' },
        ],
      },
      {
        label: 'Payroll', icon: DollarSign,
        children: [
          { href: '/hr/payrolls/components', label: 'Komponen Gaji' },
          { href: '/hr/payrolls/batch', label: 'Slip Gaji Massal' },
          { href: '/hr/payrolls/bpjs-calc', label: 'Kalkulator BPJS' },
          { href: '/hr/payrolls/pph21-calc', label: 'Kalkulator PPh21' },
          { href: '/hr/payrolls/history', label: 'Riwayat Gaji' },
          { href: '/hr/payrolls/bank-export', label: 'Export Payroll' },
        ],
      },
      {
        label: 'Rekrutmen', icon: UserPlus,
        children: [
          { href: '/recruitment/positions', label: 'Lowongan' },
          { href: '/recruitment/applications', label: 'Pelamar' },
          { href: '/recruitment/scoring', label: 'Scoring Pelamar' },
          { href: '/recruitment/onboarding', label: 'Onboarding' },
          { href: '/recruitment/contract-generator', label: 'Generator Kontrak' },
        ],
      },
    ],
  },
  {
    label: 'LAPORAN',
    items: [
      {
        label: 'Semua Laporan', icon: BarChart2,
        children: [
          { href: '/reports/sales', label: 'Lap. Penjualan' },
          { href: '/reports/finance', label: 'Lap. Keuangan' },
          { href: '/reports/inventory', label: 'Lap. Inventaris' },
          { href: '/reports/hr', label: 'Lap. SDM' },
          { href: '/reports/payroll', label: 'Lap. Payroll' },
          { href: '/reports/manufacturing', label: 'Lap. Manufaktur' },
        ],
      },
    ],
  },
  {
    label: 'AI CENTER',
    items: [
      { label: 'AI Dashboard', icon: Brain, href: '/ai' },
      {
        label: 'AI Features', icon: Sparkles,
        children: [
          { href: '/ai/chatbot', label: 'AI Chat Assistant' },
          { href: '/ai/forecast', label: 'AI Forecast' },
          { href: '/ai/recommendation', label: 'AI Rekomendasi' },
          { href: '/ai/automation', label: 'AI Automation' },
          { href: '/ai/report-generator', label: 'AI Report Generator' },
          { href: '/ai/sales-prediction', label: 'AI Sales Prediction' },
          { href: '/ai/inventory-prediction', label: 'AI Inventory Prediction' },
          { href: '/ai/financial-analysis', label: 'AI Financial Analysis' },
          { href: '/ai/hr-assistant', label: 'AI HR Assistant' },
          { href: '/ai/marketplace-assistant', label: 'AI Marketplace' },
          { href: '/ai/notifications', label: 'AI Notification' },
          { href: '/ai/logs', label: 'AI Logs' },
        ],
      },
    ],
  },
  {
    label: 'MONITORING APPS',
    items: [
      {
        href: '/monitoring',
        label: 'Overview Semua App',
        icon: LayoutGrid,
      },
      {
        label: 'Detail per App',
        icon: Monitor,
        children: [
          { href: '/monitoring/sales',  label: 'Sales App' },
          { href: '/monitoring/gudang', label: 'Gudang App' },
          { href: '/monitoring/pos',    label: 'POS App' },
          { href: '/monitoring/driver', label: 'Driver App' },
        ],
      },
    ],
  },
  {
    label: 'SISTEM',
    items: [
      {
        label: 'Pengaturan', icon: Settings,
        children: [
          { href: '/settings', label: 'Pengaturan Umum' },
          { href: '/settings/users', label: 'User Management' },
          { href: '/settings/roles', label: 'Role & Permission' },
          { href: '/settings/companies', label: 'Multi Perusahaan' },
          { href: '/settings/email-gateway', label: 'Email Gateway' },
          { href: '/settings/wa-gateway', label: 'WA Gateway' },
          { href: '/settings/document-numbers', label: 'Format Nomor Dok' },
          { href: '/settings/backup', label: 'Backup & Restore' },
          { href: '/settings/api-integration', label: 'API Integration' },
          { href: '/settings/audit-log', label: 'Audit Log' },
        ],
      },
      { href: '/access', label: 'Users & Roles', icon: ShieldCheck },
      { href: '/kledo', label: 'Integrasi Kledo', icon: Building2 },
    ],
  },
];

// ── Unified design tokens ────────────────────────────────────────────────────
const T = {
  primary:       '#5B52D1',
  primaryHover:  '#4B43C1',
  primaryLight:  '#8B80F9',
  primaryMuted:  '#A78BFA',
  activeBg:      'rgba(91,82,209,0.09)',
  hoverBg:       'rgba(91,82,209,0.05)',
  sidebarBg:     '#FFFFFF',
  border:        '#EEEAF8',
  borderChild:   '#DDD6FE',
  textHeading:   '#111827',
  textBody:      '#4B5563',
  textMuted:     '#9CA3AF',
  textSection:   '#A78BFA',
  danger:        '#EF4444',
  dangerBg:      'rgba(239,68,68,0.06)',
  pageBg:        '#F5F4F9',
  topbarBg:      '#FFFFFF',
};

// ── NavItem component ────────────────────────────────────────────────────────
function NavItemComponent({ item }: { item: NavItem }) {
  const [pathname, navigate] = useLocation();

  const isChildActive = item.children?.some((c) => {
    const path = c.href.split('?')[0];
    return pathname === path || pathname.startsWith(path + '/');
  }) ?? false;

  const [open, setOpen] = useState(isChildActive);

  if (item.children) {
    return (
      <div>
        {/* Parent row */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-left transition-colors duration-150 group"
          style={{
            backgroundColor: open ? T.activeBg : 'transparent',
            color: open ? T.primary : T.textBody,
          }}
          onMouseEnter={(e) => { if (!open) e.currentTarget.style.backgroundColor = T.hoverBg; }}
          onMouseLeave={(e) => { if (!open) e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <item.icon
            className="h-4 w-4 flex-shrink-0 transition-colors duration-150"
            style={{ color: open ? T.primary : T.textMuted }}
          />
          <span className="flex-1 text-[13px] font-medium leading-none truncate">
            {item.label}
          </span>
          {item.badge != null && item.badge > 0 && (
            <span
              className="flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
              style={{ backgroundColor: T.danger }}
            >
              {item.badge}
            </span>
          )}
          <ChevronRight
            className="h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200"
            style={{
              color: open ? T.primary : T.textMuted,
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          />
        </button>

        {/* Children */}
        <div
          className="overflow-hidden transition-all duration-200 ease-in-out"
          style={{ maxHeight: open ? '800px' : '0px', opacity: open ? 1 : 0 }}
        >
          <div
            className="ml-[15px] mt-0.5 mb-1 pl-3 space-y-px"
            style={{ borderLeft: `1.5px solid ${T.borderChild}` }}
          >
            {item.children.map((child) => {
              const hrefPath = child.href.split('?')[0];
              const active = pathname === hrefPath || (pathname.startsWith(hrefPath + '/') && hrefPath !== '/');
              return (
                <button
                  key={child.href}
                  onClick={() => navigate(child.href)}
                  className="w-full flex items-center gap-2 rounded-md px-2.5 py-[6px] text-left transition-colors duration-150"
                  style={{
                    backgroundColor: active ? T.activeBg : 'transparent',
                    color: active ? T.primary : T.textBody,
                    fontWeight: active ? 500 : 400,
                  }}
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.backgroundColor = T.hoverBg; e.currentTarget.style.color = T.textHeading; } }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = T.textBody; } }}
                >
                  <span
                    className="h-1 w-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: active ? T.primary : T.borderChild }}
                  />
                  <span className="text-[12.5px] leading-none truncate">{child.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Leaf item
  const active = pathname === item.href;
  return (
    <button
      onClick={() => navigate(item.href!)}
      className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-left transition-colors duration-150"
      style={{
        backgroundColor: active ? T.activeBg : 'transparent',
        color: active ? T.primary : T.textBody,
      }}
      onMouseEnter={(e) => { if (!active) { e.currentTarget.style.backgroundColor = T.hoverBg; e.currentTarget.style.color = T.textHeading; } }}
      onMouseLeave={(e) => { if (!active) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = T.textBody; } }}
    >
      <item.icon
        className="h-4 w-4 flex-shrink-0"
        style={{ color: active ? T.primary : T.textMuted }}
      />
      <span className="flex-1 text-[13px] font-medium leading-none truncate">{item.label}</span>
      {item.badge != null && item.badge > 0 && (
        <span
          className="flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
          style={{ backgroundColor: T.danger }}
        >
          {item.badge}
        </span>
      )}
      {active && (
        <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: T.primary }} />
      )}
    </button>
  );
}

// ── Sidebar content ──────────────────────────────────────────────────────────
function SidebarInner({
  user,
  onLogout,
  onClose,
}: {
  user: { name?: string | null; email?: string | null; role?: string | null; roles?: string[] | null } | null;
  onLogout: () => void;
  onClose?: () => void;
}) {
  const [userDropdown, setUserDropdown] = useState(false);
  const displayRole = (user as any)?.role ?? user?.roles?.[0] ?? 'Super Admin';

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: T.sidebarBg }}>

      {/* Brand header */}
      <div
        className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-bold text-sm flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${T.primary}, ${T.primaryLight})`,
            boxShadow: '0 2px 8px rgba(91,82,209,0.35)',
          }}
        >
          G
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold leading-none truncate" style={{ color: T.textHeading }}>
            Gentong Mas
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: T.textMuted }}>ERP System v2.0</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded-md transition-colors lg:hidden"
            style={{ color: T.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.hoverBg)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto px-2.5 py-3"
        style={{ scrollbarWidth: 'thin', scrollbarColor: `${T.border} transparent` }}
      >
        <div className="space-y-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              {/* Section label */}
              <p
                className="px-2.5 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em]"
                style={{ color: T.textSection }}
              >
                {group.label}
              </p>
              {/* Items */}
              <div className="space-y-px">
                {group.items.map((item) => (
                  <NavItemComponent key={item.label} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* User panel */}
      <div className="px-2.5 py-3 flex-shrink-0" style={{ borderTop: `1px solid ${T.border}` }}>
        <div className="relative">
          <button
            onClick={() => setUserDropdown((v) => !v)}
            className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors duration-150"
            style={{
              backgroundColor: userDropdown ? T.activeBg : T.hoverBg,
              border: `1px solid ${T.border}`,
            }}
            onMouseEnter={(e) => { if (!userDropdown) e.currentTarget.style.backgroundColor = T.activeBg; }}
            onMouseLeave={(e) => { if (!userDropdown) e.currentTarget.style.backgroundColor = T.hoverBg; }}
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-bold flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${T.primary}, ${T.primaryLight})` }}
            >
              {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[12.5px] font-semibold leading-none truncate" style={{ color: T.textHeading }}>
                {user?.name ?? 'Admin'}
              </p>
              <p className="text-[11px] mt-0.5 truncate capitalize" style={{ color: T.textMuted }}>
                {displayRole}
              </p>
            </div>
            <ChevronRight
              className="h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200"
              style={{
                color: T.textMuted,
                transform: userDropdown ? 'rotate(-90deg)' : 'rotate(90deg)',
              }}
            />
          </button>

          {userDropdown && (
            <div
              className="absolute bottom-full left-0 right-0 mb-2 rounded-xl overflow-hidden"
              style={{
                backgroundColor: '#FFFFFF',
                border: `1px solid ${T.border}`,
                boxShadow: '0 8px 24px rgba(91,82,209,0.12)',
              }}
            >
              <a
                href="/settings/users"
                className="flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] transition-colors"
                style={{ color: T.textBody }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.hoverBg)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                onClick={() => setUserDropdown(false)}
              >
                <User className="h-3.5 w-3.5 flex-shrink-0" style={{ color: T.textMuted }} />
                Profil Saya
              </a>
              <a
                href="/settings"
                className="flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] transition-colors"
                style={{ color: T.textBody }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.hoverBg)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                onClick={() => setUserDropdown(false)}
              >
                <Settings className="h-3.5 w-3.5 flex-shrink-0" style={{ color: T.textMuted }} />
                Pengaturan
              </a>
              <div style={{ borderTop: `1px solid ${T.border}` }} />
              <button
                onClick={() => { setUserDropdown(false); onLogout(); }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] transition-colors"
                style={{ color: T.danger }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.dangerBg)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <LogOut className="h-3.5 w-3.5 flex-shrink-0" />
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Layout ───────────────────────────────────────────────────────────────────
interface OdooLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function OdooLayout({ children, title, subtitle }: OdooLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appLauncher, setAppLauncher] = useState(false);
  const [, navigate] = useLocation();

  const APP_LAUNCHER_ITEMS = [
    { label: 'Sales App',   url: 'http://localhost:3002', color: '#0891B2', icon: ShoppingCart },
    { label: 'Gudang App',  url: 'http://localhost:3003', color: '#D97706', icon: Package },
    { label: 'POS App',     url: 'http://localhost:3004', color: '#E64A19', icon: Monitor },
    { label: 'Driver App',  url: 'http://localhost:3005', color: '#1D4ED8', icon: Truck },
  ];

  const { user, logout } = useAuthStore();
  const { notifications } = useNotificationStore();
  const unreadCount = notifications.length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: T.pageBg }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full flex flex-col overflow-hidden transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          width: '252px',
          borderRight: `1px solid ${T.border}`,
          boxShadow: sidebarOpen ? '4px 0 24px rgba(91,82,209,0.08)' : 'none',
        }}
      >
        <SidebarInner
          user={user}
          onLogout={handleLogout}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* ── Main area ── */}
      <main className="lg:pl-[252px] min-h-screen">

        {/* Topbar */}
        <header
          className="sticky top-0 z-30 flex items-center h-14 px-5 gap-3"
          style={{
            backgroundColor: T.topbarBg,
            borderBottom: `1px solid ${T.border}`,
            boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
          }}
        >
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1.5 rounded-lg transition-colors flex-shrink-0"
            style={{ color: T.textMuted }}
            onClick={() => setSidebarOpen(true)}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.hoverBg)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Page title */}
          {(title || subtitle) && (
            <div className="hidden sm:block min-w-0">
              {title && (
                <h1 className="text-sm font-semibold leading-none truncate" style={{ color: T.textHeading }}>
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-xs mt-0.5 truncate" style={{ color: T.textMuted }}>{subtitle}</p>
              )}
            </div>
          )}

          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-1">

            {/* Notifications */}
            <a
              href="/notifications"
              className="relative p-2 rounded-lg transition-colors"
              style={{ color: T.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.hoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Bell className="h-[18px] w-[18px]" />
              {unreadCount > 0 && (
                <span
                  className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: T.danger }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </a>

            {/* AI */}
            <a
              href="/ai/chatbot"
              className="p-2 rounded-lg transition-colors"
              title="AI Assistant"
              style={{ color: T.primaryLight }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.hoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Brain className="h-[18px] w-[18px]" />
            </a>

            {/* Settings */}
            <a
              href="/settings"
              className="p-2 rounded-lg transition-colors"
              style={{ color: T.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.hoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Settings className="h-[18px] w-[18px]" />
            </a>

            {/* App Launcher */}
            <div className="relative">
              <button
                onClick={() => setAppLauncher((v) => !v)}
                className="p-2 rounded-lg transition-colors"
                title="Buka App Lain"
                style={{
                  color: appLauncher ? T.primary : T.textMuted,
                  backgroundColor: appLauncher ? T.activeBg : 'transparent',
                }}
                onMouseEnter={(e) => { if (!appLauncher) e.currentTarget.style.backgroundColor = T.hoverBg; }}
                onMouseLeave={(e) => { if (!appLauncher) e.currentTarget.style.backgroundColor = appLauncher ? T.activeBg : 'transparent'; }}
              >
                <LayoutGrid className="h-[18px] w-[18px]" />
              </button>

              {appLauncher && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setAppLauncher(false)} />
                  <div
                    className="absolute right-0 top-full mt-2 z-50 rounded-xl overflow-hidden"
                    style={{
                      width: 232,
                      backgroundColor: '#FFFFFF',
                      border: `1px solid ${T.border}`,
                      boxShadow: '0 8px 32px rgba(91,82,209,0.14)',
                    }}
                  >
                    <div className="px-4 py-2.5" style={{ borderBottom: `1px solid ${T.border}` }}>
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em]" style={{ color: T.textSection }}>
                        App Launcher
                      </p>
                    </div>
                    <div className="p-2 grid grid-cols-2 gap-1.5">
                      {APP_LAUNCHER_ITEMS.map((app) => {
                        const Icon = app.icon;
                        return (
                          <a
                            key={app.label}
                            href={app.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => setAppLauncher(false)}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg transition-all text-center"
                            style={{ border: `1px solid ${T.border}` }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = app.color;
                              e.currentTarget.style.backgroundColor = `${app.color}08`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = T.border;
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-lg"
                              style={{ backgroundColor: `${app.color}14` }}
                            >
                              <Icon style={{ color: app.color, width: 16, height: 16 }} />
                            </div>
                            <div>
                              <p className="text-[11.5px] font-semibold leading-tight" style={{ color: T.textHeading }}>
                                {app.label}
                              </p>
                              <ExternalLink className="h-2.5 w-2.5 inline mt-0.5" style={{ color: T.textMuted }} />
                            </div>
                          </a>
                        );
                      })}
                    </div>
                    <div className="px-2.5 pb-2.5">
                      <a
                        href="/monitoring"
                        onClick={() => setAppLauncher(false)}
                        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold transition-colors"
                        style={{ backgroundColor: T.activeBg, color: T.primary }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(91,82,209,0.14)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = T.activeBg)}
                      >
                        <LayoutGrid className="h-3.5 w-3.5" />
                        Command Center
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User avatar */}
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-bold ml-1 flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${T.primary}, ${T.primaryLight})` }}
            >
              {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default OdooLayout;
