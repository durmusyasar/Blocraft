import { useCallback } from 'react';
import { getTranslation } from '../../i18n/i18nHelpers';
import { getTranslationsObject } from './useTranslationsObject';

export interface UseOtpAccessibilityProps {
  length: number;
  value: string;
  status?: 'error' | 'warning' | 'success' | 'info';
  disabled?: boolean;
  loading?: boolean;
  locale?: string;
  fallbackLocale?: string;
  translations?: Record<string, string>;
}

export const useOtpAccessibility = ({
  length,
  value,
  status,
  disabled = false,
  loading = false,
  locale = 'en',
  fallbackLocale = 'en',
  translations,
}: UseOtpAccessibilityProps) => {
  const translationsObj = getTranslationsObject(translations);
  const getAriaProps = useCallback((idx: number) => {
    return {
      'aria-label': getTranslation('otpAriaLabel', locale, translationsObj, fallbackLocale, { position: idx + 1, total: length }),
      'aria-describedby': `otp-helper-${idx}`,
      'aria-invalid': status === 'error' ? true : undefined,
      'aria-busy': loading ? true : undefined,
      'aria-required': true,
      'role': 'textbox',
      'inputMode': 'numeric' as const,
      'autoComplete': 'one-time-code' as const,
    };
  }, [length, status, loading, locale, translationsObj, fallbackLocale]);

  const getInputProps = useCallback((idx: number) => {
    return {
      'aria-label': getTranslation('otpAriaLabel', locale, translationsObj, fallbackLocale, { position: idx + 1, total: length }),
      'aria-describedby': `otp-instructions`,
      'aria-invalid': status === 'error' ? true : undefined,
      'aria-busy': loading ? true : undefined,
      'aria-required': true,
      'role': 'textbox',
      'inputMode': 'numeric' as const,
      'autoComplete': 'one-time-code' as const,
      'maxLength': 1,
      'pattern': '[0-9]*',
    };
  }, [status, loading, locale, translationsObj, fallbackLocale, length]);

  const getInstructions = useCallback(() => {
    const instructions = [
      getTranslation('otpInstructions', locale, translationsObj, fallbackLocale, { length }),
      getTranslation('keyboardShortcutsDescription', locale, translationsObj, fallbackLocale),
    ];

    if (status === 'error') {
      instructions.unshift(getTranslation('otpInvalid', locale, translationsObj, fallbackLocale));
    }

    return instructions.join('. ');
  }, [length, status, locale, translationsObj, fallbackLocale]);

  const getLiveRegionMessage = useCallback(() => {
    if (loading) return getTranslation('otpLoading', locale, translationsObj, fallbackLocale);
    if (status === 'error') return getTranslation('otpInvalid', locale, translationsObj, fallbackLocale);
    if (status === 'success') return getTranslation('otpValid', locale, translationsObj, fallbackLocale);
    if (value.length === length) return getTranslation('otpComplete', locale, translationsObj, fallbackLocale);
    return getTranslation('otpProgress', locale, translationsObj, fallbackLocale, { 
      length: value.length,
      total: length
    });
  }, [loading, status, value.length, length, locale, translationsObj, fallbackLocale]);

  const getStatusMessage = useCallback(() => {
    if (status === 'error') return getTranslation('otpInvalid', locale, translationsObj, fallbackLocale);
    if (status === 'success') return getTranslation('otpValid', locale, translationsObj, fallbackLocale);
    if (status === 'warning') return getTranslation('otpError', locale, translationsObj, fallbackLocale);
    if (status === 'info') return getTranslation('helperText', locale, translationsObj, fallbackLocale);
    return getTranslation('otpInstructions', locale, translationsObj, fallbackLocale, { length });
  }, [status, length, locale, translationsObj, fallbackLocale]);

  return {
    getAriaProps,
    getInputProps,
    getInstructions,
    getLiveRegionMessage,
    getStatusMessage,
  };
};
