import { BcTextFieldProps } from '../BcTextField/BcTextField';
import { CountryType } from './types';

// Re-export CountryType for external use
export type { CountryType };

// Strong typing for phone input
export type CountryCode = 'TR' | 'US' | 'GB' | 'DE' | 'FR' | 'IT' | 'ES' | 'NL' | 'BE' | 'CH' | 'AT' | 'SE' | 'NO' | 'DK' | 'FI' | 'PL' | 'CZ' | 'HU' | 'RO' | 'BG' | 'HR' | 'SI' | 'SK' | 'LT' | 'LV' | 'EE' | 'GR' | 'CY' | 'MT' | 'IE' | 'LU' | 'PT' | 'CA' | 'AU' | 'NZ' | 'ZA' | 'JP' | 'KR' | 'CN' | 'IN' | 'BR' | 'MX' | 'AR' | 'CL' | 'CO' | 'PE' | 'VE' | 'UY' | 'PY' | 'BO' | 'EC' | 'GY' | 'SR' | 'FK' | 'GF' | 'GP' | 'MQ' | 'RE' | 'YT' | 'BL' | 'MF' | 'PM' | 'WF' | 'PF' | 'NC' | 'VU' | 'SB' | 'PG' | 'FJ' | 'TO' | 'WS' | 'KI' | 'TV' | 'NR' | 'PW' | 'FM' | 'MH' | 'AS' | 'GU' | 'MP' | 'PR' | 'VI' | 'UM' | 'US';

export type PhoneNumber = string;
export type PhoneFormat = 'national' | 'international' | 'e164' | 'rfc3966';
export type ValidationResult = {
  isValid: boolean;
  errorMessage?: string;
  warningMessage?: string;
  successMessage?: string;
  rules: Array<{
    name: string;
    passed: boolean;
    message: string;
  }>;
};

/**
 * BcPhoneInputProps - BcTextField'den türetilmiş telefon input props'ları
 * Tüm BcTextField özelliklerini inherit eder ve telefon-specific özellikler ekler
 */
export interface BcPhoneInputProps extends Omit<BcTextFieldProps, 'type' | 'inputMode'> {
  // === TELEFON-SPECIFIC PROPS ===
  
  /** Seçili ülke kodu (ISO 3166-1 alpha-2) */
  country?: CountryCode;
  
  /** Ülke değiştiğinde çağrılır */
  onCountryChange?: (country: CountryCode) => void;
  
  /** Ülke listesi veya Promise */
  countryList?: CountryType[] | Promise<CountryType[]>;
  
  /** Ülkeleri async olarak getirir */
  fetchCountries?: () => Promise<CountryType[]>;
  
  /** Select gösterilsin mi / 'readonly' */
  showCountrySelect?: boolean | 'readonly';
  
  /** Telefon doğrulama fonksiyonu */
  validatePhone?: (phone: PhoneNumber, country: CountryCode) => ValidationResult;
  
  /** Mask fonksiyonu */
  getMask?: (country: CountryCode) => string;
  
  /** Mask placeholderda gösterilsin mi */
  showMaskInPlaceholder?: boolean;
  
  /** inputMode (sadece telefon için uygun değerler) */
  inputMode?: 'tel' | 'numeric';
  
  /** Favori ülke kodları */
  favoriteCountries?: CountryCode[];
  
  // === GELİŞMİŞ ÖZELLİKLER ===
  
  /** Telefon formatlaması */
  enablePhoneFormatting?: boolean;
  
  /** Gelişmiş telefon doğrulama */
  enableAdvancedValidation?: boolean;
  
  /** Otomatik ülke tespiti */
  enableAutoCountryDetection?: boolean;
  
  /** Telefon önerileri */
  enablePhoneSuggestions?: boolean;
  
  /** Telefon geçmişi */
  enablePhoneHistory?: boolean;

  // === ENTERPRISE FEATURES ===
  
  /** Accessibility özellikleri */
  enableAccessibility?: boolean;
  
  /** Screen reader desteği */
  enableScreenReaderSupport?: boolean;
  
  /** Klavye navigasyonu */
  enableKeyboardNavigation?: boolean;
  
