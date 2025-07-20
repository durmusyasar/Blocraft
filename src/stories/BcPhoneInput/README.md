# BcPhoneInput

## Özellikler | Features

- Ülke kodu seçici (Material UI Select) | Country code selector (Material UI Select)
- Favori ülkeler ve son kullanılanlar | Favorite and recent countries
- Büyük ülke listesi desteği | Large country list support
- Readonly ülke kodu gösterimi | Readonly country code display
- i18n başlıkları ve çoklu dil desteği | i18n headers and multi-language support
- Performans optimizasyonu | Performance optimization
- Erişilebilirlik (ARIA, screen reader) | Accessibility (ARIA, screen reader)
- Mask ve validasyon özelleştirme | Customizable mask and validation
- React Hook Form entegrasyonu | React Hook Form integration

## Kullanım | Usage

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

## Prop Tablosu | Prop Table

| Prop                | Açıklama (TR)                                   | Description (EN)                                 |
|---------------------|------------------------------------------------|--------------------------------------------------|
| country             | Seçili ülke kodu                                | Selected country code                            |
| onCountryChange     | Ülke değişince çağrılır                         | Called when country changes                      |
| countryList         | Ülke listesi veya async Promise                 | Country list or async Promise                    |
| fetchCountries      | Ülkeleri async olarak getirir                    | Fetches countries asynchronously                 |
| showCountrySelect   | Select gösterilsin mi / 'readonly'              | Show select or 'readonly'                        |
| favoriteCountries   | Favori ülke kodları listesi                     | List of favorite country codes                   |
| locale              | Dil kodu                                        | Locale code                                      |
| fallbackLocale      | Yedek dil kodu                                  | Fallback locale                                  |
| validatePhone       | Telefon doğrulama fonksiyonu                    | Phone validation function                        |
| getMask             | Mask fonksiyonu                                 | Mask function                                    |
| showMaskInPlaceholder | Mask placeholderda gösterilsin mi             | Show mask in placeholder                         |
| inputMode           | inputMode (örn. 'tel')                          | inputMode (e.g. 'tel')                           |
| autoFocus           | Otomatik odaklanma                              | Auto focus                                       |
| disabled            | Devre dışı                                      | Disabled                                         |
| appearance          | Görünüm stili                                   | Appearance style                                 |

## Örnekler | Examples

### Favori ve Son Kullanılanlar | Favorites and Recents

```tsx
<BcPhoneInput
  favoriteCountries={["TR", "US"]}
  country="TR"
  onCountryChange={...}
/>
```

### Readonly Ülke Kodu | Readonly Country Code

```tsx
<BcPhoneInput
  showCountrySelect="readonly"
  country="TR"
/>
```

### Büyük Ülke Listesi | Large Country List

```tsx
const bigList = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  code: `C${i + 1}`,
  name: { tr: `Ülke ${i + 1}`, en: `Country ${i + 1}` },
  flag: '🏳️',
  dial: 1000 + i,
  mask: '(999) 999-9999'
}));
<BcPhoneInput countryList={bigList} />
```

### i18n Başlıkları | i18n Headers

Favoriler ve Son Kullanılanlar başlıkları otomatik olarak seçilen dile göre gösterilir.

Favorites and Recents headers are shown automatically according to the selected locale.

### Performans | Performance

1000+ ülke ile hızlı render ve loading göstergesi.

Fast render and loading indicator with 1000+ countries.

### Erişilebilirlik | Accessibility

- ARIA etiketleri ve screen reader için canlı bölge
- ARIA labels and live region for screen readers

### React Hook Form ile | With React Hook Form

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