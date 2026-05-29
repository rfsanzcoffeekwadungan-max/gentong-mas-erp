import { APP_NAME } from "@/constants";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar flex-col justify-between p-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sidebar-primary flex items-center justify-center">
            <span className="text-sm font-bold text-white">F</span>
          </div>
          <span className="text-lg font-semibold text-white">{APP_NAME}</span>
        </div>

        <div>
          <blockquote className="text-sidebar-foreground/80 text-base leading-relaxed max-w-sm">
            "Kelola bisnis Anda dengan lebih efisien. Pantau stok, produk, dan
            operasional dari satu platform terintegrasi."
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary/60 flex items-center justify-center">
              <span className="text-xs font-semibold text-white">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin Fokus</p>
              <p className="text-xs text-sidebar-foreground/50">
                Administrator
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-sidebar-foreground/40">
          © 2026 {APP_NAME}. All rights reserved.
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
