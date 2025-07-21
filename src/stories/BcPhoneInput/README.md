# BcPhoneInput

## İçindekiler / Table of Contents
- [Türkçe](#türkçe)
  - [Özellikler](#özellikler)
  - [Props Tablosu](#props-tablosu)
  - [Kullanım](#kullanım)
  - [inputPrefix ve inputSuffix Kullanımı](#inputprefix-ve-inputsuffix-kullanımı)
  - [React Hook Form ile Kullanım](#react-hook-form-ile-kullanım)
  - [Sıkça Sorulan Sorular (FAQ)](#sıkça-sorulan-sorular-faq)
  - [Sorun Giderme](#sorun-giderme)
  - [En İyi Kullanım İpuçları](#en-iyi-kullanım-ipuçları)
  - [Lisans](#lisans)
- [English](#english)
  - [Features](#features)
  - [Props Table](#props-table)
  - [Usage](#usage)
  - [inputPrefix and inputSuffix Usage](#inputprefix-and-inputsuffix-usage)
  - [React Hook Form Integration](#react-hook-form-integration)
  - [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
  - [Troubleshooting](#troubleshooting)
  - [Best Practices](#best-practices)
  - [License](#license)

---

## Türkçe

### Özellikler
- Ülke kodu seçici (Material UI Select)
- Favori ülkeler ve son kullanılanlar (yıldız ve başlık desteği)
- Büyük ülke listesi için sanal render (react-window)
- Readonly ülke kodu gösterimi
- i18n başlıkları ve çoklu dil desteği
- Performans optimizasyonu
- Erişilebilirlik (ARIA, screen reader, aria-describedby, hata mesajı id’si)
- Mask ve validasyon özelleştirme
- inputPrefix ve inputSuffix desteği
- React Hook Form entegrasyonu

### Props Tablosu
| Prop                | Açıklama                                   |
|---------------------|--------------------------------------------|
| country             | Seçili ülke kodu                           |
| onCountryChange     | Ülke değişince çağrılır                    |
| countryList         | Ülke listesi veya async Promise             |
| fetchCountries      | Ülkeleri async olarak getirir               |
| showCountrySelect   | Select gösterilsin mi / 'readonly'          |
| favoriteCountries   | Favori ülke kodları listesi                |
| locale              | Dil kodu                                   |
| fallbackLocale      | Yedek dil kodu                             |
| validatePhone       | Telefon doğrulama fonksiyonu               |
| getMask             | Mask fonksiyonu                            |
| showMaskInPlaceholder | Mask placeholderda gösterilsin mi         |
| inputMode           | inputMode (örn. 'tel')                     |
| autoFocus           | Otomatik odaklanma                         |
| disabled            | Devre dışı                                 |
| appearance          | Görünüm stili                              |
| inputPrefix         | Input başına özel node/ikon                |
| inputSuffix         | Input sonuna özel node/ikon                |

### Kullanım
```tsx
import { BcPhoneInput } from './BcPhoneInput';

<BcPhoneInput
  country="TR"
  favoriteCountries={["TR", "US"]}
  showCountrySelect={true}
  onCountryChange={code => ...}
  value={value}
  onChange={e => setValue(e.target.value)}
  locale="tr"
  placeholder="Telefon numarası"
/>
```

### inputPrefix ve inputSuffix Kullanımı
```tsx
<BcPhoneInput
  inputPrefix={<span>📞</span>}
  inputSuffix={<button>?</button>}
/>
```

### React Hook Form ile Kullanım
```tsx
import { useForm, Controller } from 'react-hook-form';
<Controller
  name="phone"
  control={control}
  render={({ field }) => (
    <BcPhoneInput {...field} />
  )}
/>
```

### Sıkça Sorulan Sorular (FAQ)
- **Mask nasıl değiştirilir?**
  - `getMask` prop'u ile ülkeye göre mask fonksiyonu verebilirsiniz.
- **Favori ülke nasıl eklenir?**
  - `favoriteCountries` prop'una ülke kodlarını ekleyin.
- **Büyük listede performans düşer mi?**
  - Hayır, react-window ile sanal render kullanılır.

### Sorun Giderme
- Ülke listesi gelmiyorsa, `countryList` veya `fetchCountries` prop'unu kontrol edin.
- Erişilebilirlik için label ve placeholder'ı eksiksiz girin.

### En İyi Kullanım İpuçları
- Placeholder'ı boş bırakın, otomatik olarak ülke kodu ve mask gelir.
- inputPrefix ile ikon, inputSuffix ile buton ekleyebilirsiniz.
- Büyük listelerde favori ve son kullanılanları öne çıkarın.

### Lisans
MIT

---

## English

### Features
- Country code selector (Material UI Select)
- Favorite and recent countries (star and header support)
- Virtualized rendering for large country lists (react-window)
- Readonly country code display
- i18n headers and multi-language support
- Performance optimization
- Accessibility (ARIA, screen reader, aria-describedby, error message id)
- Customizable mask and validation
- inputPrefix and inputSuffix support
- React Hook Form integration

### Props Table
| Prop                | Description                                 |
|---------------------|---------------------------------------------|
| country             | Selected country code                       |
| onCountryChange     | Called when country changes                 |
| countryList         | Country list or async Promise               |
| fetchCountries      | Fetches countries asynchronously            |
| showCountrySelect   | Show select or 'readonly'                   |
| favoriteCountries   | List of favorite country codes              |
| locale              | Locale code                                 |
| fallbackLocale      | Fallback locale                             |
| validatePhone       | Phone validation function                   |
| getMask             | Mask function                               |
| showMaskInPlaceholder | Show mask in placeholder                  |
| inputMode           | inputMode (e.g. 'tel')                      |
| autoFocus           | Auto focus                                  |
| disabled            | Disabled                                    |
| appearance          | Appearance style                            |
| inputPrefix         | Custom node/icon at input start             |
| inputSuffix         | Custom node/icon at input end               |

### Usage
```tsx
import { BcPhoneInput } from './BcPhoneInput';

<BcPhoneInput
  country="US"
  favoriteCountries={["US", "TR"]}
  showCountrySelect={true}
  onCountryChange={code => ...}
  value={value}
  onChange={e => setValue(e.target.value)}
  locale="en"
  placeholder="Phone number"
/>
```

### inputPrefix and inputSuffix Usage
```tsx
<BcPhoneInput
  inputPrefix={<span>📞</span>}
  inputSuffix={<button>?</button>}
/>
```

### React Hook Form Integration
```tsx
import { useForm, Controller } from 'react-hook-form';
<Controller
  name="phone"
  control={control}
  render={({ field }) => (
    <BcPhoneInput {...field} />
  )}
/>
```

### Frequently Asked Questions (FAQ)
- **How to change the mask?**
  - Use the `getMask` prop to provide a mask function per country.
- **How to add a favorite country?**
  - Add country codes to the `favoriteCountries` prop.
- **Is there a performance issue with large lists?**
  - No, react-window is used for virtualized rendering.

### Troubleshooting
- If the country list does not appear, check the `countryList` or `fetchCountries` prop.
- For accessibility, always provide label and placeholder.

### Best Practices
- Leave the placeholder empty to get automatic country code and mask.
- Use inputPrefix for icons, inputSuffix for buttons.
- Highlight favorites and recents for large lists.

### License
MIT
