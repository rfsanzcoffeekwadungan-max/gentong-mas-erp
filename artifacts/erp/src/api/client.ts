import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};

const getStoredToken = (): string | null =>
  typeof window !== 'undefined' ? window.localStorage.getItem('erp_token') : null;

const getStoredRefreshToken = (): string | null =>
  typeof window !== 'undefined' ? window.localStorage.getItem('erp_refresh_token') : null;

const clearSession = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('erp_token');
    window.localStorage.removeItem('erp_refresh_token');
  }
  setAuthToken(null);
  window.dispatchEvent(new CustomEvent('erp:logout'));
};

const refreshAuthToken = async (): Promise<string> => {
  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) throw new Error('No refresh token');

  const response = await axios.post(`${BASE_URL}/auth/refresh`, { refresh_token: refreshToken });
  const newToken =
    response.data.access_token ??
    response.data.accessToken ??
    response.data.token;

  if (!newToken) throw new Error('Invalid refresh response');

  window.localStorage.setItem('erp_token', newToken);
  setAuthToken(newToken);
  return newToken;
};

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredToken();
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryableConfig | undefined;
    if (
      error.response?.status === 401 &&
      config &&
      !config._retry &&
      typeof window !== 'undefined'
    ) {
      config._retry = true;
      try {
        await refreshAuthToken();
        return apiClient(config);
      } catch {
        clearSession();
      }
    }
    return Promise.reject(error);
  },
);

const storedToken = getStoredToken();
if (storedToken) setAuthToken(storedToken);

export default apiClient;
