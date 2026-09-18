import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'Light');
  const [accentColor, setAccentColor] = useState(localStorage.getItem('appAccent') || '#8B1A1A');
  const [fontSize, setFontSize] = useState(localStorage.getItem('appFontSize') || 'Medium');

  const isDark = theme === 'Dark';

  useEffect(() => {
    localStorage.setItem('appTheme', theme);
    localStorage.setItem('appAccent', accentColor);
    localStorage.setItem('appFontSize', fontSize);

    // Force Bootstrap to respect the root font size with !important
    const root = document.documentElement;
    if (fontSize === 'Small') {
      root.style.setProperty('font-size', '12px', 'important');
    } else if (fontSize === 'Large') {
      root.style.setProperty('font-size', '20px', 'important');
    } else {
      root.style.setProperty('font-size', '16px', 'important'); // Medium Default
    }
  }, [theme, accentColor, fontSize]);

  return (
    <ThemeContext.Provider value={{ 
      theme, setTheme, 
      accentColor, setAccentColor, 
      fontSize, setFontSize, 
      isDark 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);