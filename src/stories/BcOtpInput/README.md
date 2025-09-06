# BcOtpInput

## İçindekiler / Table of Contents
- [Türkçe](#türkçe)
  - [Özellikler](#özellikler)
  - [Props Tablosu](#props-tablosu)
  - [Kullanım](#kullanım)
  - [OTP Doğrulama](#otp-doğrulama)
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
  - [OTP Validation](#otp-validation)
  - [Advanced Features](#advanced-features)
  - [React Hook Form Integration](#react-hook-form-integration)
  - [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
  - [Troubleshooting](#troubleshooting)
  - [Best Practices](#best-practices)
  - [License](#license)

---

## Türkçe

### Özellikler
- Material-UI tabanlı, modern ve özelleştirilebilir OTP input bileşeni
- **BcTextField inheritance** - Tüm BcTextField özelliklerini destekler
- **Çok haneli giriş** ve otomatik odak yönetimi
- **Klavye navigasyonu** (ok tuşları, backspace, enter, tab)
- **Paste desteği** ile toplu kod girişi
- **Otomatik doğrulama** ve temizleme
- **Maskelenmiş giriş** (şifre gibi) desteği
- **Gelişmiş klavye kısayolları** desteği
- **Otomatik tamamlama** özelliği
- **Haptic feedback** mobil cihazlar için
- **Gelişmiş izleme** ve analitik
- **Mobil optimizasyonlar** ve responsive tasarım
- **Gelişmiş i18n** (pluralization, interpolation)
- **Tema uyumlu dinamik stiller**
- **Asenkron validasyon** desteği
- **Çoklu dil/i18n desteği** (Türkçe, İngilizce)
- **Erişilebilirlik** (ARIA, screen reader, keyboard navigation)
- **Error Boundary** ile hata yönetimi

#### 🚀 **Yeni Profesyonel Özellikler**
- **🎤 Voice Input** - Sesli OTP girişi
- **📷 Camera Integration** - QR kod okuma
- **📡 NFC Support** - NFC ile OTP transferi
- **📶 Bluetooth Integration** - Bluetooth cihazlardan OTP alma
- **🔒 Security Enhancements** - Şifreleme, rate limiting, session management
- **♿ Enhanced Accessibility** - Screen reader, high contrast, voice commands, braille support
- **📱 Mobile Enhancements** - Haptic feedback, touch gestures, swipe support
- **⚡ Performance Optimizations** - Virtual scrolling, lazy loading, memoization
- **🔗 Integration Features** - React Hook Form, Formik, Redux, Context API
- **🎨 UI/UX Improvements** - Skeleton loading, micro-interactions, theme customization
- **💾 Data Management** - Local storage, session storage, IndexedDB, cache
- **📊 Monitoring & Analytics** - Error tracking, performance monitoring, user analytics
- **🧪 Advanced Testing** - Comprehensive test utilities and mocking

#### 🚀 **Professional Features (Yeni!)**
- **Enhanced Accessibility** - High contrast, reduced motion, voice input, screen reader
- **Advanced Features** - Biometric authentication, QR code generation, SMS integration
- **Developer Experience** - Debug mode, performance metrics, error tracking
- **Animations** - Success/error animations, focus transitions, loading states
- **Customization** - Custom shapes, themes, colors, gradients, effects
- **Performance** - React.memo, useCallback, useMemo optimizations
- **Integration** - Form libraries, state management support

### Props Tablosu
| Prop | Tip | Açıklama |
|------|-----|----------|
| length | number | OTP hane sayısı |
| value | string | OTP değeri |
| onChange | function | OTP değiştiğinde çağrılır |
| onClear | function | OTP temizlendiğinde çağrılır |
| onComplete | function | OTP tamamlandığında çağrılır |
| validateOtp | function | OTP doğrulama fonksiyonu |
| mask | boolean | Maskelenmiş giriş (şifre gibi) |
| inputType | string | Giriş tipi (number/text) |
| autoFocus | boolean | Otomatik odaklanma |
| autoClear | boolean | Otomatik temizleme |
| autoValidate | boolean | Otomatik doğrulama |
| validationDebounceMs | number | Doğrulama debounce süresi |
| monitoring | object | İzleme fonksiyonları |
| enableAdvancedFeatures | boolean | Gelişmiş özellikler |
| enableKeyboardShortcuts | boolean | Klavye kısayolları |
| enableAutoComplete | boolean | Otomatik tamamlama |
| enableHapticFeedback | boolean | Haptic feedback |
| enableAdvancedMonitoring | boolean | Gelişmiş izleme |
| enableMobileOptimizations | boolean | Mobil optimizasyonlar |
| enableAdvancedI18n | boolean | Gelişmiş i18n |
| enableThemeAwareStyles | boolean | Tema uyumlu stiller |

#### 🚀 **Professional Props (Yeni!)**
| Prop | Tip | Açıklama |
|------|-----|----------|
| **Enhanced Accessibility** |
| enableHighContrast | boolean | Yüksek kontrast modu |
| enableReducedMotion | boolean | Azaltılmış animasyon |
| enableVoiceInput | boolean | Sesli giriş |
| enableScreenReaderAnnouncements | boolean | Ekran okuyucu duyuruları |
| **Advanced Features** |
| enableBiometric | boolean | Biyometrik kimlik doğrulama |
| enableQRCode | boolean | QR kod üretimi |
| enableSMS | boolean | SMS entegrasyonu |
| phoneNumber | string | Telefon numarası |
| qrCodeData | string | QR kod verisi |
| **Developer Experience** |
| enableDebug | boolean | Debug modu |
| enableMetrics | boolean | Performans metrikleri |
| onDebugLog | function | Debug log callback |
| onPerformanceIssue | function | Performans sorunu callback |
| **Animations** |
| enableAnimations | boolean | Animasyonları etkinleştir |
| animationDuration | number | Animasyon süresi (ms) |
| enableSuccessAnimation | boolean | Başarı animasyonu |
| enableErrorAnimation | boolean | Hata animasyonu |
| enableLoadingAnimation | boolean | Yükleme animasyonu |
| enableFocusAnimation | boolean | Odak animasyonu |
| **Customization** |
| inputShape | string | Input şekli (square/circle/hexagon/rounded) |
| inputSize | string | Input boyutu (small/medium/large/xlarge) |
| theme | string | Tema (light/dark/high-contrast/auto) |
| enableCustomColors | boolean | Özel renkler |
| primaryColor | string | Ana renk |
| secondaryColor | string | İkincil renk |
| errorColor | string | Hata rengi |
| successColor | string | Başarı rengi |
| warningColor | string | Uyarı rengi |
| infoColor | string | Bilgi rengi |
| enableGradient | boolean | Gradient efektleri |
| enableGlow | boolean | Parlama efekti |
| enableShadow | boolean | Gölge efekti |
| ...rest | ... | Diğer BcTextField props |

### Kullanım

#### Temel Kullanım
```tsx
import { BcOtpInput } from "../BcOtpInput/BcOtpInput";

<BcOtpInput
  length={6}
  label="OTP Kodu"
  helperText="Cihazınıza gönderilen kodu girin"
  showClearButton={true}
  autoFocus={true}
/>
```

#### Gelişmiş Özelliklerle
```tsx
<BcOtpInput
  length={6}
  label="Doğrulama Kodu"
  helperText="SMS ile gelen kodu girin"
  inputType="number"
  mask={false}
  autoFocus={true}
  autoClear={true}
  autoValidate={true}
  enableAdvancedFeatures={true}
  enableKeyboardShortcuts={true}
  enableAutoComplete={true}
  enableHapticFeedback={true}
  enableAdvancedMonitoring={true}
  enableMobileOptimizations={true}
  enableAdvancedI18n={true}
  enableThemeAwareStyles={true}
  validateOtp={async (otp) => {
    // API doğrulama
    const response = await fetch('/api/validate-otp', {
      method: 'POST',
      body: JSON.stringify({ otp })
    });
    return response.ok;
  }}
  onComplete={(otp) => {
    console.log('OTP tamamlandı:', otp);
  }}
  monitoring={{
    onChange: (value) => console.log('OTP değişti:', value),
    onComplete: (otp) => console.log('OTP tamamlandı:', otp),
    onClear: () => console.log('OTP temizlendi'),
    onError: (error) => console.error('Hata:', error)
  }}
/>
```

#### 🚀 **Professional Kullanım**

```tsx
import { BcOtpInput } from './BcOtpInput';

function ProfessionalOTPExample() {
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState<string>();

  const handleComplete = (value: string) => {
    setStatus('success');
    console.log('OTP completed:', value);
  };

  const handleDebugLog = (message: string, data?: any) => {
    console.log('Debug:', message, data);
  };

  const handlePerformanceIssue = (issue: any) => {
    console.warn('Performance Issue:', issue);
  };

  return (
    <BcOtpInput
      // Basic props
      length={6}
      value={otp}
      onChange={setOtp}
      onComplete={handleComplete}
      autoFocus={true}
      
      // Enhanced Accessibility
      enableHighContrast={false}
      enableReducedMotion={false}
      enableVoiceInput={true}
      enableScreenReaderAnnouncements={true}
      
      // Advanced Features
      enableBiometric={true}
      enableQRCode={true}
      enableSMS={true}
      phoneNumber="+1234567890"
      qrCodeData="123456"
      
      // Developer Experience
      enableDebug={true}
      enableMetrics={true}
      onDebugLog={handleDebugLog}
      onPerformanceIssue={handlePerformanceIssue}
      
      // Animations
      enableAnimations={true}
      animationDuration={300}
      enableSuccessAnimation={true}
      enableErrorAnimation={true}
      enableLoadingAnimation={true}
      enableFocusAnimation={true}
      
      // Customization
      inputShape="rounded"
      inputSize="medium"
      theme="auto"
      enableCustomColors={true}
      primaryColor="#1976d2"
      secondaryColor="#424242"
      errorColor="#f44336"
      successColor="#4caf50"
      enableGradient={false}
      enableGlow={true}
      enableShadow={true}
      
      // Status and styling
      status={status}
      helperText="Complete professional OTP input with all features"
      locale="en"
    />
  );
}
```

### OTP Doğrulama

#### Temel Doğrulama
```tsx
<BcOtpInput
  length={6}
  validateOtp={(otp) => {
    // Basit doğrulama
    return otp.length === 6 && /^[0-9]+$/.test(otp);
  }}
  autoValidate={true}
/>
```

#### Asenkron Doğrulama
```tsx
<BcOtpInput
  length={6}
  validateOtp={async (otp) => {
    try {
      const response = await fetch('/api/validate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
      });
      return response.ok;
    } catch (error) {
      console.error('Doğrulama hatası:', error);
      return false;
    }
  }}
  autoValidate={true}
  validationDebounceMs={500}
/>
```

#### Özel Doğrulama Kuralları
```tsx
const validateOtp = (otp) => {
  // Uzunluk kontrolü
  if (otp.length !== 6) return false;
  
  // Sadece rakam kontrolü
  if (!/^[0-9]+$/.test(otp)) return false;
  
  // Tekrarlayan rakam kontrolü
  if (/(\d)\1{2,}/.test(otp)) return false;
  
  // Sıralı rakam kontrolü
  if (otp === '123456' || otp === '654321') return false;
  
  return true;
};

<BcOtpInput
  length={6}
  validateOtp={validateOtp}
  autoValidate={true}
/>
```

### Gelişmiş Özellikler

#### 1. Klavye Kısayolları
```tsx
<BcOtpInput
  enableKeyboardShortcuts={true}
  // Ok tuşları: Navigasyon
  // Backspace: Temizle ve geri git
  // Enter: Tamamla
  // Tab: Sonraki input
/>
```

#### 2. Otomatik Tamamlama
```tsx
<BcOtpInput
  enableAutoComplete={true}
  // Otomatik kod tamamlama
  // Akıllı öneriler
  // Geçmiş kodlar
/>
```

#### 3. Haptic Feedback
```tsx
<BcOtpInput
  enableHapticFeedback={true}
  // Mobil cihazlarda titreşim
  // Başarı/hata geri bildirimi
  // Dokunma hissi
/>
```

#### 4. Gelişmiş İzleme
```tsx
<BcOtpInput
  enableAdvancedMonitoring={true}
  monitoring={{
    onChange: (value) => analytics.track('otp_changed', { value }),
    onComplete: (otp) => analytics.track('otp_completed', { otp }),
    onError: (error) => analytics.track('otp_error', { error }),
    onPerformance: (metrics) => analytics.track('otp_performance', metrics)
  }}
/>
```

#### 5. Mobil Optimizasyonlar
```tsx
<BcOtpInput
  enableMobileOptimizations={true}
  // Touch optimizasyonları
  // Responsive layout
  // Mobil klavye desteği
/>
```

#### 6. Gelişmiş i18n
```tsx
<BcOtpInput
  enableAdvancedI18n={true}
  locale="tr"
  fallbackLocale="en"
  // Pluralization desteği
  // String interpolation
  // Gelişmiş çeviri özellikleri
/>
```

#### 7. Tema Uyumlu Stiller
```tsx
<BcOtpInput
  enableThemeAwareStyles={true}
  appearance="premium"
  // Dinamik tema renkleri
  // Dark/light mode uyumluluğu
  // Otomatik stil adaptasyonu
/>
```

### React Hook Form ile Kullanım

```tsx
import { useForm, Controller } from "react-hook-form";
import { BcOtpInput } from "../BcOtpInput/BcOtpInput";

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="otp"
        control={control}
        rules={{
          required: 'OTP gerekli',
          minLength: {
            value: 6,
            message: 'En az 6 hane olmalı'
          },
          validate: (value) => {
            if (!/^[0-9]+$/.test(value)) {
              return 'Sadece rakam girin';
            }
            return true;
          }
        }}
        render={({ field, fieldState }) => (
          <BcOtpInput
            {...field}
            length={6}
            label="OTP Kodu"
            helperText="SMS ile gelen kodu girin"
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

#### Q: OTP doğrulama nasıl çalışıyor?
A: `validateOtp` prop'u ile senkron veya asenkron doğrulama yapabilirsiniz. `autoValidate={true}` ile otomatik doğrulama aktif edilir.

#### Q: Klavye kısayolları nelerdir?
A: Ok tuşları (navigasyon), Backspace (temizle ve geri git), Enter (tamamla), Tab (sonraki input).

#### Q: Paste desteği nasıl çalışır?
A: OTP kodunu kopyalayıp ilk input'a yapıştırdığınızda otomatik olarak tüm hanelere dağıtılır.

#### Q: Mobil cihazlarda nasıl çalışır?
A: Haptic feedback, touch optimizasyonları ve responsive layout ile mobil deneyim optimize edilmiştir.

#### Q: Maskelenmiş giriş nasıl aktif edilir?
A: `mask={true}` prop'u ile input'lar şifre gibi maskelenir.

### Sorun Giderme

#### OTP doğrulama çalışmıyor
- `validateOtp` fonksiyonunun boolean döndürdüğünden emin olun
- `autoValidate={true}` olduğundan emin olun
- Asenkron doğrulamada hata yakalama yapın

#### Klavye kısayolları çalışmıyor
- `enableKeyboardShortcuts={true}` olduğundan emin olun
- Input focus'ta olduğundan emin olun

#### Paste çalışmıyor
- Kopyalanan metnin sadece rakam/harf içerdiğinden emin olun
- İlk input'a yapıştırdığınızdan emin olun

#### Mobil optimizasyonlar çalışmıyor
- `enableMobileOptimizations={true}` olduğundan emin olun
- Cihazın touch desteği olduğundan emin olun

### En İyi Kullanım İpuçları

1. **Güvenlik**: `validateOtp` ile güçlü doğrulama kuralları uygulayın
2. **Kullanıcı Deneyimi**: `autoFocus={true}` ile otomatik odaklanma sağlayın
3. **Erişilebilirlik**: `enableKeyboardShortcuts={true}` ile klavye kullanıcılarını destekleyin
4. **Performans**: `enableAdvancedMonitoring={true}` ile performansı izleyin
5. **Mobil**: `enableMobileOptimizations={true}` ile mobil deneyimi optimize edin
6. **Tema**: `enableThemeAwareStyles={true}` ile tema uyumluluğunu sağlayın
7. **i18n**: `enableAdvancedI18n={true}` ile gelişmiş çeviri özelliklerini kullanın
8. **Doğrulama**: `validationDebounceMs` ile API çağrılarını optimize edin

### Lisans
MIT

---

## English

### Features
- Material-UI based, modern and customizable OTP input component
- **BcTextField inheritance** - Supports all BcTextField features
- **Multi-digit input** with automatic focus management
- **Keyboard navigation** (arrow keys, backspace, enter, tab)
- **Paste support** for bulk code entry
- **Automatic validation** and clearing
- **Masked input** (password-like) support
- **Advanced keyboard shortcuts** support
- **Auto complete** feature
- **Haptic feedback** for mobile devices
- **Advanced monitoring** and analytics
- **Mobile optimizations** and responsive design
- **Advanced i18n** (pluralization, interpolation)
- **Theme-aware dynamic styles**
- **Async validation** support
- **Multi-language/i18n support** (Turkish, English)
- **Accessibility** (ARIA, screen reader, keyboard navigation)
- **Error Boundary** with error handling

### Props Table
| Prop | Type | Description |
|------|------|-------------|
| length | number | Number of OTP digits |
| value | string | OTP value |
| onChange | function | Called when OTP changes |
| onClear | function | Called when OTP is cleared |
| onComplete | function | Called when OTP is completed |
| validateOtp | function | OTP validation function |
| mask | boolean | Masked input (password-like) |
| inputType | string | Input type (number/text) |
| autoFocus | boolean | Auto focus |
| autoClear | boolean | Auto clear |
| autoValidate | boolean | Auto validation |
| validationDebounceMs | number | Validation debounce duration |
| monitoring | object | Monitoring callbacks |
| enableAdvancedFeatures | boolean | Advanced features |
| enableKeyboardShortcuts | boolean | Keyboard shortcuts |
| enableAutoComplete | boolean | Auto complete |
| enableHapticFeedback | boolean | Haptic feedback |
| enableAdvancedMonitoring | boolean | Advanced monitoring |
| enableMobileOptimizations | boolean | Mobile optimizations |
| enableAdvancedI18n | boolean | Advanced i18n |
| enableThemeAwareStyles | boolean | Theme-aware styles |
| ...rest | ... | Other BcTextField props |

### Usage

#### Basic Usage
```tsx
import { BcOtpInput } from "../BcOtpInput/BcOtpInput";

<BcOtpInput
  length={6}
  label="OTP Code"
  helperText="Enter the code sent to your device"
  showClearButton={true}
  autoFocus={true}
/>
```

#### With Advanced Features
```tsx
<BcOtpInput
  length={6}
  label="Verification Code"
  helperText="Enter the code sent via SMS"
  inputType="number"
  mask={false}
  autoFocus={true}
  autoClear={true}
  autoValidate={true}
  enableAdvancedFeatures={true}
  enableKeyboardShortcuts={true}
  enableAutoComplete={true}
  enableHapticFeedback={true}
  enableAdvancedMonitoring={true}
  enableMobileOptimizations={true}
  enableAdvancedI18n={true}
  enableThemeAwareStyles={true}
  validateOtp={async (otp) => {
    // API validation
    const response = await fetch('/api/validate-otp', {
      method: 'POST',
      body: JSON.stringify({ otp })
    });
    return response.ok;
  }}
  onComplete={(otp) => {
    console.log('OTP completed:', otp);
  }}
  monitoring={{
    onChange: (value) => console.log('OTP changed:', value),
    onComplete: (otp) => console.log('OTP completed:', otp),
    onClear: () => console.log('OTP cleared'),
    onError: (error) => console.error('Error:', error)
  }}
/>
```

### OTP Validation

#### Basic Validation
```tsx
<BcOtpInput
  length={6}
  validateOtp={(otp) => {
    // Simple validation
    return otp.length === 6 && /^[0-9]+$/.test(otp);
  }}
  autoValidate={true}
/>
```

#### Async Validation
```tsx
<BcOtpInput
  length={6}
  validateOtp={async (otp) => {
    try {
      const response = await fetch('/api/validate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
      });
      return response.ok;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  }}
  autoValidate={true}
  validationDebounceMs={500}
/>
```

#### Custom Validation Rules
```tsx
const validateOtp = (otp) => {
  // Length check
  if (otp.length !== 6) return false;
  
  // Numeric check
  if (!/^[0-9]+$/.test(otp)) return false;
  
  // Repeated digits check
  if (/(\d)\1{2,}/.test(otp)) return false;
  
  // Sequential digits check
  if (otp === '123456' || otp === '654321') return false;
  
  return true;
};

<BcOtpInput
  length={6}
  validateOtp={validateOtp}
  autoValidate={true}
/>
```

### Advanced Features

#### 1. Keyboard Shortcuts
```tsx
<BcOtpInput
  enableKeyboardShortcuts={true}
  // Arrow keys: Navigation
  // Backspace: Clear and go back
  // Enter: Complete
  // Tab: Next input
/>
```

#### 2. Auto Complete
```tsx
<BcOtpInput
  enableAutoComplete={true}
  // Automatic code completion
  // Smart suggestions
  // History of codes
/>
```

#### 3. Haptic Feedback
```tsx
<BcOtpInput
  enableHapticFeedback={true}
  // Vibration on mobile devices
  // Success/error feedback
  // Touch sensation
/>
```

#### 4. Advanced Monitoring
```tsx
<BcOtpInput
  enableAdvancedMonitoring={true}
  monitoring={{
    onChange: (value) => analytics.track('otp_changed', { value }),
    onComplete: (otp) => analytics.track('otp_completed', { otp }),
    onError: (error) => analytics.track('otp_error', { error }),
    onPerformance: (metrics) => analytics.track('otp_performance', metrics)
  }}
/>
```

#### 5. Mobile Optimizations
```tsx
<BcOtpInput
  enableMobileOptimizations={true}
  // Touch optimizations
  // Responsive layout
  // Mobile keyboard support
/>
```

#### 6. Advanced i18n
```tsx
<BcOtpInput
  enableAdvancedI18n={true}
  locale="en"
  fallbackLocale="tr"
  // Pluralization support
  // String interpolation
  // Advanced translation features
/>
```

#### 7. Theme-Aware Styles
```tsx
<BcOtpInput
  enableThemeAwareStyles={true}
  appearance="premium"
  // Dynamic theme colors
  // Dark/light mode compatibility
  // Automatic style adaptation
/>
```

### React Hook Form Integration

```tsx
import { useForm, Controller } from "react-hook-form";
import { BcOtpInput } from "../BcOtpInput/BcOtpInput";

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="otp"
        control={control}
        rules={{
          required: 'OTP is required',
          minLength: {
            value: 6,
            message: 'Must be at least 6 digits'
          },
          validate: (value) => {
            if (!/^[0-9]+$/.test(value)) {
              return 'Only numbers allowed';
            }
            return true;
          }
        }}
        render={({ field, fieldState }) => (
          <BcOtpInput
            {...field}
            length={6}
            label="OTP Code"
            helperText="Enter the code sent to your device"
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

#### Q: How does OTP validation work?
A: Use the `validateOtp` prop for synchronous or asynchronous validation. Set `autoValidate={true}` to enable automatic validation.

#### Q: What are the keyboard shortcuts?
A: Arrow keys (navigation), Backspace (clear and go back), Enter (complete), Tab (next input).

#### Q: How does paste support work?
A: Copy the OTP code and paste it into the first input, it will automatically distribute to all digits.

#### Q: How does it work on mobile devices?
A: Optimized for mobile with haptic feedback, touch optimizations, and responsive layout.

#### Q: How to enable masked input?
A: Use `mask={true}` prop to mask inputs like passwords.

### Troubleshooting

#### OTP validation not working
- Ensure `validateOtp` function returns a boolean
- Ensure `autoValidate={true}`
- Add error handling for async validation

#### Keyboard shortcuts not working
- Ensure `enableKeyboardShortcuts={true}`
- Ensure the input is focused

#### Paste not working
- Ensure copied text contains only numbers/letters
- Ensure you're pasting into the first input

#### Mobile optimizations not working
- Ensure `enableMobileOptimizations={true}`
- Ensure device has touch support

### Best Practices

1. **Security**: Apply strong validation rules with `validateOtp`
2. **User Experience**: Use `autoFocus={true}` for automatic focusing
3. **Accessibility**: Use `enableKeyboardShortcuts={true}` to support keyboard users
4. **Performance**: Use `enableAdvancedMonitoring={true}` to monitor performance
5. **Mobile**: Use `enableMobileOptimizations={true}` to optimize mobile experience
6. **Theme**: Use `enableThemeAwareStyles={true}` to ensure theme compatibility
7. **i18n**: Use `enableAdvancedI18n={true}` to use advanced translation features
8. **Validation**: Use `validationDebounceMs` to optimize API calls

### License
MIT