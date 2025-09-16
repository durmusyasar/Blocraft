import { useState, useCallback } from 'react';
import { CountryType } from '../types';

export interface ValidationResult {
  isValid: boolean;
  isPossible: boolean;
  isValidForCountry: boolean;
  countryCode?: string;
  nationalNumber?: string;
  internationalNumber?: string;
  errorMessage?: string;
  suggestions?: string[];
}

export interface UseAdvancedPhoneValidationProps {
  country: string;
  countryList: CountryType[];
  enableAdvancedValidation?: boolean;
  enableSuggestions?: boolean;
  customValidation?: (phone: string, country: string) => Promise<ValidationResult>;
}

export interface UseAdvancedPhoneValidationReturn {
  validatePhone: (phone: string) => Promise<ValidationResult>;
  isValidating: boolean;
  lastValidation: ValidationResult | null;
  getValidationMessage: (result: ValidationResult) => string;
  getSuggestions: (phone: string) => string[];
}

/**
 * Gelişmiş telefon doğrulama hook'u
 * libphonenumber-js benzeri doğrulama sağlar
 */
export const useAdvancedPhoneValidation = ({
  country,
  countryList,
  enableAdvancedValidation = true,
  enableSuggestions = true,
  customValidation,
}: UseAdvancedPhoneValidationProps): UseAdvancedPhoneValidationReturn => {
  
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidation, setLastValidation] = useState<ValidationResult | null>(null);

  // Temel telefon doğrulama
  const basicValidation = useCallback((phone: string, countryCode: string): ValidationResult => {
    const digits = phone.replace(/\D/g, '');
    const countryData = countryList.find(c => c.code === countryCode);
    
    if (!countryData) {
      return {
        isValid: false,
        isPossible: false,
        isValidForCountry: false,
        errorMessage: 'Geçersiz ülke kodu',
      };
    }

    // Mask kontrolü
    const maskDigits = (countryData.mask?.match(/9/g) || []).length;
    const isValidLength = digits.length === maskDigits;
    
    // Temel format kontrolü
    const hasValidFormat = /^\d+$/.test(digits);
    const isNotEmpty = digits.length > 0;
    
    // Ülke koduna göre özel kontroller
    let isValidForCountry = true;
    let errorMessage = '';
    
    switch (countryCode) {
      case 'TR':
        // Türkiye: 5xx xxx xxxx formatı
        if (digits.length === 10) {
          const firstDigit = digits[0];
          isValidForCountry = ['5'].includes(firstDigit);
          if (!isValidForCountry) {
            errorMessage = 'Türkiye telefon numarası 5 ile başlamalıdır';
          }
        }
        break;
      case 'US':
      case 'CA':
        // ABD/Kanada: 10 haneli
        if (digits.length === 10) {
          const areaCode = digits.substring(0, 3);
          const exchange = digits.substring(3, 6);
          isValidForCountry = 
            !['000', '111', '222', '333', '444', '555', '666', '777', '888', '999'].includes(areaCode) &&
            !['000', '111', '222', '333', '444', '555', '666', '777', '888', '999'].includes(exchange);
          if (!isValidForCountry) {
            errorMessage = 'Geçersiz alan kodu veya santral numarası';
          }
        }
        break;
      case 'GB':
        // İngiltere: 10-11 haneli
        if (digits.length >= 10 && digits.length <= 11) {
          const firstDigit = digits[0];
          isValidForCountry = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(firstDigit);
          if (!isValidForCountry) {
            errorMessage = 'İngiltere telefon numarası 1-9 arası bir rakamla başlamalıdır';
          }
        }
        break;
    }

    const isValid = isValidLength && hasValidFormat && isNotEmpty && isValidForCountry;
    const isPossible = digits.length > 0 && digits.length <= maskDigits;

    return {
      isValid,
      isPossible,
      isValidForCountry,
      countryCode: countryCode,
      nationalNumber: digits,
      internationalNumber: `+${countryData.dial}${digits}`,
      errorMessage: isValid ? undefined : errorMessage || 'Geçersiz telefon numarası formatı',
    };
  }, [countryList]);

  // Öneriler oluştur
  const getSuggestions = useCallback((phone: string): string[] => {
    if (!enableSuggestions || !phone) return [];
    
    const digits = phone.replace(/\D/g, '');
    const suggestions: string[] = [];
    
    // Eksik rakam önerileri
    if (digits.length < 10) {
      const countryData = countryList.find(c => c.code === country);
      if (countryData) {
        const maskDigits = (countryData.mask?.match(/9/g) || []).length;
        const missing = maskDigits - digits.length;
        if (missing > 0) {
          suggestions.push(`${missing} rakam daha gerekli`);
        }
      }
    }
    
    // Yaygın hatalar için öneriler
    if (digits.length === 10 && country === 'TR') {
      if (!digits.startsWith('5')) {
        suggestions.push('Türkiye numaraları 5 ile başlar');
      }
    }
    
    return suggestions;
  }, [enableSuggestions, country, countryList]);

  // Ana doğrulama fonksiyonu
  const validatePhone = useCallback(async (phone: string): Promise<ValidationResult> => {
    if (!enableAdvancedValidation) {
      return {
        isValid: true,
        isPossible: true,
        isValidForCountry: true,
      };
    }

    setIsValidating(true);
    
    try {
      let result: ValidationResult;
      
      if (customValidation) {
        result = await customValidation(phone, country);
      } else {
        result = basicValidation(phone, country);
      }
      
      // Öneriler ekle
      if (enableSuggestions && !result.isValid) {
        result.suggestions = getSuggestions(phone);
      }
      
      setLastValidation(result);
      return result;
    } catch (error) {
      const errorResult: ValidationResult = {
        isValid: false,
        isPossible: false,
        isValidForCountry: false,
        errorMessage: 'Doğrulama sırasında hata oluştu',
      };
      setLastValidation(errorResult);
      return errorResult;
    } finally {
      setIsValidating(false);
    }
  }, [
    enableAdvancedValidation,
    customValidation,
    country,
    basicValidation,
    enableSuggestions,
    getSuggestions,
  ]);

  // Doğrulama mesajını al
  const getValidationMessage = useCallback((result: ValidationResult): string => {
    if (result.isValid) return '';
    if (result.errorMessage) return result.errorMessage;
    if (result.suggestions && result.suggestions.length > 0) {
      return result.suggestions[0];
    }
    return 'Geçersiz telefon numarası';
  }, []);

  return {
    validatePhone,
    isValidating,
    lastValidation,
    getValidationMessage,
    getSuggestions,
  };
};

