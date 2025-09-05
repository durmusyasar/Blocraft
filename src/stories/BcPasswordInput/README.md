# BcPasswordInput

Material-UI tabanlı, şifre input bileşeni. Şifre gücü, kurallar, göster/gizle, responsive, durum, i18n, erişilebilirlik ve daha fazlasını destekler.

## Özellikler

- **Şifre Gücü**: Gerçek zamanlı şifre gücü hesaplama
- **Kurallar**: Özelleştirilebilir şifre kuralları
- **Görünürlük**: Şifre göster/gizle butonu
- **Kopyalama**: Şifre kopyalama butonu
- **Asenkron Doğrulama**: Sunucu tarafı şifre doğrulama
- **İzleme**: Performans ve kullanım analitiği
- **Erişilebilirlik**: ARIA desteği ve ekran okuyucu uyumluluğu
- **i18n**: Çoklu dil desteği
- **Responsive**: Mobil uyumlu tasarım

## Kurulum

```bash
npm install @mui/material @mui/icons-material zxcvbn
```

## Temel Kullanım

```tsx
import { BcPasswordInput } from './BcPasswordInput';

function App() {
  return (
    <BcPasswordInput
      label="Şifre"
      placeholder="Şifrenizi girin"
      showStrengthBar
      minLength={8}
      requireUppercase
      requireLowercase
      requireNumber
      requireSpecial
    />
  );
}
```

## Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `label` | `string` | - | Input için etiket |
| `placeholder` | `string` | - | Input için placeholder metni |
| `showStrengthBar` | `boolean` | `true` | Şifre gücü barı gösterilsin mi? |
| `minLength` | `number` | `8` | Minimum şifre uzunluğu |
| `requireUppercase` | `boolean` | `true` | Büyük harf gereksinimi |
| `requireLowercase` | `boolean` | `true` | Küçük harf gereksinimi |
| `requireNumber` | `boolean` | `true` | Rakam gereksinimi |
| `requireSpecial` | `boolean` | `false` | Özel karakter gereksinimi |
| `showPasswordToggle` | `boolean` | `true` | Şifre göster/gizle butonu |
| `showCopyButton` | `boolean` | `true` | Kopyala butonu |
| `useZxcvbnStrength` | `boolean` | `false` | Gelişmiş şifre gücü hesaplama (zxcvbn) |
| `enableAsyncValidation` | `boolean` | `false` | Asenkron doğrulama |
| `validatePassword` | `function` | - | Asenkron şifre doğrulama fonksiyonu |
| `showValidationStatus` | `boolean` | `false` | Doğrulama durumu göstergesi |
| `validationDebounceMs` | `number` | `300` | Doğrulama gecikmesi (ms) |
| `customRules` | `Array` | `[]` | Özel şifre kuralları |
| `monitoring` | `object` | - | İzleme ve analitik callback'leri |
| `locale` | `string` | `'en'` | Dil kodu |
| `fallbackLocale` | `string` | `'en'` | Yedek dil kodu |
| `translations` | `object` | - | Özel çeviri nesnesi |
| `appearance` | `string` | `'premium'` | Görünüm stili |
| `size` | `string` | `'normal'` | Input boyutu |
| `status` | `string` | - | Durum göstergesi |
| `disabled` | `boolean` | `false` | Devre dışı |
| `loading` | `boolean` | `false` | Yükleniyor durumu |
| `responsiveWidth` | `boolean` | `true` | Responsive genişlik |

## Görünüm Stilleri

```tsx
// Premium style (varsayılan)
<BcPasswordInput appearance="premium" />

// Soft style
<BcPasswordInput appearance="soft" />

// Glass style
<BcPasswordInput appearance="glass" />

// Minimal style
<BcPasswordInput appearance="minimal" />

// Neumorph style
<BcPasswordInput appearance="neumorph" />

// Underline style
<BcPasswordInput appearance="underline" />

// Dark style
<BcPasswordInput appearance="dark" />

// Borderless style
<BcPasswordInput appearance="borderless" />
```

## Şifre Kuralları

### Varsayılan Kurallar

```tsx
<BcPasswordInput
  minLength={8}
  requireUppercase={true}
  requireLowercase={true}
  requireNumber={true}
  requireSpecial={false}
/>
```

### Özel Kurallar

