import { useCallback, useState, useEffect, useRef } from 'react';

export interface UseOtpUIProps {
  enableUIEnhancements?: boolean;
  onUIInteraction?: (interaction: UIInteraction) => void;
  onUIError?: (error: Error) => void;
  enableSkeletonLoading?: boolean;
  enableMicroInteractions?: boolean;
  enableThemeCustomization?: boolean;
  enableResponsiveDesign?: boolean;
  enableSmoothAnimations?: boolean;
  enableHoverEffects?: boolean;
  enableFocusEffects?: boolean;
  enableSuccessEffects?: boolean;
  enableErrorEffects?: boolean;
  animationDuration?: number;
  theme?: 'light' | 'dark' | 'auto' | 'custom';
  customTheme?: Record<string, any>;
}

export type UIInteraction = 'hover' | 'focus' | 'click' | 'success' | 'error' | 'loading' | 'complete';

export interface UIState {
  isHovered: boolean;
  isFocused: boolean;
  isAnimating: boolean;
  currentTheme: 'light' | 'dark' | 'auto' | 'custom';
  skeletonLoading: boolean;
  microInteractions: boolean;
  responsiveBreakpoint: 'mobile' | 'tablet' | 'desktop';
  animationQueue: string[];
  interactionHistory: UIInteraction[];
}

