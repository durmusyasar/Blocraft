# BcPhoneInput

## İçindekiler / Table of Contents
- [Türkçe](#türkçe)
  - [Özellikler](#özellikler)
  - [Props Tablosu](#props-tablosu)
  - [Kullanım](#kullanım)
  - [Ülke Seçimi](#ülke-seçimi)
  - [Telefon Doğrulama](#telefon-doğrulama)
  - [React Hook Form ile Kullanım](#react-hook-form-ile-kullanım)
  - [Sıkça Sorulan Sorular (FAQ)](#sıkça-sorulan-sorular-faq)
  - [Sorun Giderme](#sorun-giderme)
  - [En İyi Kullanım İpuçları](#en-iyi-kullanım-ipuçları)
  - [Lisans](#lisans)
- [English](#english)
  - [Features](#features)
  - [Props Table](#props-table)
  - [Usage](#usage)
  - [Country Selection](#country-selection)
  - [Phone Validation](#phone-validation)
  - [React Hook Form Integration](#react-hook-form-integration)
  - [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
  - [Troubleshooting](#troubleshooting)
  - [Best Practices](#best-practices)
  - [License](#license)

---

## Türkçe

### Özellikler
- Material-UI tabanlı, modern ve özelleştirilebilir telefon input bileşeni
- **BcTextField inheritance** - Tüm BcTextField özelliklerini destekler
- Ülke kodu seçimi ile otomatik telefon numarası formatlaması
- Favori ülkeler ve son kullanılan ülkeler desteği
- **Asenkron ülke listesi yükleme** (API'den ülke verileri)
- **Özel telefon doğrulama** fonksiyonları
- **Özel maske formatları** ülkeye göre
- **Çoklu dil/i18n desteği** (Türkçe, İngilizce, Almanca, Fransızca)
- **Erişilebilirlik** (ARIA, screen reader, keyboard navigation)
- **Responsive tasarım** ve tema uyumluluğu
- **Virtualization** büyük ülke listeleri için
- **LocalStorage** entegrasyonu (son kullanılan ülkeler)

### Props Tablosu
| Prop                | Tip      | Açıklama |
|---------------------|----------|----------|
| country             | string   | Seçili ülke kodu (ISO 3166-1 alpha-2) |
| onCountryChange     | function | Ülke değiştiğinde çağrılır |
| countryList         | array/Promise | Ülke listesi veya Promise |
| fetchCountries      | function | Ülkeleri async olarak getirir |
| showCountrySelect   | boolean/'readonly' | Select gösterilsin mi / 'readonly' |
| validatePhone       | function | Telefon doğrulama fonksiyonu |
| getMask             | function | Mask fonksiyonu |
| showMaskInPlaceholder | boolean | Mask placeholderda gösterilsin mi |
| favoriteCountries   | array    | Favori ülke kodları |
| locale              | string   | Dil kodu |
| fallbackLocale      | string   | Yedek dil kodu |
| translations        | object   | Özel çeviriler |
| ...rest             | ...      | Diğer tüm BcTextField props |

### Kullanım

#### Temel Kullanım
```tsx
import { BcPhoneInput } from "../BcPhoneInput/BcPhoneInput";

<BcPhoneInput
  label="Telefon Numarası"
  placeholder="Telefon numaranızı girin"
  country="TR"
  onCountryChange={(country) => console.log('Ülke değişti:', country)}
/>
```

#### Favori Ülkeler ile
```tsx
<BcPhoneInput
  label="Telefon"
  favoriteCountries={['TR', 'US', 'DE']}
  country="TR"
  onCountryChange={setCountry}
/>
```

#### Asenkron Ülke Yükleme
```tsx
const fetchCountries = async () => {
  const response = await fetch('/api/countries');
  return response.json();
};

<BcPhoneInput
  label="Telefon"
  fetchCountries={fetchCountries}
  country="TR"
  onCountryChange={setCountry}
/>
```

### Ülke Seçimi

#### Ülke Seçimi Gizleme
```tsx
// Ülke seçimini tamamen gizle
<BcPhoneInput showCountrySelect={false} />

// Ülke seçimini sadece okunur yap
<BcPhoneInput showCountrySelect="readonly" country="TR" />
```

#### Özel Ülke Listesi
```tsx
const customCountries = [
  { code: 'TR', name: 'Türkiye', dial: '90', flag: '🇹🇷' },
  { code: 'US', name: 'Amerika', dial: '1', flag: '🇺🇸' },
];

<BcPhoneInput
  countryList={customCountries}
  country="TR"
  onCountryChange={setCountry}
/>
```

### Telefon Doğrulama

#### Özel Doğrulama Fonksiyonu
```tsx
const validatePhone = (phone: string, country: string) => {
  if (country === 'TR') {
    return phone.length >= 10 && phone.startsWith('5');
  }
  if (country === 'US') {
    return phone.length === 10;
  }
  return phone.length >= 8;
};

<BcPhoneInput
  validatePhone={validatePhone}
  country="TR"
  helperText="TR: 5 ile başlayan 10 haneli numara"
/>
```

#### Özel Maske Formatı
```tsx
const getMask = (country: string) => {
  switch (country) {
    case 'TR': return '(999) 999-9999';
    case 'US': return '(999) 999-9999';
    case 'DE': return '999 99999999';
    default: return '999-999-9999';
  }
};

<BcPhoneInput
  getMask={getMask}
  showMaskInPlaceholder
  country="TR"
/>
```

### React Hook Form ile Kullanım
```tsx
import { useForm, Controller } from 'react-hook-form';
import { BcPhoneInput } from './BcPhoneInput';

function PhoneForm() {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        rules={{ 
          required: 'Telefon numarası gerekli',
          minLength: { value: 10, message: 'En az 10 karakter' }
        }}
        render={({ field, fieldState }) => (
          <BcPhoneInput
            {...field}
            label="Telefon Numarası"
            placeholder="Telefon numaranızı girin"
            helperText={fieldState.error?.message}
            status={fieldState.error ? 'error' : undefined}
            showClearButton
          />
        )}
      />
      <button type="submit">Gönder</button>
    </form>
  );
}
```

### Sıkça Sorulan Sorular (FAQ)

**BcPhoneInput neden BcTextField'ı extend ediyor?**
- BcTextField'ın tüm özelliklerini (appearance, status, loading, clear button, i18n, accessibility) kullanabilmek için inheritance kullanılır.

**Ülke listesi nasıl yüklenir?**
- Varsayılan olarak built-in ülke listesi kullanılır. `countryList` prop'u ile özel liste veya `fetchCountries` ile async yükleme yapılabilir.

**Favori ülkeler nasıl çalışır?**
- `favoriteCountries` prop'u ile favori ülke kodları verilir. Bu ülkeler dropdown'da en üstte "Favorites" başlığı altında gösterilir.

**Son kullanılan ülkeler nerede saklanır?**
- localStorage'da `bc-phoneinput-recent-countries` anahtarı altında saklanır. Son 3 ülke hatırlanır.

**Telefon doğrulama nasıl özelleştirilir?**
- `validatePhone` prop'u ile özel doğrulama fonksiyonu verilir. Fonksiyon `(phone: string, country: string) => boolean` formatında olmalıdır.

### Sorun Giderme

**"Cannot find module 'react-window'":**
- react-window paketini kurun: `npm install react-window @types/react-window`

**Ülke listesi yüklenmiyor:**
- `fetchCountries` fonksiyonunun Promise döndürdüğünden emin olun
- Network hatalarını kontrol edin

**LocalStorage hatası:**
- Tarayıcı localStorage'ı destekliyor mu kontrol edin
- Private/Incognito modda localStorage çalışmayabilir

**Telefon doğrulama çalışmıyor:**
- `validatePhone` fonksiyonunun doğru format döndürdüğünden emin olun
- Country code'un doğru olduğunu kontrol edin

### En İyi Kullanım İpuçları

- **Performance**: Büyük ülke listeleri için `fetchCountries` kullanın
- **UX**: Favori ülkeleri kullanıcı deneyimini iyileştirir
- **Validation**: Ülkeye özel doğrulama kuralları kullanın
- **Accessibility**: `aria-label` ve `helperText` kullanın
- **i18n**: `locale` ve `fallbackLocale` prop'larını kullanın
- **Error Handling**: `validatePhone` fonksiyonunda hata yakalama yapın

### Lisans
MIT

---

## English

### Features
- Material-UI based, modern and customizable phone input component
- **BcTextField inheritance** - Supports all BcTextField features
- Country code selection with automatic phone number formatting
- Favorite countries and recently used countries support
- **Async country list loading** (country data from API)
- **Custom phone validation** functions
- **Custom mask formats** by country
- **Multi-language/i18n support** (Turkish, English, German, French)
- **Accessibility** (ARIA, screen reader, keyboard navigation)
- **Responsive design** and theme compatibility
- **Virtualization** for large country lists
- **LocalStorage** integration (recently used countries)

### Props Table
| Prop                | Type     | Description |
|---------------------|----------|-------------|
| country             | string   | Selected country code (ISO 3166-1 alpha-2) |
| onCountryChange     | function | Called when country changes |
| countryList         | array/Promise | Country list or Promise |
| fetchCountries      | function | Fetches countries asynchronously |
| showCountrySelect   | boolean/'readonly' | Show select / 'readonly' |
| validatePhone       | function | Phone validation function |
| getMask             | function | Mask function |
| showMaskInPlaceholder | boolean | Show mask in placeholder |
| favoriteCountries   | array    | Favorite country codes |
| locale              | string   | Language code |
| fallbackLocale      | string   | Fallback language code |
| translations        | object   | Custom translations |
| ...rest             | ...      | All other BcTextField props |

### Usage

#### Basic Usage
```tsx
import { BcPhoneInput } from "../BcPhoneInput/BcPhoneInput";

<BcPhoneInput
  label="Phone Number"
  placeholder="Enter your phone number"
  country="US"
  onCountryChange={(country) => console.log('Country changed:', country)}
/>
```

#### With Favorite Countries
```tsx
<BcPhoneInput
  label="Phone"
  favoriteCountries={['US', 'TR', 'DE']}
  country="US"
  onCountryChange={setCountry}
/>
```

#### Async Country Loading
```tsx
const fetchCountries = async () => {
  const response = await fetch('/api/countries');
  return response.json();
};

<BcPhoneInput
  label="Phone"
  fetchCountries={fetchCountries}
  country="US"
  onCountryChange={setCountry}
/>
```

### Country Selection

#### Hide Country Selection
```tsx
// Hide country selection completely
<BcPhoneInput showCountrySelect={false} />

// Make country selection readonly
<BcPhoneInput showCountrySelect="readonly" country="US" />
```

#### Custom Country List
```tsx
const customCountries = [
  { code: 'US', name: 'United States', dial: '1', flag: '🇺🇸' },
  { code: 'TR', name: 'Turkey', dial: '90', flag: '🇹🇷' },
];

<BcPhoneInput
  countryList={customCountries}
  country="US"
  onCountryChange={setCountry}
/>
```

### Phone Validation

#### Custom Validation Function
```tsx
const validatePhone = (phone: string, country: string) => {
  if (country === 'US') {
    return phone.length === 10;
  }
  if (country === 'TR') {
    return phone.length >= 10 && phone.startsWith('5');
  }
  return phone.length >= 8;
};

<BcPhoneInput
  validatePhone={validatePhone}
  country="US"
  helperText="US: 10 digit number"
/>
```

#### Custom Mask Format
```tsx
const getMask = (country: string) => {
  switch (country) {
    case 'US': return '(999) 999-9999';
    case 'TR': return '(999) 999-9999';
    case 'DE': return '999 99999999';
    default: return '999-999-9999';
  }
};

<BcPhoneInput
  getMask={getMask}
  showMaskInPlaceholder
  country="US"
/>
```

### React Hook Form Integration
```tsx
import { useForm, Controller } from 'react-hook-form';
import { BcPhoneInput } from './BcPhoneInput';

function PhoneForm() {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        rules={{ 
          required: 'Phone number is required',
          minLength: { value: 10, message: 'At least 10 characters' }
        }}
        render={({ field, fieldState }) => (
          <BcPhoneInput
            {...field}
            label="Phone Number"
            placeholder="Enter your phone number"
            helperText={fieldState.error?.message}
            status={fieldState.error ? 'error' : undefined}
            showClearButton
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Frequently Asked Questions (FAQ)

**Why does BcPhoneInput extend BcTextField?**
- To use all BcTextField features (appearance, status, loading, clear button, i18n, accessibility) through inheritance.

**How is the country list loaded?**
- By default, built-in country list is used. Custom list via `countryList` prop or async loading via `fetchCountries`.

**How do favorite countries work?**
- Use `favoriteCountries` prop with country codes. These countries appear at the top under "Favorites" header in dropdown.

**Where are recently used countries stored?**
- In localStorage under `bc-phoneinput-recent-countries` key. Last 3 countries are remembered.

**How to customize phone validation?**
- Use `validatePhone` prop with custom validation function. Function should be `(phone: string, country: string) => boolean`.

### Troubleshooting

**"Cannot find module 'react-window'":**
- Install react-window package: `npm install react-window @types/react-window`

**Country list not loading:**
- Ensure `fetchCountries` function returns a Promise
- Check for network errors

**LocalStorage error:**
- Check if browser supports localStorage
- localStorage may not work in Private/Incognito mode

**Phone validation not working:**
- Ensure `validatePhone` function returns correct format
- Check if country code is correct

### Best Practices

- **Performance**: Use `fetchCountries` for large country lists
- **UX**: Use favorite countries to improve user experience
- **Validation**: Use country-specific validation rules
- **Accessibility**: Use `aria-label` and `helperText`
- **i18n**: Use `locale` and `fallbackLocale` props
- **Error Handling**: Add error handling in `validatePhone` function

### License
MIT