  /** Yüksek kontrast modu */
  enableHighContrast?: boolean;
  
  /** Azaltılmış hareket */
  enableReducedMotion?: boolean;
  
  /** Focus yönetimi */
  enableFocusManagement?: boolean;
  
  /** ARIA etiketleri */
  enableARIALabels?: boolean;
  
  /** Live regions */
  enableLiveRegions?: boolean;
  
  /** Skip links */
  enableSkipLinks?: boolean;
  
  /** Tooltips */
  enableTooltips?: boolean;
  
  /** Hata duyuruları */
  enableErrorAnnouncements?: boolean;
  
  /** Durum duyuruları */
  enableStatusAnnouncements?: boolean;
  
  /** İlerleme duyuruları */
  enableProgressAnnouncements?: boolean;
  
  /** Performance tracking */
  enablePerformance?: boolean;
  
  /** Monitoring ve analytics */
  enableMonitoring?: boolean;
  
  /** Smart features (AI/ML) */
  enableSmartFeatures?: boolean;
  
  /** Smart placeholder generation */
  enableSmartPlaceholder?: boolean;
  
  /** Smart validation */
  enableSmartValidation?: boolean;
  
  /** Smart suggestions */
  enableSmartSuggestions?: boolean;
  
  /** Smart formatting */
  enableSmartFormatting?: boolean;
  
  /** Smart country detection */
  enableSmartCountryDetection?: boolean;
  
  /** Learning capabilities */
  enableLearning?: boolean;
  
  /** Personalization */
  enablePersonalization?: boolean;
  
  /** Contextual help */
  enableContextualHelp?: boolean;
  
  /** Progressive disclosure */
  enableProgressiveDisclosure?: boolean;
  
  /** Adaptive UI */
  enableAdaptiveUI?: boolean;
  
  /** Integration hooks */
  enableIntegration?: boolean;
  
  /** Integration timeout (ms) */
  integrationTimeout?: number;
  
  /** Integration retry count */
  integrationRetries?: number;
  
  /** Integration delay between retries (ms) */
  integrationDelay?: number;
  
  /** Security features */
  enableSecurity?: boolean;
  
  /** Testing support */
  enableTesting?: boolean;
}

/**
 * BcPhoneInputState - Component'in internal state'i
 */
export interface BcPhoneInputState {
  /** Mevcut telefon numarası */
  phone: string;
  
  /** Seçili ülke */
  country: string;
  
  /** Ülke listesi yükleniyor mu */
  loadingCountries: boolean;
  
  /** Son kullanılan ülkeler */
  recentCountries: string[];
  
  /** Ekran okuyucu mesajı */
  screenReaderMessage: string;
  
  /** Telefon geçmişi */
  phoneHistory: string[];
  
  /** Favori numaralar */
  favoriteNumbers: string[];
}

/**
 * BcPhoneInputActions - Component'in actions'ları
 */
export interface BcPhoneInputActions {
  /** Telefon numarasını değiştir */
  setPhone: (phone: string) => void;
  
  /** Ülkeyi değiştir */
  setCountry: (country: string) => void;
  
  /** Telefon numarasını temizle */
  clearPhone: () => void;
  
  /** Ülke listesini yenile */
  refreshCountries: () => void;
  
  /** Telefon geçmişine ekle */
  addToHistory: (phone: string, country: string) => void;
  
  /** Favori numaraya ekle/çıkar */
  toggleFavorite: (phone: string) => void;
  
  /** QR Code oluştur */
  generateQRCode: (phone: string) => void;
  
  /** Sesli arama başlat/durdur */
  toggleVoiceSearch: () => void;
}

/**
 * BcPhoneInputOptions - Hook options
 */
export interface BcPhoneInputOptions {
  /** Başlangıç ülkesi */
  defaultCountry?: string;
  
  /** Başlangıç telefon numarası */
  defaultPhone?: string;
  
  /** Ülke listesi */
  countryList?: CountryType[];
  
  /** Favori ülkeler */
  favoriteCountries?: string[];
  
  /** Gelişmiş özellikler */
  enableAdvancedFeatures?: boolean;
  
