import { useState, useEffect, FormEvent } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/store/useAuthStore';
import {
  Eye, EyeOff, Mail, Lock, ArrowRight,
  BarChart2, ShoppingCart, Package, Users, DollarSign,
  TrendingUp, Truck, CheckCircle, AlertCircle, Loader2,
  Activity, Shield, Zap,
} from 'lucide-react';

const MODULES = [
  { icon: BarChart2,   label: 'Dashboard',    color: '#A78BFA' },
  { icon: ShoppingCart, label: 'Penjualan',   color: '#67E8F9' },
  { icon: Package,     label: 'Inventaris',   color: '#86EFAC' },
  { icon: DollarSign,  label: 'Keuangan',     color: '#FCD34D' },
  { icon: Users,       label: 'SDM',          color: '#F9A8D4' },
  { icon: Truck,       label: 'Pembelian',    color: '#FBB6A0' },
];

const KPI = [
  { label: 'Revenue Hari Ini', value: 'Rp 4.2 M', change: '+12.5%', up: true,  color: '#86EFAC', bg: 'rgba(134,239,172,0.12)' },
  { label: 'Total Order',      value: '547',        change: '+8.3%',  up: true,  color: '#67E8F9', bg: 'rgba(103,232,249,0.12)' },
  { label: 'Stok Rendah',      value: '23 Item',    change: '+4',     up: false, color: '#FCD34D', bg: 'rgba(252,211,77,0.12)'  },
  { label: 'Invoice Pending',  value: 'Rp 18.7 M',  change: '7 jt.tempo', up: false, color: '#F9A8D4', bg: 'rgba(249,168,212,0.12)' },
];

const ACTIVITIES = [
  { text: 'SO-2026-1842 dibuat oleh Budi S.',  time: '5m', dot: '#86EFAC' },
  { text: 'INV-0842 dibayar Rp 4.5 jt',        time: '18m', dot: '#67E8F9' },
  { text: 'Transfer stok TRF-001 divalidasi',   time: '32m', dot: '#A78BFA' },
  { text: 'PO-2026-0048 disetujui Manager',      time: '1j',  dot: '#FCD34D' },
];

