import { Theme } from '@mui/material/styles';

/**
 * BcPhoneInput'e özel stiller
 * BcTextField'in styling sistemini extend eder
 */
export const bcPhoneInputStyles = (theme: Theme) => ({
  // === CONTAINER STYLES ===
  container: {
    position: 'relative',
    width: '100%',
  },

  // === COUNTRY SELECT STYLES ===
  countrySelect: {
    minWidth: 90,
    marginRight: 8,
    '& .MuiSelect-select': {
      paddingRight: '18px',
      paddingLeft: 0,
      border: 'none !important',
      boxShadow: 'none !important',
    },
    '& .MuiInputBase-root': {
      border: 'none !important',
      boxShadow: 'none !important',
      '&:before': { display: 'none !important' },
      '&:after': { display: 'none !important' },
      '&:hover:not(.Mui-disabled):before': { display: 'none !important' },
    },
  },

  // === COUNTRY SELECT APPEARANCES ===
  countrySelectAppearances: {
    premium: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 8,
      color: '#fff',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      },
    },
    soft: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: 8,
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
    glass: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 12,
      color: '#fff',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      },
    },
    minimal: {
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '1px solid #e0e0e0',
      borderRadius: 0,
      '&:hover': {
        borderBottomColor: '#2196f3',
      },
    },
    neumorph: {
      backgroundColor: '#f0f0f0',
      border: 'none',
      borderRadius: 12,
      boxShadow: 'inset 2px 2px 4px #d1d1d1, inset -2px -2px 4px #ffffff',
      '&:hover': {
        boxShadow: 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff',
      },
    },
    underline: {
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '2px solid #e0e0e0',
      borderRadius: 0,
      '&:hover': {
        borderBottomColor: '#2196f3',
      },
    },
    dark: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 8,
      color: '#fff',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      },
    },
    borderless: {
      backgroundColor: 'transparent',
      border: 'none',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
      },
    },
  },

  // === FLAG STYLES ===
  flag: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    border: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    marginRight: 6,
    flexShrink: 0,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },

  // === MENU ITEM STYLES ===
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },

  menuItemHeader: {
    fontWeight: 700,
    fontSize: 13,
    opacity: 0.7,
    pointerEvents: 'none',
    borderTop: '1px solid #eee',
    marginTop: 8,
    padding: '8px 16px',
  },

  // === VOICE SEARCH BUTTON STYLES ===
  voiceSearchButton: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 8,
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'opacity 0.2s',
    '&:hover': {
      opacity: 1,
    },
  },

  voiceSearchIcon: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: '#2196f3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    '&.listening': {
      backgroundColor: '#f44336',
    },
  },

  // === QR CODE BUTTON STYLES ===
  qrCodeButton: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 8,
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'opacity 0.2s',
    '&:hover': {
      opacity: 1,
    },
  },

  qrCodeIcon: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: '#4caf50',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // === QR CODE MODAL STYLES ===
  qrCodeModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },

  qrCodeModalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    textAlign: 'center',
    maxWidth: 400,
    width: '90%',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },

  qrCodeImage: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: 16,
  },

  qrCodeButtons: {
    display: 'flex',
    gap: 8,
    justifyContent: 'center',
  },

  qrCodeActionButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    },
  },

  // === LOADING STYLES ===
  loading: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    color: '#666',
  },

  // === ERROR STYLES ===
  error: {
    color: '#f44336',
    fontSize: 12,
    marginTop: 4,
  },

  // === SUCCESS STYLES ===
  success: {
    color: '#4caf50',
    fontSize: 12,
    marginTop: 4,
  },

  // === WARNING STYLES ===
  warning: {
    color: '#ff9800',
    fontSize: 12,
    marginTop: 4,
  },

  // === ACCESSIBILITY STYLES ===
  screenReaderOnly: {
    position: 'absolute',
    left: -9999,
    width: 1,
    height: 1,
    overflow: 'hidden',
  },

  // === RESPONSIVE STYLES ===
  responsive: {
    [theme.breakpoints.down('sm')]: {
      '& .MuiInputAdornment-root': {
        minWidth: 80,
      },
      '& .MuiSelect-select': {
        fontSize: 14,
      },
    },
  },

  // === DARK MODE STYLES ===
  darkMode: {
    '& .MuiSelect-select': {
      color: '#fff',
    },
    '& .MuiInputBase-root': {
      color: '#fff',
    },
    '& .MuiMenuItem-root': {
      color: '#fff',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },

  // === RTL STYLES ===
  rtl: {
    direction: 'rtl',
    '& .MuiInputAdornment-root': {
      marginLeft: 8,
      marginRight: 0,
    },
    '& .MuiSelect-select': {
      textAlign: 'right',
    },
  },

  // === HIGH CONTRAST STYLES ===
  highContrast: {
    '& .MuiSelect-select': {
      border: '2px solid #000',
      backgroundColor: '#fff',
      color: '#000',
    },
    '& .MuiInputBase-root': {
      border: '2px solid #000',
    },
    '& .MuiMenuItem-root': {
      border: '1px solid #000',
      '&:hover': {
        backgroundColor: '#000',
        color: '#fff',
      },
    },
  },

  // === REDUCED MOTION STYLES ===
  reducedMotion: {
    '& *': {
      transition: 'none !important',
      animation: 'none !important',
    },
  },
});

