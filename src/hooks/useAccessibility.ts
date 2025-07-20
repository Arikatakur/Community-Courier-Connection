import { useState, useEffect } from 'react';
import type { AccessibilitySettings } from '../types';

const defaultSettings: AccessibilitySettings = {
  fontSize: 16,
  highContrast: false,
  reduceMotion: false,
  screenReader: false,
  keyboardNavigation: true,
  voiceAnnouncements: false,
};

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  useEffect(() => {
    const storedSettings = localStorage.getItem('c3_accessibility');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('c3_accessibility', JSON.stringify(updatedSettings));
  };

  return { settings, updateSettings };
}