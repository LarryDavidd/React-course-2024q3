import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.querySelector('html')!.setAttribute('class', theme)!;
    document.querySelector('html')!.setAttribute('data-theme', theme)!;
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };

interface ThemeContainerProps {
  children: React.ReactNode;
}

const ThemeContainer = ({ children }: ThemeContainerProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemeContainer;
