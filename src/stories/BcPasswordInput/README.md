# BcPasswordInput

## İçindekiler / Table of Contents
- [Türkçe](#türkçe)
  - [Özellikler](#özellikler)
  - [Props Tablosu](#props-tablosu)
  - [Kullanım](#kullanım)
  - [BcTextField Kalıtımı](#bctextfield-kalıtımı)
  - [React Hook Form ile Kullanım](#react-hook-form-ile-kullanım)
  - [Hook'lar](#hooklar)
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
  - [Hooks](#hooks)
  - [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
  - [Troubleshooting](#troubleshooting)
  - [Best Practices](#best-practices)
  - [License](#license)

---

## Türkçe

### Özellikler
- Material-UI tabanlı, BcTextField'den türetilmiş şifre input bileşeni
- Şifre gücü göstergesi, görünürlük toggle'ı, şifre üretimi ve güvenlik analizi
- BcTextField'in tüm özelliklerini kalıtım yoluyla alır
- Responsive, status, loading, clear, i18n, erişilebilirlik desteği
- **Çoklu dil/i18n desteği** (translations, locale, fallbackLocale)
- **Async validation** (enableAsyncValidation, validateInput, showValidationStatus, validationDebounceMs)
- **Monitoring/analitik** (monitoring prop'u ile değişiklik, hata, performans callback'leri)
- **Custom render** (renderCustomIcon, renderHelperText)
- **High contrast & reduced motion** (erişilebilirlik için)
- **RTL (sağdan sola) desteği**

#### 🔐 Şifre Özel Özellikleri
- **Şifre Görünürlük Toggle'ı**: Şifreyi göster/gizle butonu
- **Şifre Gücü Göstergesi**: Gerçek zamanlı şifre gücü analizi
- **Şifre Üretimi**: Güvenli şifre üretme özelliği
- **Güvenlik Analizi**: Yaygın şifre, klavye kalıpları ve daha fazlası için kontrol
- **Validasyon**: Kapsamlı şifre validasyonu
- **Analytics**: Kullanıcı davranışı ve performans takibi

#### 🚀 Gelişmiş Özellikler
- **QR Kod**: Şifre için QR kod oluşturma
- **Sesli Arama**: Sesli komutlarla şifre arama
- **Öneriler**: Akıllı şifre önerileri
- **Geçmiş Takibi**: Detaylı şifre geçmişi
- **Mobil Optimizasyonlar**: Mobil cihazlar için özel optimizasyonlar
- **Klavye Kısayolları**: Güçlü kullanıcılar için klavye kısayolları

#### ♿ Erişilebilirlik ve Performans
- **Accessibility**: Screen reader, keyboard navigation, ARIA labels, live regions, focus management
- **Performance**: Lazy loading, debouncing, memoization, efficient rendering
- **Monitoring**: Real-time monitoring, analytics, error reporting, user behavior tracking

### Props Tablosu

#### BcTextField'den Kalıtılan Props
Tüm BcTextField props'ları kullanılabilir. Detaylı liste için BcTextField dokümantasyonuna bakın.

#### Şifre Özel Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| **Temel Props** | | | |
| showPasswordToggle | boolean | true | Şifre görünürlük toggle butonunu göster |
| passwordToggleLabel | string | - | Toggle butonu için özel etiket |
| enablePasswordGeneration | boolean | false | Şifre üretim özelliğini etkinleştir |
| enableStrengthIndicator | boolean | true | Şifre gücü göstergesini etkinleştir |
| showStrengthMeter | boolean | true | Şifre gücü çubuğunu göster |
| enablePasswordValidation | boolean | true | Şifre validasyonunu etkinleştir |
| showRequirements | boolean | true | Şifre gereksinimlerini göster |
| **Güvenlik Props** | | | |
| securityFeatures | PasswordSecurityFeatures | - | Güvenlik özellikleri konfigürasyonu |
| onSecurityWarning | (warning: string, severity: string) => void | - | Güvenlik uyarısı callback'i |
| **Görsel Props** | | | |
| strengthDisplayMode | 'text' \| 'meter' \| 'both' \| 'none' | 'both' | Şifre gücü gösterim modu |
| strengthColorScheme | 'default' \| 'material' \| 'custom' | 'default' | Şifre gücü renk şeması |
| customStrengthColors | object | - | Özel şifre gücü renkleri |
| requirementsPosition | 'below' \| 'tooltip' \| 'popover' | 'below' | Gereksinimler konumu |
| requirementsStyle | 'list' \| 'inline' \| 'compact' | 'list' | Gereksinimler stili |
| **Çeviri Props** | | | |
| passwordTranslations | object | - | Özel çeviriler |
| passwordToggleAriaLabel | string | - | Toggle butonu için aria etiketi |
| strengthMeterAriaLabel | string | - | Güç çubuğu için aria etiketi |
| requirementsAriaLabel | string | - | Gereksinimler için aria etiketi |
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
import { BcPasswordInput } from "./components/BcPasswordInput/BcPasswordInput";

<BcPasswordInput
  label="Şifre"
  placeholder="Şifrenizi girin"
/>
```

#### Gelişmiş Kullanım
```tsx
<BcPasswordInput
  label="Güvenli Şifre"
  placeholder="Şifrenizi girin veya üretin"
  appearance="premium"
  size="large"
  color="success"
  showClearButton={true}
  responsiveWidth={true}
  enableRTL={true}
  
  // Şifre özel özellikler
  showPasswordToggle={true}
  enablePasswordGeneration={true}
  enableStrengthIndicator={true}
  showStrengthMeter={true}
  enablePasswordValidation={true}
  showRequirements={true}
  
  // Güvenlik özellikleri
  securityFeatures={{
    enableCommonPasswordCheck: true,
    enablePatternDetection: true,
    enableKeyboardPatternCheck: true,
    enableRepeatedCharCheck: true,
    enableSequentialCharCheck: true,
  }}
  
  // Özel yapılandırma
  customStrengthColors={{
    veryWeak: '#ff0000',
    weak: '#ff8800',
    fair: '#ffaa00',
    good: '#00aa00',
    strong: '#0088ff',
  }}
  
  passwordTranslations={{
    veryWeak: 'Çok Zayıf',
    weak: 'Zayıf',
    fair: 'Orta',
    good: 'İyi',
    strong: 'Güçlü',
    generatePassword: 'Şifre Üret',
    requirementsLabel: 'Şifre Gereksinimleri',
  }}
  
  onStrengthChange={(strength, score) => {
    console.log('Şifre gücü:', strength, score);
  }}
  
  onPasswordGenerated={(password) => {
    console.log('Üretilen şifre:', password);
  }}
/>
```

### BcTextField Kalıtımı

#### Tüm BcTextField Özellikleri Kullanılabilir
```tsx
// BcTextField'den kalıtılan tüm özellikler çalışır
<BcPasswordInput
  // BcTextField kalıtılan props
  label="Şifre"
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
  helperText="Şifrenizi girin"
  status="success"
  statusMessage="Geçerli şifre"
  
  // Şifre özel props
  showPasswordToggle={true}
  enablePasswordGeneration={true}
  enableStrengthIndicator={true}
  enablePasswordValidation={true}
/>
```

### React Hook Form ile Kullanım
```tsx
import { useForm, Controller } from 'react-hook-form';
import { BcPasswordInput } from './BcPasswordInput';

function MyForm() {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <BcPasswordInput
            {...field}
            label="Şifre"
            placeholder="Şifrenizi girin"
            showPasswordToggle
            enablePasswordGeneration
            enableStrengthIndicator
            enablePasswordValidation
          />
        )}
      />
      <button type="submit">Gönder</button>
    </form>
  );
}
```

### Hook'lar

#### usePasswordStrength
Şifre gücü analizi için hook.

```tsx
import { usePasswordStrength } from './hooks/usePasswordStrength';

const { strengthResult, analyzePassword, getStrengthColor } = usePasswordStrength({
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
});
```

#### usePasswordVisibility
Şifre görünürlük yönetimi için hook.

```tsx
import { usePasswordVisibility } from './hooks/usePasswordVisibility';

const { isVisible, toggleVisibility, getToggleProps } = usePasswordVisibility({
  defaultVisible: false,
  rememberVisibility: true,
  onVisibilityChange: (visible) => console.log('Visibility changed:', visible),
});
```

#### usePasswordGeneration
Şifre üretimi için hook.

```tsx
import { usePasswordGeneration } from './hooks/usePasswordGeneration';

const { generatePassword, isGenerating, copyToClipboard } = usePasswordGeneration({
  length: 12,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSpecialChars: true,
});
```

#### usePasswordSecurity
Güvenlik analizi için hook.

```tsx
import { usePasswordSecurity } from './hooks/usePasswordSecurity';

const { analyzePasswordSecurity, securityWarnings } = usePasswordSecurity({
  enableCommonPasswordCheck: true,
  enablePatternDetection: true,
  enableKeyboardPatternCheck: true,
});
```

#### usePasswordValidation
Validasyon için hook.

```tsx
import { usePasswordValidation } from './hooks/usePasswordValidation';

const { validatePassword, validationResult } = usePasswordValidation([
  {
    id: 'minLength',
    name: 'Minimum Length',
    test: (password) => password.length >= 8,
    message: 'En az 8 karakter olmalı',
    weight: 10,
    enabled: true,
  },
]);
```

#### usePasswordAnalytics
Analytics için hook.

```tsx
import { usePasswordAnalytics } from './hooks/usePasswordAnalytics';

const { trackPasswordInput, trackStrengthChange, getCurrentSessionMetrics } = usePasswordAnalytics({
  trackStrengthChanges: true,
  trackVisibilityToggles: true,
  trackGenerationUsage: true,
});
```

### Sıkça Sorulan Sorular (FAQ)
- **BcPasswordInput neden BcTextField'den türetiliyor?**
  - Tüm BcTextField özelliklerini kalıtım yoluyla almak ve tutarlı API sağlamak için.
- **i18n çevirileri nereden yükleniyor?**
  - i18n çevirileri i18n klasöründeki JSON dosyalarından veya translations prop'u ile yüklenir.
- **Şifre gücü nasıl hesaplanıyor?**
  - Uzunluk, karakter çeşitliliği, karmaşıklık ve güvenlik kurallarına göre hesaplanır.
- **Şifre üretimi nasıl özelleştirilir?**
  - generationOptions prop'u ile uzunluk, karakter setleri ve kurallar tanımlanabilir.

### Sorun Giderme
- **"toHaveNoViolations" hatası:**
  - jest-axe için tip dosyasını (jest-axe.d.ts) ekleyin.
- **"Cannot find module 'react-hook-form'":**
  - Paketi kurduğunuzdan ve import ettiğinizden emin olun.
- **Performans sorunları:**
  - Çok büyük şifre listelerinde lazy loading ve memoization kullanın.

### En İyi Kullanım İpuçları
- i18n için translations prop'unu ve locale/fallbackLocale değerlerini kullanın.
- Async validation fonksiyonlarını useCallback ile sarmalayın.
- Monitoring callback'lerinde try/catch kullanın.
- customStrengthColors ile şifre gücü renklerini özelleştirin.
- enableMobileOptimizations'ı mobil uygulamalar için etkinleştirin.

### Lisans
MIT

---

## English

### Features
- Material-UI based password input component **derived from BcTextField**
- Password strength indicator, visibility toggle, password generation and security analysis
- Inherits all BcTextField features through proper inheritance
- Responsive, status, loading, clear, i18n, accessibility support
- **Multi-language/i18n support** (translations, locale, fallbackLocale)
- **Async validation** (enableAsyncValidation, validateInput, showValidationStatus, validationDebounceMs)
- **Monitoring/analytics** (monitoring prop with onChange, onError, onPerformance callbacks)
- **Custom render** (renderCustomIcon, renderHelperText)
- **High contrast & reduced motion** (for accessibility)
- **RTL (right-to-left) support**

#### 🔐 Password-Specific Features
- **Password Visibility Toggle**: Show/hide password button
- **Password Strength Indicator**: Real-time password strength analysis
- **Password Generation**: Secure password generation feature
- **Security Analysis**: Control for common passwords, keyboard patterns and more
- **Validation**: Comprehensive password validation
- **Analytics**: User behavior and performance tracking

#### 🚀 Advanced Features
- **QR Code**: Generate QR codes for passwords
- **Voice Search**: Search passwords with voice commands
- **Suggestions**: Smart password suggestions
- **History Tracking**: Detailed password history
- **Mobile Optimizations**: Special optimizations for mobile devices
- **Keyboard Shortcuts**: Keyboard shortcuts for power users

#### ♿ Accessibility and Performance
- **Accessibility**: Screen reader, keyboard navigation, ARIA labels, live regions, focus management
- **Performance**: Lazy loading, debouncing, memoization, efficient rendering
- **Monitoring**: Real-time monitoring, analytics, error reporting, user behavior tracking

### Props Table

#### Inherited Props (from BcTextField)
All BcTextField props are available. See BcTextField documentation for complete list.

#### Password-Specific Props

| Prop | Type | Default | Description |
|------|-----|---------|-------------|
| **Basic Props** | | | |
| showPasswordToggle | boolean | true | Show password visibility toggle button |
| passwordToggleLabel | string | - | Custom label for toggle button |
| enablePasswordGeneration | boolean | false | Enable password generation feature |
| enableStrengthIndicator | boolean | true | Enable password strength indicator |
| showStrengthMeter | boolean | true | Show password strength meter |
| enablePasswordValidation | boolean | true | Enable password validation |
| showRequirements | boolean | true | Show password requirements |
| **Security Props** | | | |
| securityFeatures | PasswordSecurityFeatures | - | Security features configuration |
| onSecurityWarning | (warning: string, severity: string) => void | - | Security warning callback |
| **Visual Props** | | | |
| strengthDisplayMode | 'text' \| 'meter' \| 'both' \| 'none' | 'both' | Password strength display mode |
| strengthColorScheme | 'default' \| 'material' \| 'custom' | 'default' | Password strength color scheme |
| customStrengthColors | object | - | Custom password strength colors |
| requirementsPosition | 'below' \| 'tooltip' \| 'popover' | 'below' | Requirements position |
| requirementsStyle | 'list' \| 'inline' \| 'compact' | 'list' | Requirements style |
| **Translation Props** | | | |
| passwordTranslations | object | - | Custom translations |
| passwordToggleAriaLabel | string | - | Aria label for toggle button |
| strengthMeterAriaLabel | string | - | Aria label for strength meter |
| requirementsAriaLabel | string | - | Aria label for requirements |
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
import { BcPasswordInput } from "./components/BcPasswordInput/BcPasswordInput";

<BcPasswordInput
  label="Password"
  placeholder="Enter your password"
/>
```

#### Advanced Usage
```tsx
<BcPasswordInput
  label="Secure Password"
  placeholder="Enter or generate your password"
  appearance="premium"
  size="large"
  color="success"
  showClearButton={true}
  responsiveWidth={true}
  enableRTL={true}
  
  // Password-specific features
  showPasswordToggle={true}
  enablePasswordGeneration={true}
  enableStrengthIndicator={true}
  showStrengthMeter={true}
  enablePasswordValidation={true}
  showRequirements={true}
  
  // Security features
  securityFeatures={{
    enableCommonPasswordCheck: true,
    enablePatternDetection: true,
    enableKeyboardPatternCheck: true,
    enableRepeatedCharCheck: true,
    enableSequentialCharCheck: true,
  }}
  
  // Custom configuration
  customStrengthColors={{
    veryWeak: '#ff0000',
    weak: '#ff8800',
    fair: '#ffaa00',
    good: '#00aa00',
    strong: '#0088ff',
  }}
  
  passwordTranslations={{
    veryWeak: 'Very Weak',
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
    generatePassword: 'Generate Password',
    requirementsLabel: 'Password Requirements',
  }}
  
  onStrengthChange={(strength, score) => {
    console.log('Password strength:', strength, score);
  }}
  
  onPasswordGenerated={(password) => {
    console.log('Generated password:', password);
  }}
/>
```

### BcTextField Inheritance

#### All BcTextField Features Available
```tsx
// All BcTextField inherited features work
<BcPasswordInput
  // BcTextField inherited props
  label="Password"
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
  helperText="Enter your password"
  status="success"
  statusMessage="Valid password"
  
  // Password-specific props
  showPasswordToggle={true}
  enablePasswordGeneration={true}
  enableStrengthIndicator={true}
  enablePasswordValidation={true}
/>
```

### React Hook Form Integration
```tsx
import { useForm, Controller } from 'react-hook-form';
import { BcPasswordInput } from './BcPasswordInput';

function MyForm() {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <BcPasswordInput
            {...field}
            label="Password"
            placeholder="Enter your password"
            showPasswordToggle
            enablePasswordGeneration
            enableStrengthIndicator
            enablePasswordValidation
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Hooks

#### usePasswordStrength
Hook for password strength analysis.

```tsx
import { usePasswordStrength } from './hooks/usePasswordStrength';

const { strengthResult, analyzePassword, getStrengthColor } = usePasswordStrength({
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
});
```

#### usePasswordVisibility
Hook for password visibility management.

```tsx
import { usePasswordVisibility } from './hooks/usePasswordVisibility';

const { isVisible, toggleVisibility, getToggleProps } = usePasswordVisibility({
  defaultVisible: false,
  rememberVisibility: true,
  onVisibilityChange: (visible) => console.log('Visibility changed:', visible),
});
```

#### usePasswordGeneration
Hook for password generation.

```tsx
import { usePasswordGeneration } from './hooks/usePasswordGeneration';

const { generatePassword, isGenerating, copyToClipboard } = usePasswordGeneration({
  length: 12,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSpecialChars: true,
});
```

#### usePasswordSecurity
Hook for security analysis.

```tsx
import { usePasswordSecurity } from './hooks/usePasswordSecurity';

const { analyzePasswordSecurity, securityWarnings } = usePasswordSecurity({
  enableCommonPasswordCheck: true,
  enablePatternDetection: true,
  enableKeyboardPatternCheck: true,
});
```

#### usePasswordValidation
Hook for validation.

```tsx
import { usePasswordValidation } from './hooks/usePasswordValidation';

const { validatePassword, validationResult } = usePasswordValidation([
  {
    id: 'minLength',
    name: 'Minimum Length',
    test: (password) => password.length >= 8,
    message: 'At least 8 characters required',
    weight: 10,
    enabled: true,
  },
]);
```

#### usePasswordAnalytics
Hook for analytics.

```tsx
import { usePasswordAnalytics } from './hooks/usePasswordAnalytics';

const { trackPasswordInput, trackStrengthChange, getCurrentSessionMetrics } = usePasswordAnalytics({
  trackStrengthChanges: true,
  trackVisibilityToggles: true,
  trackGenerationUsage: true,
});
```

### Frequently Asked Questions (FAQ)
- **Why does BcPasswordInput extend BcTextField?**
  - To inherit all BcTextField features and provide consistent API.
- **Where do i18n translations come from?**
  - From i18n JSON files or the translations prop.
- **How is password strength calculated?**
  - Based on length, character variety, complexity and security rules.
- **How to customize password generation?**
  - Use generationOptions prop to define length, character sets and rules.

### Troubleshooting
- **"toHaveNoViolations" error:**
  - Add a jest-axe type declaration file (jest-axe.d.ts).
- **"Cannot find module 'react-hook-form'":**
  - Make sure the package is installed and imported.
- **Performance issues:**
  - Use lazy loading and memoization for large password lists.

### Best Practices
- Use translations prop and locale/fallbackLocale for i18n.
- Wrap async validation functions with useCallback.
- Use try/catch in monitoring callbacks.
- Customize with customStrengthColors for password strength colors.
- Enable enableMobileOptimizations for mobile apps.

### License
MIT