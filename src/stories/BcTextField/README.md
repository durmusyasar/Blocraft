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

#### 🚀 Gelişmiş Input Özellikleri
- **Rich Text Editor**: Markdown, HTML, formatting, links, colors desteği
- **Text Formatting**: Transformation, auto-resize, character/word/line/paragraph count
- **Text Counter**: Max limits, warning/critical thresholds

#### 🧠 Akıllı Özellikler
- **Auto Complete**: Options, async fetch, categories, icons, keyboard navigation
- **Smart Suggestions**: Recent history, favorites, trending, recommendations, learning, personalization
- **Smart Validation**: Real-time, suggestions, learning, custom rules

#### ✅ Gelişmiş Doğrulama
- **Advanced Validation**: Async, context-aware, business rules, cross-field validation
- **Business Rules**: Real-time evaluation, rule learning/optimization
- **Cross Field Validation**: Dependency tracking, custom rules

#### 🎯 Kullanıcı Deneyimi
- **Smart Placeholder**: Contextual, time-based, personalized, learning
- **Smart Help**: Contextual, progressive, learning, personalization
- **Progressive Disclosure**: Contextual, learning, personalization

#### ♿ Erişilebilirlik ve Performans
- **Accessibility**: Screen reader, keyboard navigation, ARIA labels, live regions, focus management
- **Performance**: Render tracking, memory monitoring, optimization, debouncing, throttling, caching
- **Monitoring**: Real-time monitoring, analytics, error reporting, user behavior tracking

