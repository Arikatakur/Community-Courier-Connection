import React, { useState } from 'react';
import { Menu, X, User, Bell, MessageCircle, Truck, Package, Settings } from 'lucide-react';
import type { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogin: () => void;
  onLogout: () => void;
}

export function Header({ user, currentPage, onPageChange, onLogin, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: Package },
    { name: 'Post Delivery', id: 'post-delivery', icon: Package },
    { name: 'Browse Requests', id: 'browse-requests', icon: Truck },
    { name: 'Track Delivery', id: 'tracking', icon: Truck },
    { name: 'Messages', id: 'messages', icon: MessageCircle },
  ];

  const userNavigation = [
    { name: 'Profile', id: 'profile', icon: User },
    { name: 'Payment', id: 'payment', icon: Package },
    { name: 'Accessibility', id: 'accessibility', icon: Settings },
  ];

  return (
    <header className="bg-dark-800 shadow-sm border-b border-dark-700 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onPageChange('dashboard')}
              className="flex items-center space-x-2 text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
              aria-label="Community Courier Connection - Go to Dashboard"
            >
              <Package className="h-8 w-8" />
              <span>C³</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex space-x-1" role="navigation" aria-label="Main navigation">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      currentPage === item.id
                        ? 'bg-blue-900 text-blue-300'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-dark-700'
                    }`}
                    aria-current={currentPage === item.id ? 'page' : undefined}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button 
                  className="relative p-2 text-gray-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="hidden md:flex items-center space-x-1">
                  {userNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onPageChange(item.id)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          currentPage === item.id
                            ? 'bg-blue-900 text-blue-300'
                            : 'text-gray-300 hover:text-blue-400 hover:bg-dark-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                  <button
                    onClick={onLogout}
                    className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-dark-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Logout
                  </button>
                </div>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-gray-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                  aria-label="Toggle mobile menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {user && mobileMenuOpen && (
        <div className="md:hidden bg-dark-800 border-t border-dark-700" role="navigation" aria-label="Mobile navigation">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[...navigation, ...userNavigation].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    currentPage === item.id
                      ? 'bg-blue-900 text-blue-300'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-dark-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-red-400 hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}