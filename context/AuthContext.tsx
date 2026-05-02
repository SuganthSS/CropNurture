
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, StoredUser, AuthContextType } from '../types/auth';

const USERS_KEY = 'cropnurture_users';
const SESSION_KEY = 'cropnurture_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const getStoredUsers = (): StoredUser[] => {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getSession = (): User | null => {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveSession = (user: User | null) => {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getSession());

  const isAuthenticated = user !== null;

  const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const sessionUser: User = {
      id: found.id,
      fullName: found.fullName,
      email: found.email,
    };

    setUser(sessionUser);
    saveSession(sessionUser);
    return { success: true };
  }, []);

  const register = useCallback((fullName: string, email: string, password: string): { success: boolean; error?: string } => {
    const users = getStoredUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      fullName,
      email: email.toLowerCase(),
      password,
    };

    saveStoredUsers([...users, newUser]);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    saveSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
