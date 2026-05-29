import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/utils";
import { useAuth } from "@/store/authStore";
import { getInitials } from "@/utils";
import { APP_NAME } from "@/constants";
import { useState } from "react";

const NAV_ITEMS = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Products", href: "/products", icon: Package },
  { title: "Inventory", href: "/inventory", icon: Warehouse },
];

const BOTTOM_NAV = [
  { title: "Settings", href: "/settings", icon: Settings },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside
      data-testid="app-sidebar"
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo / Brand */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">F</span>
          </div>
          {!collapsed && (
            <span className="font-semibold text-sm tracking-tight truncate">
              {APP_NAME}
            </span>
          )}
        </div>
        <button
          data-testid="sidebar-toggle"
          onClick={onToggle}
          className={cn(
            "ml-auto p-1.5 rounded-md hover:bg-sidebar-accent transition-colors",
            collapsed && "mx-auto ml-0"
          )}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? location === "/"
              : location.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <a
                data-testid={`nav-${item.title.toLowerCase()}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative",
                  isActive
                    ? "bg-sidebar-primary text-white shadow-sm"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.title}</span>}
                {!collapsed && isActive && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {item.title}
                  </div>
                )}
              </a>
            </Link>
          );
        })}
      </nav>

      {/* Divider + Bottom Nav */}
      <div className="px-2 pb-2 space-y-1 border-t border-sidebar-border pt-2">
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <a
                data-testid={`nav-${item.title.toLowerCase()}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all group relative"
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                    {item.title}
                  </div>
                )}
              </a>
            </Link>
          );
        })}
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-sidebar-border shrink-0">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-sidebar-primary/80 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-white">
              {user ? getInitials(user.name) : "??"}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/50 truncate capitalize">
                {user?.role}
              </p>
            </div>
          )}
          {!collapsed && (
            <button
              data-testid="btn-logout"
              onClick={logout}
              className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors text-sidebar-foreground/50 hover:text-sidebar-foreground"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
        {collapsed && (
          <button
            data-testid="btn-logout-collapsed"
            onClick={logout}
            className="w-full mt-2 p-1.5 rounded-md hover:bg-sidebar-accent transition-colors text-sidebar-foreground/50 hover:text-sidebar-foreground flex justify-center"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
}
