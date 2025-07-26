import React from 'react';
import { Eye, Volume2, Keyboard, Type, Contrast, Settings } from 'lucide-react';
import type { AccessibilitySettings as SettingsType } from '../types';

interface AccessibilitySettingsProps {
  settings: SettingsType;
  onUpdateSettings: (settings: Partial<SettingsType>) => void;
}

export function AccessibilitySettings({ settings, onUpdateSettings }: AccessibilitySettingsProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Accessibility Settings</h1>
        <p className="text-gray-400">
          Customize the interface to meet your accessibility needs. These settings help make C³ easier to use for everyone.
        </p>
      </div>

      <div className="space-y-8">
        {/* Visual Settings */}
        <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Visual Settings
          </h3>

          <div className="space-y-6">
            <div>
              <label htmlFor="fontSize" className="block text-sm font-medium text-gray-300 mb-2">
                Font Size: {settings.fontSize}px
              </label>
              <input
                type="range"
                id="fontSize"
                min="12"
                max="24"
                step="1"
                value={settings.fontSize}
                onChange={(e) => onUpdateSettings({ fontSize: parseInt(e.target.value) })}
                className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
                aria-describedby="fontSize-description"
              />
              <p id="fontSize-description" className="text-sm text-gray-400 mt-1">
                Adjust the size of text throughout the application (12px to 24px)
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white flex items-center">
                  <Contrast className="h-4 w-4 mr-2" />
                  High Contrast Mode
                </h4>
                <p className="text-sm text-gray-400">
                  Increases contrast between text and background for better readability
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) => onUpdateSettings({ highContrast: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Reduce Motion</h4>
                <p className="text-sm text-gray-400">
                  Minimizes animations and transitions that may cause motion sensitivity
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.reduceMotion}
                  onChange={(e) => onUpdateSettings({ reduceMotion: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Navigation Settings */}
        <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <Keyboard className="h-5 w-5 mr-2" />
            Navigation Settings
          </h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Enhanced Keyboard Navigation</h4>
                <p className="text-sm text-gray-400">
                  Improves keyboard navigation with visible focus indicators and shortcuts
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.keyboardNavigation}
                  onChange={(e) => onUpdateSettings({ keyboardNavigation: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="bg-blue-900 border border-blue-700 rounded-md p-4">
              <h5 className="font-medium text-white mb-2">Keyboard Shortcuts</h5>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-blue-200">
                <div><kbd className="bg-dark-700 px-2 py-1 rounded border border-dark-600">Tab</kbd> - Navigate forward</div>
                <div><kbd className="bg-dark-700 px-2 py-1 rounded border border-dark-600">Shift + Tab</kbd> - Navigate backward</div>
                <div><kbd className="bg-dark-700 px-2 py-1 rounded border border-dark-600">Enter</kbd> - Activate button/link</div>
                <div><kbd className="bg-dark-700 px-2 py-1 rounded border border-dark-600">Escape</kbd> - Close modal/menu</div>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <Volume2 className="h-5 w-5 mr-2" />
            Audio Settings
          </h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Screen Reader Support</h4>
                <p className="text-sm text-gray-400">
                  Optimizes the interface for screen reader compatibility
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.screenReader}
                  onChange={(e) => onUpdateSettings({ screenReader: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Voice Announcements</h4>
                <p className="text-sm text-gray-400">
                  Provides audio feedback for important actions and notifications
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.voiceAnnouncements}
                  onChange={(e) => onUpdateSettings({ voiceAnnouncements: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Help & Resources */}
        <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Help & Resources
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white mb-2">Accessibility Support</h4>
              <p className="text-sm text-gray-400 mb-3">
                Need help with accessibility features? Our support team is here to assist you.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  Contact Support
                </button>
                <button className="border border-dark-600 text-white px-4 py-2 rounded-md hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-dark-500 text-sm">
                  View Guide
                </button>
                <button className="border border-dark-600 text-white px-4 py-2 rounded-md hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-dark-500 text-sm">
                  Reset to Defaults
                </button>
              </div>
            </div>

            <div className="bg-green-900 border border-green-700 rounded-md p-4">
              <h5 className="font-medium text-white mb-2">Accessibility Compliance</h5>
              <p className="text-sm text-green-300">
                C³ is designed to meet WCAG 2.1 Level AA accessibility standards. 
                We continuously work to improve accessibility for all users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
