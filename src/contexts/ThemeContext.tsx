import React, { useState, useEffect } from 'react';
import { ThemeContext, ThemeColor, ThemeContextType } from './themeContextType';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // SACCO-SOKO's brand identity is Green (primary) + Blue (secondary) + White,
  // so that's the default theme. The "orange"/"blue"/"purple" presets below
  // remain available from Admin Settings > Appearance as optional overrides.
  const [color, setColorState] = useState<ThemeColor>('green');
  const [darkMode, setDarkModeState] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('appTheme');
    if (storedTheme) {
      try {
        const { color: savedColor, darkMode: savedDarkMode } = JSON.parse(storedTheme);
        setColorState(savedColor);
        setDarkModeState(savedDarkMode);
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    }
  }, []);

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all color classes
    root.classList.remove('theme-orange', 'theme-blue', 'theme-green', 'theme-purple');
    
    // Add the current color class
    root.classList.add(`theme-${color}`);
    
    // Handle dark mode
    if (darkMode) {
      root.classList.remove('light-mode');
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
      root.classList.add('light-mode');
    }
    
    // Save to localStorage
    localStorage.setItem('appTheme', JSON.stringify({ color, darkMode }));
  }, [color, darkMode]);

  const setColor = (newColor: ThemeColor) => {
    setColorState(newColor);
  };

  const setDarkMode = (enabled: boolean) => {
    setDarkModeState(enabled);
  };

  const value: ThemeContextType = {
    color,
    darkMode,
    setColor,
    setDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