#### 🔧 Entegrasyon ve Test
- **Testing**: Test utilities, assertions, mocking, validation, performance testing, accessibility testing
- **Integration**: Form, state, events, data, API, storage, theme, i18n integration

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
| **Rich Text Editor** | | |
| enableRichText      | boolean  | Rich text editor aktif |
| enableMarkdown      | boolean  | Markdown desteği |
| enableHTML          | boolean  | HTML desteği |
| enableFormatting    | boolean  | Formatting desteği |
| enableLinks         | boolean  | Link desteği |
| enableColors        | boolean  | Renk desteği |
| **Text Formatting** | | |
| enableTransformation| boolean  | Text transformation aktif |
| enableAutoResize    | boolean  | Auto resize aktif |
| enableCharacterCount| boolean  | Karakter sayısı |
| enableWordCount     | boolean  | Kelime sayısı |
| enableLineCount     | boolean  | Satır sayısı |
| enableParagraphCount| boolean  | Paragraf sayısı |
| **Text Counter** | | |
| enableCounter       | boolean  | Counter aktif |
| maxCharacters       | number   | Maksimum karakter |
| maxWords            | number   | Maksimum kelime |
| maxLines            | number   | Maksimum satır |
| maxParagraphs       | number   | Maksimum paragraf |
| warningThreshold    | number   | Uyarı eşiği (0-1) |
| criticalThreshold   | number   | Kritik eşiği (0-1) |
| **Auto Complete** | | |
| enableAutoComplete  | boolean  | Auto complete aktif |
| autoCompleteOptions | array    | Auto complete seçenekleri |
| fetchAutoCompleteOptions | function | Async auto complete |
| minAutoCompleteQueryLength | number | Min query uzunluğu |
| maxAutoCompleteSuggestions | number | Max öneri sayısı |
| autoCompleteDebounceMs | number | Auto complete debounce |
| enableAutoCompleteCategories | boolean | Kategori desteği |
| enableAutoCompleteIcons | boolean | İkon desteği |
| enableAutoCompleteKeyboardNavigation | boolean | Klavye navigasyonu |
| **Smart Suggestions** | | |
| enableSmartSuggestions | boolean | Smart suggestions aktif |
| enableRecentHistory | boolean  | Son kullanılanlar |
| enableFavorites     | boolean  | Favoriler |
| enableTrending      | boolean  | Trend öğeler |
| enableRecommendations | boolean | Öneriler |
| maxHistoryItems     | number   | Max geçmiş öğe |
| maxFavorites        | number   | Max favori |
| maxTrending         | number   | Max trend |
| maxRecommendations  | number   | Max öneri |
| suggestionDebounceMs | number  | Suggestion debounce |
| enableLearning      | boolean  | Öğrenme aktif |
| enablePersonalization | boolean | Kişiselleştirme |
| **Smart Validation** | | |
| enableSmartValidation | boolean | Smart validation aktif |
| enableRealTimeValidation | boolean | Gerçek zamanlı doğrulama |
| enableValidationSuggestions | boolean | Doğrulama önerileri |
| enableValidationLearning | boolean | Doğrulama öğrenme |
| customValidationRules | array  | Özel doğrulama kuralları |
| **Advanced Validation** | | |
| enableAdvancedValidation | boolean | Gelişmiş doğrulama |
| enableAsyncValidation | boolean | Async doğrulama |
| enableContextValidation | boolean | Context doğrulama |
| enableBusinessRules | boolean | İş kuralları |
| enableCrossFieldValidation | boolean | Çapraz alan doğrulama |
| maxConcurrentValidations | number | Max eşzamanlı doğrulama |
| customValidationRules | array | Özel doğrulama kuralları |
| validationContext | object | Doğrulama context'i |
| **Business Rules** | | |
| enableBusinessRules | boolean | İş kuralları aktif |
| enableRealTimeEvaluation | boolean | Gerçek zamanlı değerlendirme |
| enableRuleLearning | boolean | Kural öğrenme |
| enableRuleOptimization | boolean | Kural optimizasyonu |
| evaluationDebounceMs | number | Değerlendirme debounce |
| customBusinessRules | array | Özel iş kuralları |
| businessContext | object | İş context'i |
| **Cross Field Validation** | | |
| enableCrossFieldValidation | boolean | Çapraz alan doğrulama |
| enableDependencyTracking | boolean | Bağımlılık takibi |
| customCrossFieldRules | array | Özel çapraz alan kuralları |
| crossFieldContext | object | Çapraz alan context'i |
| **Smart Placeholder** | | |
| enableSmartPlaceholder | boolean | Smart placeholder aktif |
| enableContextualPlaceholders | boolean | Contextual placeholder |
| enableTimeBasedPlaceholders | boolean | Zaman bazlı placeholder |
| enablePersonalizedPlaceholders | boolean | Kişiselleştirilmiş placeholder |
| enablePlaceholderLearning | boolean | Placeholder öğrenme |
| customPlaceholderTemplates | array | Özel placeholder şablonları |
| placeholderContext | object | Placeholder context'i |
| **Smart Help** | | |
| enableSmartHelp | boolean | Smart help aktif |
| enableContextualHelp | boolean | Contextual help |
| enableProgressiveHelp | boolean | Progressive help |
| enableHelpLearning | boolean | Help öğrenme |
| enableHelpPersonalization | boolean | Help kişiselleştirme |
| customHelpItems | array | Özel help öğeleri |
| helpContext | object | Help context'i |
| **Progressive Disclosure** | | |
| enableProgressiveDisclosure | boolean | Progressive disclosure aktif |
| enableContextualDisclosure | boolean | Contextual disclosure |
| enableDisclosureLearning | boolean | Disclosure öğrenme |
| enableDisclosurePersonalization | boolean | Disclosure kişiselleştirme |
| customDisclosureRules | array | Özel disclosure kuralları |
| customDisclosureContent | array | Özel disclosure içeriği |
| disclosureContext | object | Disclosure context'i |
| **Accessibility** | | |
| enableAccessibility | boolean | Erişilebilirlik aktif |
| enableScreenReaderSupport | boolean | Screen reader desteği |
| enableKeyboardNavigation | boolean | Klavye navigasyonu |
| enableHighContrast | boolean | Yüksek kontrast |
| enableReducedMotion | boolean | Azaltılmış hareket |
| enableFocusManagement | boolean | Focus yönetimi |
| enableARIALabels | boolean | ARIA etiketleri |
| enableLiveRegions | boolean | Live regions |
| enableSkipLinks | boolean | Skip links |
| enableTooltips | boolean | Tooltips |
| enableErrorAnnouncements | boolean | Hata duyuruları |
| enableStatusAnnouncements | boolean | Durum duyuruları |
| enableProgressAnnouncements | boolean | İlerleme duyuruları |
| **Performance** | | |
| enablePerformanceTracking | boolean | Performans takibi |
| enableRenderTracking | boolean | Render takibi |
| enableMemoryTracking | boolean | Bellek takibi |
| enableNetworkTracking | boolean | Ağ takibi |
| enableUserInteractionTracking | boolean | Kullanıcı etkileşim takibi |
| enablePerformanceOptimization | boolean | Performans optimizasyonu |
| enableDebouncing | boolean | Debouncing |
| enableThrottling | boolean | Throttling |
| enableCaching | boolean | Önbellekleme |
| enableMemoization | boolean | Memoization |
| **Monitoring** | | |
| enableMonitoring | boolean | İzleme aktif |
| enableRealTimeMonitoring | boolean | Gerçek zamanlı izleme |
| enableAnalytics | boolean | Analitik |
| enableErrorReporting | boolean | Hata raporlama |
| enablePerformanceMonitoring | boolean | Performans izleme |
| enableUserBehaviorTracking | boolean | Kullanıcı davranış takibi |
| enableSecurityMonitoring | boolean | Güvenlik izleme |
| enableCustomEvents | boolean | Özel olaylar |
| monitoringApiEndpoint | string | İzleme API endpoint |
| monitoringApiKey | string | İzleme API anahtarı |
| **Testing** | | |
| enableTesting | boolean | Test aktif |
| enableTestMode | boolean | Test modu |
| enableMockData | boolean | Mock data |
| enableTestHelpers | boolean | Test yardımcıları |
| enableTestUtilities | boolean | Test araçları |
| enableTestValidation | boolean | Test doğrulama |
| enableTestPerformance | boolean | Test performans |
| enableTestAccessibility | boolean | Test erişilebilirlik |
| enableTestMonitoring | boolean | Test izleme |
| enableTestDebugging | boolean | Test hata ayıklama |
| enableTestLogging | boolean | Test loglama |
| enableTestAssertions | boolean | Test assertions |
| enableTestSnapshots | boolean | Test snapshots |
| enableTestCoverage | boolean | Test coverage |
| enableTestReporting | boolean | Test raporlama |
| testTimeout | number | Test timeout |
| testRetries | number | Test retry sayısı |
| testDelay | number | Test gecikme |
| mockData | object | Mock data |
| testConfig | object | Test konfigürasyonu |
| customTestHelpers | object | Özel test yardımcıları |
| customTestUtilities | object | Özel test araçları |
| customTestValidators | object | Özel test doğrulayıcıları |
| customTestAssertions | object | Özel test assertions |
| **Integration** | | |
| enableIntegration | boolean | Entegrasyon aktif |
| enableFormIntegration | boolean | Form entegrasyonu |
| enableValidationIntegration | boolean | Doğrulama entegrasyonu |
| enableStateIntegration | boolean | State entegrasyonu |
| enableEventIntegration | boolean | Event entegrasyonu |
| enableDataIntegration | boolean | Data entegrasyonu |
| enableAPIIntegration | boolean | API entegrasyonu |
| enableStorageIntegration | boolean | Storage entegrasyonu |
| enableThemeIntegration | boolean | Tema entegrasyonu |
| enableI18nIntegration | boolean | I18n entegrasyonu |
| enableAccessibilityIntegration | boolean | Erişilebilirlik entegrasyonu |
| enablePerformanceIntegration | boolean | Performans entegrasyonu |
| enableMonitoringIntegration | boolean | İzleme entegrasyonu |
| enableTestingIntegration | boolean | Test entegrasyonu |
| enableCustomIntegration | boolean | Özel entegrasyon |
| integrationTimeout | number | Entegrasyon timeout |
| integrationRetries | number | Entegrasyon retry sayısı |
| integrationDelay | number | Entegrasyon gecikme |
| customIntegrations | object | Özel entegrasyonlar |
| integrationConfig | object | Entegrasyon konfigürasyonu |
| apiEndpoints | object | API endpoint'leri |
| storageKeys | object | Storage anahtarları |
| eventTypes | array | Event tipleri |
| dataFormats | array | Data formatları |
| validationRules | object | Doğrulama kuralları |
| stateKeys | array | State anahtarları |
| themeKeys | array | Tema anahtarları |
| i18nKeys | array | I18n anahtarları |
| accessibilityKeys | array | Erişilebilirlik anahtarları |
| performanceKeys | array | Performans anahtarları |
| monitoringKeys | array | İzleme anahtarları |
| testingKeys | array | Test anahtarları |
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

