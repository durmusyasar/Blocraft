
/**
 * CountryType describes a country for phone input
 * @property code - Country code (ISO 3166-1 alpha-2)
 * @property name - Country name (string or localized object)
 * @property flag - Emoji flag
 * @property dial - Country dial code
 * @property mask - Phone mask for the country
 */
export interface CountryType {
  code: string;
  name: string;
  flag?: string | null;
  dial: number | string;
  mask?: string | null;
}

export interface BcPhoneInputProps {
  country?: string;
  onCountryChange?: (country: string) => void;
  showCountrySelect?: boolean;
} 