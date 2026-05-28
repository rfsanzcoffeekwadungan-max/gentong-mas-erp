import { useState } from 'react';
import { useLocation } from 'wouter';

import { useAuthStore } from '@/store/useAuthStore';
import { Home, LogOut, ChevronRight, ChevronDown, Menu, X, Bell } from 'lucide-react';

const T = {
  primary:    '#5B52D1',
  activeBg:   'rgba(91,82,209,0.09)',
  hoverBg:    'rgba(91,82,209,0.05)',
  activeText: '#5B52D1',
  textHeading:'#1E1B4B',
  textBody:   '#374151',
  textMuted:  '#9CA3AF',
  border:     '#EDE8F5',
  sidebarBg:  '#FEFEFF',
  dot:        '#5B52D1',
};

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  children?: { label: string; href: string }[];
}

interface AppShellProps {
  appName: string;
  appColor: string;
  appGradient: string;
  appIcon: React.ElementType;
  navItems: NavItem[];
  children: React.ReactNode;
  activeHref?: string;
}

interface SidebarProps {
  appName: string;
  appColor: string;
  appGradient: string;
  appIcon: React.ElementType;
  navItems: NavItem[];
  activeHref?: string;
  expandedItem: string | null;
  setExpandedItem: (v: string | null) => void;
  onNavigate: (href: string) => void;
  onClose?: () => void;
  onHome: () => void;
  onLogout: () => void;
  userName: string;
  userEmail: string;
}

