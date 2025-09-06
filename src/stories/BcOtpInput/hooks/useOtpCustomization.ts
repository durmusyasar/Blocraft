import { useCallback } from 'react';

export interface UseOtpCustomizationProps {
  inputShape?: 'square' | 'circle' | 'hexagon' | 'rounded';
  inputSize?: 'small' | 'medium' | 'large' | 'xlarge';
  theme?: 'light' | 'dark' | 'high-contrast' | 'auto';
  enableCustomColors?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  errorColor?: string;
  successColor?: string;
  warningColor?: string;
  infoColor?: string;
  enableGradient?: boolean;
  enableGlow?: boolean;
  enableShadow?: boolean;
}

export const useOtpCustomization = ({
  inputShape = 'square',
  inputSize = 'medium',
  theme = 'auto',
  enableCustomColors = false,
  primaryColor = '#1976d2',
  secondaryColor = '#424242',
  errorColor = '#f44336',
  successColor = '#4caf50',
  warningColor = '#ff9800',
  infoColor = '#2196f3',
  enableGradient = false,
  enableGlow = false,
  enableShadow = true,
}: UseOtpCustomizationProps) => {
  
  const getInputShapeStyles = useCallback(() => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center' as const,
    };

    switch (inputShape) {
      case 'circle':
        return {
          ...baseStyles,
          borderRadius: '50%',
        };

      case 'hexagon':
        return {
          ...baseStyles,
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
        };

      case 'rounded':
        return {
          ...baseStyles,
          borderRadius: '12px',
        };

      case 'square':
      default:
        return {
          ...baseStyles,
          borderRadius: '6px',
        };
    }
  }, [inputShape]);

  const getInputSizeStyles = useCallback(() => {
    const sizeMap = {
      small: {
        width: 32,
        height: 40,
        fontSize: 16,
        gap: 8,
      },
      medium: {
        width: 36,
        height: 44,
        fontSize: 18,
        gap: 12,
      },
      large: {
        width: 44,
        height: 52,
        fontSize: 22,
        gap: 16,
      },
      xlarge: {
        width: 52,
        height: 60,
        fontSize: 26,
        gap: 20,
      },
    };

    return sizeMap[inputSize];
  }, [inputSize]);

  const getThemeStyles = useCallback(() => {
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const isHighContrast = theme === 'high-contrast';

    if (isHighContrast) {
      return {
        backgroundColor: '#000',
        color: '#fff',
        border: '2px solid #fff',
        '&:focus': {
          borderColor: '#ffff00',
          boxShadow: '0 0 0 3px #ffff0033',
        },
        '&[aria-invalid="true"]': {
          borderColor: '#ff0000',
          boxShadow: '0 0 0 3px #ff000033',
        },
      };
    }

    if (isDark) {
      return {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        border: '1px solid #424242',
        '&:focus': {
          borderColor: primaryColor,
          boxShadow: `0 0 0 2px ${primaryColor}33`,
        },
        '&[aria-invalid="true"]': {
          borderColor: errorColor,
          boxShadow: `0 0 0 2px ${errorColor}33`,
        },
      };
    }

    return {
      backgroundColor: '#fff',
      color: '#000',
      border: '1px solid #ccc',
      '&:focus': {
        borderColor: primaryColor,
        boxShadow: `0 0 0 2px ${primaryColor}33`,
      },
      '&[aria-invalid="true"]': {
        borderColor: errorColor,
        boxShadow: `0 0 0 2px ${errorColor}33`,
      },
    };
  }, [theme, primaryColor, errorColor]);

  const getColorStyles = useCallback((status?: string) => {
    if (!enableCustomColors) return {};

    const colorMap = {
      error: errorColor,
      success: successColor,
      warning: warningColor,
      info: infoColor,
      default: primaryColor,
    };

    const color = colorMap[status as keyof typeof colorMap] || colorMap.default;

    return {
      borderColor: color,
      color: color,
    };
  }, [enableCustomColors, primaryColor, errorColor, successColor, warningColor, infoColor]);

  const getGradientStyles = useCallback(() => {
    if (!enableGradient) return {};

    return {
      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
      color: '#fff',
      border: 'none',
    };
  }, [enableGradient, primaryColor, secondaryColor]);

  const getGlowStyles = useCallback((focused: boolean) => {
    if (!enableGlow || !focused) return {};

    return {
      boxShadow: `0 0 20px ${primaryColor}66`,
      transform: 'scale(1.02)',
    };
  }, [enableGlow, primaryColor]);

  const getShadowStyles = useCallback(() => {
    if (!enableShadow) return {};

    return {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
    };
  }, [enableShadow]);

  const getInputStyles = useCallback((status?: string, focused: boolean = false) => {
    return {
      ...getInputShapeStyles(),
      ...getInputSizeStyles(),
      ...getThemeStyles(),
      ...getColorStyles(status),
      ...getGradientStyles(),
      ...getGlowStyles(focused),
      ...getShadowStyles(),
    };
  }, [
    getInputShapeStyles,
    getInputSizeStyles,
    getThemeStyles,
    getColorStyles,
    getGradientStyles,
    getGlowStyles,
    getShadowStyles,
  ]);

  const getContainerStyles = useCallback(() => {
    const sizeStyles = getInputSizeStyles();
    
    return {
      display: 'flex',
      gap: sizeStyles.gap,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'row' as const,
    };
  }, [getInputSizeStyles]);

  const getLabelStyles = useCallback(() => {
    const sizeStyles = getInputSizeStyles();
    
    return {
      fontSize: sizeStyles.fontSize * 0.8,
      fontWeight: 500,
      marginBottom: 8,
    };
  }, [getInputSizeStyles]);

  const getHelperTextStyles = useCallback(() => {
    const sizeStyles = getInputSizeStyles();
    
    return {
      fontSize: sizeStyles.fontSize * 0.7,
      marginTop: 8,
    };
  }, [getInputSizeStyles]);

  const getCustomCSS = useCallback(() => {
    return `
      .bc-otp-input-container {
        ${Object.entries(getContainerStyles())
          .map(([key, value]) => `${key}: ${value};`)
          .join('\n        ')}
      }
      
      .bc-otp-input {
        ${Object.entries(getInputStyles())
          .map(([key, value]) => `${key}: ${value};`)
          .join('\n        ')}
      }
      
      .bc-otp-input:focus {
        outline: none;
        transform: scale(1.02);
      }
      
      .bc-otp-input[aria-invalid="true"] {
        animation: shake 0.5s ease-in-out;
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
    `;
  }, [getContainerStyles, getInputStyles]);

  return {
    getInputStyles,
    getContainerStyles,
    getLabelStyles,
    getHelperTextStyles,
    getCustomCSS,
    inputShape,
    inputSize,
    theme,
  };
};
