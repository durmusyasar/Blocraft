# BcPasswordInput

## İçindekiler / Table of Contents
- [Türkçe](#türkçe)
  - [Özellikler](#özellikler)
  - [Props Tablosu](#props-tablosu)
  - [Kullanım](#kullanım)
  - [Şifre Gücü ve Kurallar](#şifre-gücü-ve-kurallar)
  - [Gelişmiş Özellikler](#gelişmiş-özellikler)
  - [React Hook Form ile Kullanım](#react-hook-form-ile-kullanım)
  - [Sıkça Sorulan Sorular (FAQ)](#sıkça-sorulan-sorular-faq)
  - [Sorun Giderme](#sorun-giderme)
  - [En İyi Kullanım İpuçları](#en-iyi-kullanım-ipuçları)
  - [Lisans](#lisans)
- [English](#english)
  - [Features](#features)
  - [Props Table](#props-table)
  - [Usage](#usage)
  - [Password Strength and Rules](#password-strength-and-rules)
  - [Advanced Features](#advanced-features)
  - [React Hook Form Integration](#react-hook-form-integration)
  - [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
  - [Troubleshooting](#troubleshooting)
  - [Best Practices](#best-practices)
  - [License](#license)

---

## Türkçe

### Özellikler
- Material-UI tabanlı, modern ve özelleştirilebilir şifre input bileşeni
- **BcTextField inheritance** - Tüm BcTextField özelliklerini destekler
- **Şifre gücü göstergesi** ve görsel kurallar listesi
- **Şifre göster/gizle** ve **kopyala** butonları
- **Otomatik şifre üretme** özelliği
- **Breach kontrolü** (HaveIBeenPwned API entegrasyonu)
- **Klavye kısayolları** desteği
- **Gelişmiş şifre skorlama** (entropy, yüzde hesaplama)
- **Tema uyumlu dinamik stiller**
- **Mobil optimizasyonlar** ve haptic feedback
- **Gelişmiş i18n** (pluralization, interpolation)
- **Asenkron validasyon** desteği
- **Çoklu dil/i18n desteği** (Türkçe, İngilizce)
- **Erişilebilirlik** (ARIA, screen reader, keyboard navigation)
- **Responsive tasarım** ve tema uyumluluğu
- **Error Boundary** ile hata yönetimi

### Props Tablosu
| Prop | Tip | Açıklama |
|------|-----|----------|
| showStrengthBar | boolean | Şifre gücü barı gösterilsin mi? |
| minLength | number | Minimum şifre uzunluğu |
| requireUppercase | boolean | Büyük harf gereksinimi |
| requireLowercase | boolean | Küçük harf gereksinimi |
| requireNumber | boolean | Rakam gereksinimi |
| requireSpecial | boolean | Özel karakter gereksinimi |
| onStrengthChange | function | Şifre gücü değiştiğinde çağrılır |
| customRules | array | Özel şifre kuralları |
| useZxcvbnStrength | boolean | Gelişmiş şifre gücü ölçümü |
| showPasswordToggle | boolean | Şifre göster/gizle butonu |
| showCopyButton | boolean | Kopyala butonu |
| enablePasswordGenerator | boolean | Şifre üretme özelliği |
| enableBreachCheck | boolean | Breach kontrolü özelliği |
| enableKeyboardShortcuts | boolean | Klavye kısayolları özelliği |
| enableAdvancedScoring | boolean | Gelişmiş şifre skorlama |
| enableThemeAwareStyles | boolean | Tema uyumlu stiller |
| enableAdvancedMonitoring | boolean | Gelişmiş izleme |
| enableMobileOptimizations | boolean | Mobil optimizasyonlar |
| enableAdvancedI18n | boolean | Gelişmiş i18n |
| enableAsyncValidation | boolean | Asenkron validasyon |
| validatePassword | function | Asenkron şifre validasyon fonksiyonu |
| showValidationStatus | boolean | Validasyon durumu gösterilsin mi? |
| validationDebounceMs | number | Validasyon debounce süresi |
| monitoring | object | İzleme fonksiyonları |
| ...rest | ... | Diğer BcTextField props |

### Kullanım

#### Temel Kullanım
```tsx
import { BcPasswordInput } from "../BcPasswordInput/BcPasswordInput";

<BcPasswordInput
  label="Şifre"
  placeholder="Şifrenizi girin"
  showStrengthBar={true}
  minLength={8}
  requireUppercase={true}
  requireLowercase={true}
  requireNumber={true}
  requireSpecial={true}
/>
```

#### Gelişmiş Özelliklerle
```tsx
<BcPasswordInput
  label="Güçlü Şifre"
  placeholder="Güçlü bir şifre girin"
  showStrengthBar={true}
  useZxcvbnStrength={true}
  enablePasswordGenerator={true}
  enableBreachCheck={true}
  enableKeyboardShortcuts={true}
  enableAdvancedScoring={true}
  enableThemeAwareStyles={true}
  enableAdvancedMonitoring={true}
  enableMobileOptimizations={true}
  enableAdvancedI18n={true}
  showPasswordToggle={true}
  showCopyButton={true}
  showClearButton={true}
  customRules={[
    {
      key: 'noCommonWords',
      label: 'Yaygın kelimeler yok',
      test: (password) => !password.toLowerCase().includes('password')
    }
  ]}
  onStrengthChange={(strength) => console.log('Şifre gücü:', strength)}
  monitoring={{
    onChange: (value) => console.log('Şifre değişti:', value),
    onStrengthChange: (strength) => console.log('Güç değişti:', strength),
    onError: (error) => console.error('Hata:', error)
  }}
/>
```

### Şifre Gücü ve Kurallar

#### Temel Kurallar
- **Minimum uzunluk**: Varsayılan 8 karakter
- **Büyük harf**: A-Z arası en az bir karakter
- **Küçük harf**: a-z arası en az bir karakter
- **Rakam**: 0-9 arası en az bir karakter
- **Özel karakter**: !@#$%^&*()_+-=[]{}|;:,.<>? arası en az bir karakter

#### Özel Kurallar
```tsx
const customRules = [
  {
    key: 'noCommonWords',
    label: 'Yaygın kelimeler yok',
    test: (password) => !password.toLowerCase().includes('password')
  },
  {
    key: 'noSequential',
    label: 'Ardışık karakterler yok',
    test: (password) => !password.includes('123') && !password.includes('abc')
  }
];

<BcPasswordInput customRules={customRules} />
```

#### Zxcvbn Entegrasyonu
```tsx
<BcPasswordInput
  useZxcvbnStrength={true}
  // 0-4 arası güç seviyesi (zxcvbn)
  // 0: Çok zayıf, 1: Zayıf, 2: Orta, 3: Güçlü, 4: Çok güçlü
/>
```

### Gelişmiş Özellikler

#### 1. Şifre Üretme
```tsx
<BcPasswordInput
  enablePasswordGenerator={true}
  // "Güçlü Şifre Üret" butonu görünür
  // Otomatik olarak kurallara uygun şifre üretir
/>
```

#### 2. Breach Kontrolü
```tsx
<BcPasswordInput
  enableBreachCheck={true}
  // HaveIBeenPwned API ile şifre güvenlik kontrolü
  // İhlal edilmiş şifreler için uyarı gösterir
/>
```

#### 3. Klavye Kısayolları
```tsx
<BcPasswordInput
  enableKeyboardShortcuts={true}
  // Ctrl+H: Göster/gizle
  // Ctrl+C: Kopyala
  // Ctrl+Delete: Temizle
  // Ctrl+G: Şifre üret
  // Escape: Temizle
/>
```

#### 4. Gelişmiş Skorlama
```tsx
<BcPasswordInput
  enableAdvancedScoring={true}
  // Entropy hesaplama
  // Yüzde bazlı güç skoru
  // Detaylı analiz bilgileri
/>
```

#### 5. Tema Uyumlu Stiller
```tsx
<BcPasswordInput
  enableThemeAwareStyles={true}
  // Dinamik tema renkleri
  // Dark/light mode uyumluluğu
  // Otomatik stil adaptasyonu
/>
```

#### 6. Mobil Optimizasyonlar
```tsx
<BcPasswordInput
  enableMobileOptimizations={true}
  // Haptic feedback
  // Touch optimizasyonları
  // Responsive layout
/>
```

#### 7. Gelişmiş i18n
```tsx
<BcPasswordInput
  enableAdvancedI18n={true}
  // Pluralization desteği
  // String interpolation
  // Gelişmiş çeviri özellikleri
/>
```

### React Hook Form ile Kullanım

```tsx
import { useForm, Controller } from "react-hook-form";
import { BcPasswordInput } from "../BcPasswordInput/BcPasswordInput";

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Şifre gerekli',
          minLength: {
            value: 8,
            message: 'En az 8 karakter olmalı'
          }
        }}
        render={({ field, fieldState }) => (
          <BcPasswordInput
            {...field}
            label="Şifre"
            placeholder="Şifrenizi girin"
            showStrengthBar={true}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <button type="submit">Gönder</button>
    </form>
  );
};
```

### Sıkça Sorulan Sorular (FAQ)

#### Q: Şifre gücü nasıl hesaplanıyor?
A: Temel kurallar (uzunluk, karakter çeşitliliği) ve isteğe bağlı olarak zxcvbn kütüphanesi kullanılarak hesaplanır.

#### Q: Breach kontrolü nasıl çalışıyor?
A: HaveIBeenPwned API kullanılarak şifrenin veri ihlallerinde bulunup bulunmadığı kontrol edilir.

#### Q: Klavye kısayolları nelerdir?
A: Ctrl+H (göster/gizle), Ctrl+C (kopyala), Ctrl+Delete (temizle), Ctrl+G (üret), Escape (temizle).

#### Q: Özel kurallar nasıl eklenir?
A: `customRules` prop'u ile `{ key, label, test }` formatında kurallar eklenebilir.

#### Q: Mobil cihazlarda nasıl çalışır?
A: Haptic feedback, touch optimizasyonları ve responsive layout ile mobil deneyim optimize edilmiştir.

### Sorun Giderme

#### Şifre gücü gösterilmiyor
- `showStrengthBar={true}` olduğundan emin olun
- Şifre alanına değer girildiğinden emin olun

#### Breach kontrolü çalışmıyor
- İnternet bağlantınızı kontrol edin
- API rate limit'ini aşmadığınızdan emin olun

#### Klavye kısayolları çalışmıyor
- `enableKeyboardShortcuts={true}` olduğundan emin olun
- Input focus'ta olduğundan emin olun

#### Özel kurallar çalışmıyor
- `test` fonksiyonunun boolean döndürdüğünden emin olun
- `key` ve `label` alanlarının dolu olduğundan emin olun

### En İyi Kullanım İpuçları

1. **Güvenlik**: `enableBreachCheck={true}` kullanarak şifre güvenliğini artırın
2. **Kullanıcı Deneyimi**: `enablePasswordGenerator={true}` ile kullanıcılara yardımcı olun
3. **Erişilebilirlik**: `enableKeyboardShortcuts={true}` ile klavye kullanıcılarını destekleyin
4. **Performans**: `enableAdvancedMonitoring={true}` ile performansı izleyin
5. **Mobil**: `enableMobileOptimizations={true}` ile mobil deneyimi optimize edin
6. **Tema**: `enableThemeAwareStyles={true}` ile tema uyumluluğunu sağlayın
7. **i18n**: `enableAdvancedI18n={true}` ile gelişmiş çeviri özelliklerini kullanın

### Lisans
MIT

---

## English

### Features
- Material-UI based, modern and customizable password input component
- **BcTextField inheritance** - Supports all BcTextField features
- **Password strength indicator** and visual rules list
- **Show/hide password** and **copy** buttons
- **Automatic password generation** feature
- **Breach check** (HaveIBeenPwned API integration)
- **Keyboard shortcuts** support
- **Advanced password scoring** (entropy, percentage calculation)
- **Theme-aware dynamic styles**
- **Mobile optimizations** and haptic feedback
- **Advanced i18n** (pluralization, interpolation)
- **Async validation** support
- **Multi-language/i18n support** (Turkish, English)
- **Accessibility** (ARIA, screen reader, keyboard navigation)
- **Responsive design** and theme compatibility
- **Error Boundary** with error handling

### Props Table
| Prop | Type | Description |
|------|------|-------------|
| showStrengthBar | boolean | Show password strength bar? |
| minLength | number | Minimum password length |
| requireUppercase | boolean | Require uppercase letter |
| requireLowercase | boolean | Require lowercase letter |
| requireNumber | boolean | Require number |
| requireSpecial | boolean | Require special character |
| onStrengthChange | function | Called when password strength changes |
| customRules | array | Custom password rules |
| useZxcvbnStrength | boolean | Advanced password strength calculation |
| showPasswordToggle | boolean | Show password toggle button |
| showCopyButton | boolean | Show copy button |
| enablePasswordGenerator | boolean | Password generation feature |
| enableBreachCheck | boolean | Breach check feature |
| enableKeyboardShortcuts | boolean | Keyboard shortcuts feature |
| enableAdvancedScoring | boolean | Advanced password scoring |
| enableThemeAwareStyles | boolean | Theme-aware styles |
| enableAdvancedMonitoring | boolean | Advanced monitoring |
| enableMobileOptimizations | boolean | Mobile optimizations |
| enableAdvancedI18n | boolean | Advanced i18n |
| enableAsyncValidation | boolean | Async validation |
| validatePassword | function | Async password validation function |
| showValidationStatus | boolean | Show validation status? |
| validationDebounceMs | number | Validation debounce duration |
| monitoring | object | Monitoring callbacks |
| ...rest | ... | Other BcTextField props |

### Usage

#### Basic Usage
```tsx
import { BcPasswordInput } from "../BcPasswordInput/BcPasswordInput";

<BcPasswordInput
  label="Password"
  placeholder="Enter your password"
  showStrengthBar={true}
  minLength={8}
  requireUppercase={true}
  requireLowercase={true}
  requireNumber={true}
  requireSpecial={true}
/>
```

#### With Advanced Features
```tsx
<BcPasswordInput
  label="Strong Password"
  placeholder="Enter a strong password"
  showStrengthBar={true}
  useZxcvbnStrength={true}
  enablePasswordGenerator={true}
  enableBreachCheck={true}
  enableKeyboardShortcuts={true}
  enableAdvancedScoring={true}
  enableThemeAwareStyles={true}
  enableAdvancedMonitoring={true}
  enableMobileOptimizations={true}
  enableAdvancedI18n={true}
  showPasswordToggle={true}
  showCopyButton={true}
  showClearButton={true}
  customRules={[
    {
      key: 'noCommonWords',
      label: 'No common words',
      test: (password) => !password.toLowerCase().includes('password')
    }
  ]}
  onStrengthChange={(strength) => console.log('Password strength:', strength)}
  monitoring={{
    onChange: (value) => console.log('Password changed:', value),
    onStrengthChange: (strength) => console.log('Strength changed:', strength),
    onError: (error) => console.error('Error:', error)
  }}
/>
```

### Password Strength and Rules

#### Basic Rules
- **Minimum length**: Default 8 characters
- **Uppercase**: At least one A-Z character
- **Lowercase**: At least one a-z character
- **Number**: At least one 0-9 character
- **Special character**: At least one !@#$%^&*()_+-=[]{}|;:,.<>? character

#### Custom Rules
```tsx
const customRules = [
  {
    key: 'noCommonWords',
    label: 'No common words',
    test: (password) => !password.toLowerCase().includes('password')
  },
  {
    key: 'noSequential',
    label: 'No sequential characters',
    test: (password) => !password.includes('123') && !password.includes('abc')
  }
];

<BcPasswordInput customRules={customRules} />
```

#### Zxcvbn Integration
```tsx
<BcPasswordInput
  useZxcvbnStrength={true}
  // 0-4 strength level (zxcvbn)
  // 0: Very weak, 1: Weak, 2: Medium, 3: Strong, 4: Very strong
/>
```

### Advanced Features

#### 1. Password Generation
```tsx
<BcPasswordInput
  enablePasswordGenerator={true}
  // "Generate Strong Password" button appears
  // Automatically generates password following rules
/>
```

#### 2. Breach Check
```tsx
<BcPasswordInput
  enableBreachCheck={true}
  // HaveIBeenPwned API password security check
  // Shows warning for compromised passwords
/>
```

#### 3. Keyboard Shortcuts
```tsx
<BcPasswordInput
  enableKeyboardShortcuts={true}
  // Ctrl+H: Show/hide
  // Ctrl+C: Copy
  // Ctrl+Delete: Clear
  // Ctrl+G: Generate
  // Escape: Clear
/>
```

#### 4. Advanced Scoring
```tsx
<BcPasswordInput
  enableAdvancedScoring={true}
  // Entropy calculation
  // Percentage-based strength score
  // Detailed analysis information
/>
```

#### 5. Theme-Aware Styles
```tsx
<BcPasswordInput
  enableThemeAwareStyles={true}
  // Dynamic theme colors
  // Dark/light mode compatibility
  // Automatic style adaptation
/>
```

#### 6. Mobile Optimizations
```tsx
<BcPasswordInput
  enableMobileOptimizations={true}
  // Haptic feedback
  // Touch optimizations
  // Responsive layout
/>
```

#### 7. Advanced i18n
```tsx
<BcPasswordInput
  enableAdvancedI18n={true}
  // Pluralization support
  // String interpolation
  // Advanced translation features
/>
```

### React Hook Form Integration

```tsx
import { useForm, Controller } from "react-hook-form";
import { BcPasswordInput } from "../BcPasswordInput/BcPasswordInput";

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Must be at least 8 characters'
          }
        }}
        render={({ field, fieldState }) => (
          <BcPasswordInput
            {...field}
            label="Password"
            placeholder="Enter your password"
            showStrengthBar={true}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Frequently Asked Questions (FAQ)

#### Q: How is password strength calculated?
A: Using basic rules (length, character variety) and optionally the zxcvbn library.

#### Q: How does breach check work?
A: Uses HaveIBeenPwned API to check if the password has been found in data breaches.

#### Q: What are the keyboard shortcuts?
A: Ctrl+H (show/hide), Ctrl+C (copy), Ctrl+Delete (clear), Ctrl+G (generate), Escape (clear).

#### Q: How to add custom rules?
A: Use the `customRules` prop with `{ key, label, test }` format.

#### Q: How does it work on mobile devices?
A: Optimized for mobile with haptic feedback, touch optimizations, and responsive layout.

### Troubleshooting

#### Password strength not showing
- Ensure `showStrengthBar={true}`
- Make sure a value is entered in the password field

#### Breach check not working
- Check your internet connection
- Ensure you haven't exceeded API rate limits

#### Keyboard shortcuts not working
- Ensure `enableKeyboardShortcuts={true}`
- Make sure the input is focused

#### Custom rules not working
- Ensure the `test` function returns a boolean
- Make sure `key` and `label` fields are filled

### Best Practices

1. **Security**: Use `enableBreachCheck={true}` to enhance password security
2. **User Experience**: Use `enablePasswordGenerator={true}` to help users
3. **Accessibility**: Use `enableKeyboardShortcuts={true}` to support keyboard users
4. **Performance**: Use `enableAdvancedMonitoring={true}` to monitor performance
5. **Mobile**: Use `enableMobileOptimizations={true}` to optimize mobile experience
6. **Theme**: Use `enableThemeAwareStyles={true}` to ensure theme compatibility
7. **i18n**: Use `enableAdvancedI18n={true}` to use advanced translation features

### License
MIT