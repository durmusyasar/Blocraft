# BcPhoneInput

## İçindekiler / Table of Contents
- [Türkçe](#türkçe)
  - [Özellikler](#özellikler)
  - [Props Tablosu](#props-tablosu)
  - [Kullanım](#kullanım)
  - [BcTextField Kalıtımı](#bctextfield-kalıtımı)
  - [React Hook Form ile Kullanım](#react-hook-form-ile-kullanım)
  - [Sıkça Sorulan Sorular (FAQ)](#sıkça-sorulan-sorular-faq)
  - [Sorun Giderme](#sorun-giderme)
  - [En İyi Kullanım İpuçları](#en-iyi-kullanım-ipuçları)
  - [Lisans](#lisans)
- [English](#english)
  - [Features](#features)
  - [Props Table](#props-table)
  - [Usage](#usage)
  - [BcTextField Inheritance](#bctextfield-inheritance)
  - [React Hook Form Integration](#react-hook-form-integration)
  - [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
  - [Troubleshooting](#troubleshooting)
  - [Best Practices](#best-practices)
  - [License](#license)

---

## Türkçe

### Özellikler
- Material-UI tabanlı, BcTextField'den türetilmiş telefon input bileşeni
- Ülke kodu seçimi, telefon numarası formatlama ve doğrulama
- BcTextField'in tüm özelliklerini kalıtım yoluyla alır
- Responsive, status, loading, clear, i18n, erişilebilirlik desteği
- **Çoklu dil/i18n desteği** (translations, locale, fallbackLocale)
- **Async validation** (enableAsyncValidation, validateInput, showValidationStatus, validationDebounceMs)
- **Monitoring/analitik** (monitoring prop'u ile değişiklik, hata, performans callback'leri)
- **Custom render** (renderCustomIcon, renderHelperText)
- **High contrast & reduced motion** (erişilebilirlik için)
- **RTL (sağdan sola) desteği**

#### 📱 Telefon Özel Özellikleri
- **Ülke Seçimi**: Bayrak emojileri ile ülke kodu seçimi
- **Telefon Formatlama**: Ülkeye özel telefon numarası formatlama
- **Doğrulama**: Ülkeye özel telefon numarası doğrulama
- **Favori Ülkeler**: Sık kullanılan ülkeleri favorilere ekleme
- **Geçmiş**: Son kullanılan ülkeler ve telefon numaraları
- **Arama**: Ülke arama ve filtreleme
- **Otomatik Algılama**: IP/konum tabanlı ülke algılama

#### 🚀 Gelişmiş Özellikler
- **QR Kod**: Telefon numarası için QR kod oluşturma
- **Sesli Arama**: Sesli komutlarla ülke/telefon arama
- **Öneriler**: Akıllı telefon numarası önerileri
- **Geçmiş Takibi**: Detaylı telefon numarası geçmişi
- **Mobil Optimizasyonlar**: Mobil cihazlar için özel optimizasyonlar
- **Klavye Kısayolları**: Güçlü kullanıcılar için klavye kısayolları

#### ♿ Erişilebilirlik ve Performans
- **Accessibility**: Screen reader, keyboard navigation, ARIA labels, live regions, focus management
- **Performance**: Lazy loading, debouncing, memoization, efficient rendering
- **Monitoring**: Real-time monitoring, analytics, error reporting, user behavior tracking

### Props Tablosu

#### BcTextField'den Kalıtılan Props
Tüm BcTextField props'ları kullanılabilir. Detaylı liste için BcTextField dokümantasyonuna bakın.

#### Telefon Özel Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| **Temel Props** | | | |
| country | string | "TR" | Varsayılan seçili ülke kodu |
| onCountryChange | (country: string) => void | - | Ülke değiştiğinde çağrılan fonksiyon |
| countryList | CountryType[] | defaultCountryList | Mevcut ülkeler listesi |
| fetchCountries | () => Promise<CountryType[]> | - | Async ülke yükleme fonksiyonu |
| showCountrySelect | boolean | true | Ülke seçici dropdown'u göster |
| validatePhone | (phone: string, country: string) => boolean | - | Özel telefon doğrulama |
| getMask | (country: string) => string | - | Özel maske fonksiyonu |
| showMaskInPlaceholder | boolean | true | Placeholder'da telefon maskesini göster |
| favoriteCountries | string[] | [] | Favori ülke kodları listesi |
| **Gelişmiş Özellikler** | | | |
| enablePhoneFormatting | boolean | true | Gerçek zamanlı telefon formatlama |
| enableCountrySearch | boolean | true | Ülke arama işlevselliği |
| enableAdvancedValidation | boolean | true | Ülkeye özel doğrulama |
| enableAutoCountryDetection | boolean | false | Otomatik ülke algılama |
| enablePhoneSuggestions | boolean | true | Telefon numarası önerileri |
| enableQRCode | boolean | false | QR kod oluşturma |
| enableVoiceSearch | boolean | false | Sesli arama entegrasyonu |
| enablePhoneHistory | boolean | true | Telefon geçmişi takibi |
| enableAdvancedMonitoring | boolean | false | Gelişmiş kullanım izleme |
| enableMobileOptimizations | boolean | true | Mobil özel optimizasyonlar |
| enableAdvancedI18n | boolean | false | Gelişmiş i18n özellikleri |
| enableThemeAwareStyles | boolean | true | Tema uyumlu stil |
| enableKeyboardShortcuts | boolean | true | Klavye kısayolları |
| **BcTextField Kalıtılan** | | | |
| appearance | string | "outlined" | Görünüm stili (premium, soft, glass, minimal, neumorph, underline, dark, borderless) |
| size | string | "medium" | Boyut (small, medium, large) |
| status | string | - | Durum göstergesi (error, warning, success, info) |
| color | string | "primary" | Renk teması (primary, secondary, success, error, info, warning) |
| responsiveWidth | boolean | false | Responsive genişlik |
| showClearButton | boolean | false | Temizleme butonu göster |
| loading | boolean | false | Yükleme durumu |
| disabled | boolean | false | Devre dışı |
| translations | object | - | Çoklu dil/i18n çevirileri |
| locale, fallbackLocale | string | - | Dil kodu ve yedek dil |
| enableAsyncValidation | boolean | false | Asenkron doğrulama aktif |
| validateInput | fonksiyon | - | Asenkron doğrulama fonksiyonu |
| showValidationStatus | boolean | false | Doğrulama durumunu göster |
| validationDebounceMs | number | 300 | Doğrulama debounce süresi (ms) |
| monitoring | object | - | onChange, onError, onPerformance callback'leri |
| renderCustomIcon | fonksiyon | - | Durum ikonunu özelleştir |
| renderHelperText | fonksiyon | - | helperText'i özelleştir |
| enableHighContrast | boolean | false | Yüksek kontrast modu |
| enableReducedMotion | boolean | false | Hareket azaltma modu |
| enableRTL | boolean | false | Sağdan sola yazım desteği |
| fontSize | number/string | - | Yazı tipi boyutu |
| inputPrefix | node | - | Input başına özel içerik |
| inputSuffix | node | - | Input sonuna özel içerik |

### Kullanım

#### Temel Kullanım
```tsx
import { BcPhoneInput } from "./components/BcPhoneInput/BcPhoneInput";

<BcPhoneInput
  label="Telefon Numarası"
  country="TR"
  placeholder="Telefon numaranızı girin"
/>
```

#### Gelişmiş Kullanım
```tsx
<BcPhoneInput
  label="Profesyonel Telefon Girişi"
  country="TR"
  appearance="premium"
  size="large"
  color="success"
  showClearButton={true}
  responsiveWidth={true}
  enableRTL={true}
  
  // Telefon özel özellikler
  enablePhoneFormatting={true}
  enableCountrySearch={true}
  enableAdvancedValidation={true}
  enableAutoCountryDetection={true}
  enablePhoneSuggestions={true}
  enableQRCode={true}
  enableVoiceSearch={true}
  enablePhoneHistory={true}
  
  // Gelişmiş izleme
  enableAdvancedMonitoring={true}
  enableMobileOptimizations={true}
  enableAdvancedI18n={true}
  enableThemeAwareStyles={true}
  enableKeyboardShortcuts={true}
  
  // Özel yapılandırma
  favoriteCountries={["TR", "US", "GB", "DE", "FR"]}
  validatePhone={(phone, country) => {
    // Özel doğrulama mantığı
    return phone.length >= 10;
  }}
  onCountryChange={(country) => {
    console.log('Ülke değişti:', country);
  }}
/>
```

### BcTextField Kalıtımı

#### Tüm BcTextField Özellikleri Kullanılabilir
```tsx
// BcTextField'den kalıtılan tüm özellikler çalışır
<BcPhoneInput
  // BcTextField kalıtılan props
  label="Telefon Numarası"
  appearance="premium"
  size="large"
  color="success"
  showClearButton={true}
  responsiveWidth={true}
  enableRTL={true}
  enableHighContrast={true}
  enableReducedMotion={true}
  translations={{
    clearButtonLabel: "Temizle",
    helperText: "Yardım metni",
    statusMessage: "Durum mesajı",
    label: "Etiket"
  }}
  locale="tr"
  helperText="Telefon numaranızı girin"
  status="success"
  statusMessage="Geçerli telefon numarası"
  
  // Telefon özel props
  country="TR"
  favoriteCountries={["TR", "US", "GB"]}
  enablePhoneFormatting={true}
  enableAdvancedValidation={true}
/>
```

### React Hook Form ile Kullanım
```tsx
import { useForm, Controller } from 'react-hook-form';
import { BcPhoneInput } from './BcPhoneInput';

function MyForm() {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phoneNumber"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <BcPhoneInput
            {...field}
            label="Telefon Numarası"
            country="TR"
            placeholder="Telefon numaranızı girin"
            showClearButton
            enablePhoneFormatting
            enableAdvancedValidation
          />
        )}
      />
      <button type="submit">Gönder</button>
    </form>
  );
}
```

### Sıkça Sorulan Sorular (FAQ)
- **BcPhoneInput neden BcTextField'den türetiliyor?**
  - Tüm BcTextField özelliklerini kalıtım yoluyla almak ve tutarlı API sağlamak için.
- **i18n çevirileri nereden yükleniyor?**
  - i18n çevirileri i18n klasöründeki JSON dosyalarından veya translations prop'u ile yüklenir.
- **Async ülke yükleme nasıl çalışıyor?**
  - fetchCountries fonksiyonu ile async olarak ülke listesi yüklenebilir.
- **Telefon formatlama nasıl özelleştirilir?**
  - getMask prop'u ile ülkeye özel formatlama maskesi tanımlanabilir.

### Sorun Giderme
- **"toHaveNoViolations" hatası:**
  - jest-axe için tip dosyasını (jest-axe.d.ts) ekleyin.
- **"Cannot find module 'react-hook-form'":**
  - Paketi kurduğunuzdan ve import ettiğinizden emin olun.
- **Performans sorunları:**
  - Çok büyük ülke listelerinde lazy loading ve memoization kullanın.

### En İyi Kullanım İpuçları
- i18n için translations prop'unu ve locale/fallbackLocale değerlerini kullanın.
- Async validation fonksiyonlarını useCallback ile sarmalayın.
- Monitoring callback'lerinde try/catch kullanın.
- favoriteCountries ile sık kullanılan ülkeleri optimize edin.
- enableMobileOptimizations'ı mobil uygulamalar için etkinleştirin.

### Lisans
MIT

---

## English

### Features
- Material-UI based phone input component **derived from BcTextField**
- Country code selection, phone number formatting and validation
- Inherits all BcTextField features through proper inheritance
- Responsive, status, loading, clear, i18n, accessibility support
- **Multi-language/i18n support** (translations, locale, fallbackLocale)
- **Async validation** (enableAsyncValidation, validateInput, showValidationStatus, validationDebounceMs)
- **Monitoring/analytics** (monitoring prop with onChange, onError, onPerformance callbacks)
- **Custom render** (renderCustomIcon, renderHelperText)
- **High contrast & reduced motion** (for accessibility)
- **RTL (right-to-left) support**

#### 📱 Phone-Specific Features
- **Country Selection**: Country code selection with flag emojis
- **Phone Formatting**: Country-specific phone number formatting
- **Validation**: Country-specific phone number validation
- **Favorite Countries**: Add frequently used countries to favorites
- **History**: Recent countries and phone numbers
- **Search**: Country search and filtering
- **Auto Detection**: IP/location-based country detection

#### 🚀 Advanced Features
- **QR Code**: Generate QR codes for phone numbers
- **Voice Search**: Search countries/phones with voice commands
- **Suggestions**: Smart phone number suggestions
- **History Tracking**: Detailed phone number history
- **Mobile Optimizations**: Special optimizations for mobile devices
- **Keyboard Shortcuts**: Keyboard shortcuts for power users

#### ♿ Accessibility and Performance
- **Accessibility**: Screen reader, keyboard navigation, ARIA labels, live regions, focus management
- **Performance**: Lazy loading, debouncing, memoization, efficient rendering
- **Monitoring**: Real-time monitoring, analytics, error reporting, user behavior tracking

### Props Table

#### Inherited Props (from BcTextField)
All BcTextField props are available. See BcTextField documentation for complete list.

#### Phone-Specific Props

| Prop | Type | Default | Description |
|------|-----|---------|-------------|
| **Basic Props** | | | |
| country | string | "TR" | Default selected country code |
| onCountryChange | (country: string) => void | - | Callback when country changes |
| countryList | CountryType[] | defaultCountryList | List of available countries |
| fetchCountries | () => Promise<CountryType[]> | - | Async country loading function |
| showCountrySelect | boolean | true | Show country selection dropdown |
| validatePhone | (phone: string, country: string) => boolean | - | Custom phone validation |
| getMask | (country: string) => string | - | Custom mask function |
| showMaskInPlaceholder | boolean | true | Show phone mask in placeholder |
| favoriteCountries | string[] | [] | List of favorite country codes |
| **Advanced Features** | | | |
| enablePhoneFormatting | boolean | true | Enable real-time phone formatting |
| enableCountrySearch | boolean | true | Enable country search functionality |
| enableAdvancedValidation | boolean | true | Enable country-specific validation |
| enableAutoCountryDetection | boolean | false | Enable automatic country detection |
| enablePhoneSuggestions | boolean | true | Enable phone number suggestions |
| enableQRCode | boolean | false | Enable QR code generation |
| enableVoiceSearch | boolean | false | Enable voice search integration |
| enablePhoneHistory | boolean | true | Enable phone history tracking |
| enableAdvancedMonitoring | boolean | false | Enable advanced usage monitoring |
| enableMobileOptimizations | boolean | true | Enable mobile-specific optimizations |
| enableAdvancedI18n | boolean | false | Enable advanced i18n features |
| enableThemeAwareStyles | boolean | true | Enable theme-aware styling |
| enableKeyboardShortcuts | boolean | true | Enable keyboard shortcuts |
| **BcTextField Inherited** | | | |
| appearance | string | "outlined" | Appearance style (premium, soft, glass, minimal, neumorph, underline, dark, borderless) |
| size | string | "medium" | Size (small, medium, large) |
| status | string | - | Status indicator (error, warning, success, info) |
| color | string | "primary" | Color theme (primary, secondary, success, error, info, warning) |
| responsiveWidth | boolean | false | Responsive width |
| showClearButton | boolean | false | Show clear button |
| loading | boolean | false | Loading state |
| disabled | boolean | false | Disabled |
| translations | object | - | Multi-language/i18n translations |
| locale, fallbackLocale | string | - | Language code and fallback |
| enableAsyncValidation | boolean | false | Enable async validation |
| validateInput | function | - | Async validation function |
| showValidationStatus | boolean | false | Show validation status |
| validationDebounceMs | number | 300 | Validation debounce duration (ms) |
| monitoring | object | - | onChange, onError, onPerformance callbacks |
| renderCustomIcon | function | - | Custom status icon renderer |
| renderHelperText | function | - | Custom helperText renderer |
| enableHighContrast | boolean | false | High contrast mode |
| enableReducedMotion | boolean | false | Reduced motion mode |
| enableRTL | boolean | false | Right-to-left support |
| fontSize | number/string | - | Font size |
| inputPrefix | node | - | Custom content at input start |
| inputSuffix | node | - | Custom content at input end |

### Usage

#### Basic Usage
```tsx
import { BcPhoneInput } from "./components/BcPhoneInput/BcPhoneInput";

<BcPhoneInput
  label="Phone Number"
  country="TR"
  placeholder="Enter your phone number"
/>
```

#### Advanced Usage
```tsx
<BcPhoneInput
  label="Professional Phone Input"
  country="TR"
  appearance="premium"
  size="large"
  color="success"
  showClearButton={true}
  responsiveWidth={true}
  enableRTL={true}
  
  // Phone-specific features
  enablePhoneFormatting={true}
  enableCountrySearch={true}
  enableAdvancedValidation={true}
  enableAutoCountryDetection={true}
  enablePhoneSuggestions={true}
  enableQRCode={true}
  enableVoiceSearch={true}
  enablePhoneHistory={true}
  
  // Advanced monitoring
  enableAdvancedMonitoring={true}
  enableMobileOptimizations={true}
  enableAdvancedI18n={true}
  enableThemeAwareStyles={true}
  enableKeyboardShortcuts={true}
  
  // Custom configuration
  favoriteCountries={["TR", "US", "GB", "DE", "FR"]}
  validatePhone={(phone, country) => {
    // Custom validation logic
    return phone.length >= 10;
  }}
  onCountryChange={(country) => {
    console.log('Country changed:', country);
  }}
/>
```

### BcTextField Inheritance

#### All BcTextField Features Available
```tsx
// All BcTextField inherited features work
<BcPhoneInput
  // BcTextField inherited props
  label="Phone Number"
  appearance="premium"
  size="large"
  color="success"
  showClearButton={true}
  responsiveWidth={true}
  enableRTL={true}
  enableHighContrast={true}
  enableReducedMotion={true}
  translations={{
    clearButtonLabel: "Clear",
    helperText: "Helper text",
    statusMessage: "Status message",
    label: "Label"
  }}
  locale="en"
  helperText="Enter your phone number"
  status="success"
  statusMessage="Valid phone number"
  
  // Phone-specific props
  country="TR"
  favoriteCountries={["TR", "US", "GB"]}
  enablePhoneFormatting={true}
  enableAdvancedValidation={true}
/>
```

### React Hook Form Integration
```tsx
import { useForm, Controller } from 'react-hook-form';
import { BcPhoneInput } from './BcPhoneInput';

function MyForm() {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phoneNumber"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <BcPhoneInput
            {...field}
            label="Phone Number"
            country="TR"
            placeholder="Enter your phone number"
            showClearButton
            enablePhoneFormatting
            enableAdvancedValidation
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Frequently Asked Questions (FAQ)
- **Why does BcPhoneInput extend BcTextField?**
  - To inherit all BcTextField features and provide consistent API.
- **Where do i18n translations come from?**
  - From i18n JSON files or the translations prop.
- **How does async country loading work?**
  - Use fetchCountries function to load country list asynchronously.
- **How to customize phone formatting?**
  - Use getMask prop to define country-specific formatting masks.

### Troubleshooting
- **"toHaveNoViolations" error:**
  - Add a jest-axe type declaration file (jest-axe.d.ts).
- **"Cannot find module 'react-hook-form'":**
  - Make sure the package is installed and imported.
- **Performance issues:**
  - Use lazy loading and memoization for large country lists.

### Best Practices
- Use translations prop and locale/fallbackLocale for i18n.
- Wrap async validation functions with useCallback.
- Use try/catch in monitoring callbacks.
- Optimize with favoriteCountries for frequently used countries.
- Enable enableMobileOptimizations for mobile apps.

### License
MIT