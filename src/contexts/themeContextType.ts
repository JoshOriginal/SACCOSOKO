import React from 'react';

export type ThemeColor = 'orange' | 'blue' | 'green' | 'purple';

export interface ThemeContextType {
  color: ThemeColor;
  darkMode: boolean;
  setColor: (color: ThemeColor) => void;
  setDarkMode: (enabled: boolean) => void;
}

export const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);
