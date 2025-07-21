import { CountryType } from "./types";

export const countryList: CountryType[] = [
  { code: "TR", name: "Türkiye", flag: "", dial: 90, mask: "(999) 999-9999" },
  { code: "US", name: "United States", flag: "", dial: 1, mask: "(999) 999-9999" },
  { code: "DE", name: "Germany", flag: "", dial: 49, mask: "9999 9999999" },
  { code: "GB", name: "United Kingdom", flag: "", dial: 44, mask: "9999 999999" },
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