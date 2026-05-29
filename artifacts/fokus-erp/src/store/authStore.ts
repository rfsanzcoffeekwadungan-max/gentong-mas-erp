import { createContext, useContext } from "react";
import type { AuthState } from "@/types";

export const AuthContext = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

const MOCK_USERS = [
  {
    id: "1",
    name: "Admin Fokus",
    email: "admin@fokus.id",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: "2",
    name: "Manager ERP",
    email: "manager@fokus.id",
    password: "manager123",
    role: "manager" as const,
  },
];

export function createAuthActions(
  setUser: (user: AuthState["user"]) => void,
  setIsAuthenticated: (val: boolean) => void
) {
  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600));
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const { password: _p, ...user } = found;
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("fokus_user", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("fokus_user");
  };

  return { login, logout };
}

export function loadPersistedUser(): AuthState["user"] {
  try {
    const raw = localStorage.getItem("fokus_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
