import { useMemo, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import type {
  OtpStylingOptions,
  OtpAnimationOptions,
  OtpAccessibilityOptions,
  OtpResponsiveConfig,
  OtpInputShape,
  OtpInputSize,
} from '../BcOtpInput.types';

/**
 * Hook Options Interface
 */
interface UseBcOtpInputStylingOptions {
  stylingOptions?: OtpStylingOptions;
  animationOptions?: OtpAnimationOptions;
  accessibilityOptions?: OtpAccessibilityOptions;
  responsiveConfig?: OtpResponsiveConfig;
  status?: 'success' | 'error' | 'warning' | 'info' | undefined;
  isFocused?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

/**
 * Size Configuration
 */
interface SizeConfig {
  width: number;
  height: number;
  fontSize: number;
  gap: number;
  padding: number;
  borderRadius: number;
  borderWidth: number;
}

/**
 * Shape Configuration
 */
interface ShapeConfig {
  borderRadius: number;
  borderStyle: string;
  clipPath?: string;
}

/**
 * Color Configuration
 */
interface ColorConfig {
  primary: string;
  secondary: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  background: string;
  text: string;
  border: string;
  focus: string;
  hover: string;
  disabled: string;
  placeholder: string;
  shadow: string;
}

/**
 * Animation Configuration
 */
interface AnimationConfig {
  duration: number;
  easing: string;
  keyframes: Record<string, React.CSSProperties>;
}

/**
 * useBcOtpInputStyling Hook
 * 
 * OTP input component'inin stil hook'u
 * - Responsive design
 * - Theme integration
 * - Accessibility support
 * - Animation support
 * - Custom styling
 * - Performance optimization
 */
export const useBcOtpInputStyling = (options: UseBcOtpInputStylingOptions) => {
  const {
    stylingOptions = {},
    animationOptions = {},
    accessibilityOptions = {},
    responsiveConfig = {},
    status,
    isFocused = false,
    disabled = false,
    loading = false,
  } = options;

  const theme = useTheme();

  // Size configurations
  const sizeConfigs = useMemo((): Record<OtpInputSize, SizeConfig> => ({
    small: {
      width: 40,
      height: 40,
      fontSize: 14,
      gap: 8,
      padding: 8,
      borderRadius: 6,
      borderWidth: 1,
    },
    medium: {
      width: 48,
      height: 48,
      fontSize: 16,
      gap: 12,
      padding: 12,
      borderRadius: 8,
      borderWidth: 2,
    },
    large: {
      width: 56,
      height: 56,
      fontSize: 18,
      gap: 16,
      padding: 16,
      borderRadius: 10,
      borderWidth: 2,
    },
    xlarge: {
      width: 64,
      height: 64,
      fontSize: 20,
      gap: 20,
      padding: 20,
      borderRadius: 12,
      borderWidth: 3,
    },
  }), []);

  // Shape configurations
  const shapeConfigs = useMemo((): Record<OtpInputShape, ShapeConfig> => ({
    square: {
      borderRadius: 0,
      borderStyle: 'solid',
    },
    rounded: {
      borderRadius: 8,
      borderStyle: 'solid',
    },
    circle: {
      borderRadius: 50,
      borderStyle: 'solid',
    },
    hexagon: {
      borderRadius: 8,
      borderStyle: 'solid',
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
    },
  }), []);

  // Color configurations
  const colorConfigs = useMemo((): ColorConfig => {
    const customColors = stylingOptions.enableCustomColors ? {
      primary: stylingOptions.primaryColor || theme.palette.primary.main,
      secondary: stylingOptions.secondaryColor || theme.palette.secondary.main,
      error: stylingOptions.errorColor || theme.palette.error.main,
      success: stylingOptions.successColor || theme.palette.success.main,
      warning: stylingOptions.warningColor || theme.palette.warning.main,
      info: stylingOptions.infoColor || theme.palette.info.main,
    } : {
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      error: theme.palette.error.main,
      success: theme.palette.success.main,
      warning: theme.palette.warning.main,
      info: theme.palette.info.main,
    };

    return {
      ...customColors,
      background: stylingOptions.backgroundColor || theme.palette.background.paper,
      text: theme.palette.text.primary,
      border: theme.palette.divider,
      focus: customColors.primary,
      hover: theme.palette.action.hover,
      disabled: theme.palette.action.disabled,
      placeholder: theme.palette.text.secondary,
      shadow: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)',
    };
  }, [stylingOptions, theme]);

  // Animation configurations
  const animationConfigs = useMemo((): AnimationConfig => {
    const duration = animationOptions.animationDuration || 300;
    const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

    return {
      duration,
      easing,
      keyframes: {
        focus: {
          transform: 'scale(1.05)',
          boxShadow: `0 0 0 2px ${colorConfigs.focus}20`,
        },
        success: {
          backgroundColor: `${colorConfigs.success}10`,
          borderColor: colorConfigs.success,
          transform: 'scale(1.02)',
        },
        error: {
          backgroundColor: `${colorConfigs.error}10`,
          borderColor: colorConfigs.error,
          animation: 'shake 0.5s ease-in-out',
        },
        shake: {
          animation: 'shake 0.5s ease-in-out',
        },
        pulse: {
          animation: 'pulse 1s infinite',
        },
        typing: {
          animation: 'typingPulse 0.3s ease-in-out',
        },
      },
    };
  }, [animationOptions, colorConfigs]);

  // Get responsive size
  const getResponsiveSize = useCallback((): OtpInputSize => {
    if (!responsiveConfig.enableResponsive) {
      return stylingOptions.inputSize || 'medium';
    }

    const breakpoints = responsiveConfig.breakpoints || {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    };

    const width = window.innerWidth;

    if (width < breakpoints.sm) {
      return responsiveConfig.mobileConfig?.inputSize || 'small';
    } else if (width < breakpoints.md) {
      return responsiveConfig.tabletConfig?.inputSize || 'medium';
    } else {
      return responsiveConfig.desktopConfig?.inputSize || 'large';
    }
  }, [responsiveConfig, stylingOptions.inputSize]);

  // Get status color
  const getStatusColor = useCallback(() => {
    switch (status) {
      case 'success':
        return colorConfigs.success;
      case 'error':
        return colorConfigs.error;
      case 'warning':
        return colorConfigs.warning;
      case 'info':
        return colorConfigs.info;
      default:
        return colorConfigs.primary;
    }
  }, [status, colorConfigs]);

  // Get border color
  const getBorderColor = useCallback((isInputFocused: boolean = false) => {
    if (disabled) return colorConfigs.disabled;
    if (loading) return colorConfigs.primary;
    
    const currentStatus = status || (isInputFocused ? 'focused' : 'default');
    
    switch (currentStatus) {
      case 'success':
        return colorConfigs.success;
      case 'error':
        return colorConfigs.error;
      case 'warning':
        return colorConfigs.warning;
      case 'info':
        return colorConfigs.info;
      case 'focused':
        return colorConfigs.focus;
      default:
        return colorConfigs.border;
    }
  }, [disabled, loading, status, colorConfigs]);

  // Get background color
  const getBackgroundColor = useCallback(() => {
    if (disabled) return colorConfigs.disabled;
    if (loading) return `${colorConfigs.primary}10`;
    
    switch (status) {
      case 'success':
        return `${colorConfigs.success}05`;
      case 'error':
        return `${colorConfigs.error}05`;
      case 'warning':
        return `${colorConfigs.warning}05`;
      case 'info':
        return `${colorConfigs.info}05`;
      default:
        return stylingOptions.backgroundColor || colorConfigs.background;
    }
  }, [disabled, loading, status, colorConfigs, stylingOptions.backgroundColor]);

  // Get text color
  const getTextColor = useCallback(() => {
    if (disabled) return colorConfigs.disabled;
    return colorConfigs.text;
  }, [disabled, colorConfigs]);

  // Get container styles
  const getContainerStyles = useCallback(() => {
    const currentSize = getResponsiveSize();
    const sizeConfig = sizeConfigs[currentSize];

    const baseStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: `${sizeConfig.gap}px`,
      padding: `${sizeConfig.padding}px`,
      width: '100%',
      minHeight: `${sizeConfig.height + sizeConfig.padding * 2}px`,
      position: 'relative',
      transition: animationOptions.enableAnimations 
        ? `all ${animationConfigs.duration}ms ${animationConfigs.easing}` 
        : 'none',
    };

    // Accessibility enhancements
    if (accessibilityOptions.enableHighContrast) {
      baseStyles.border = `2px solid ${getBorderColor()}`;
      baseStyles.backgroundColor = getBackgroundColor();
    }

    // Reduced motion
    if (accessibilityOptions.enableReducedMotion) {
      baseStyles.transition = 'none';
    }

    // Gradient background
    if (stylingOptions.enableGradient && stylingOptions.primaryColor) {
      baseStyles.background = `linear-gradient(135deg, ${stylingOptions.primaryColor}20, ${stylingOptions.secondaryColor || stylingOptions.primaryColor}10)`;
    }

    // Glow effect
    if (stylingOptions.enableGlow && isFocused) {
      baseStyles.boxShadow = `0 0 20px ${getStatusColor()}40`;
    }

    // Shadow effect
    if (stylingOptions.enableShadow) {
      baseStyles.boxShadow = `0 2px 8px ${colorConfigs.shadow}`;
    }

    return baseStyles;
  }, [
    getResponsiveSize,
    sizeConfigs,
    stylingOptions,
    animationOptions,
    animationConfigs,
    accessibilityOptions,
    getBorderColor,
    getBackgroundColor,
    getStatusColor,
    colorConfigs,
    isFocused,
  ]);

  // Get input styles
  const getInputStyles = useCallback((index: number, isInputFocused: boolean = false) => {
    const currentSize = getResponsiveSize();
    const sizeConfig = sizeConfigs[currentSize];
    const shapeConfig = shapeConfigs[stylingOptions.inputShape || 'square'];

    const baseStyles: React.CSSProperties = {
      width: `${sizeConfig.width}px`,
      height: `${sizeConfig.height}px`,
      fontSize: `${sizeConfig.fontSize}px`,
      fontWeight: 600,
      textAlign: 'center',
      border: `${sizeConfig.borderWidth}px solid ${getBorderColor(isInputFocused)}`,
      borderRadius: `${shapeConfig.borderRadius}px`,
      backgroundColor: getBackgroundColor(),
      color: getTextColor(),
      outline: 'none',
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.6 : 1,
      transition: animationOptions.enableAnimations 
        ? `all ${animationConfigs.duration}ms ${animationConfigs.easing}` 
        : 'none',
      fontFamily: 'monospace',
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      userSelect: 'none',
    };

    // Shape-specific styles
    if (shapeConfig.clipPath) {
      baseStyles.clipPath = shapeConfig.clipPath;
    }

    // Focus styles
    if (isInputFocused && animationOptions.enableFocusAnimation) {
      Object.assign(baseStyles, animationConfigs.keyframes.focus);
    }

    // Status-specific styles
    if (status && animationOptions.enableAnimations) {
      switch (status) {
        case 'success':
          if (animationOptions.enableSuccessAnimation) {
            Object.assign(baseStyles, animationConfigs.keyframes.success);
          }
          break;
        case 'error':
          if (animationOptions.enableErrorAnimation) {
            Object.assign(baseStyles, animationConfigs.keyframes.error);
          }
          break;
      }
    }

    // Typing animation
    if (animationOptions.enableTypingAnimation && isInputFocused) {
      Object.assign(baseStyles, animationConfigs.keyframes.typing);
    }

    // Accessibility enhancements
    if (accessibilityOptions.enableHighContrast) {
      baseStyles.borderWidth = '3px';
      baseStyles.fontWeight = 700;
    }

    // Reduced motion
    if (accessibilityOptions.enableReducedMotion) {
      baseStyles.transition = 'none';
      delete baseStyles.animation;
    }

    // Gradient border
    if (stylingOptions.enableGradient && stylingOptions.primaryColor) {
      baseStyles.border = `2px solid transparent`;
      baseStyles.background = `linear-gradient(${getBackgroundColor()}, ${getBackgroundColor()}) padding-box, linear-gradient(135deg, ${stylingOptions.primaryColor}, ${stylingOptions.secondaryColor || stylingOptions.primaryColor}) border-box`;
    }

    // Glow effect
    if (stylingOptions.enableGlow && isInputFocused) {
      baseStyles.boxShadow = `0 0 15px ${getStatusColor()}60`;
    }

    // Shadow effect
    if (stylingOptions.enableShadow) {
      baseStyles.boxShadow = `0 2px 8px ${colorConfigs.shadow}`;
    }

    // Text shadow
    if (stylingOptions.enableTextShadow) {
      baseStyles.textShadow = stylingOptions.textShadow || `0 1px 2px ${colorConfigs.shadow}`;
    }

    return baseStyles;
  }, [
    getResponsiveSize,
    sizeConfigs,
    shapeConfigs,
    stylingOptions,
    getBorderColor,
    getBackgroundColor,
    getTextColor,
    getStatusColor,
    disabled,
    animationOptions,
    animationConfigs,
    status,
    accessibilityOptions,
    colorConfigs,
  ]);

  // Get focus styles
  const getFocusStyles = useCallback(() => {
    return {
      outline: 'none',
      borderColor: colorConfigs.focus,
      boxShadow: `0 0 0 2px ${colorConfigs.focus}20`,
      transform: animationOptions.enableFocusAnimation ? 'scale(1.05)' : 'none',
    };
  }, [colorConfigs.focus, animationOptions.enableFocusAnimation]);

  // Get hover styles
  const getHoverStyles = useCallback(() => {
    return {
      borderColor: colorConfigs.hover,
      backgroundColor: colorConfigs.hover,
    };
  }, [colorConfigs.hover]);

  // Get disabled styles
  const getDisabledStyles = useCallback(() => {
    return {
      opacity: 0.6,
      cursor: 'not-allowed',
      backgroundColor: colorConfigs.disabled,
      borderColor: colorConfigs.disabled,
      color: colorConfigs.disabled,
    };
  }, [colorConfigs.disabled]);

  // Get loading styles
  const getLoadingStyles = useCallback(() => {
    return {
      opacity: 0.8,
      cursor: 'wait',
      backgroundColor: `${colorConfigs.primary}10`,
      borderColor: colorConfigs.primary,
      ...(animationOptions.enableAnimations ? animationConfigs.keyframes.pulse : {}),
    };
  }, [colorConfigs.primary, animationOptions.enableAnimations, animationConfigs.keyframes.pulse]);

  // Get status styles
  const getStatusStyles = useCallback((inputStatus: typeof status) => {
    switch (inputStatus) {
      case 'success':
        return {
          borderColor: colorConfigs.success,
          backgroundColor: `${colorConfigs.success}10`,
          ...(animationOptions.enableSuccessAnimation ? animationConfigs.keyframes.success : {}),
        };
      case 'error':
        return {
          borderColor: colorConfigs.error,
          backgroundColor: `${colorConfigs.error}10`,
          ...(animationOptions.enableErrorAnimation ? animationConfigs.keyframes.error : {}),
        };
      case 'warning':
        return {
          borderColor: colorConfigs.warning,
          backgroundColor: `${colorConfigs.warning}10`,
        };
      case 'info':
        return {
          borderColor: colorConfigs.info,
          backgroundColor: `${colorConfigs.info}10`,
        };
      default:
        return {};
    }
  }, [colorConfigs, animationOptions, animationConfigs.keyframes]);

  // Get responsive styles
  const getResponsiveStyles = useCallback(() => {
    if (!responsiveConfig.enableResponsive) return {};

    const breakpoints = responsiveConfig.breakpoints || {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    };

    return {
      [`@media (max-width: ${breakpoints.sm - 1}px)`]: {
        gap: responsiveConfig.mobileConfig?.spacing || 8,
        fontSize: responsiveConfig.mobileConfig?.fontSize || 14,
      },
      [`@media (min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`]: {
        gap: responsiveConfig.tabletConfig?.spacing || 12,
        fontSize: responsiveConfig.tabletConfig?.fontSize || 16,
      },
      [`@media (min-width: ${breakpoints.md}px)`]: {
        gap: responsiveConfig.desktopConfig?.spacing || 16,
        fontSize: responsiveConfig.desktopConfig?.fontSize || 18,
      },
    };
  }, [responsiveConfig]);

  // Get theme styles
  const getThemeStyles = useCallback(() => {
    const isDark = theme.palette.mode === 'dark';
    
    return {
      ...(isDark ? {
        backgroundColor: stylingOptions.backgroundColor || theme.palette.grey[900],
        borderColor: theme.palette.grey[700],
        color: theme.palette.text.primary,
        '&:focus': {
          borderColor: theme.palette.primary.light,
          boxShadow: `0 0 0 2px ${theme.palette.primary.light}20`,
        },
      } : {
        backgroundColor: stylingOptions.backgroundColor || theme.palette.background.paper,
        borderColor: theme.palette.grey[300],
        color: theme.palette.text.primary,
        '&:focus': {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
        },
      }),
    };
  }, [theme, stylingOptions.backgroundColor]);

  // Public API
  const stylingAPI = useMemo(() => ({
    // Size and shape configurations
    sizeConfigs,
    shapeConfigs,
    colorConfigs,
    animationConfigs,
    
    // Style getters
    getContainerStyles,
    getInputStyles,
    getFocusStyles,
    getHoverStyles,
    getDisabledStyles,
    getLoadingStyles,
    getStatusStyles,
    getResponsiveStyles,
    getThemeStyles,
    
    // Utility functions
    getResponsiveSize,
    getStatusColor,
    getBorderColor,
    getBackgroundColor,
    getTextColor,
    
    // Current state
    currentSize: getResponsiveSize(),
    currentColors: colorConfigs,
    isAnimationsEnabled: animationOptions.enableAnimations || false,
    isAccessibilityEnabled: accessibilityOptions.enableHighContrast || accessibilityOptions.enableReducedMotion || false,
  }), [
    sizeConfigs,
    shapeConfigs,
    colorConfigs,
    animationConfigs,
    getContainerStyles,
    getInputStyles,
    getFocusStyles,
    getHoverStyles,
    getDisabledStyles,
    getLoadingStyles,
    getStatusStyles,
    getResponsiveStyles,
    getThemeStyles,
    getResponsiveSize,
    getStatusColor,
    getBorderColor,
    getBackgroundColor,
    getTextColor,
    animationOptions.enableAnimations,
    accessibilityOptions.enableHighContrast,
    accessibilityOptions.enableReducedMotion,
  ]);

  return stylingAPI;
};

export default useBcOtpInputStyling;