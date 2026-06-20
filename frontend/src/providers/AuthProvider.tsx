import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { login as loginRequest } from '../api/auth';
import type { User } from '../types';

type AuthContextValue = {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getStoredUser() {
  const storedUser = localStorage.getItem('weatherguard_user');
  return storedUser ? (JSON.parse(storedUser) as User) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem('weatherguard_token'),
  );
  const [user, setUser] = useState<User | null>(() => getStoredUser());

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginRequest(email, password);
    localStorage.setItem('weatherguard_token', response.accessToken);
    localStorage.setItem('weatherguard_user', JSON.stringify(response.user));
    setToken(response.accessToken);
    setUser(response.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('weatherguard_token');
    localStorage.removeItem('weatherguard_user');
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
    }),
    [token, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}
