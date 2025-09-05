import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

export interface ThemeAwareStrengthColors {
  veryWeak: string;
  weak: string;
  medium: string;
  strong: string;
  veryStrong: string;
  perfect: string;
}

export function useThemeAwareStyles() {
  const theme = useTheme();

  const strengthColors = useMemo((): ThemeAwareStrengthColors => {
    const isDark = theme.palette.mode === 'dark';
    
    if (isDark) {
      return {
        veryWeak: '#f44336', // Red
        weak: '#ff9800',     // Orange
        medium: '#ffeb3b',   // Yellow
        strong: '#4caf50',   // Green
        veryStrong: '#2196f3', // Blue
        perfect: '#9c27b0'   // Purple
      };
    } else {
      return {
        veryWeak: '#d32f2f', // Dark Red
        weak: '#f57c00',     // Dark Orange
        medium: '#fbc02d',   // Dark Yellow
        strong: '#388e3c',   // Dark Green
        veryStrong: '#1976d2', // Dark Blue
        perfect: '#7b1fa2'   // Dark Purple
      };
    }
  }, [theme.palette.mode]);

  const strengthBarGradient = useMemo(() => {
    return (strength: number) => {
      const colors = strengthColors;
      const maxStrength = 5;
      const normalizedStrength = Math.max(0, Math.min(strength, maxStrength)) / maxStrength;
      
      if (normalizedStrength <= 0.2) return colors.veryWeak;
      if (normalizedStrength <= 0.4) return colors.weak;
      if (normalizedStrength <= 0.6) return colors.medium;
      if (normalizedStrength <= 0.8) return colors.strong;
      if (normalizedStrength <= 1.0) return colors.veryStrong;
      return colors.perfect;
    };
  }, [strengthColors]);

  const ruleColors = useMemo(() => {
    const isDark = theme.palette.mode === 'dark';
    return {
      passed: isDark ? '#4caf50' : '#2e7d32',
      failed: isDark ? '#f44336' : '#d32f2f',
      text: isDark ? '#ffffff' : '#000000'
    };
  }, [theme.palette.mode]);

  const containerStyles = useMemo(() => {
    return {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        borderColor: theme.palette.primary.main,
      },
      '&:focus-within': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
      }
    };
  }, [theme]);

  return {
    strengthColors,
    strengthBarGradient,
    ruleColors,
    containerStyles
  };
}
