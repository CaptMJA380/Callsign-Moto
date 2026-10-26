import React, { createContext, useContext, useEffect, useState } from 'react';
import { AdminUser } from '../types/order';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isAdminSetupRequired: boolean;
  login: (username: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  setupInitialAdmin: (username: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDS_KEY = 'csm_admin_credentials_v1';
const ADMIN_SESSION_KEY = 'csm_admin_session_token_v1';

// Default development credentials for convenience
const DEFAULT_DEV_ADMIN = {
  id: 'admin-root-01',
  username: 'admin',
  email: 'admin@callsignmoto.in',
  passHash: btoa('admin12345'), // 'admin12345'
  role: 'SUPER_ADMIN' as const,
  createdAt: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isAdminSetupRequired, setIsAdminSetupRequired] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // If no custom admin credentials exist yet, seed default dev admin
    let existingCreds = localStorage.getItem(ADMIN_CREDS_KEY);
    if (!existingCreds) {
      localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(DEFAULT_DEV_ADMIN));
      existingCreds = JSON.stringify(DEFAULT_DEV_ADMIN);
    }

    setIsAdminSetupRequired(false);

    // Check active session
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setUser(parsed);
      } catch {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
      }
    }
    setIsReady(true);
  }, []);

  const setupInitialAdmin = async (username: string, email: string, pass: string) => {
    if (pass.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }
    if (!username.trim() || !email.includes('@')) {
      return { success: false, error: 'Please provide a valid username and administrative email.' };
    }

    const adminRecord = {
      id: `admin-${Date.now()}`,
      username: username.trim(),
      email: email.trim(),
      passHash: btoa(pass),
      role: 'SUPER_ADMIN' as const,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(adminRecord));
    setIsAdminSetupRequired(false);

    const adminUser: AdminUser = {
      id: adminRecord.id,
      username: adminRecord.username,
      email: adminRecord.email,
      role: adminRecord.role,
      lastLogin: new Date().toISOString()
    };
    setUser(adminUser);
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));

    return { success: true };
  };

  const login = async (username: string, pass: string) => {
    const cleanUser = username.trim().toLowerCase();

    // Check default credentials directly
    if (
      (cleanUser === 'admin' || cleanUser === 'admin@callsignmoto.in') &&
      pass === 'admin12345'
    ) {
      const adminUser: AdminUser = {
        id: DEFAULT_DEV_ADMIN.id,
        username: 'admin',
        email: 'admin@callsignmoto.in',
        role: 'SUPER_ADMIN',
        lastLogin: new Date().toISOString()
      };
      setUser(adminUser);
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
      return { success: true };
    }

    // Check stored credentials
    const existingCreds = localStorage.getItem(ADMIN_CREDS_KEY);
    if (existingCreds) {
      try {
        const parsed = JSON.parse(existingCreds);
        if (
          (parsed.username.toLowerCase() === cleanUser ||
            parsed.email.toLowerCase() === cleanUser) &&
          parsed.passHash === btoa(pass)
        ) {
          const adminUser: AdminUser = {
            id: parsed.id,
            username: parsed.username,
            email: parsed.email,
            role: parsed.role,
            lastLogin: new Date().toISOString()
          };
          setUser(adminUser);
          sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
          return { success: true };
        }
      } catch {
        // error
      }
    }

    return { success: false, error: 'Invalid credentials. Use admin / admin12345' };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  };

  if (!isReady) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdminSetupRequired,
        login,
        setupInitialAdmin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
