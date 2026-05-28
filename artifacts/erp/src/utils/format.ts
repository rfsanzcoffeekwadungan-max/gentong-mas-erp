import { LOCALE, CURRENCY } from '@/constants';

export const formatRupiah = (value: number | string | null | undefined): string => {
  const num = Number(value ?? 0);
  if (isNaN(num)) return 'Rp 0';
  return num.toLocaleString(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
    maximumFractionDigits: 0,
  });
};

export const formatRupiahShort = (value: number | null | undefined): string => {
  const val = Number(value ?? 0);
  if (val >= 1_000_000_000) return `Rp ${(val / 1_000_000_000).toFixed(1)} M`;
  if (val >= 1_000_000) return `Rp ${(val / 1_000_000).toFixed(1)} Jt`;
  if (val >= 1_000) return `Rp ${(val / 1_000).toFixed(0)} rb`;
  return `Rp ${val}`;
};

export const formatNumber = (value: number | null | undefined): string =>
  Number(value ?? 0).toLocaleString(LOCALE);

export const formatDate = (
  value: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions,
): string => {
  if (!value) return '–';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (isNaN(date.getTime())) return '–';
  return date.toLocaleDateString(LOCALE, options ?? {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatDateShort = (value: string | Date | null | undefined): string =>
  formatDate(value, { day: '2-digit', month: '2-digit', year: 'numeric' });

export const formatDateTime = (value: string | Date | null | undefined): string => {
  if (!value) return '–';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (isNaN(date.getTime())) return '–';
  return date.toLocaleString(LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatRelativeTime = (value: string | Date | null | undefined): string => {
  if (!value) return '–';
  const date = typeof value === 'string' ? new Date(value) : value;
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return 'Baru saja';
  if (diffMin < 60) return `${diffMin} menit lalu`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} jam lalu`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay} hari lalu`;
  return formatDateShort(value);
};

export const extractName = (val: unknown): string => {
  if (!val) return '–';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val !== null) {
    const obj = val as Record<string, unknown>;
    return String(obj.name ?? obj.nama ?? obj.email ?? '–');
  }
  return String(val);
};

export const formatPercent = (value: number | null | undefined, decimals = 1): string => {
  const num = Number(value ?? 0);
  const sign = num >= 0 ? '+' : '';
  return `${sign}${num.toFixed(decimals)}%`;
};

export const formatUnit = (qty: number, unit: string): string =>
  `${formatNumber(qty)} ${unit}`;
