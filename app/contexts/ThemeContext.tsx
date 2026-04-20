'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

interface ThemeContextType {
  isThemeChanged: boolean;
  setIsThemeChanged: (value: boolean) => void;
  accentColor: string;
  accentRgb: string;
  impactMix: number;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isThemeChanged, setIsThemeChanged] = useState(false);
  const [impactMix, setImpactMix] = useState(0);
  const originRgb = useMemo(() => [59, 130, 246], []);
  const impactRgb = useMemo(() => [249, 115, 22], []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-rgb', originRgb.join(', '));
    root.style.setProperty('--accent-color', `rgb(${originRgb.join(', ')})`);
    root.style.setProperty('--impact-mix', '0');
    root.dataset.theme = 'origin';
  }, [originRgb]);

  useEffect(() => {
    const root = document.documentElement;
    const current = parseFloat(getComputedStyle(root).getPropertyValue('--impact-mix')) || 0;
    const target = isThemeChanged ? 1 : 0;
    const duration = 3800;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
      const value = current + (target - current) * eased;
      const rgb = originRgb.map((channel, index) =>
        Math.round(channel + (impactRgb[index] - channel) * value)
      );

      root.style.setProperty('--impact-mix', value.toFixed(4));
      root.style.setProperty('--accent-rgb', rgb.join(', '));
      root.style.setProperty('--accent-color', `rgb(${rgb.join(', ')})`);
      setImpactMix(value);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        root.dataset.theme = target > 0.5 ? 'impact' : 'origin';
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [impactRgb, isThemeChanged, originRgb]);

  return (
    <ThemeContext.Provider
      value={{
        isThemeChanged,
        setIsThemeChanged,
        accentColor: 'rgb(var(--accent-rgb))',
        accentRgb: 'var(--accent-rgb)',
        impactMix,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
