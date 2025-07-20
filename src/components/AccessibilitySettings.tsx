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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Accessibility Settings</h1>
        <p className="text-gray-600">
          Customize the interface to meet your accessibility needs. These settings help make C³ easier to use for everyone.
        </p>
      </div>

      <div className="space-y-8">
        {/* Visual Settings */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Visual Settings
          </h3>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                aria-describedby="fontSize-description"
              />
              <p id="fontSize-description" className="text-sm text-gray-600 mt-1">
                Adjust the size of text throughout the application (12px to 24px)
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 flex items-center">
                  <Contrast className="h-4 w-4 mr-2" />
                  High Contrast Mode
                </h4>
                <p className="text-sm text-gray-600">
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Reduce Motion</h4>
                <p className="text-sm text-gray-600">
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Navigation Settings */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Keyboard className="h-5 w-5 mr-2" />
            Navigation Settings
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Enhanced Keyboard Navigation</h4>
                <p className="text-sm text-gray-600">
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h5 className="font-medium text-blue-900 mb-2">Keyboard Shortcuts</h5>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-blue-800">
                <div><kbd className="bg-white px-2 py-1 rounded border">Tab</kbd> - Navigate forward</div>
                <div><kbd className="bg-white px-2 py-1 rounded border">Shift + Tab</kbd> - Navigate backward</div>
                <div><kbd className="bg-white px-2 py-1 rounded border">Enter</kbd> - Activate button/link</div>
                <div><kbd className="bg-white px-2 py-1 rounded border">Escape</kbd> - Close modal/menu</div>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Volume2 className="h-5 w-5 mr-2" />
            Audio Settings
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Screen Reader Support</h4>
                <p className="text-sm text-gray-600">
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Voice Announcements</h4>
                <p className="text-sm text-gray-600">
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Help & Resources */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Help & Resources
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Accessibility Support</h4>
              <p className="text-sm text-gray-600 mb-3">
                Need help with accessibility features? Our support team is here to assist you.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm">
                  Contact Support
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm">
                  View Guide
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm">
                  Reset to Defaults
                </button>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h5 className="font-medium text-green-900 mb-2">Accessibility Compliance</h5>
              <p className="text-sm text-green-800">
                C³ is designed to meet WCAG 2.1 Level AA accessibility standards. 
                We continuously work to improve accessibility for all users.
              </p>
            </div>
          </div>
        </div>

        {/* Test Settings */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Test Your Settings</h3>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Sample Text</h4>
              <p className="text-gray-700 mb-2">
                This is a sample paragraph to test your font size and contrast settings. 
                It should be easily readable with your current configuration.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Sample Button
              </button>
            </div>
            
            <p className="text-sm text-gray-600">
              Use this sample content to verify that your accessibility settings work well for you. 
              Adjust the settings above if needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add CSS for custom slider styling
const style = document.createElement('style');
style.textContent = `
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3B82F6;
    cursor: pointer;
  }
  
  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3B82F6;
    cursor: pointer;
    border: none;
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  .focus\\:not-sr-only:focus {
    position: static;
    width: auto;
    height: auto;
    padding: inherit;
    margin: inherit;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
  
  .high-contrast {
    filter: contrast(1.25);
  }
  
  .reduce-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
`;
document.head.appendChild(style);