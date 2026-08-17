import React from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;  
  signup: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  userEmail: string | null;
  loading: boolean;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
