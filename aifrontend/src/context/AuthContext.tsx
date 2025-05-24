import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../api';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 인증 상태 확인
  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const authStatus = await authApi.checkAuth();
      setIsAuthenticated(authStatus.isAuthenticated);
      setUsername(authStatus.username || null);
    } catch (error) {
      console.error('인증 확인 실패:', error);
      setIsAuthenticated(false);
      setUsername(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인
  const login = async (credentials: { username: string; password: string }) => {
    try {
      await authApi.login(credentials);
      // 로그인 성공 후 인증 상태 다시 확인
      await checkAuth();
    } catch (error) {
      throw error; // 에러를 상위 컴포넌트로 전달
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await authApi.logout();
      setIsAuthenticated(false);
      setUsername(null);
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // 로그아웃 실패해도 로컬 상태는 초기화
      setIsAuthenticated(false);
      setUsername(null);
    }
  };

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    username,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 