```tsx
<BcPasswordInput
  customRules={[
    {
      key: 'noCommonWords',
      label: 'No common words',
      test: (password) => !password.toLowerCase().includes('password'),
    },
    {
      key: 'noSequential',
      label: 'No sequential characters',
      test: (password) => !password.includes('123') && !password.includes('abc'),
    },
  ]}
/>
```

## Asenkron Doğrulama

```tsx
const validatePassword = async (password: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }
  
  return { isValid: true, message: 'Password is valid' };
};

<BcPasswordInput
  enableAsyncValidation
  validatePassword={validatePassword}
  showValidationStatus
  validationDebounceMs={500}
/>
```

## İzleme ve Analitik

```tsx
const monitoring = {
  onChange: (value: string) => {
    console.log('Password changed:', value);
  },
  onStrengthChange: (strength: number) => {
    console.log('Password strength:', strength);
  },
  onError: (error: Error) => {
    console.error('Password input error:', error);
  },
  onPerformance: (metrics: any) => {
    console.log('Performance metrics:', metrics);
  },
};

<BcPasswordInput monitoring={monitoring} />
```

## Uluslararasılaştırma (i18n)

### Dil Desteği

```tsx
// İngilizce (varsayılan)
<BcPasswordInput locale="en" />

// Türkçe
<BcPasswordInput locale="tr" />
```

### Özel Çeviriler

```tsx
<BcPasswordInput
  translations={{
    label: 'Custom Label',
    placeholder: 'Custom Placeholder',
    showPassword: 'Show Custom',
    hidePassword: 'Hide Custom',
    copyPassword: 'Copy Custom',
    copied: 'Copied Custom!',
  }}
/>
```

## React Hook Form Entegrasyonu

```tsx
import { useForm, Controller } from 'react-hook-form';

function Form() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="password"
        control={control}
        rules={{ required: 'Password is required' }}
        render={({ field, fieldState }) => (
          <BcPasswordInput
            {...field}
            label="Password"
            placeholder="Enter your password"
            status={fieldState.error ? 'error' : undefined}
            statusMessage={fieldState.error?.message}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Erişilebilirlik

BcPasswordInput, WCAG 2.1 AA standartlarına uygun olarak tasarlanmıştır:

- **ARIA Desteği**: Tüm etkileşimli elementler için uygun ARIA etiketleri
- **Klavye Navigasyonu**: Tab, Enter, Space tuşları ile tam navigasyon
- **Ekran Okuyucu**: Şifre gücü ve kurallar için canlı bölgeler
- **Yüksek Kontrast**: Yüksek kontrast modu desteği
- **Azaltılmış Hareket**: Hareket azaltma tercihi desteği

## Performans

- **useCallback**: Event handler'lar için performans optimizasyonu
- **useMemo**: Hesaplanan değerler için memoization
- **Debouncing**: Asenkron doğrulama için gecikme
- **Lazy Loading**: Büyük veri setleri için lazy loading

## Sorun Giderme

### Yaygın Sorunlar

1. **Şifre gücü barı görünmüyor**
   ```tsx
   // showStrengthBar prop'unu kontrol edin
   <BcPasswordInput showStrengthBar={true} />
   ```

2. **Asenkron doğrulama çalışmıyor**
   ```tsx
   // enableAsyncValidation ve validatePassword prop'larını kontrol edin
   <BcPasswordInput
     enableAsyncValidation={true}
     validatePassword={validatePassword}
   />
   ```

3. **Çeviriler görünmüyor**
   ```tsx
   // locale ve translations prop'larını kontrol edin
   <BcPasswordInput
     locale="tr"
     translations={customTranslations}
   />
   ```

### Debug Modu

```tsx
<BcPasswordInput
  monitoring={{
    onChange: (value) => console.log('Password changed:', value),
    onStrengthChange: (strength) => console.log('Strength:', strength),
    onError: (error) => console.error('Error:', error),
  }}
/>
```

## En İyi Uygulamalar

1. **Şifre Kuralları**: Kullanıcı deneyimi için makul kurallar belirleyin
2. **Asenkron Doğrulama**: Sunucu tarafı doğrulama için debounce kullanın
3. **Erişilebilirlik**: Tüm etkileşimli elementler için uygun etiketler sağlayın
4. **Performans**: Büyük formlarda monitoring kullanın
5. **Güvenlik**: Şifreleri asla console'a loglamayın

## Lisans

MIT License

---

**Not**: Bu bileşen Material-UI ve zxcvbn kütüphanelerine bağımlıdır. Kurulum sırasında bu bağımlılıkları yüklediğinizden emin olun.