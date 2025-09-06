import { useCallback } from 'react';
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
  const getBorderColor = useCallback((idx: number, focused: boolean) => {
    if (disabled) return '#e0e0e0';
    if (loading) return '#9e9e9e';
    
    if (status === 'error') return '#f44336';
    if (status === 'warning') return '#ff9800';
    if (status === 'success') return '#4caf50';
    if (status === 'info') return '#2196f3';
    
    if (focused) return '#1976d2';
    return '#ccc';
  }, [status, disabled, loading]);

  const getBackgroundColor = useCallback((idx: number) => {
    if (disabled) return '#f5f5f5';
    if (loading) return '#fafafa';
    return '#fff';
  }, [disabled, loading]);

  const getTextColor = useCallback((idx: number) => {
    if (disabled) return '#9e9e9e';
    if (loading) return '#bdbdbd';
    return '#000';
  }, [disabled, loading]);

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
        // Theme-aware styles would go here
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
    };

    if (enableThemeAwareStyles) {
      return {
        ...baseStyles,
        // Theme-aware input styles
        fontFamily: 'monospace',
        fontWeight: 600,
      };
    }

    return baseStyles;
  }, [enableThemeAwareStyles]);

  const getStatusStyles = useCallback(() => {
    if (status === 'error') {
      return {
        color: '#f44336',
        borderColor: '#f44336',
      };
    }
    if (status === 'warning') {
      return {
        color: '#ff9800',
        borderColor: '#ff9800',
      };
    }
    if (status === 'success') {
      return {
        color: '#4caf50',
        borderColor: '#4caf50',
      };
    }
    if (status === 'info') {
      return {
        color: '#2196f3',
        borderColor: '#2196f3',
      };
    }
    return {};
  }, [status]);

  const getFocusStyles = useCallback((focused: boolean) => {
    if (!focused) return {};
    
    return {
      boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
      borderColor: '#1976d2',
    };
  }, []);

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