const CHART_BARS = [32, 48, 40, 65, 52, 74, 61, 50, 68, 80, 63, 92];

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { login, loadProfile, token, error, loading } = useAuthStore();

  const [email, setEmail]         = useState('admin@example.com');
  const [password, setPassword]   = useState('admin123');
  const [showPass, setShowPass]   = useState(false);
  const [remember, setRemember]   = useState(false);
  const [focused, setFocused]     = useState<string | null>(null);
  const [mounted, setMounted]     = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (token) navigate('/'); }, [token]);
  if (token) return null;

  const validate = (): string => {
    if (!email.trim()) return 'Email tidak boleh kosong.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Format email tidak valid.';
    if (!password) return 'Password tidak boleh kosong.';
    if (password.length < 4) return 'Password minimal 4 karakter.';
    return '';
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = validate();
    if (msg) { setLocalError(msg); return; }
    setLocalError('');
    const ok = await login(email, password);
    if (ok) { await loadProfile().catch(() => {}); navigate('/'); }
  }

  const displayError = localError || error;

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.4s ease', backgroundColor: '#0F0E1A' }}
    >

      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex flex-col w-[54%] relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1A1535 0%, #231D4A 40%, #2D2660 70%, #1E1B4B 100%)',
          padding: '36px 40px 32px',
        }}
      >
        {/* Noise texture + grid */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(139,128,249,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(139,128,249,0.07) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{ position: 'absolute', top: -120, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,111,245,0.22) 0%, transparent 65%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: -100, left: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,82,209,0.18) 0%, transparent 65%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', top: '45%', left: '58%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 65%)', filter: 'blur(30px)' }} />
        </div>

        {/* Brand */}
        <div className="relative flex items-center gap-3 z-10">
          <div style={{ width: 40, height: 40, borderRadius: 13, background: 'linear-gradient(135deg, #7C6FF5, #5B52D1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(91,82,209,0.55)', fontWeight: 800, fontSize: 16, color: '#fff', letterSpacing: '-0.5px' }}>
            G
          </div>
          <div>
            <p className="text-white font-bold text-[15px] leading-none tracking-tight">Gentong Mas</p>
            <p className="text-[11px] font-medium mt-0.5" style={{ color: 'rgba(167,139,250,0.7)' }}>Enterprise Resource Planning</p>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10 mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10.5px] font-semibold mb-5" style={{ backgroundColor: 'rgba(139,128,249,0.14)', color: '#C4B5FD', border: '1px solid rgba(139,128,249,0.22)' }}>
            <Zap className="h-3 w-3 text-yellow-300" />
            Platform ERP Terintegrasi
          </div>
          <h1 className="text-[2.2rem] font-bold text-white leading-[1.18] tracking-tight">
            Kelola bisnis Anda<br />
            <span style={{ background: 'linear-gradient(90deg, #C4B5FD, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>lebih cerdas.</span>
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 290 }}>
            Satu platform untuk sales, inventaris, keuangan, HR — data real-time tanpa batas.
          </p>
        </div>

        {/* Module pills */}
        <div className="relative z-10 mt-6 flex flex-wrap gap-2">
          {MODULES.map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <Icon className="h-3 w-3" style={{ color }} />
              <span className="text-[10.5px] font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Dashboard card */}
        <div className="relative z-10 mt-7 rounded-2xl overflow-hidden flex-1 flex flex-col" style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', minHeight: 0 }}>
          {/* Card header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <p className="text-white text-[12px] font-bold">Dashboard Overview</p>
              <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Mei 2026 · Real-time</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 5px rgba(52,211,153,0.9)' }} />
              <span className="text-[9.5px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Live</span>
            </div>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-2 gap-2.5 p-4">
            {KPI.map((k) => (
              <div key={k.label} className="rounded-xl p-3" style={{ backgroundColor: k.bg, border: `1px solid ${k.color}22` }}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[9.5px] font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>{k.label}</p>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ backgroundColor: k.up ? 'rgba(134,239,172,0.15)' : 'rgba(249,168,212,0.15)', color: k.up ? '#86EFAC' : '#F9A8D4' }}>
                    {k.up ? '↑' : '↓'} {k.change}
                  </span>
                </div>
                <p className="text-white text-[14px] font-bold leading-none">{k.value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="px-4 pb-3">
            <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9.5px] font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>Tren Penjualan Bulanan</span>
                <Activity className="h-3 w-3" style={{ color: 'rgba(167,139,250,0.5)' }} />
              </div>
              <div className="flex items-end gap-1" style={{ height: 44 }}>
                {CHART_BARS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all"
                    style={{
                      height: `${h}%`,
                      background: i === 11
                        ? 'linear-gradient(to top, #7C6FF5, #C4B5FD)'
                        : i >= 9
                        ? 'rgba(167,139,250,0.35)'
                        : 'rgba(255,255,255,0.12)',
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1.5">
                {['Jan', 'Mar', 'Mei', 'Jul', 'Sep', 'Nov'].map(m => (
                  <span key={m} className="text-[8.5px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="px-4 pb-4 flex-1">
            <p className="text-[9.5px] font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>AKTIVITAS TERKINI</p>
            <div className="space-y-2">
              {ACTIVITIES.map((a, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: a.dot }} />
                  <p className="text-[10px] flex-1 truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>{a.text}</p>
                  <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.22)' }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card footer */}
          <div className="flex items-center justify-between px-4 py-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3 w-3" style={{ color: 'rgba(134,239,172,0.7)' }} />
              <span className="text-[9.5px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Semua sistem aktif</span>
            </div>
            <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.22)' }}>6 modul terhubung</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="relative z-10 text-[10px] mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
          © 2026 Gentong Mas — Enterprise Resource Planning
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="flex flex-1 flex-col items-center justify-center relative overflow-hidden"
        style={{ background: '#FFFFFF', padding: '40px 48px' }}
      >
        {/* Subtle blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: 'absolute', top: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(237,233,254,0.65) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,228,255,0.45) 0%, transparent 70%)' }} />
        </div>

        <div className="relative w-full" style={{ maxWidth: 372 }}>

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div style={{ width: 38, height: 38, borderRadius: 12, background: 'linear-gradient(135deg, #7C6FF5, #5B52D1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: 15, boxShadow: '0 4px 14px rgba(91,82,209,0.45)' }}>G</div>
            <div>
              <p className="font-bold text-[15px] leading-none" style={{ color: '#1E1B4B' }}>Gentong Mas</p>
              <p className="text-[11px] mt-0.5" style={{ color: '#9CA3AF' }}>Enterprise ERP</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10.5px] font-semibold mb-4" style={{ backgroundColor: '#F5F3FF', color: '#7C3AED', border: '1px solid #EDE9FE' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500 inline-block animate-pulse" />
              Selamat datang kembali
            </div>
            <h2 className="text-[1.85rem] font-bold tracking-tight leading-tight" style={{ color: '#111827' }}>
              Masuk ke Akun Anda
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#9CA3AF' }}>
              Akses dashboard ERP Anda dengan aman
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Email field */}
            <div>
              <label className="block text-[12px] font-semibold mb-2" style={{ color: '#374151' }}>
                Alamat Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none transition-colors"
                  style={{ color: focused === 'email' ? '#7C6FF5' : '#D1D5DB' }}
                />
                <input
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (localError) setLocalError(''); }}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="nama@perusahaan.com"
                  className="w-full outline-none text-[13.5px] transition-all duration-150"
                  style={{
                    borderRadius: 12,
                    padding: '12px 14px 12px 42px',
                    border: focused === 'email' ? '1.5px solid #7C6FF5' : displayError ? '1.5px solid #FCA5A5' : '1.5px solid #E5E7EB',
                    boxShadow: focused === 'email' ? '0 0 0 3px rgba(124,111,245,0.12)' : 'none',
                    color: '#111827',
                    backgroundColor: focused === 'email' ? '#FDFCFF' : '#F9FAFB',
                  }}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[12px] font-semibold" style={{ color: '#374151' }}>
                  Password
                </label>
                <button
                  type="button"
                  className="text-[12px] font-semibold transition-opacity hover:opacity-70"
                  style={{ color: '#7C6FF5' }}
                >
                  Lupa password?
                </button>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none transition-colors"
                  style={{ color: focused === 'password' ? '#7C6FF5' : '#D1D5DB' }}
                />
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (localError) setLocalError(''); }}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="Masukkan password"
                  className="w-full outline-none text-[13.5px] transition-all duration-150"
                  style={{
                    borderRadius: 12,
                    padding: '12px 44px 12px 42px',
                    border: focused === 'password' ? '1.5px solid #7C6FF5' : displayError ? '1.5px solid #FCA5A5' : '1.5px solid #E5E7EB',
                    boxShadow: focused === 'password' ? '0 0 0 3px rgba(124,111,245,0.12)' : 'none',
                    color: '#111827',
                    backgroundColor: focused === 'password' ? '#FDFCFF' : '#F9FAFB',
                  }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-0.5 transition-opacity hover:opacity-70"
                  style={{ color: '#9CA3AF' }}
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setRemember(v => !v)}
                className="flex-shrink-0 flex items-center justify-center transition-all duration-150"
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  border: remember ? '2px solid #7C6FF5' : '2px solid #D1D5DB',
                  backgroundColor: remember ? '#7C6FF5' : 'transparent',
                  boxShadow: remember ? '0 0 0 3px rgba(124,111,245,0.12)' : 'none',
                }}
              >
                {remember && (
                  <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className="text-[12.5px] select-none cursor-pointer" style={{ color: '#6B7280' }} onClick={() => setRemember(v => !v)}>
                Ingat saya selama 30 hari
              </span>
            </div>

            {/* Error state */}
            {displayError && (
              <div
                className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-[12.5px]"
                style={{ backgroundColor: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA' }}
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{displayError}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 text-[14px] font-bold text-white transition-all duration-200"
              style={{
                borderRadius: 12,
                padding: '13px 20px',
                background: loading
                  ? 'linear-gradient(135deg, #6B64D4, #7C6FF5)'
                  : 'linear-gradient(135deg, #5B52D1 0%, #7C6FF5 50%, #9B8FF9 100%)',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(91,82,209,0.4), 0 1px 6px rgba(91,82,209,0.2)',
                opacity: loading ? 0.85 : 1,
                transform: 'translateY(0)',
                marginTop: 2,
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(91,82,209,0.5), 0 2px 8px rgba(91,82,209,0.25)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(91,82,209,0.4), 0 1px 6px rgba(91,82,209,0.2)';
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                <>
                  Masuk ke Dashboard
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor: '#F3F4F6' }} />
              <span className="text-[11.5px] font-medium" style={{ color: '#D1D5DB' }}>atau</span>
              <div className="flex-1 h-px" style={{ backgroundColor: '#F3F4F6' }} />
            </div>

            {/* Google button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 text-[13px] font-semibold transition-all duration-150"
              style={{
                borderRadius: 12,
                padding: '12px 20px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E5E7EB',
                color: '#374151',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#F9FAFB';
                e.currentTarget.style.borderColor = '#DDD6FE';
                e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
              }}
            >
              <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Lanjutkan dengan Google
            </button>
          </form>

          {/* Access request */}
          <p className="text-center text-[12px] mt-7" style={{ color: '#9CA3AF' }}>
            Butuh akses?{' '}
            <span className="font-semibold cursor-pointer transition-opacity hover:opacity-70" style={{ color: '#7C6FF5' }}>
              Hubungi administrator
            </span>
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 mt-6 pt-5" style={{ borderTop: '1px solid #F3F4F6' }}>
            {[
              { icon: <Shield className="h-3 w-3" />, label: 'SSL Secured' },
              { icon: <CheckCircle className="h-3 w-3" />, label: 'ISO 27001' },
              { icon: <CheckCircle className="h-3 w-3" />, label: 'Data Aman' },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-1.5" style={{ color: '#D1D5DB' }}>
                {b.icon}
                <span className="text-[10.5px] font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
