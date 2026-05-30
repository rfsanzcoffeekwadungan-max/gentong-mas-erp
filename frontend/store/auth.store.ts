// frontend/store/auth.store.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  is2FAEnabled: boolean;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  companyId: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (params: {
    user: AuthUser;
    accessToken: string;
    companyId?: string;
  }) => void;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

/**
 * Zustand store with localStorage persistence.
 * Only non-sensitive data is persisted; the accessToken is intentionally
 * kept in memory (not persisted) — it expires in 15 min anyway.
 * The refreshToken lives in a httpOnly cookie managed by the browser.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      companyId: null,
      isAuthenticated: false,

      setAuth: ({ user, accessToken, companyId }) =>
        set({
          user,
          accessToken,
          companyId: companyId ?? null,
          isAuthenticated: true,
        }),

      setAccessToken: (token) => set({ accessToken: token }),

      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          companyId: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'gentong-mas-auth',
      storage: createJSONStorage(() => localStorage),
      // Only persist user + companyId — NOT accessToken (short-lived, memory-only)
      partialize: (state) => ({
        user: state.user,
        companyId: state.companyId,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
