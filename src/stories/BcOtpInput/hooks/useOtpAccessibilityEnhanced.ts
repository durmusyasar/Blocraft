import { useCallback, useMemo, useState, useEffect } from 'react';
import { getTranslation } from '../../i18n/i18nHelpers';
import { getTranslationsObject } from './useTranslationsObject';

export interface UseOtpAccessibilityEnhancedProps {
  length: number;
  value: string;
  status?: string;
  disabled?: boolean;
  loading?: boolean;
  locale?: string;
  fallbackLocale?: string;
  translations?: Record<string, string>;
  enableHighContrast?: boolean;
  enableReducedMotion?: boolean;
  enableVoiceInput?: boolean;
  enableScreenReaderAnnouncements?: boolean;
  enableBrailleSupport?: boolean;
  enableVoiceCommands?: boolean;
  enableKeyboardShortcuts?: boolean;
  enableFocusManagement?: boolean;
}

export const useOtpAccessibilityEnhanced = ({
  length,
  value,
  status,
  disabled = false,
  loading = false,
  locale = 'en',
  fallbackLocale = 'en',
  translations,
  enableHighContrast = false,
  enableReducedMotion = false,
  enableVoiceInput = false,
  enableScreenReaderAnnouncements = true,
  enableBrailleSupport = false,
  enableVoiceCommands = false,
  enableKeyboardShortcuts = true,
  enableFocusManagement = true,
}: UseOtpAccessibilityEnhancedProps) => {
  const translationsObj = getTranslationsObject(translations);

  const getInputProps = useCallback((idx: number) => {
    const filledCount = value.replace(/\s/g, '').length;
    
    return {
      'aria-label': getTranslation('otpAriaLabel', locale, translationsObj, fallbackLocale, { 
        position: idx + 1, 
        total: length 
      }),
      'aria-describedby': `otp-helper-${idx}`,
      'aria-invalid': status === 'error' ? true : false,
      'aria-required': true,
      'aria-busy': loading ? true : false,
      'aria-current': (idx === filledCount ? 'step' : undefined) as 'step' | undefined,
      'role': 'textbox',
      'inputMode': 'numeric' as const,
      'autoComplete': 'one-time-code',
      'data-testid': `otp-input-${idx}`,
    };
  }, [length, value, status, loading, locale, translationsObj, fallbackLocale]);


  const getLiveRegionMessage = useCallback(() => {
    if (!enableScreenReaderAnnouncements) return '';
    
    const filledCount = value.replace(/\s/g, '').length;
    
    if (loading) {
      return getTranslation('otpLoading', locale, translationsObj, fallbackLocale);
    }
    
    if (status === 'error') {
      return getTranslation('otpInvalid', locale, translationsObj, fallbackLocale);
    }
    
    if (status === 'success') {
      return getTranslation('otpValid', locale, translationsObj, fallbackLocale);
    }
    
    if (filledCount === length) {
      return getTranslation('otpComplete', locale, translationsObj, fallbackLocale);
    }
    
    if (filledCount > 0) {
      return getTranslation('otpProgress', locale, translationsObj, fallbackLocale, {
        length: filledCount,
        total: length
      });
    }
    
    return getTranslation('otpInstructions', locale, translationsObj, fallbackLocale, { length });
  }, [value, length, status, loading, locale, translationsObj, fallbackLocale, enableScreenReaderAnnouncements]);

  const getInstructions = useCallback(() => {
    return getTranslation('otpInstructions', locale, translationsObj, fallbackLocale, { length });
  }, [length, locale, translationsObj, fallbackLocale]);

  const getStatusMessage = useCallback(() => {
    if (status === 'error') {
      return getTranslation('otpInvalid', locale, translationsObj, fallbackLocale);
    }
    if (status === 'success') {
      return getTranslation('otpValid', locale, translationsObj, fallbackLocale);
    }
    return '';
  }, [status, locale, translationsObj, fallbackLocale]);

  const getHighContrastStyles = useCallback(() => {
    if (!enableHighContrast) return {};
    
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
  }, [enableHighContrast]);

  const getReducedMotionStyles = useCallback(() => {
    if (!enableReducedMotion) return {};
    
    return {
      transition: 'none',
      animation: 'none',
      '& *': {
        transition: 'none !important',
        animation: 'none !important',
      },
    };
  }, [enableReducedMotion]);

  const getVoiceInputProps = useCallback(() => {
    if (!enableVoiceInput) return {};
    
    return {
      'data-voice-input': 'true',
      'data-voice-commands': 'clear,next,previous,complete',
    };
  }, [enableVoiceInput]);

  // Braille support
  const getBrailleProps = useCallback(() => {
    if (!enableBrailleSupport) return {};
    
    return {
      'data-braille': 'true',
      'aria-braille': 'true',
      'data-braille-instructions': 'Use braille display to read OTP input',
    };
  }, [enableBrailleSupport]);

  // Voice commands
  const getVoiceCommandProps = useCallback(() => {
    if (!enableVoiceCommands) return {};
    
    return {
      'data-voice-commands': 'true',
      'data-voice-commands-list': 'clear,next,previous,complete,read',
      'aria-voice-commands': 'clear,next,previous,complete,read',
    };
  }, [enableVoiceCommands]);

  // Keyboard shortcuts
  const getKeyboardShortcutProps = useCallback(() => {
    if (!enableKeyboardShortcuts) return {};
    
    return {
      'data-keyboard-shortcuts': 'true',
      'data-shortcuts': 'Arrow keys: navigate, Enter: complete, Escape: clear, Tab: next',
      'aria-keyshortcuts': 'Arrow keys: navigate, Enter: complete, Escape: clear, Tab: next',
    };
  }, [enableKeyboardShortcuts]);

  // Focus management
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  
  const handleFocusChange = useCallback((index: number | null) => {
    if (enableFocusManagement) {
      setFocusedIndex(index);
    }
  }, [enableFocusManagement]);

  const getFocusProps = useCallback((idx: number) => {
    if (!enableFocusManagement) return {};
    
    return {
      'data-focused': focusedIndex === idx,
      'aria-current': focusedIndex === idx ? ('step' as const) : undefined,
      'tabIndex': focusedIndex === idx ? 0 : -1,
    };
  }, [enableFocusManagement, focusedIndex]);

  // Screen reader announcements
  const [announcements, setAnnouncements] = useState<string[]>([]);
  
  const announce = useCallback((message: string) => {
    if (enableScreenReaderAnnouncements) {
      setAnnouncements(prev => [...prev, message]);
      // Auto-clear after 3 seconds
      setTimeout(() => {
        setAnnouncements(prev => prev.slice(1));
      }, 3000);
    }
  }, [enableScreenReaderAnnouncements]);

  // Enhanced input props with all accessibility features
  const getEnhancedInputProps = useCallback((idx: number) => {
    const baseProps = getInputProps(idx);
    const brailleProps = getBrailleProps();
    const voiceCommandProps = getVoiceCommandProps();
    const keyboardShortcutProps = getKeyboardShortcutProps();
    const focusProps = getFocusProps(idx);
    
    return {
      ...baseProps,
      ...brailleProps,
      ...voiceCommandProps,
      ...keyboardShortcutProps,
      ...focusProps,
    };
  }, [getInputProps, getBrailleProps, getVoiceCommandProps, getKeyboardShortcutProps, getFocusProps]);

  const getAccessibilityStyles = useMemo(() => ({
    ...getHighContrastStyles(),
    ...getReducedMotionStyles(),
  }), [getHighContrastStyles, getReducedMotionStyles]);

  return {
    getInputProps: getEnhancedInputProps,
    getAriaProps: getEnhancedInputProps,
    getLiveRegionMessage,
    getInstructions,
    getStatusMessage,
    getAccessibilityStyles,
    getVoiceInputProps,
    getBrailleProps,
    getVoiceCommandProps,
    getKeyboardShortcutProps,
    getFocusProps,
    handleFocusChange,
    announce,
    announcements,
    focusedIndex,
  };
};
