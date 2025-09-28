import { useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import type { Appearance } from '../../types';

export interface UseOtpAppearanceProps {
  appearance?: Appearance;
  status?: 'error' | 'warning' | 'success' | 'info';
  disabled?: boolean;
  loading?: boolean;
  enableThemeAwareStyles?: boolean;
}

export const useOtpAppearance = ({
  appearance,
  status,
  disabled = false,
  loading = false,
  enableThemeAwareStyles = true,
}: UseOtpAppearanceProps) => {
  const theme = useTheme();

  const getBorderColor = useCallback((idx: number, focused: boolean) => {
    if (disabled) return theme.palette.action.disabled;
    if (loading) return theme.palette.action.hover;
    
    if (status === 'error') return theme.palette.error.main;
    if (status === 'warning') return theme.palette.warning.main;
    if (status === 'success') return theme.palette.success.main;
    if (status === 'info') return theme.palette.info.main;
    
    if (focused) return theme.palette.primary.main;
    return theme.palette.divider;
  }, [status, disabled, loading, theme]);

  const getBackgroundColor = useCallback((idx: number) => {
    if (disabled) return theme.palette.action.disabledBackground;
    if (loading) return theme.palette.action.hover;
    return theme.palette.background.paper;
  }, [disabled, loading, theme]);

  const getTextColor = useCallback((idx: number) => {
    if (disabled) return theme.palette.text.disabled;
    if (loading) return theme.palette.text.secondary;
    return theme.palette.text.primary;
  }, [disabled, loading, theme]);

  const getContainerStyles = useCallback(() => {
    const baseStyles = {
      display: 'flex',
      gap: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    };

    if (enableThemeAwareStyles) {
      return {
        ...baseStyles,
        transition: 'all 0.2s ease-in-out',
      };
    }

    return baseStyles;
  }, [enableThemeAwareStyles]);

  const getInputStyles = useCallback((idx: number) => {
    const baseStyles = {
      textAlign: 'center' as const,
      fontSize: 22,
      width: 36,
      height: 44,
      borderRadius: 6,
      transition: 'all 0.2s ease-in-out',
      outline: 'none',
      fontFamily: 'monospace',
      fontWeight: 600,
    };

    // Apply appearance-specific styles
    switch (appearance) {
      case 'premium':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          border: '2px solid transparent',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
          '&:focus': {
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.3)',
          },
        };
      
      case 'soft':
        return {
          ...baseStyles,
          background: theme.palette.mode === 'dark' ? '#2a2a2a' : '#f8f9fa',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
          '&:focus': {
            boxShadow: `inset 0 1px 3px rgba(0,0,0,0.1), 0 0 0 2px ${theme.palette.primary.main}33`,
          },
        };
      
      case 'glass':
        return {
          ...baseStyles,
          background: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          '&:focus': {
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 2px ${theme.palette.primary.main}33`,
          },
        };
      
      case 'minimal':
        return {
          ...baseStyles,
          background: 'transparent',
          border: 'none',
          borderBottom: `2px solid ${theme.palette.divider}`,
          borderRadius: 0,
          '&:focus': {
            borderBottomColor: theme.palette.primary.main,
            boxShadow: 'none',
          },
        };
      
      case 'neumorph':
        return {
          ...baseStyles,
          background: theme.palette.mode === 'dark' ? '#2a2a2a' : '#e0e5ec',
          border: 'none',
          boxShadow: theme.palette.mode === 'dark'
            ? 'inset 2px 2px 4px #1e1e1e, inset -2px -2px 4px #363636'
            : 'inset 2px 2px 4px #a3b1c6, inset -2px -2px 4px #ffffff',
          '&:focus': {
            boxShadow: theme.palette.mode === 'dark'
              ? 'inset 1px 1px 2px #1e1e1e, inset -1px -1px 2px #363636'
              : 'inset 1px 1px 2px #a3b1c6, inset -1px -1px 2px #ffffff',
          },
        };
      
      case 'underline':
        return {
          ...baseStyles,
          background: 'transparent',
          border: 'none',
          borderBottom: `2px solid ${theme.palette.divider}`,
          borderRadius: 0,
          '&:focus': {
            borderBottomColor: theme.palette.primary.main,
            boxShadow: 'none',
          },
        };
      
      case 'dark':
        return {
          ...baseStyles,
          background: theme.palette.mode === 'dark' ? '#1a1a1a' : '#2a2a2a',
          color: '#fff',
          border: `1px solid ${theme.palette.mode === 'dark' ? '#333' : '#444'}`,
          '&:focus': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
          },
        };
      
      case 'borderless':
        return {
          ...baseStyles,
          background: 'transparent',
          border: 'none',
          '&:focus': {
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
          },
        };
      
      default:
        return {
          ...baseStyles,
          background: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          '&:focus': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
          },
        };
    }
  }, [appearance, theme]);

  const getStatusStyles = useCallback(() => {
    if (status === 'error') {
      return {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
      };
    }
    if (status === 'warning') {
      return {
        color: theme.palette.warning.main,
        borderColor: theme.palette.warning.main,
      };
    }
    if (status === 'success') {
      return {
        color: theme.palette.success.main,
        borderColor: theme.palette.success.main,
      };
    }
    if (status === 'info') {
      return {
        color: theme.palette.info.main,
        borderColor: theme.palette.info.main,
      };
    }
    return {};
  }, [status, theme]);

  const getFocusStyles = useCallback((focused: boolean) => {
    if (!focused) return {};
    
    return {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
      borderColor: theme.palette.primary.main,
    };
  }, [theme]);

  return {
    getBorderColor,
    getBackgroundColor,
    getTextColor,
    getContainerStyles,
    getInputStyles,
    getStatusStyles,
    getFocusStyles,
  };
};
