import { CountryNameType, CountryType, CountryCode } from "./types";

/** Varsayılan ülke listesi */
export const countryList: CountryType[] = [
  { id: 1, code: "TR", name: { tr: "Türkiye", en: "Turkey" }, flag: "🇹🇷", dial: 90, mask: "(999) 999-9999" },
  { id: 2, code: "US", name: { tr: "Amerika", en: "United States" }, flag: "🇺🇸", dial: 1, mask: "(999) 999-9999" },
  { id: 3, code: "DE", name: { tr: "Almanya", en: "Germany" }, flag: "🇩🇪", dial: 49, mask: "9999 9999999" },
  { id: 4, code: "GB", name: { tr: "İngiltere", en: "United Kingdom" }, flag: "🇬🇧", dial: 44, mask: "9999 999999" },
];

/**
 * Ülke adını locale'a göre döndürür
 */
export function getCountryName(name: CountryNameType, locale: string = 'en'): string {
  if (typeof name === 'string') return name;
  if (name[locale]) return name[locale];
  if (name['en']) return name['en'];
  const first = Object.values(name)[0];
  return typeof first === 'string' ? first : '';
}

/**
 * Seçili ülke için telefon maskesini döndürür
 */
export function getPhoneMask(country: CountryCode, list = countryList): string {
  const c = list.find(c => c.code === country);
  return c ? c.mask : "(999) 999-9999";
}

/**
 * Telefon numarasının geçerli olup olmadığını kontrol eder
 */
export function isPhoneValid(phone: string, country: CountryCode, list = countryList): boolean {
  const mask = getPhoneMask(country, list);
  // Remove non-digit
  const digits = phone.replace(/\D/g, "");
  // Count mask digits
  const maskDigits = (mask.match(/9/g) || []).length;
  return digits.length === maskDigits;
} 