#### 🚀 Advanced Input Features
- **Rich Text Editor**: Markdown, HTML, formatting, links, colors support
- **Text Formatting**: Transformation, auto-resize, character/word/line/paragraph count
- **Text Counter**: Max limits, warning/critical thresholds

#### 🧠 Smart Features
- **Auto Complete**: Options, async fetch, categories, icons, keyboard navigation
- **Smart Suggestions**: Recent history, favorites, trending, recommendations, learning, personalization
- **Smart Validation**: Real-time, suggestions, learning, custom rules

#### ✅ Advanced Validation
- **Advanced Validation**: Async, context-aware, business rules, cross-field validation
- **Business Rules**: Real-time evaluation, rule learning/optimization
- **Cross Field Validation**: Dependency tracking, custom rules

#### 🎯 User Experience
- **Smart Placeholder**: Contextual, time-based, personalized, learning
- **Smart Help**: Contextual, progressive, learning, personalization
- **Progressive Disclosure**: Contextual, learning, personalization

#### ♿ Accessibility and Performance
- **Accessibility**: Screen reader, keyboard navigation, ARIA labels, live regions, focus management
- **Performance**: Render tracking, memory monitoring, optimization, debouncing, throttling, caching
- **Monitoring**: Real-time monitoring, analytics, error reporting, user behavior tracking

