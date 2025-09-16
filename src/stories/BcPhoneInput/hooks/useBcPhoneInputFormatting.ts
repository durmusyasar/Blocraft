import { useMemo, useCallback } from 'react';
import { BcPhoneInputFormatting } from '../BcPhoneInput.types';
import { CountryType } from '../types';

/**
 * BcPhoneInput formatting hook'u
 * Telefon numarası formatlama mantığını yönetir
 */
export const useBcPhoneInputFormatting = (
  phone: string,
  country: string,
  countryList: CountryType[],
  options: {
    enableFormatting?: boolean;
    formatOnChange?: boolean;
    formatOnBlur?: boolean;
  } = {}
) => {
  const { enableFormatting = true, formatOnChange: shouldFormatOnChange = true, formatOnBlur: shouldFormatOnBlur = false } = options;

  // === FORMATTING FUNCTIONS ===
  const formatWithMask = useCallback((phone: string, mask: string) => {
    let formatted = '';
    let phoneIndex = 0;
    
    for (let i = 0; i < mask.length && phoneIndex < phone.length; i++) {
      if (mask[i] === '9') {
        formatted += phone[phoneIndex];
        phoneIndex++;
      } else {
        formatted += mask[i];
      }
    }
    
    return formatted;
  }, []);

  // === FORMATTING LOGIC ===
  const formatting: BcPhoneInputFormatting = useMemo(() => {
    if (!enableFormatting || !phone) {
      return {
        formatted: phone,
        raw: phone,
        countryCode: country,
        international: phone,
        national: phone,
        e164: phone,
      };
    }

    const selectedCountry = countryList.find(c => c.code === country);
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Remove country code if present
    let nationalPhone = cleanPhone;
    if (selectedCountry && cleanPhone.startsWith(selectedCountry.dial.toString())) {
      nationalPhone = cleanPhone.substring(selectedCountry.dial.toString().length);
    }

    // Format national number
    let formatted = nationalPhone;
    if (selectedCountry && selectedCountry.mask) {
      formatted = formatWithMask(nationalPhone, selectedCountry.mask);
    }

    // Generate different formats
    const international = selectedCountry ? `+${selectedCountry.dial} ${formatted}` : phone;
    const e164 = selectedCountry ? `+${selectedCountry.dial}${nationalPhone}` : phone;

    return {
      formatted,
      raw: cleanPhone,
      countryCode: country,
      international,
      national: formatted,
      e164,
    };
  }, [enableFormatting, phone, countryList, country, formatWithMask]);


  const formatPhoneNumber = useCallback((phoneToFormat: string, countryToFormat: string) => {
    const selectedCountry = countryList.find(c => c.code === countryToFormat);
    if (!selectedCountry || !enableFormatting) return phoneToFormat;

    const cleanPhone = phoneToFormat.replace(/\D/g, '');
    let nationalPhone = cleanPhone;
    
    // Remove country code if present
    if (cleanPhone.startsWith(selectedCountry.dial.toString())) {
      nationalPhone = cleanPhone.substring(selectedCountry.dial.toString().length);
    }

    // Apply mask
    if (selectedCountry.mask) {
      return formatWithMask(nationalPhone, selectedCountry.mask);
    }

    return nationalPhone;
  }, [countryList, enableFormatting, formatWithMask]);

  const parsePhoneNumber = useCallback((phoneToParse: string) => {
    const cleanPhone = phoneToParse.replace(/\D/g, '');
    
    // Try to find country by dial code
    const country = countryList.find(c => 
      cleanPhone.startsWith(c.dial.toString())
    );
    
    if (country) {
      const nationalPhone = cleanPhone.substring(country.dial.toString().length);
      return {
        country: country.code,
        national: nationalPhone,
        international: `+${country.dial}${nationalPhone}`,
        e164: `+${country.dial}${nationalPhone}`,
      };
    }
    
    return {
      country: undefined,
      national: cleanPhone,
      international: cleanPhone,
      e164: cleanPhone,
    };
  }, [countryList]);

  const normalizePhoneNumber = useCallback((phoneToNormalize: string) => {
    const cleanPhone = phoneToNormalize.replace(/\D/g, '');
    
    // Remove leading zeros
    const normalized = cleanPhone.replace(/^0+/, '');
    
    return normalized;
  }, []);

  const validateFormat = useCallback((phoneToValidate: string, countryToValidate: string) => {
    const selectedCountry = countryList.find(c => c.code === countryToValidate);
    if (!selectedCountry) return false;

    const cleanPhone = phoneToValidate.replace(/\D/g, '');
    const expectedLength = selectedCountry.mask?.replace(/\D/g, '').length || 0;
    
    return cleanPhone.length === expectedLength;
  }, [countryList]);

  // === FORMATTING ACTIONS ===
  const formatOnChange = useCallback((phoneToFormat: string, countryToFormat: string) => {
    if (!shouldFormatOnChange) return phoneToFormat;
    return formatPhoneNumber(phoneToFormat, countryToFormat);
  }, [shouldFormatOnChange, formatPhoneNumber]);

  const formatOnBlur = useCallback((phoneToFormat: string, countryToFormat: string) => {
    if (!shouldFormatOnBlur) return phoneToFormat;
    return formatPhoneNumber(phoneToFormat, countryToFormat);
  }, [shouldFormatOnBlur, formatPhoneNumber]);

  return {
    formatting,
    formatPhoneNumber,
    parsePhoneNumber,
    normalizePhoneNumber,
    validateFormat,
    formatOnChange,
    formatOnBlur,
  };
};
