# BcTextField

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
- Material-UI tabanlı, modern ve özelleştirilebilir TextField
- Appearance, size, status, loading, clear button, email validasyonu
- Responsive genişlik, helperText, disabled, adornment, slotProps desteği
- Controlled/uncontrolled kullanım
- **Çoklu dil/i18n desteği** (translations, locale, fallbackLocale)
- **Async validation** (enableAsyncValidation, validateInput, showValidationStatus, validationDebounceMs)
- **Monitoring/analitik** (monitoring prop'u ile değişiklik, hata, performans callback'leri)
- **Custom render** (renderCustomIcon, renderHelperText)
- **High contrast & reduced motion** (erişilebilirlik için)
- **RTL (sağdan sola) desteği**
- **fontSize** ile yazı tipi boyutu kontrolü

### Props Tablosu
| Prop                | Tip      | Açıklama |
|---------------------|----------|----------|
| appearance          | string   | Görünüm stili (premium, soft, glass, minimal, neumorph, underline, dark, borderless) |
| size                | string   | Boyut (small, medium, normal, large) |
| status              | string   | Durum göstergesi (error, warning, success, info) |
| color               | string   | Renk teması (primary, secondary, success, error, info, warning) |
| responsiveWidth     | boolean  | Responsive genişlik |
| showClearButton     | boolean  | Temizleme butonu göster |
| loading             | boolean  | Yükleme durumu |
| disabled            | boolean  | Devre dışı |
| type                | string   | Input tipi (text, email, number, tel, url) |
| translations        | object   | Çoklu dil/i18n çevirileri |
| locale, fallbackLocale | string | Dil kodu ve yedek dil |
| enableAsyncValidation | boolean | Asenkron doğrulama aktif |
| validateInput       | fonksiyon| Asenkron doğrulama fonksiyonu |
| showValidationStatus| boolean  | Doğrulama durumunu göster |
| validationDebounceMs| number   | Doğrulama debounce süresi (ms) |
| monitoring          | object   | onChange, onError, onPerformance callback'leri |
| renderCustomIcon    | fonksiyon| Durum ikonunu özelleştir |
| renderHelperText    | fonksiyon| helperText'i özelleştir |
| enableHighContrast  | boolean  | Yüksek kontrast modu |
| enableReducedMotion | boolean  | Hareket azaltma modu |
| enableRTL           | boolean  | Sağdan sola yazım desteği |
| fontSize            | number/string | Yazı tipi boyutu |
| inputPrefix         | node     | Input başına özel içerik |
| inputSuffix         | node     | Input sonuna özel içerik |
| ...                | ...      | Diğer tüm standart ve gelişmiş özellikler |

### Kullanım
```tsx
import { BcTextField } from "../BcTextField/BcTextField";

<BcTextField
  label="Ad Soyad"
  placeholder="Adınızı girin"
  appearance="premium"
  showClearButton
  translations={{ clearButtonLabel: "Temizle", helperText: "Yardım metni", statusMessage: "Durum mesajı", label: "Etiket" }}
  locale="tr"
  helperText="Yardım metni"
/>
```

### inputPrefix ve inputSuffix Kullanımı
```tsx
<BcTextField
  label="Telefon"
  placeholder="5xx xxx xx xx"
  inputPrefix={<span style={{ color: '#888', marginRight: 4 }}>+90</span>}
  inputSuffix={<span style={{ color: '#888', marginLeft: 4 }}>.tr</span>}
/>
```