#### 🔧 Integration and Testing
- **Testing**: Test utilities, assertions, mocking, validation, performance testing, accessibility testing
- **Integration**: Form, state, events, data, API, storage, theme, i18n integration

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
| **Rich Text Editor** | | |
| enableRichText      | boolean  | Enable rich text editor |
| enableMarkdown      | boolean  | Markdown support |
| enableHTML          | boolean  | HTML support |
| enableFormatting    | boolean  | Formatting support |
| enableLinks         | boolean  | Link support |
| enableColors        | boolean  | Color support |
| **Text Formatting** | | |
| enableTransformation| boolean  | Enable text transformation |
| enableAutoResize    | boolean  | Enable auto resize |
| enableCharacterCount| boolean  | Character count |
| enableWordCount     | boolean  | Word count |
| enableLineCount     | boolean  | Line count |
| enableParagraphCount| boolean  | Paragraph count |
| **Text Counter** | | |
| enableCounter       | boolean  | Enable counter |
| maxCharacters       | number   | Maximum characters |
| maxWords            | number   | Maximum words |
| maxLines            | number   | Maximum lines |
| maxParagraphs       | number   | Maximum paragraphs |
| warningThreshold    | number   | Warning threshold (0-1) |
| criticalThreshold   | number   | Critical threshold (0-1) |
| **Auto Complete** | | |
| enableAutoComplete  | boolean  | Enable auto complete |
| autoCompleteOptions | array    | Auto complete options |
| fetchAutoCompleteOptions | function | Async auto complete |
| minAutoCompleteQueryLength | number | Min query length |
| maxAutoCompleteSuggestions | number | Max suggestions |
| autoCompleteDebounceMs | number | Auto complete debounce |
| enableAutoCompleteCategories | boolean | Category support |
| enableAutoCompleteIcons | boolean | Icon support |
| enableAutoCompleteKeyboardNavigation | boolean | Keyboard navigation |
| **Smart Suggestions** | | |
| enableSmartSuggestions | boolean | Enable smart suggestions |
| enableRecentHistory | boolean  | Recent history |
| enableFavorites     | boolean  | Favorites |
| enableTrending      | boolean  | Trending items |
| enableRecommendations | boolean | Recommendations |
| maxHistoryItems     | number   | Max history items |
| maxFavorites        | number   | Max favorites |
| maxTrending         | number   | Max trending |
| maxRecommendations  | number   | Max recommendations |
| suggestionDebounceMs | number  | Suggestion debounce |
| enableLearning      | boolean  | Enable learning |
| enablePersonalization | boolean | Personalization |
| **Smart Validation** | | |
| enableSmartValidation | boolean | Enable smart validation |
| enableRealTimeValidation | boolean | Real-time validation |
| enableValidationSuggestions | boolean | Validation suggestions |
| enableValidationLearning | boolean | Validation learning |
| customValidationRules | array  | Custom validation rules |
| **Advanced Validation** | | |
| enableAdvancedValidation | boolean | Enable advanced validation |
| enableAsyncValidation | boolean | Async validation |
| enableContextValidation | boolean | Context validation |
| enableBusinessRules | boolean | Business rules |
| enableCrossFieldValidation | boolean | Cross field validation |
| maxConcurrentValidations | number | Max concurrent validations |
| customValidationRules | array | Custom validation rules |
| validationContext | object | Validation context |
| **Business Rules** | | |
| enableBusinessRules | boolean | Enable business rules |
| enableRealTimeEvaluation | boolean | Real-time evaluation |
| enableRuleLearning | boolean | Rule learning |
| enableRuleOptimization | boolean | Rule optimization |
| evaluationDebounceMs | number | Evaluation debounce |
| customBusinessRules | array | Custom business rules |
| businessContext | object | Business context |
| **Cross Field Validation** | | |
| enableCrossFieldValidation | boolean | Cross field validation |
| enableDependencyTracking | boolean | Dependency tracking |
| customCrossFieldRules | array | Custom cross field rules |
| crossFieldContext | object | Cross field context |
| **Smart Placeholder** | | |
| enableSmartPlaceholder | boolean | Enable smart placeholder |
| enableContextualPlaceholders | boolean | Contextual placeholders |
| enableTimeBasedPlaceholders | boolean | Time-based placeholders |
| enablePersonalizedPlaceholders | boolean | Personalized placeholders |
| enablePlaceholderLearning | boolean | Placeholder learning |
| customPlaceholderTemplates | array | Custom placeholder templates |
| placeholderContext | object | Placeholder context |
| **Smart Help** | | |
| enableSmartHelp | boolean | Enable smart help |
| enableContextualHelp | boolean | Contextual help |
| enableProgressiveHelp | boolean | Progressive help |
| enableHelpLearning | boolean | Help learning |
| enableHelpPersonalization | boolean | Help personalization |
| customHelpItems | array | Custom help items |
| helpContext | object | Help context |
| **Progressive Disclosure** | | |
| enableProgressiveDisclosure | boolean | Enable progressive disclosure |
| enableContextualDisclosure | boolean | Contextual disclosure |
| enableDisclosureLearning | boolean | Disclosure learning |
| enableDisclosurePersonalization | boolean | Disclosure personalization |
| customDisclosureRules | array | Custom disclosure rules |
| customDisclosureContent | array | Custom disclosure content |
| disclosureContext | object | Disclosure context |
| **Accessibility** | | |
| enableAccessibility | boolean | Enable accessibility |
| enableScreenReaderSupport | boolean | Screen reader support |
| enableKeyboardNavigation | boolean | Keyboard navigation |
| enableHighContrast | boolean | High contrast |
| enableReducedMotion | boolean | Reduced motion |
| enableFocusManagement | boolean | Focus management |
| enableARIALabels | boolean | ARIA labels |
| enableLiveRegions | boolean | Live regions |
| enableSkipLinks | boolean | Skip links |
| enableTooltips | boolean | Tooltips |
| enableErrorAnnouncements | boolean | Error announcements |
| enableStatusAnnouncements | boolean | Status announcements |
| enableProgressAnnouncements | boolean | Progress announcements |
| **Performance** | | |
| enablePerformanceTracking | boolean | Performance tracking |
| enableRenderTracking | boolean | Render tracking |
| enableMemoryTracking | boolean | Memory tracking |
| enableNetworkTracking | boolean | Network tracking |
| enableUserInteractionTracking | boolean | User interaction tracking |
| enablePerformanceOptimization | boolean | Performance optimization |
| enableDebouncing | boolean | Debouncing |
| enableThrottling | boolean | Throttling |
| enableCaching | boolean | Caching |
| enableMemoization | boolean | Memoization |
| **Monitoring** | | |
| enableMonitoring | boolean | Enable monitoring |
| enableRealTimeMonitoring | boolean | Real-time monitoring |
| enableAnalytics | boolean | Analytics |
| enableErrorReporting | boolean | Error reporting |
| enablePerformanceMonitoring | boolean | Performance monitoring |
| enableUserBehaviorTracking | boolean | User behavior tracking |
| enableSecurityMonitoring | boolean | Security monitoring |
| enableCustomEvents | boolean | Custom events |
| monitoringApiEndpoint | string | Monitoring API endpoint |
| monitoringApiKey | string | Monitoring API key |
| **Testing** | | |
| enableTesting | boolean | Enable testing |
| enableTestMode | boolean | Test mode |
| enableMockData | boolean | Mock data |
| enableTestHelpers | boolean | Test helpers |
| enableTestUtilities | boolean | Test utilities |
| enableTestValidation | boolean | Test validation |
| enableTestPerformance | boolean | Test performance |
| enableTestAccessibility | boolean | Test accessibility |
| enableTestMonitoring | boolean | Test monitoring |
| enableTestDebugging | boolean | Test debugging |
| enableTestLogging | boolean | Test logging |
| enableTestAssertions | boolean | Test assertions |
| enableTestSnapshots | boolean | Test snapshots |
| enableTestCoverage | boolean | Test coverage |
| enableTestReporting | boolean | Test reporting |
| testTimeout | number | Test timeout |
| testRetries | number | Test retry count |
| testDelay | number | Test delay |
| mockData | object | Mock data |
| testConfig | object | Test configuration |
| customTestHelpers | object | Custom test helpers |
| customTestUtilities | object | Custom test utilities |
| customTestValidators | object | Custom test validators |
| customTestAssertions | object | Custom test assertions |
| **Integration** | | |
| enableIntegration | boolean | Enable integration |
| enableFormIntegration | boolean | Form integration |
| enableValidationIntegration | boolean | Validation integration |
| enableStateIntegration | boolean | State integration |
| enableEventIntegration | boolean | Event integration |
| enableDataIntegration | boolean | Data integration |
| enableAPIIntegration | boolean | API integration |
| enableStorageIntegration | boolean | Storage integration |
| enableThemeIntegration | boolean | Theme integration |
| enableI18nIntegration | boolean | I18n integration |
| enableAccessibilityIntegration | boolean | Accessibility integration |
| enablePerformanceIntegration | boolean | Performance integration |
| enableMonitoringIntegration | boolean | Monitoring integration |
| enableTestingIntegration | boolean | Testing integration |
| enableCustomIntegration | boolean | Custom integration |
| integrationTimeout | number | Integration timeout |
| integrationRetries | number | Integration retry count |
| integrationDelay | number | Integration delay |
| customIntegrations | object | Custom integrations |
| integrationConfig | object | Integration configuration |
| apiEndpoints | object | API endpoints |
| storageKeys | object | Storage keys |
| eventTypes | array | Event types |
| dataFormats | array | Data formats |
| validationRules | object | Validation rules |
| stateKeys | array | State keys |
| themeKeys | array | Theme keys |
| i18nKeys | array | I18n keys |
| accessibilityKeys | array | Accessibility keys |
| performanceKeys | array | Performance keys |
| monitoringKeys | array | Monitoring keys |
| testingKeys | array | Testing keys |
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