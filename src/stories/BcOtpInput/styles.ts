// Container styles
export const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  minWidth: 200,
  maxWidth: 500,
};

// Input container styles
export const inputContainerStyles = {
  display: 'flex',
  gap: 12,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginBottom: 8,
};

// Base input styles
export const baseInputStyles = {
  textAlign: 'center' as const,
  fontSize: 22,
  width: 36,
  height: 44,
  borderRadius: 6,
  border: '1.5px solid #ccc',
  background: '#fff',
  transition: 'all 0.2s ease-in-out',
  outline: 'none',
  fontFamily: 'monospace',
  fontWeight: 600,
  padding: 0,
};

// Status colors
export const statusColors = {
  error: '#f44336',
  warning: '#ff9800',
  success: '#4caf50',
  info: '#2196f3',
  default: '#ccc',
  focused: '#1976d2',
};

// Status styles
export const getStatusStyles = (status?: string) => {
  switch (status) {
    case 'error':
      return {
        borderColor: statusColors.error,
        color: statusColors.error,
      };
    case 'warning':
      return {
        borderColor: statusColors.warning,
        color: statusColors.warning,
      };
    case 'success':
      return {
        borderColor: statusColors.success,
        color: statusColors.success,
      };
    case 'info':
      return {
        borderColor: statusColors.info,
        color: statusColors.info,
      };
    default:
      return {
        borderColor: statusColors.default,
        color: '#000',
      };
  }
};

// Focus styles
export const getFocusStyles = (focused: boolean) => {
  if (!focused) return {};
  
  return {
    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
    borderColor: statusColors.focused,
  };
};

// Disabled styles
export const getDisabledStyles = (disabled: boolean) => {
  if (!disabled) return {};
  
  return {
    backgroundColor: '#f5f5f5',
    color: '#9e9e9e',
    borderColor: '#e0e0e0',
    cursor: 'not-allowed',
  };
};

// Loading styles
export const getLoadingStyles = (loading: boolean) => {
  if (!loading) return {};
  
  return {
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    borderColor: '#9e9e9e',
  };
};

// Appearance styles
export const appearanceStyles = {
  premium: {
    container: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: 12,
      padding: 16,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
    input: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: 8,
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    },
  },
  soft: {
    container: {
      background: '#f8f9fa',
      borderRadius: 8,
      padding: 12,
      border: '1px solid #e9ecef',
    },
    input: {
      background: '#fff',
      border: '1px solid #dee2e6',
      borderRadius: 6,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
  },
  glass: {
    container: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: 12,
      padding: 16,
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    input: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: 8,
      backdropFilter: 'blur(5px)',
    },
  },
  minimal: {
    container: {
      background: 'transparent',
      padding: 8,
    },
    input: {
      background: 'transparent',
      border: 'none',
      borderBottom: '2px solid #e0e0e0',
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
  neumorph: {
    container: {
      background: '#e0e0e0',
      borderRadius: 12,
      padding: 16,
      boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
    },
    input: {
      background: '#e0e0e0',
      border: 'none',
      borderRadius: 8,
      boxShadow: 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff',
    },
  },
  underline: {
    container: {
      background: 'transparent',
      padding: 8,
    },
    input: {
      background: 'transparent',
      border: 'none',
      borderBottom: '2px solid #1976d2',
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
  dark: {
    container: {
      background: '#1a1a1a',
      borderRadius: 8,
      padding: 12,
      border: '1px solid #333',
    },
    input: {
      background: '#2a2a2a',
      border: '1px solid #444',
      borderRadius: 6,
      color: '#fff',
    },
  },
  borderless: {
    container: {
      background: 'transparent',
      padding: 8,
    },
    input: {
      background: 'transparent',
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
};

// Responsive styles
export const responsiveStyles = {
  xs: {
    container: {
      minWidth: 200,
      maxWidth: 300,
    },
    input: {
      fontSize: 20,
      width: 32,
      height: 40,
      borderRadius: 4,
    },
    gap: 8,
  },
  sm: {
    container: {
      minWidth: 250,
      maxWidth: 350,
    },
    input: {
      fontSize: 21,
      width: 34,
      height: 42,
      borderRadius: 5,
    },
    gap: 10,
  },
  md: {
    container: {
      minWidth: 300,
      maxWidth: 400,
    },
    input: {
      fontSize: 22,
      width: 36,
      height: 44,
      borderRadius: 6,
    },
    gap: 12,
  },
  lg: {
    container: {
      minWidth: 350,
      maxWidth: 450,
    },
    input: {
      fontSize: 24,
      width: 38,
      height: 46,
      borderRadius: 7,
    },
    gap: 14,
  },
  xl: {
    container: {
      minWidth: 400,
      maxWidth: 500,
    },
    input: {
      fontSize: 26,
      width: 40,
      height: 48,
      borderRadius: 8,
    },
    gap: 16,
  },
};

// Mobile optimizations
export const mobileStyles = {
  input: {
    touchAction: 'manipulation',
    WebkitAppearance: 'none',
    MozAppearance: 'textfield',
    WebkitUserSelect: 'text',
    userSelect: 'text',
  },
  container: {
    touchAction: 'manipulation',
  },
};

// Animation styles
export const animationStyles = {
  fadeIn: {
    animation: 'fadeIn 0.3s ease-in-out',
  },
  slideIn: {
    animation: 'slideIn 0.3s ease-out',
  },
  pulse: {
    animation: 'pulse 2s infinite',
  },
  shake: {
    animation: 'shake 0.5s ease-in-out',
  },
};

// Keyframes
export const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { transform: translateY(-10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

// Helper functions
export const getInputStyles = (
  status?: string,
  focused: boolean = false,
  disabled: boolean = false,
  loading: boolean = false,
  appearance?: string,
  screenSize: string = 'md'
) => {
  const baseStyles = { ...baseInputStyles };
  const statusStyles = getStatusStyles(status);
  const focusStyles = getFocusStyles(focused);
  const disabledStyles = getDisabledStyles(disabled);
  const loadingStyles = getLoadingStyles(loading);
  const responsiveStyle = responsiveStyles[screenSize as keyof typeof responsiveStyles]?.input || {};
  const appearanceStyle = appearance ? appearanceStyles[appearance as keyof typeof appearanceStyles]?.input : {};

  return {
    ...baseStyles,
    ...statusStyles,
    ...focusStyles,
    ...disabledStyles,
    ...loadingStyles,
    ...responsiveStyle,
    ...appearanceStyle,
  };
};

export const getContainerStyles = (
  appearance?: string,
  screenSize: string = 'md',
  isMobile: boolean = false
) => {
  const baseStyles = { ...containerStyles };
  const responsiveStyle = responsiveStyles[screenSize as keyof typeof responsiveStyles]?.container || {};
  const appearanceStyle = appearance ? appearanceStyles[appearance as keyof typeof appearanceStyles]?.container : {};
  const mobileStyle = isMobile ? mobileStyles.container : {};

  return {
    ...baseStyles,
    ...responsiveStyle,
    ...appearanceStyle,
    ...mobileStyle,
  };
};

export const getInputContainerStyles = (
  screenSize: string = 'md',
  isMobile: boolean = false
) => {
  const baseStyles = { ...inputContainerStyles };
  const responsiveStyle = responsiveStyles[screenSize as keyof typeof responsiveStyles] || {};
  const mobileStyle = isMobile ? mobileStyles.container : {};

  return {
    ...baseStyles,
    gap: responsiveStyle.gap || 12,
    ...mobileStyle,
  };
};
