import type { Theme } from '@mui/material/styles';
import type {
  OtpInputSize,
  OtpInputShape,
  OtpInputAppearance,
} from './BcOtpInput.types';

/**
 * Get appearance-specific styles for OTP inputs
 */
export const getAppearanceStyles = (
  theme: Theme,
  appearance: OtpInputAppearance = 'premium',
  inputSize: OtpInputSize = 'medium',
  inputShape: OtpInputShape = 'square',
  status?: 'success' | 'error' | 'warning' | 'info',
  isDisabled: boolean = false
) => {
  const baseStyles = {
    width: inputSize === 'small' ? 40 : inputSize === 'medium' ? 50 : inputSize === 'large' ? 60 : 70,
    height: inputSize === 'small' ? 40 : inputSize === 'medium' ? 50 : inputSize === 'large' ? 60 : 70,
    textAlign: 'center' as const,
    fontSize: inputSize === 'small' ? '1rem' : inputSize === 'medium' ? '1.25rem' : inputSize === 'large' ? '1.5rem' : '1.75rem',
    fontWeight: 'bold',
    lineHeight: 1,
    '& input': {
      textAlign: 'center',
      padding: 0,
      margin: 0,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      outline: 'none',
      background: 'transparent',
    },
  };

  const statusColor = status === 'error' ? theme.palette.error.main : theme.palette.primary.main;

  switch (appearance) {
    case 'premium':
      return {
        ...baseStyles,
        border: `2px solid ${statusColor}`,
        borderRadius: inputShape === 'circle' ? '50%' : inputShape === 'rounded' ? 2 : inputShape === 'hexagon' ? '50%' : 1,
        backgroundColor: isDisabled ? theme.palette.action.disabledBackground : '#ffffff',
        color: isDisabled ? theme.palette.action.disabled : theme.palette.text.primary,
        boxShadow: isDisabled ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
        '&:focus-within': {
          borderColor: statusColor,
          boxShadow: `0 0 0 3px ${statusColor}20, 0 4px 12px rgba(0,0,0,0.15)`,
        },
        '&:hover': {
          borderColor: isDisabled ? theme.palette.divider : statusColor,
          boxShadow: isDisabled ? 'none' : '0 4px 12px rgba(0,0,0,0.15)',
        },
      };

    case 'soft':
      return {
        ...baseStyles,
        border: 'none',
        borderRadius: inputShape === 'circle' ? '50%' : inputShape === 'rounded' ? 3 : inputShape === 'hexagon' ? '50%' : 2,
        backgroundColor: isDisabled ? theme.palette.action.disabledBackground : '#f5f5f5',
        color: isDisabled ? theme.palette.action.disabled : theme.palette.text.primary,
        boxShadow: isDisabled ? 'none' : 'inset 0 2px 4px rgba(0,0,0,0.1)',
        '&:focus-within': {
          backgroundColor: isDisabled ? theme.palette.action.disabledBackground : '#e8f4f8',
          boxShadow: `inset 0 2px 4px rgba(0,0,0,0.1), 0 0 0 3px ${statusColor}20`,
        },
        '&:hover': {
          backgroundColor: isDisabled ? theme.palette.action.disabledBackground : '#eeeeee',
        },
      };

    case 'glass':
      return {
        ...baseStyles,
        border: `1px solid ${statusColor}40`,
        borderRadius: inputShape === 'circle' ? '50%' : inputShape === 'rounded' ? 2 : inputShape === 'hexagon' ? '50%' : 1,
        backgroundColor: isDisabled ? theme.palette.action.disabledBackground : 'rgba(255,255,255,0.8)',
        color: isDisabled ? theme.palette.action.disabled : theme.palette.text.primary,
        backdropFilter: isDisabled ? 'none' : 'blur(10px)',
        '&:focus-within': {
          borderColor: statusColor,
          backgroundColor: isDisabled ? theme.palette.action.disabledBackground : 'rgba(255,255,255,0.9)',
          boxShadow: `0 0 0 2px ${statusColor}20`,
        },
        '&:hover': {
          borderColor: isDisabled ? theme.palette.divider : statusColor,
          backgroundColor: isDisabled ? theme.palette.action.disabledBackground : 'rgba(255,255,255,0.9)',
        },
      };

    case 'minimal':
      return {
        ...baseStyles,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: inputShape === 'circle' ? '50%' : inputShape === 'rounded' ? 1 : inputShape === 'hexagon' ? '50%' : 0,
        backgroundColor: isDisabled ? theme.palette.action.disabledBackground : 'transparent',
        color: isDisabled ? theme.palette.action.disabled : theme.palette.text.primary,
        '&:focus-within': {
          borderColor: statusColor,
          outline: 'none',
        },
        '&:hover': {
          borderColor: isDisabled ? theme.palette.divider : statusColor,
        },
      };

    case 'neumorph':
      return {
        ...baseStyles,
        border: 'none',
        borderRadius: inputShape === 'circle' ? '50%' : inputShape === 'rounded' ? 3 : inputShape === 'hexagon' ? '50%' : 2,
        backgroundColor: isDisabled ? theme.palette.action.disabledBackground : '#e0e0e0',
        color: isDisabled ? theme.palette.action.disabled : theme.palette.text.primary,
        boxShadow: isDisabled ? 'none' : '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff',
        '&:focus-within': {
          boxShadow: isDisabled ? 'none' : 'inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff',
        },
        '&:hover': {
          boxShadow: isDisabled ? 'none' : '4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff',
        },
      };

    case 'underline':
      return {
        ...baseStyles,
        border: 'none',
        borderBottom: `2px solid ${theme.palette.divider}`,
        borderRadius: 0,
        backgroundColor: 'transparent',
        color: isDisabled ? theme.palette.action.disabled : theme.palette.text.primary,
        '&:focus-within': {
          borderBottom: `2px solid ${statusColor}`,
        },
        '&:hover': {
          borderBottom: `2px solid ${isDisabled ? theme.palette.divider : statusColor}`,
        },
      };

    case 'dark':
      return {
        ...baseStyles,
        border: `2px solid ${theme.palette.grey[600]}`,
        borderRadius: inputShape === 'circle' ? '50%' : inputShape === 'rounded' ? 2 : inputShape === 'hexagon' ? '50%' : 1,
        backgroundColor: isDisabled ? theme.palette.action.disabledBackground : theme.palette.grey[800],
        color: isDisabled ? theme.palette.action.disabled : theme.palette.common.white,
        '&:focus-within': {
          borderColor: statusColor,
          boxShadow: `0 0 0 2px ${statusColor}20`,
        },
        '&:hover': {
          borderColor: isDisabled ? theme.palette.grey[600] : statusColor,
        },
      };

    case 'borderless':
      return {
        ...baseStyles,
        border: 'none',
        borderRadius: 0,
        backgroundColor: 'transparent',
        color: isDisabled ? theme.palette.action.disabled : theme.palette.text.primary,
        '&:focus-within': {
          backgroundColor: isDisabled ? 'transparent' : theme.palette.action.hover,
        },
        '&:hover': {
          backgroundColor: isDisabled ? 'transparent' : theme.palette.action.hover,
        },
      };

    default:
      return {
        ...baseStyles,
        border: `2px solid ${statusColor}`,
        borderRadius: inputShape === 'circle' ? '50%' : inputShape === 'rounded' ? 2 : inputShape === 'hexagon' ? '50%' : 1,
        backgroundColor: isDisabled ? theme.palette.action.disabledBackground : theme.palette.background.paper,
        color: isDisabled ? theme.palette.action.disabled : theme.palette.text.primary,
        '&:focus-within': {
          borderColor: statusColor,
          boxShadow: `0 0 0 2px ${statusColor}20`,
        },
        '&:hover': {
          borderColor: isDisabled ? theme.palette.divider : statusColor,
        },
      };
  }
};

const styles = {
  getAppearanceStyles,
};

export default styles;