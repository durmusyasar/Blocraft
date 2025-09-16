import { useMemo, useCallback } from 'react';
import { BcPhoneInputValidation } from '../BcPhoneInput.types';
import { CountryType } from '../types';

/**
 * BcPhoneInput validation hook'u
 * Telefon numarası doğrulama mantığını yönetir
 */
export const useBcPhoneInputValidation = (
  phone: string,
  country: string,
  countryList: CountryType[],
  options: {
    enableValidation?: boolean;
    enableSuggestions?: boolean;
    customRules?: Array<{
      name: string;
      test: (phone: string, country: string) => boolean;
      message: string;
    }>;
  } = {}
) => {
  const { enableValidation = true, enableSuggestions = false, customRules = [] } = options;

  // === VALIDATION RULES ===
  const validationRules = useMemo(() => {
    const rules = [
      {
        name: 'notEmpty',
        test: (phone: string) => phone.length > 0,
        message: 'Telefon numarası boş olamaz',
      },
      {
        name: 'validCharacters',
        test: (phone: string) => /^[\d\s\-\\/\\+\\(\\)]+$/.test(phone),
        message: 'Sadece rakam, boşluk, tire, artı ve parantez karakterleri kullanılabilir',
      },
      {
        name: 'minimumLength',
        test: (phone: string, country: string) => {
          const selectedCountry = countryList.find(c => c.code === country);
          if (!selectedCountry) return phone.length >= 7;
          
          const minLength = selectedCountry.mask?.replace(/\D/g, '').length;
          const cleanPhone = phone.replace(/\D/g, '');
          return cleanPhone.length >= (minLength || 0);
        },
        message: 'Telefon numarası çok kısa',
      },
      {
        name: 'maximumLength',
        test: (phone: string, country: string) => {
          const selectedCountry = countryList.find(c => c.code === country);
          if (!selectedCountry) return phone.length <= 15;
          
          const maxLength = (selectedCountry.mask?.replace(/\D/g, '').length || 0) + 3; // +3 for country code
          const cleanPhone = phone.replace(/\D/g, '');
          return cleanPhone.length <= maxLength;
        },
        message: 'Telefon numarası çok uzun',
      },
      {
        name: 'countrySpecific',
        test: (phone: string, country: string) => {
          const selectedCountry = countryList.find(c => c.code === country);
          if (!selectedCountry) return true;
          
          const cleanPhone = phone.replace(/\D/g, '');
          
          // Country-specific validation
          switch (country) {
            case 'TR':
              return /^5\d{9}$/.test(cleanPhone) || /^90\d{10}$/.test(cleanPhone);
            case 'US':
              return /^\d{10}$/.test(cleanPhone) || /^1\d{10}$/.test(cleanPhone);
            case 'DE':
              return /^\d{10,11}$/.test(cleanPhone) || /^49\d{10,11}$/.test(cleanPhone);
            case 'GB':
              return /^\d{10,11}$/.test(cleanPhone) || /^44\d{10,11}$/.test(cleanPhone);
            default:
              return cleanPhone.length >= 7 && cleanPhone.length <= 15;
          }
        },
        message: 'Bu ülke için geçersiz telefon numarası formatı',
      },
    ];

    // Add custom rules
    return [...rules, ...customRules];
  }, [countryList, customRules]);

  // === VALIDATION LOGIC ===
  const validation: BcPhoneInputValidation = useMemo(() => {
    if (!enableValidation || !phone) {
      return {
        isValid: true,
        rules: [],
      };
    }

    const rules = validationRules.map(rule => ({
      name: rule.name,
      passed: rule.test(phone, country),
      message: rule.message,
    }));

    const isValid = rules.every(rule => rule.passed);
    const failedRules = rules.filter(rule => !rule.passed);

    return {
      isValid,
      errorMessage: failedRules.length > 0 ? failedRules[0].message : undefined,
      warningMessage: failedRules.length > 1 ? `${failedRules.length - 1} ek kural başarısız` : undefined,
      successMessage: isValid && phone.length > 0 ? 'Geçerli telefon numarası' : undefined,
      rules,
    };
  }, [phone, country, enableValidation, validationRules]);

  // === SUGGESTIONS ===
  const suggestions = useMemo(() => {
    if (!enableSuggestions || !phone || phone.length < 3) {
      return [];
    }

    const suggestions = [];
    const cleanPhone = phone.replace(/\D/g, '');

    // Common phone number patterns
    if (country === 'TR') {
      if (cleanPhone.startsWith('5') && cleanPhone.length === 10) {
        suggestions.push(`+90 ${cleanPhone}`);
      }
      if (cleanPhone.startsWith('90') && cleanPhone.length === 12) {
        suggestions.push(`+${cleanPhone}`);
      }
    } else if (country === 'US') {
      if (cleanPhone.length === 10) {
        suggestions.push(`+1 ${cleanPhone}`);
      }
      if (cleanPhone.startsWith('1') && cleanPhone.length === 11) {
        suggestions.push(`+${cleanPhone}`);
      }
    }

    return suggestions;
  }, [phone, country, enableSuggestions]);

  // === VALIDATION ACTIONS ===
  const validatePhone = useCallback((phoneToValidate: string, countryToValidate: string) => {
    const rules = validationRules.map(rule => ({
      name: rule.name,
      passed: rule.test(phoneToValidate, countryToValidate),
      message: rule.message,
    }));

    return {
      isValid: rules.every(rule => rule.passed),
      rules,
    };
  }, [validationRules]);

  const getValidationMessage = useCallback((phoneToValidate: string, countryToValidate: string) => {
    const result = validatePhone(phoneToValidate, countryToValidate);
    const failedRule = result.rules.find(rule => !rule.passed);
    return failedRule ? failedRule.message : undefined;
  }, [validatePhone]);

  return {
    validation,
    suggestions,
    validatePhone,
    getValidationMessage,
  };
};
