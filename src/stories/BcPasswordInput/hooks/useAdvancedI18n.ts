import { useMemo } from 'react';
import { getTranslation } from '../../i18n/i18nHelpers';

export interface AdvancedI18nOptions {
  locale: string;
  fallbackLocale: string;
  translations?: Record<string, string>;
  enablePluralization?: boolean;
  enableInterpolation?: boolean;
}

export function useAdvancedI18n(options: AdvancedI18nOptions) {
  const { locale, fallbackLocale, translations, enablePluralization = true, enableInterpolation = true } = options;

  const t = useMemo(() => {
    return (key: string, params?: Record<string, string | number | boolean>) => {
      let text = getTranslation(key, locale, translations, fallbackLocale);
      
      if (!text) {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }

      // Handle pluralization
      if (enablePluralization && params?.count !== undefined) {
        const pluralKey = `${key}_${params.count === 1 ? 'one' : 'other'}`;
        const pluralText = getTranslation(pluralKey, locale, translations, fallbackLocale);
        if (pluralText) {
          text = pluralText;
        }
      }

      // Handle interpolation
      if (enableInterpolation && params) {
        text = text.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
          return params[paramKey]?.toString() || match;
        });
      }

      return text;
    };
  }, [locale, fallbackLocale, translations, enablePluralization, enableInterpolation]);

  const getStrengthText = useMemo(() => {
    return (strength: number, maxStrength: number) => {
      const percentage = Math.round((strength / maxStrength) * 100);
      return t('passwordStrengthText', { strength, maxStrength, percentage });
    };
  }, [t]);

  const getRuleText = useMemo(() => {
    return (ruleKey: string, passed: boolean) => {
      const status = passed ? 'passed' : 'failed';
      return t(`rule_${ruleKey}_${status}`, { ruleKey, passed });
    };
  }, [t]);

  const getValidationMessage = useMemo(() => {
    return (isValid: boolean, message?: string) => {
      if (message) return message;
      return t(isValid ? 'validationSuccess' : 'validationError');
    };
  }, [t]);

  const getKeyboardShortcuts = useMemo(() => {
    return () => ({
      togglePassword: t('shortcut_togglePassword'),
      copyPassword: t('shortcut_copyPassword'),
      clearPassword: t('shortcut_clearPassword'),
      generatePassword: t('shortcut_generatePassword')
    });
  }, [t]);

  const getAccessibilityText = useMemo(() => {
    return (action: string, params?: Record<string, string | number | boolean>) => {
      return t(`a11y_${action}`, params);
    };
  }, [t]);

  return {
    t,
    getStrengthText,
    getRuleText,
    getValidationMessage,
    getKeyboardShortcuts,
    getAccessibilityText
  };
}