  /** Performans takibi */
  enablePerformanceTracking?: boolean;
  
  /** Locale */
  locale?: string;
  
  /** Telefon değişikliği callback'i */
  onPhoneChange?: (phone: string, country: string) => void;
  
  /** Ülke değişikliği callback'i */
  onCountryChange?: (country: string, phone: string) => void;
  
  /** Formatlama ayarları */
  formatting?: {
    enableFormatting?: boolean;
    formatOnChange?: boolean;
    formatOnBlur?: boolean;
  };
  
  /** Doğrulama ayarları */
  validation?: {
    enableValidation?: boolean;
    enableSuggestions?: boolean;
    customRules?: Array<{
      name: string;
      test: (phone: string, country: string) => boolean;
      message: string;
    }>;
  };
  
  /** Arama ayarları */
  search?: {
    enableSearch?: boolean;
    debounceMs?: number;
    minSearchLength?: number;
  };
  
  /** Geçmiş ayarları */
  history?: {
    enableHistory?: boolean;
    maxEntries?: number;
    enableFavorites?: boolean;
  };
}

/**
 * BcPhoneInputValidation - Doğrulama sonuçları
 */
export interface BcPhoneInputValidation {
  /** Geçerli mi */
  isValid: boolean;
  
  /** Hata mesajı */
  errorMessage?: string;
  
  /** Uyarı mesajı */
  warningMessage?: string;
  
  /** Başarı mesajı */
  successMessage?: string;
  
  /** Doğrulama kuralları */
  rules: Array<{
    name: string;
    passed: boolean;
    message: string;
  }>;
}

/**
 * BcPhoneInputFormatting - Formatlama sonuçları
 */
export interface BcPhoneInputFormatting {
  /** Formatlanmış numara */
  formatted: string;
  
  /** Ham numara */
  raw: string;
  
  /** Ülke kodu */
  countryCode: string;
  
  /** Uluslararası format */
  international: string;
  
  /** Ulusal format */
  national: string;
  
  /** E164 format */
  e164: string;
}

/**
 * BcPhoneInputSuggestions - Öneriler
 */
export interface BcPhoneInputSuggestions {
  /** Geçmiş numaralar */
  recent: string[];
  
  /** Favori numaralar */
  favorites: string[];
  
  /** Benzer numaralar */
  similar: string[];
  
  /** Önerilen numaralar */
  recommended: string[];
}


/**
 * BcPhoneInputCountry - Ülke bilgileri
 */
export interface BcPhoneInputCountry {
  /** Ülke kodu */
  code: string;
  
  /** Ülke adı */
  name: string;
  
  /** Bayrak */
  flag: string;
  
  /** Arama kodu */
  dial: number;
  
  /** Maske */
  mask: string;
  
  /** Favori mi */
  isFavorite: boolean;
  
  /** Son kullanılan mı */
  isRecent: boolean;
}

/**
 * BcPhoneInputGroupedCountries - Gruplandırılmış ülkeler
 */
export interface BcPhoneInputGroupedCountries {
  /** Favori ülkeler */
  favorites: BcPhoneInputCountry[];
  
  /** Son kullanılan ülkeler */
  recent: BcPhoneInputCountry[];
  
  /** Diğer ülkeler */
  others: BcPhoneInputCountry[];
}

/**
 * BcPhoneInputHookReturn - Hook return type
 */
export interface BcPhoneInputHookReturn {
  /** State */
  state: BcPhoneInputState;
  
  /** Actions */
  actions: BcPhoneInputActions;
  
  /** Doğrulama */
  validation: BcPhoneInputValidation;
  
  /** Formatlama */
  formatting: BcPhoneInputFormatting;
  
  /** Öneriler */
  suggestions: BcPhoneInputSuggestions;
  
  
  /** Gruplandırılmış ülkeler */
  groupedCountries: BcPhoneInputGroupedCountries;
  
  /** Loading states */
  loading: {
    countries: boolean;
    validation: boolean;
    formatting: boolean;
    suggestions: boolean;
  };
  
  /** Error states */
  errors: {
    countries?: string;
    validation?: string;
    formatting?: string;
    suggestions?: string;
  };
}

