import { create } from 'zustand';
import { apiClient, setAuthToken } from '@/api/client';
import { authApi } from '@/api/auth.api';
import { STORAGE_KEYS } from '@/constants';
import type { AuthUser } from '@/types';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  error: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loadProfile: () => Promise<void>;
}

const stored = {
  token: typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEYS.TOKEN) : null,
  refreshToken: typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) : null,
};

if (stored.token) {
  setAuthToken(stored.token);
}

window.addEventListener('erp:logout', () => {
  useAuthStore.getState().logout();
});

export const useAuthStore = create<AuthState>((set) => ({
  token: stored.token,
  refreshToken: stored.refreshToken,
  user: null,
  error: null,
  loading: false,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { accessToken, refreshToken, user } = await authApi.login({ email, password });

      if (!accessToken) throw new Error('Token tidak ditemukan dalam respons');

      window.localStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
      if (refreshToken) window.localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

      setAuthToken(accessToken);

      let resolvedUser: AuthUser | null = user;
      if (!resolvedUser) {
        try {
          resolvedUser = await authApi.me().catch(() => authApi.profile());
        } catch {
        }
      }

      set({ token: accessToken, refreshToken, user: resolvedUser, loading: false, error: null });
      return true;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        err?.message ??
        'Login gagal. Periksa email dan password Anda.';
      set({ error: message, loading: false });
      return false;
    }
  },

  logout: () => {
    authApi.logout().catch(() => {});
    window.localStorage.removeItem(STORAGE_KEYS.TOKEN);
    window.localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    setAuthToken(null);
    set({ token: null, refreshToken: null, user: null, error: null });
  },

  loadProfile: async () => {
    const currentToken = window.localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!currentToken) return;

    try {
      let profile: AuthUser;
      try {
        profile = await authApi.me();
      } catch {
        profile = await authApi.profile();
      }
      set({ user: profile });
    } catch (err: any) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        window.localStorage.removeItem(STORAGE_KEYS.TOKEN);
        window.localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        setAuthToken(null);
        set({ token: null, refreshToken: null, user: null });
      }
    }
  },
}));

export { apiClient };
