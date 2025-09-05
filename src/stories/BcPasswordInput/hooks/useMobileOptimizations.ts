import { useMemo, useCallback } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

export interface MobileOptimizations {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  buttonSize: 'small' | 'medium' | 'large';
  inputSize: 'small' | 'medium' | 'large';
  showTouchHints: boolean;
  enableHapticFeedback: boolean;
  optimizedLayout: boolean;
}

export function useMobileOptimizations(): MobileOptimizations {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const buttonSize = useMemo(() => {
    if (isMobile) return 'large';
    if (isTablet) return 'medium';
    return 'small';
  }, [isMobile, isTablet]);

  const inputSize = useMemo(() => {
    if (isMobile) return 'large';
    if (isTablet) return 'medium';
    return 'small';
  }, [isMobile, isTablet]);

  const showTouchHints = isMobile || isTablet;
  const enableHapticFeedback = isMobile;
  const optimizedLayout = isMobile || isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
    buttonSize,
    inputSize,
    showTouchHints,
    enableHapticFeedback,
    optimizedLayout
  };
}

export function useHapticFeedback() {
  const { enableHapticFeedback } = useMobileOptimizations();

  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!enableHapticFeedback) return;

    try {
      if ('vibrate' in navigator) {
        const patterns = {
          light: [10],
          medium: [20],
          heavy: [50]
        };
        navigator.vibrate(patterns[type]);
      }
    } catch (error) {
      console.warn('Haptic feedback not supported:', error);
    }
  }, [enableHapticFeedback]);

  return { triggerHaptic };
}

export function useTouchOptimizations() {
  const { showTouchHints, buttonSize } = useMobileOptimizations();

  const touchStyles = useMemo(() => {
    if (!showTouchHints) return {};

    return {
      minHeight: buttonSize === 'large' ? 48 : buttonSize === 'medium' ? 40 : 32,
      minWidth: buttonSize === 'large' ? 48 : buttonSize === 'medium' ? 40 : 32,
      touchAction: 'manipulation' as const,
      WebkitTapHighlightColor: 'transparent',
      WebkitTouchCallout: 'none' as const,
      WebkitUserSelect: 'none' as const,
      userSelect: 'none' as const
    };
  }, [showTouchHints, buttonSize]);

  return { touchStyles };
}