function SidebarContent({
  appName,
  appGradient,
  appIcon: AppIcon,
  navItems,
  activeHref,
  expandedItem,
  setExpandedItem,
  onNavigate,
  onClose,
  onHome,
  onLogout,
  userName,
  userEmail,
}: SidebarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: T.sidebarBg }}>

      {/* Brand header */}
      <div
        className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 bg-gradient-to-br ${appGradient}`}
        >
          <AppIcon className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold leading-none truncate" style={{ color: T.textHeading }}>
            {appName}
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: T.textMuted }}>Gentong Mas ERP</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded-md lg:hidden transition-colors"
            style={{ color: T.textMuted }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = T.hoverBg; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-2.5 px-2.5 space-y-px">
        {navItems.map((item) => {
          const isActive = activeHref === item.href || activeHref?.startsWith(item.href + '/');
          const isExpanded = expandedItem === item.href;
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.href}>
              {/* Parent row */}
              <button
                onClick={() => {
                  if (hasChildren) {
                    setExpandedItem(isExpanded ? null : item.href);
                  } else {
                    onNavigate(item.href);
                    onClose?.();
                  }
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-left transition-colors duration-150"
                style={{
                  backgroundColor: isActive ? T.activeBg : 'transparent',
                  color: isActive ? T.activeText : T.textBody,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = T.hoverBg;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <item.icon
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: isActive ? T.primary : T.textMuted }}
                />
                <span className="text-[13px] font-medium flex-1 leading-none truncate">
                  {item.label}
                </span>
                {item.badge != null && item.badge > 0 && (
                  <span
                    className="flex h-4 min-w-4 items-center justify-center rounded-full text-[10px] font-bold px-1"
                    style={{ backgroundColor: T.activeBg, color: T.primary }}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && !hasChildren && (
                  <span
                    className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: T.dot }}
                  />
                )}
                {hasChildren && (
                  <ChevronRight
                    className="h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200"
                    style={{
                      color: T.textMuted,
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                  />
                )}
              </button>

              {/* Children */}
              {hasChildren && isExpanded && (
                <div
                  className="ml-[15px] mt-px mb-1 pl-3 space-y-px"
                  style={{ borderLeft: `1.5px solid ${T.border}` }}
                >
                  {item.children!.map((child) => {
                    const childActive = activeHref === child.href || activeHref?.startsWith(child.href + '/');
                    return (
                      <button
                        key={child.href}
                        onClick={() => { onNavigate(child.href); onClose?.(); }}
                        className="w-full text-left flex items-center gap-2 px-2.5 py-[6px] rounded-md transition-colors duration-150"
                        style={{
                          backgroundColor: childActive ? T.activeBg : 'transparent',
                          color: childActive ? T.activeText : T.textBody,
                          fontWeight: childActive ? 500 : 400,
                        }}
                        onMouseEnter={(e) => {
                          if (!childActive) {
                            e.currentTarget.style.backgroundColor = T.hoverBg;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!childActive) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <span
                          className="h-1 w-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: childActive ? T.primary : T.textMuted }}
                        />
                        <span className="text-[12.5px] leading-none truncate">{child.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User panel */}
      <div
        className="flex-shrink-0 px-2.5 pt-2 pb-3"
        style={{ borderTop: `1px solid ${T.border}` }}
      >
        <button
          onClick={() => { onHome(); onClose?.(); }}
          className="w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-left transition-colors duration-150 mb-px"
          style={{ color: T.textBody }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = T.hoverBg; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <Home className="h-4 w-4 flex-shrink-0" style={{ color: T.textMuted }} />
          <span className="text-[13px] font-medium leading-none">Beranda</span>
        </button>

        <button
          onClick={() => setUserMenuOpen((v) => !v)}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg mt-1 transition-colors duration-150"
          style={{ border: `1px solid ${T.border}` }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = T.hoverBg; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-bold flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${T.primary} 0%, #8B80F9 100%)` }}
          >
            {(userName || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-[12.5px] font-semibold leading-none truncate" style={{ color: T.textHeading }}>
              {userName || 'Admin'}
            </p>
            <p className="text-[11px] mt-0.5 truncate leading-none" style={{ color: T.textMuted }}>
              {userEmail}
            </p>
          </div>
          <ChevronDown
            className="h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200"
            style={{
              color: T.textMuted,
              transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </button>

        {userMenuOpen && (
          <div
            className="mt-1 rounded-xl overflow-hidden"
            style={{ border: `1px solid ${T.border}`, backgroundColor: '#FFF' }}
          >
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors duration-150"
              style={{ color: '#EF4444' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              <span className="text-[13px] font-medium">Keluar</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AppShell({
  appName,
  appColor,
  appGradient,
  appIcon,
  navItems,
  children,
  activeHref,
}: AppShellProps) {
  const [, navigate] = useLocation();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const sidebarProps: SidebarProps = {
    appName,
    appColor,
    appGradient,
    appIcon,
    navItems,
    activeHref,
    expandedItem,
    setExpandedItem,
    onNavigate: (href) => navigate(href),
    onHome: () => navigate('/'),
    onLogout: () => { logout(); navigate('/login'); },
    userName: user?.name ?? user?.email ?? '',
    userEmail: user?.email ?? '',
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#F5F4F9' }}>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-56 flex-shrink-0 h-full"
        style={{ borderRight: `1px solid ${T.border}`, backgroundColor: T.sidebarBg }}
      >
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="relative flex flex-col w-60 h-full z-10"
            style={{ backgroundColor: T.sidebarBg, borderRight: `1px solid ${T.border}` }}
          >
            <SidebarContent {...sidebarProps} onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Topbar */}
        <header
          className="flex items-center justify-between px-4 sm:px-5 h-14 flex-shrink-0"
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: `1px solid ${T.border}`,
            boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <button
              className="lg:hidden p-1.5 rounded-lg transition-colors"
              style={{ color: T.textMuted }}
              onClick={() => setSidebarOpen(true)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.hoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: T.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.textMuted)}
            >
              <Home className="h-3.5 w-3.5" />
              Beranda
            </button>
            <span style={{ color: '#D4CDE0' }}>/</span>
            <span className="text-xs font-semibold" style={{ color: T.primary }}>{appName}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              className="p-2 rounded-lg transition-colors"
              style={{ color: T.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.hoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Bell className="h-[18px] w-[18px]" />
            </button>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ border: `1px solid ${T.border}` }}
            >
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full text-white text-xs font-bold"
                style={{ background: `linear-gradient(135deg, ${T.primary} 0%, #8B80F9 100%)` }}
              >
                {(user?.name ?? 'A').charAt(0).toUpperCase()}
              </div>
              <span className="text-[13px] hidden sm:block font-medium" style={{ color: T.textHeading }}>
                {user?.name ?? 'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
