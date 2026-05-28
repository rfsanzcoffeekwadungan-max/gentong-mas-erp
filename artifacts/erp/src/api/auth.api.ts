import { apiClient } from './client';
import type { AuthUser } from '@/types';

export type { AuthUser };

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token?: string;
  accessToken?: string;
  refresh_token?: string;
  refreshToken?: string;
  token?: string;
  user?: AuthUser;
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<{ accessToken: string; refreshToken: string | null; user: AuthUser | null }> => {
    const res = await apiClient.post<LoginResponse>('/auth/login', payload);
    const d = res.data;
    const accessToken = d.access_token ?? d.accessToken ?? d.token ?? '';
    const refreshToken = d.refresh_token ?? d.refreshToken ?? null;
    const user = d.user ?? null;
    return { accessToken, refreshToken, user };
  },

  me: async (): Promise<AuthUser> => {
    const res = await apiClient.get<AuthUser>('/auth/me');
    return res.data;
  },

  profile: async (): Promise<AuthUser> => {
    const res = await apiClient.get<AuthUser>('/auth/profile');
    return res.data;
  },

  refresh: async (refreshToken: string): Promise<string> => {
    const res = await apiClient.post<LoginResponse>('/auth/refresh', { refresh_token: refreshToken });
    const d = res.data;
    return d.access_token ?? d.accessToken ?? d.token ?? '';
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
    }
  },
};
