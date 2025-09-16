import { useCallback, useMemo } from 'react';
import { CountryType } from '../types';

export interface UsePhoneFormattingProps {
  country: string;
  countryList: CountryType[];
  enableFormatting?: boolean;
  formatOnChange?: boolean;
  formatOnBlur?: boolean;
}

export interface UsePhoneFormattingReturn {
  formatPhoneNumber: (value: string) => string;
  unformatPhoneNumber: (value: string) => string;
  getFormattedValue: (value: string) => string;
  isValidFormat: (value: string) => boolean;
  getCursorPosition: (formattedValue: string, cursorPos: number, oldValue: string) => number;
}

/**
 * Telefon numarası formatlama hook'u
 * Gerçek zamanlı mask formatlama sağlar
 */
export const usePhoneFormatting = ({
  country,
  countryList,
  enableFormatting = true,
  formatOnChange = true,
  formatOnBlur = false,
}: UsePhoneFormattingProps): UsePhoneFormattingReturn => {
  
  // Seçili ülkenin mask'ini al
  const currentMask = useMemo(() => {
    const countryData = countryList.find(c => c.code === country);
    return countryData?.mask || '(999) 999-9999';
  }, [country, countryList]);

  // Mask'teki karakterleri analiz et
  const maskChars = useMemo(() => {
    const chars = currentMask.split('');
    return chars.map((char, index) => ({
      char,
      index,
      isDigit: char === '9',
      isSeparator: char !== '9',
    }));
  }, [currentMask]);

  // Sadece rakamları çıkar
  const unformatPhoneNumber = useCallback((value: string): string => {
    return value.replace(/\D/g, '');
  }, []);

  // Telefon numarasını formatla
  const formatPhoneNumber = useCallback((value: string): string => {
    if (!enableFormatting || !value) return value;
    
    const digits = unformatPhoneNumber(value);
    let formatted = '';
    let digitIndex = 0;

    for (let i = 0; i < maskChars.length && digitIndex < digits.length; i++) {
      const maskChar = maskChars[i];
      
      if (maskChar.isDigit) {
        formatted += digits[digitIndex];
        digitIndex++;
      } else {
        formatted += maskChar.char;
      }
    }

    return formatted;
  }, [enableFormatting, maskChars, unformatPhoneNumber]);

  // Formatlanmış değeri al
  const getFormattedValue = useCallback((value: string): string => {
    return formatPhoneNumber(value);
  }, [formatPhoneNumber]);

  // Format geçerli mi kontrol et
  const isValidFormat = useCallback((value: string): boolean => {
    if (!value) return true;
    
    const digits = unformatPhoneNumber(value);
    const expectedDigits = maskChars.filter(char => char.isDigit).length;
    
    return digits.length <= expectedDigits;
  }, [maskChars, unformatPhoneNumber]);

  // Cursor pozisyonunu hesapla
  const getCursorPosition = useCallback((
    formattedValue: string, 
    cursorPos: number, 
    oldValue: string
  ): number => {
    if (!enableFormatting) return cursorPos;
    
    const oldDigits = unformatPhoneNumber(oldValue);
    const newDigits = unformatPhoneNumber(formattedValue);
    
    // Rakam sayısı değiştiyse cursor'u ayarla
    if (newDigits.length !== oldDigits.length) {
      let newCursorPos = 0;
      let digitCount = 0;
      
      for (let i = 0; i < formattedValue.length && digitCount < cursorPos; i++) {
        if (/\d/.test(formattedValue[i])) {
          digitCount++;
        }
        newCursorPos = i + 1;
      }
      
      return newCursorPos;
    }
    
    return cursorPos;
  }, [enableFormatting, unformatPhoneNumber]);

  return {
    formatPhoneNumber,
    unformatPhoneNumber,
    getFormattedValue,
    isValidFormat,
    getCursorPosition,
  };
};

