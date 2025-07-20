import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import type { User } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onRegister: (name: string, email: string, password: string, type: User['type']) => Promise<{ success: boolean; error?: string }>;
}

export function AuthModal({ onClose, onLogin, onRegister }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'both' as User['type']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const result = await onLogin(formData.email, formData.password);
        if (result.success) {
          onClose();
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        const result = await onRegister(formData.name, formData.email, formData.password, formData.type);
        if (result.success) {
          onClose();
        } else {
          setError(result.error || 'Registration failed');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="bg-dark-800 rounded-lg shadow-xl max-w-md w-full p-6 relative border border-dark-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1"
          aria-label="Close authentication modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 id="auth-title" className="text-2xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Join C³ Community'}
          </h2>
          <p className="text-gray-400">
            {isLogin ? 'Sign in to your account' : 'Create your account to start connecting'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                aria-describedby={error ? 'auth-error' : undefined}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              aria-describedby={error ? 'auth-error' : undefined}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                className="w-full px-3 py-2 pr-10 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                aria-describedby={error ? 'auth-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  className="w-full px-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  aria-describedby={error ? 'auth-error' : undefined}
                />
              </div>

              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-300 mb-1">
                  I want to
                </label>
                <select
                  id="userType"
                  className="w-full px-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as User['type'] })}
                >
                  <option value="both">Both request and deliver items</option>
                  <option value="requester">Only request deliveries</option>
                  <option value="traveler">Only deliver items</option>
                </select>
              </div>
            </>
          )}

          {error && (
            <div id="auth-error" className="text-red-600 text-sm" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}