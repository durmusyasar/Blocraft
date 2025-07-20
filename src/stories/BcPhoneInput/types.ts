/**
 * Supported country codes for BcPhoneInput
 */
export type CountryCode = 'TR' | 'US' | 'DE' | 'GB';

/**
 * Enum for supported country codes
 */
export enum CountryCodeEnum {
  TR = 'TR',
  US = 'US',
  DE = 'DE',
  GB = 'GB',
}

/**
 * Country name type, can be string or localized object
 */
export type CountryNameType = string | { [locale: string]: string };

/**
 * CountryType describes a country for phone input
 * @property code - Country code (ISO 3166-1 alpha-2)
 * @property name - Country name (string or localized object)
 * @property flag - Emoji flag
 * @property dial - Country dial code
 * @property mask - Phone mask for the country
 */
export interface CountryType {
  id: number;
  code: CountryCode;
  name: CountryNameType;
  flag: string;
  dial: number;
  mask: string;
}

export interface BcPhoneInputProps {
  country?: string;
  onCountryChange?: (country: string) => void;
  showCountrySelect?: boolean;
} 