# Blocraft

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Video Tutorials

Kütüphanenin kullanımını daha iyi anlamak için aşağıdaki video eğitimleri izleyebilirsiniz:

### 1. Installation & Setup
[![Installation Video](https://img.youtube.com/vi/XXXXXXXXXXX/0.jpg)](https://www.youtube.com/watch?v=XXXXXXXXXXX)
Kurulum ve temel yapılandırma adımları.

### 2. Basic Usage
[![Basic Usage Video](https://img.youtube.com/vi/YYYYYYYYYYY/0.jpg)](https://www.youtube.com/watch?v=YYYYYYYYYYY)
Temel özellikler ve ilk örnekler.

### 3. Advanced Features
[![Advanced Features Video](https://img.youtube.com/vi/ZZZZZZZZZZZ/0.jpg)](https://www.youtube.com/watch?v=ZZZZZZZZZZZ)
Gelişmiş arama, gruplama, export/import, async validation gibi özellikler.

### 4. Accessibility
[![Accessibility Video](https://img.youtube.com/vi/AAAAAAAAAAA/0.jpg)](https://www.youtube.com/watch?v=AAAAAAAAAAA)
Erişilebilirlik, ARIA, screen reader ve klavye navigasyonu.

### 5. Performance & Monitoring
[![Performance Video](https://img.youtube.com/vi/BBBBBBBBBBB/0.jpg)](https://www.youtube.com/watch?v=BBBBBBBBBBB)
Performans optimizasyonları, monitoring ve analiz.

> Gerçek videolar eklendiğinde linkler güncellenecektir. Kendi eğitim videolarınızı da ekleyebilirsiniz!

## Migration Guide

BcAutoSuggestInput'a geçiş yapmak çok kolay! Aşağıda Material-UI Autocomplete'dan geçiş için örnek bir rehber bulabilirsiniz.

### Material-UI Autocomplete'dan Geçiş

**Önce (Material-UI Autocomplete):**
```tsx
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

<Autocomplete
  options={cities}
  renderInput={(params) => <TextField {...params} label="Şehir" />}
  onChange={handleChange}
/>
```

**Sonra (BcAutoSuggestInput):**
```tsx
import { BcAutoSuggestInput } from '.../BcAutoSuggestInput';

<BcAutoSuggestInput
  label="Şehir"
  fetchSuggestions={async (input) => cities.filter(c => c.toLowerCase().includes(input.toLowerCase()))}
  onChange={handleChange}
/>
```

#### Dikkat Edilmesi Gerekenler
- `options` yerine `fetchSuggestions` fonksiyonu kullanılır (async destekler).
- `renderInput` gerekmez, label doğrudan prop olarak verilir.
- Tüm gelişmiş özellikler (debounce, cache, highlight, validation, monitoring, vs.) prop olarak eklenebilir.
- Eski event yapısı ile uyumlu olması için onChange fonksiyonunu kontrol edin.

#### Yaygın Sorunlar ve Çözümler
- **Sorun:** Eski autocomplete'da sync array kullanıyordum.
  - **Çözüm:** `fetchSuggestions` fonksiyonunu sync de yazabilirsiniz: `(input) => cities.filter(...)`
- **Sorun:** Custom option rendering gerekiyordu.
  - **Çözüm:** `renderCustomOption` prop'unu kullanın.
- **Sorun:** Eski bileşende ARIA/erişilebilirlik eksikti.
  - **Çözüm:** BcAutoSuggestInput tüm ARIA ve erişilebilirlik özelliklerini destekler.

Daha fazla migration örneği için [docs/MIGRATION.md](docs/MIGRATION.md) dosyasına bakabilirsiniz (isteğe bağlı).

## Best Practices

BcAutoSuggestInput'u en verimli ve güvenli şekilde kullanmak için aşağıdaki en iyi uygulamaları takip edin:

### 1. Performans
- **Do:** Debounce ve cache özelliklerini kullanın.
```tsx
<BcAutoSuggestInput debounceMs={300} cacheResults={true} ... />
```
- **Don’t:** Her tuş vuruşunda API çağrısı yapmayın.

### 2. Erişilebilirlik
- **Do:** ARIA label ve screen reader metinlerini özelleştirin.
```tsx
<BcAutoSuggestInput ariaLabel="Şehir arama alanı" screenReaderInstructions="Şehir aramak için yazmaya başlayın." ... />
```
- **Don’t:** Sadece görsel ipuçlarına güvenmeyin.

### 3. Tema ve Stil Uyumu
- **Do:** `appearance` ve `responsiveWidth` prop'larını kullanarak tasarıma uyum sağlayın.
```tsx
<BcAutoSuggestInput appearance="glass" responsiveWidth={true} ... />
```
- **Don’t:** Sabit genişlikler veya inline style ile responsive tasarımı bozmayın.

### 4. Monitoring ve Analiz
- **Do:** Monitoring prop'unu aktif edin, performans ve hata takibini açın.
```tsx
<BcAutoSuggestInput monitoring={{ enablePerformanceTracking: true, enableErrorTracking: true }} ... />
```
- **Don’t:** Hataları göz ardı etmeyin, monitoring ile takip edin.

### 5. Testler
- **Do:** Bileşeni unit ve e2e testlerle test edin. Accessibility testlerini unutmayın.
```tsx
// Jest/RTL ile:
render(<BcAutoSuggestInput label="Test" fetchSuggestions={...} />);
expect(screen.getByLabelText("Test")).toBeInTheDocument();
```
- **Don’t:** Sadece manuel testlere güvenmeyin.

### 6. Gelişmiş Özellikler
- **Do:** Gelişmiş filtreleme, async validation, export/import gibi özellikleri ihtiyaca göre aktif edin.
- **Don’t:** Tüm özellikleri aynı anda açıp karmaşık bir arayüz oluşturmayın.

> Daha fazla örnek ve ipucu için Storybook Playground'u ve test dosyalarını inceleyin.

## Troubleshooting Guide

BcAutoSuggestInput ile ilgili sık karşılaşılan sorunlar ve çözümleri:

### Sık Karşılaşılan Hatalar ve Çözümleri

- **Hata:** `TypeError: fetchSuggestions is not a function`
  - **Çözüm:** `fetchSuggestions` prop'unun bir fonksiyon olduğundan emin olun. Örnek:
    ```tsx
    fetchSuggestions={async (input) => [...]} 
    ```

- **Hata:** `Nothing was returned from render`
  - **Çözüm:** Bileşenin bir JSX elemanı döndürdüğünden emin olun. Export edilen fonksiyonun return kısmını kontrol edin.

- **Hata:** `Cannot read property 'focus' of null`
  - **Çözüm:** Ref ile ilgili bir hata olabilir. Bileşenin DOM'da render olduğundan emin olun.

- **Hata:** `You attempted to render an object as a React child`
  - **Çözüm:** Option veya helperText gibi prop'lara object değil, string veya ReactNode verin.

### Debug ve Monitoring İpuçları
- Monitoring prop'unu aktif ederek performans ve hata takibini kolayca yapabilirsiniz:
  ```tsx
  <BcAutoSuggestInput monitoring={{ enableErrorTracking: true, enablePerformanceTracking: true }} ... />
  ```
- Hataları konsolda görmek için monitoring ile birlikte browser console'u takip edin.
- Testlerde hata ayıklamak için Jest/RTL ile `screen.debug()` kullanabilirsiniz.

### FAQ
- **S: API'den veri gelmiyor, ne yapmalıyım?**
  - C: fetchSuggestions fonksiyonunun async olduğundan ve doğru veri döndürdüğünden emin olun. Network hatalarını monitoring ile takip edin.
- **S: Klavye ile navigasyon çalışmıyor.**
  - C: `enableEnhancedKeyboardNavigation` prop'unun true olduğundan emin olun.
- **S: Erişilebilirlik testleri geçmiyor.**
  - C: ARIA label ve screen reader prop'larını kontrol edin, Storybook'taki erişilebilirlik örneklerine bakın.

> Daha fazla sorun ve çözüm için GitHub Issues veya Storybook Playground'u inceleyin.
