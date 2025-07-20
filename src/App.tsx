import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { DeliveryForm } from './components/DeliveryForm';
import { BrowseRequests } from './components/BrowseRequests';
import { TrackingPage } from './components/TrackingPage';
import { MessagingPage } from './components/MessagingPage';
import { ProfilePage } from './components/ProfilePage';
import { PaymentPage } from './components/PaymentPage';
import { AccessibilitySettings } from './components/AccessibilitySettings';
import { useAuth } from './hooks/useAuth';
import { useAccessibility } from './hooks/useAccessibility';
import type { User } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, login, logout, register } = useAuth();
  const { settings, updateSettings } = useAccessibility();

  useEffect(() => {
    // Apply accessibility settings to document
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
    document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion);
  }, [settings]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    // Announce page change for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Navigated to ${page} page`;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  const renderCurrentPage = () => {
    if (!user) {
      return <Dashboard onGetStarted={() => setShowAuthModal(true)} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'post-delivery':
        return <DeliveryForm onSubmit={() => handlePageChange('dashboard')} />;
      case 'browse-requests':
        return <BrowseRequests />;
      case 'tracking':
        return <TrackingPage />;
      case 'messages':
        return <MessagingPage />;
      case 'profile':
        return <ProfilePage user={user} />;
      case 'payment':
        return <PaymentPage />;
      case 'accessibility':
        return <AccessibilitySettings settings={settings} onUpdateSettings={updateSettings} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className={`min-h-screen bg-dark-900 transition-all duration-300 ${settings.highContrast ? 'contrast-125' : ''} dark`}>
      <Header 
        user={user}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLogin={() => setShowAuthModal(true)}
        onLogout={logout}
      />
      
      <main className="pt-16" role="main">
        {renderCurrentPage()}
      </main>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={login}
          onRegister={register}
        />
      )}

      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-500 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
    </div>
  );
}

export default App;