/**
 * BcPhoneInput appearance-specific styles
 */
export const getBcPhoneInputAppearanceStyles = (appearance: string, theme: Theme) => {
  const styles = bcPhoneInputStyles(theme);
  
  switch (appearance) {
    case 'premium':
      return {
        ...styles.container,
        ...styles.countrySelectAppearances.premium,
      };
    case 'soft':
      return {
        ...styles.container,
        ...styles.countrySelectAppearances.soft,
      };
    case 'glass':
      return {
        ...styles.container,
        ...styles.countrySelectAppearances.glass,
      };
    case 'minimal':
      return {
        ...styles.container,
        ...styles.countrySelectAppearances.minimal,
      };
    case 'neumorph':
      return {
        ...styles.container,
        ...styles.countrySelectAppearances.neumorph,
      };
    case 'underline':
      return {
        ...styles.container,
        ...styles.countrySelectAppearances.underline,
      };
    case 'dark':
      return {
        ...styles.container,
        ...styles.countrySelectAppearances.dark,
        ...styles.darkMode,
      };
    case 'borderless':
      return {
        ...styles.container,
        ...styles.countrySelectAppearances.borderless,
      };
    default:
      return styles.container;
  }
};

/**
 * BcPhoneInput theme-aware styles
 */
export const getBcPhoneInputThemeAwareStyles = (theme: Theme, options: {
  enableRTL?: boolean;
  enableHighContrast?: boolean;
  enableReducedMotion?: boolean;
} = {}) => {
  const styles = bcPhoneInputStyles(theme);
  const { enableRTL = false, enableHighContrast = false, enableReducedMotion = false } = options;
  
  let themeAwareStyles = { ...styles.container };
  
  if (enableRTL) {
    themeAwareStyles = { ...themeAwareStyles, ...styles.rtl };
  }
  
  if (enableHighContrast) {
    themeAwareStyles = { ...themeAwareStyles, ...styles.highContrast };
  }
  
  if (enableReducedMotion) {
    themeAwareStyles = { ...themeAwareStyles, ...styles.reducedMotion };
  }
  
  if (theme.palette.mode === 'dark') {
    themeAwareStyles = { ...themeAwareStyles, ...styles.darkMode };
  }
  
  return themeAwareStyles;
};

export const countrySelectStyle = {
  height: 40,
  borderRadius: 4,
  border: "1px solid #ccc",
  background: "#fafafa",
  fontSize: 15,
  padding: "0 8px",
  minWidth: 90,
  display: "flex",
  alignItems: "center",
  gap: 6,
  outline: 'none',
  transition: 'border-color 0.2s',
  ':focus': {
    border: '2px solid #1976d2', // MUI primary
    background: '#fff',
  },
  ':disabled': {
    background: '#eee',
    color: '#aaa',
    cursor: 'not-allowed',
  },
  // MUI Select ve FormControl için yükseklik uyumu
  '& .MuiInputBase-root': {
    height: 40,
    minHeight: 40,
    boxSizing: 'border-box',
    padding: 0,
    alignItems: 'center',
  },
  '& .MuiSelect-select': {
    height: 40,
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    boxSizing: 'border-box',
    padding: '0 !important',
  },
};

// Responsive ve appearance varyasyonları için örnek stiller:
export const countrySelectAppearances = {
  premium: {
    border: '2px solid #FFD700',
    background: '#FFFBEA',
  },
  soft: {
    border: '1px solid #90caf9',
    background: '#e3f2fd',
  },
  dark: {
    border: '1px solid #333',
    background: '#222',
    color: '#fff',
  },
  borderless: {
    border: 'none',
    background: 'transparent',
  },
  glass: {
    border: '1px solid #b3e5fc',
    background: 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(4px)',
  },
  minimal: {
    border: '1px solid #eee',
    background: '#fff',
  },
  neumorph: {
    border: '1px solid #e0e0e0',
    background: '#f5f5f5',
    boxShadow: '2px 2px 6px #e0e0e0, -2px -2px 6px #fff',
  },
  underline: {
    border: 'none',
    borderBottom: '2px solid #1976d2',
    background: '#fff',
  },
}; 