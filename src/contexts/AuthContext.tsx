// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: 'user' | 'admin') => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'user' | 'admin') => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to your backend
      // For this demo, we'll simulate an API call
      
      // Simulated authentication logic
      if (email && password) {
        // Mock users for demonstration
        const mockAdmins = [
          { id: 'admin1', name: 'Admin User', email: 'admin@example.com', password: 'password', role: 'admin' as const }
        ];
        
        const mockUsers = [
          { id: 'user1', name: 'John Doe', email: 'user@example.com', password: 'password', role: 'user' as const }
        ];
        
        const users = role === 'admin' ? mockAdmins : mockUsers;
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          toast({
            title: 'Login Successful',
            description: `Welcome back, ${userWithoutPassword.name}!`,
          });
          return;
        }
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'An error occurred during login',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to your backend
      // For this demo, we'll simulate registration
      
      if (name && email && password) {
        const newUser = {
          id: `user${Date.now()}`,
          name,
          email,
          role: 'user' as const,
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast({
          title: 'Registration Successful',
          description: `Welcome, ${name}!`,
        });
        return;
      }
      
      throw new Error('Please fill in all fields');
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'An error occurred during registration',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