### React Hook Form ile Kullanım
```tsx
import { useForm, Controller } from 'react-hook-form';
import { BcTextField } from './BcTextField';

function MyForm() {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="fullName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <BcTextField
            {...field}
            label="Ad Soyad"
            placeholder="Adınızı girin"
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
- **BcTextField neden slotProps.input kullanıyor?**
  - MUI v5+ ile uyumluluk ve ileri düzey özelleştirme için slotProps.input kullanılır. InputProps yerine slotProps tercih edilmelidir.
- **i18n çevirileri nereden yükleniyor?**
  - i18n çevirileri i18n klasöründeki JSON dosyalarından veya translations prop'u ile yüklenir.
- **Async validation neden sürekli çalışıyor?**
  - validateInput fonksiyonunu useCallback ile sarmalayın, aksi halde referans değişimi nedeniyle sürekli tetiklenir.
- **inputPrefix/inputSuffix ile InputAdornment çakışır mı?**
  - Hayır, otomatik olarak birleştirilir ve çakışma olmaz.

### Sorun Giderme
- **"toHaveNoViolations" hatası:**
  - jest-axe için tip dosyasını (jest-axe.d.ts) ekleyin.
- **"Cannot find module 'react-hook-form'":**
  - Paketi kurduğunuzdan ve import ettiğinizden emin olun.
- **Performans sorunları:**
  - Çok büyük formlarda memoization (useMemo, React.memo) ve React Profiler kullanın.

### En İyi Kullanım İpuçları
- i18n için translations prop'unu ve locale/fallbackLocale değerlerini kullanın.
- Async validation fonksiyonlarını useCallback ile sarmalayın.
- Monitoring callback'lerinde try/catch kullanın.
- inputPrefix/inputSuffix ile ikon/metin eklerken erişilebilirlik için aria-label kullanın.
- slotProps.input üzerinden native input özelliklerini (autoFocus, inputMode, vs.) geçirin.

### Lisans
MIT

---

## English

### Features
- Material-UI based, modern and customizable TextField
- Appearance, size, status, loading, clear button, email validation
- Responsive width, helperText, disabled, adornment, slotProps support
- Controlled/uncontrolled usage
- **Multi-language/i18n support** (translations, locale, fallbackLocale)
- **Async validation** (enableAsyncValidation, validateInput, showValidationStatus, validationDebounceMs)
- **Monitoring/analytics** (monitoring prop with onChange, onError, onPerformance callbacks)
- **Custom render** (renderCustomIcon, renderHelperText)
- **High contrast & reduced motion** (for accessibility)
- **RTL (right-to-left) support**
- **fontSize** for font size control

### Props Table
| Prop                | Type     | Description |
|---------------------|----------|-------------|
| appearance          | string   | Appearance style (premium, soft, glass, minimal, neumorph, underline, dark, borderless) |
| size                | string   | Size (small, medium, normal, large) |
| status              | string   | Status indicator (error, warning, success, info) |
| color               | string   | Color theme (primary, secondary, success, error, info, warning) |
| responsiveWidth     | boolean  | Responsive width |
| showClearButton     | boolean  | Show clear button |
| loading             | boolean  | Loading state |
| disabled            | boolean  | Disabled |
| type                | string   | Input type (text, email, number, tel, url) |
| translations        | object   | Multi-language/i18n translations |
| locale, fallbackLocale | string | Language code and fallback |
| enableAsyncValidation | boolean | Enable async validation |
| validateInput       | function | Async validation function |
| showValidationStatus| boolean  | Show validation status |
| validationDebounceMs| number   | Validation debounce duration (ms) |
| monitoring          | object   | onChange, onError, onPerformance callbacks |
| renderCustomIcon    | function | Custom status icon renderer |
| renderHelperText    | function | Custom helperText renderer |
| enableHighContrast  | boolean  | High contrast mode |
| enableReducedMotion | boolean  | Reduced motion mode |
| enableRTL           | boolean  | Right-to-left support |
| fontSize            | number/string | Font size |
| inputPrefix         | node     | Custom content at input start |
| inputSuffix         | node     | Custom content at input end |
| ...                | ...      | All other standard and advanced features |

### Usage
```tsx
import { BcTextField } from "../BcTextField/BcTextField";

<BcTextField
  label="Full Name"
  placeholder="Enter your name"
  appearance="premium"
  showClearButton
  translations={{ clearButtonLabel: "Clear", helperText: "Helper text", statusMessage: "Status message", label: "Label" }}
  locale="en"
  helperText="Helper text"
/>
```

### inputPrefix and inputSuffix Usage
```tsx
<BcTextField
  label="Phone"
  placeholder="5xx xxx xx xx"
  inputPrefix={<span style={{ color: '#888', marginRight: 4 }}>+90</span>}
  inputSuffix={<span style={{ color: '#888', marginLeft: 4 }}>.tr</span>}
/>
```

### React Hook Form Integration
```tsx
import { useForm, Controller } from 'react-hook-form';
import { BcTextField } from './BcTextField';

function MyForm() {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="fullName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <BcTextField
            {...field}
            label="Full Name"
            placeholder="Enter your name"
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
- **Why does BcTextField use slotProps.input?**
  - For MUI v5+ compatibility and advanced customization. Prefer slotProps over InputProps.
- **Where do i18n translations come from?**
  - From i18n JSON files or the translations prop.
- **Why does async validation run continuously?**
  - Wrap your validateInput function with useCallback to avoid reference changes.
- **Do inputPrefix/inputSuffix conflict with InputAdornment?**
  - No, they are automatically merged and do not conflict.

### Troubleshooting
- **"toHaveNoViolations" error:**
  - Add a jest-axe type declaration file (jest-axe.d.ts).
- **"Cannot find module 'react-hook-form'":**
  - Make sure the package is installed and imported.
- **Performance issues:**
  - Use memoization (useMemo, React.memo) and React Profiler for large forms.

### Best Practices
- Use translations prop and locale/fallbackLocale for i18n.
- Wrap async validation functions with useCallback.
- Use try/catch in monitoring callbacks.
- Add aria-label for accessibility when using inputPrefix/inputSuffix with icons/text.
- Pass native input features (autoFocus, inputMode, etc.) via slotProps.input.

### License
MIT 