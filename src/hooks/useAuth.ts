import { useState, useEffect } from 'react';
import type { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('c3_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: 'Saleem Yousef',
        email,
        type: 'both',
        rating: 4.8,
        totalDeliveries: 23,
        joinDate: '2024-01-15',
        verificationStatus: 'verified',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA'
      };
      
      setUser(mockUser);
      localStorage.setItem('c3_user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const register = async (name: string, email: string, password: string, type: User['type']) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        type,
        rating: 5.0,
        totalDeliveries: 0,
        joinDate: new Date().toISOString().split('T')[0],
        verificationStatus: 'pending'
      };
      
      setUser(mockUser);
      localStorage.setItem('c3_user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('c3_user');
  };

  return { user, login, register, logout, loading };
}