export const useOtpUI = ({
  enableUIEnhancements = false,
  onUIInteraction,
  onUIError,
  enableSkeletonLoading = true,
  enableMicroInteractions = true,
  enableThemeCustomization = true,
  enableResponsiveDesign = true,
  enableSmoothAnimations = true,
  enableHoverEffects = true,
  enableFocusEffects = true,
  enableSuccessEffects = true,
  enableErrorEffects = true,
  animationDuration = 300,
  theme = 'auto',
  customTheme,
}: UseOtpUIProps) => {
  const [state, setState] = useState<UIState>({
    isHovered: false,
    isFocused: false,
    isAnimating: false,
    currentTheme: theme,
    skeletonLoading: false,
    microInteractions: false,
    responsiveBreakpoint: 'desktop',
    animationQueue: [],
    interactionHistory: [],
  });

  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect responsive breakpoint
  useEffect(() => {
    if (!enableUIEnhancements || !enableResponsiveDesign) return;

    const updateBreakpoint = () => {
      const width = window.innerWidth;
      let breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      
      if (width < 768) breakpoint = 'mobile';
      else if (width < 1024) breakpoint = 'tablet';

      setState(prev => ({ ...prev, responsiveBreakpoint: breakpoint }));
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, [enableUIEnhancements, enableResponsiveDesign]);

  // Detect theme
  useEffect(() => {
    if (!enableUIEnhancements || !enableThemeCustomization) return;

    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setState(prev => ({ ...prev, currentTheme: prefersDark ? 'dark' : 'light' }));
    } else {
      setState(prev => ({ ...prev, currentTheme: theme }));
    }
  }, [enableUIEnhancements, enableThemeCustomization, theme]);

  // Skeleton loading
  const showSkeletonLoading = useCallback((duration: number = 1000) => {
    if (!enableUIEnhancements || !enableSkeletonLoading) return;

    setState(prev => ({ ...prev, skeletonLoading: true }));
    onUIInteraction?.('loading');

    setTimeout(() => {
      setState(prev => ({ ...prev, skeletonLoading: false }));
    }, duration);
  }, [enableUIEnhancements, enableSkeletonLoading, onUIInteraction]);

  // Micro interactions
  const triggerMicroInteraction = useCallback((interaction: UIInteraction) => {
    if (!enableUIEnhancements || !enableMicroInteractions) return;

    setState(prev => ({
      ...prev,
      interactionHistory: [...prev.interactionHistory.slice(-9), interaction],
    }));

    onUIInteraction?.(interaction);
  }, [enableUIEnhancements, enableMicroInteractions, onUIInteraction]);

  // Hover effects
  const handleHover = useCallback((isHovered: boolean) => {
    if (!enableUIEnhancements || !enableHoverEffects) return;

    setState(prev => ({ ...prev, isHovered }));
    triggerMicroInteraction('hover');
  }, [enableUIEnhancements, enableHoverEffects, triggerMicroInteraction]);

  // Focus effects
  const handleFocus = useCallback((isFocused: boolean) => {
    if (!enableUIEnhancements || !enableFocusEffects) return;

    setState(prev => ({ ...prev, isFocused }));
    triggerMicroInteraction('focus');
  }, [enableUIEnhancements, enableFocusEffects, triggerMicroInteraction]);

  // Success effects
  const triggerSuccessEffect = useCallback(() => {
    if (!enableUIEnhancements || !enableSuccessEffects) return;

    setState(prev => ({ ...prev, isAnimating: true }));
    triggerMicroInteraction('success');

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, isAnimating: false }));
    }, animationDuration);
  }, [enableUIEnhancements, enableSuccessEffects, triggerMicroInteraction, animationDuration]);

  // Error effects
  const triggerErrorEffect = useCallback(() => {
    if (!enableUIEnhancements || !enableErrorEffects) return;

    setState(prev => ({ ...prev, isAnimating: true }));
    triggerMicroInteraction('error');

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, isAnimating: false }));
    }, animationDuration);
  }, [enableUIEnhancements, enableErrorEffects, triggerMicroInteraction, animationDuration]);

  // Get responsive styles
  const getResponsiveStyles = useCallback(() => {
    if (!enableUIEnhancements || !enableResponsiveDesign) return {};

    const baseStyles = {
      transition: enableSmoothAnimations ? `all ${animationDuration}ms ease-in-out` : 'none',
    };

    switch (state.responsiveBreakpoint) {
      case 'mobile':
        return {
          ...baseStyles,
          fontSize: '16px', // Prevent zoom on iOS
          minHeight: '44px', // Minimum touch target
          padding: '12px',
        };
      case 'tablet':
        return {
          ...baseStyles,
          fontSize: '14px',
          minHeight: '40px',
          padding: '10px',
        };
      case 'desktop':
        return {
          ...baseStyles,
          fontSize: '14px',
          minHeight: '36px',
          padding: '8px',
        };
      default:
        return baseStyles;
    }
  }, [enableUIEnhancements, enableResponsiveDesign, enableSmoothAnimations, animationDuration, state.responsiveBreakpoint]);

  // Get theme styles
  const getThemeStyles = useCallback(() => {
    if (!enableUIEnhancements || !enableThemeCustomization) return {};

    const baseStyles = {
      transition: enableSmoothAnimations ? `all ${animationDuration}ms ease-in-out` : 'none',
    };

    if (customTheme) {
      return { ...baseStyles, ...customTheme };
    }

    switch (state.currentTheme) {
      case 'dark':
        return {
          ...baseStyles,
          backgroundColor: '#424242',
          color: '#ffffff',
          borderColor: '#616161',
          '&:hover': {
            backgroundColor: '#515151',
            borderColor: '#757575',
          },
          '&:focus': {
            backgroundColor: '#515151',
            borderColor: '#1976d2',
            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.3)',
          },
        };
      case 'light':
        return {
          ...baseStyles,
          backgroundColor: '#ffffff',
          color: '#000000',
          borderColor: '#e0e0e0',
          '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#bdbdbd',
          },
          '&:focus': {
            backgroundColor: '#ffffff',
            borderColor: '#1976d2',
            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.3)',
          },
        };
      default:
        return baseStyles;
    }
  }, [enableUIEnhancements, enableThemeCustomization, enableSmoothAnimations, animationDuration, state.currentTheme, customTheme]);

  // Get interaction styles
  const getInteractionStyles = useCallback(() => {
    if (!enableUIEnhancements) return {};

    const baseStyles = {
      transition: enableSmoothAnimations ? `all ${animationDuration}ms ease-in-out` : 'none',
    };

    const hoverStyles = state.isHovered && enableHoverEffects ? {
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    } : {};

    const focusStyles = state.isFocused && enableFocusEffects ? {
      transform: 'scale(1.02)',
      boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.2)',
    } : {};

    const animationStyles = state.isAnimating ? {
      animation: `pulse ${animationDuration}ms ease-in-out`,
    } : {};

    return {
      ...baseStyles,
      ...hoverStyles,
      ...focusStyles,
      ...animationStyles,
    };
  }, [enableUIEnhancements, enableSmoothAnimations, animationDuration, state.isHovered, state.isFocused, state.isAnimating, enableHoverEffects, enableFocusEffects]);

  // Get skeleton loading styles
  const getSkeletonStyles = useCallback(() => {
    if (!enableUIEnhancements || !enableSkeletonLoading || !state.skeletonLoading) return {};

    return {
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'skeleton-loading 1.5s infinite',
    };
  }, [enableUIEnhancements, enableSkeletonLoading, state.skeletonLoading]);

  // Get combined styles
  const getCombinedStyles = useCallback(() => {
    const responsiveStyles = getResponsiveStyles();
    const themeStyles = getThemeStyles();
    const interactionStyles = getInteractionStyles();
    const skeletonStyles = getSkeletonStyles();

    return {
      ...responsiveStyles,
      ...themeStyles,
      ...interactionStyles,
      ...skeletonStyles,
    };
  }, [getResponsiveStyles, getThemeStyles, getInteractionStyles, getSkeletonStyles]);

  // Get UI status
  const getUIStatus = useCallback(() => {
    if (!enableUIEnhancements) return null;

    return {
      isHovered: state.isHovered,
      isFocused: state.isFocused,
      isAnimating: state.isAnimating,
      currentTheme: state.currentTheme,
      responsiveBreakpoint: state.responsiveBreakpoint,
      skeletonLoading: state.skeletonLoading,
      interactionCount: state.interactionHistory.length,
      lastInteraction: state.interactionHistory[state.interactionHistory.length - 1],
    };
  }, [enableUIEnhancements, state]);

  // Cleanup
  useEffect(() => {
    const animationTimeout = animationTimeoutRef.current;
    const resizeTimeout = resizeTimeoutRef.current;
    
    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  return {
    ...state,
    showSkeletonLoading,
    triggerMicroInteraction,
    handleHover,
    handleFocus,
    triggerSuccessEffect,
    triggerErrorEffect,
    getResponsiveStyles,
    getThemeStyles,
    getInteractionStyles,
    getSkeletonStyles,
    getCombinedStyles,
    getUIStatus,
  };
};
