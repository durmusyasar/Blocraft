import { CountryType } from "./types";

export const countryList: CountryType[] = [
  { code: "TR", name: "Türkiye", flag: "🇹🇷", dial: 90, mask: "(999) 999-9999" },
  { code: "US", name: "United States", flag: "🇺🇸", dial: 1, mask: "(999) 999-9999" },
  { code: "DE", name: "Germany", flag: "🇩🇪", dial: 49, mask: "9999 9999999" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dial: 44, mask: "9999 999999" },
  { code: "FR", name: "France", flag: "🇫🇷", dial: 33, mask: "9 99 99 99 99" },
  { code: "IT", name: "Italy", flag: "🇮🇹", dial: 39, mask: "999 999 9999" },
  { code: "ES", name: "Spain", flag: "🇪🇸", dial: 34, mask: "999 99 99 99" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", dial: 31, mask: "999 999 9999" },
  { code: "CA", name: "Canada", flag: "🇨🇦", dial: 1, mask: "(999) 999-9999" },
  { code: "AU", name: "Australia", flag: "🇦🇺", dial: 61, mask: "999 999 999" },
  { code: "JP", name: "Japan", flag: "🇯🇵", dial: 81, mask: "999-9999-9999" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", dial: 82, mask: "999-9999-9999" },
  { code: "CN", name: "China", flag: "🇨🇳", dial: 86, mask: "999 9999 9999" },
  { code: "IN", name: "India", flag: "🇮🇳", dial: 91, mask: "99999 99999" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", dial: 55, mask: "(99) 99999-9999" },
  { code: "RU", name: "Russia", flag: "🇷🇺", dial: 7, mask: "999 999-99-99" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", dial: 966, mask: "999 999 9999" },
  { code: "AE", name: "UAE", flag: "🇦🇪", dial: 971, mask: "999 999 999" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", dial: 20, mask: "9999 999 9999" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", dial: 27, mask: "999 999 9999" },
];

/**
 * Seçili ülke için telefon maskesini döndürür
 */
export function getPhoneMask(country: string, list = countryList): string {
  const c = list.find(c => c.code === country);
  return c && c.mask ? c.mask : '(999) 999-9999';
}

/**
 * Telefon numarasının geçerli olup olmadığını kontrol eder
 */
export function isPhoneValid(phone: string, country: string, list = countryList): boolean {
  const c = list.find(c => c.code === country);
  if (!c || !c.mask) return false;
  // Maskteki 9 sayısı kadar rakam olmalı
  const digits = phone.replace(/\D/g, '');
  const maskDigits = (c.mask.match(/9/g) || []).length;
  return digits.length === maskDigits;
} 