import { useCallback } from 'react';
import { getTranslation } from '../../i18n/i18nHelpers';
import { getTranslationsObject } from './useTranslationsObject';

export interface UseOtpI18nProps {
  locale?: string;
  fallbackLocale?: string;
  translations?: Record<string, string>;
  enableAdvancedI18n?: boolean;
}

export const useOtpI18n = ({
  locale = 'en',
  fallbackLocale = 'en',
  translations,
  enableAdvancedI18n = false,
}: UseOtpI18nProps) => {
  const translationsObj = getTranslationsObject(translations);

  const t = useCallback((key: string, params?: Record<string, any>) => {
    const translation = getTranslation(key, locale, translationsObj, fallbackLocale);
    
    if (enableAdvancedI18n && params) {
      // Simple interpolation
      return translation.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] || match;
      });
    }
    
    return translation;
  }, [locale, translationsObj, fallbackLocale, enableAdvancedI18n]);

  const getLabelStyles = useCallback(() => {
    return {
      fontSize: 14,
      fontWeight: 500,
      color: 'text.secondary',
    };
  }, []);

  const getHelperTextStyles = useCallback(() => {
    return {
      fontSize: 12,
      lineHeight: 1.4,
      color: 'text.secondary',
    };
  }, []);

  const getStatusMessageStyles = useCallback((status?: string) => {
    const baseStyles = {
      fontSize: 12,
      fontWeight: 500,
    };

    switch (status) {
      case 'error':
        return {
          ...baseStyles,
          color: 'error.main',
        };
      case 'warning':
        return {
          ...baseStyles,
          color: 'warning.main',
        };
      case 'success':
        return {
          ...baseStyles,
          color: 'success.main',
        };
      case 'info':
        return {
          ...baseStyles,
          color: 'info.main',
        };
      default:
        return {
          ...baseStyles,
          color: 'text.secondary',
        };
    }
  }, []);

  const getInstructions = useCallback((length: number) => {
    return t('otpInstructions', { length });
  }, [t]);

  const getPlaceholder = useCallback((idx: number) => {
    return t('otpPlaceholder', { position: idx + 1 });
  }, [t]);

  const getAriaLabel = useCallback((idx: number, length: number) => {
    return t('otpAriaLabel', { position: idx + 1, total: length });
  }, [t]);

  return {
    t,
    getLabelStyles,
    getHelperTextStyles,
    getStatusMessageStyles,
    getInstructions,
    getPlaceholder,
    getAriaLabel,
  };
};
