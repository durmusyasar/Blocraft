import React from "react";
import type { BcTextFieldProps } from "./BcTextField";
import { BcTextField } from "./BcTextField";
import { Meta, StoryObj } from "@storybook/react/*";
import enTexts from "../i18n/i18n/en.json";
// @ts-ignore
import trTexts from "../i18n/i18n/tr.json";

const TEXTS: Record<string, Record<string, string>> = {
  en: enTexts.BcTextField,
  tr: trTexts.BcTextField,
};

type Locale = keyof typeof TEXTS;

const getText = (locale: Locale | undefined, key: string): string => {
  const safeLocale = locale || "en";
  return TEXTS[safeLocale]?.[key] || TEXTS.en[key] || key;
};

// Storybook global locale decorator
const withLocale = (Story: any, context: any) => {
  const locale = context.locale || context.globals.locale;
  const storyProps = context.args || {};
  const hasLocale = storyProps.locale !== undefined;
  return (
    <Story
      {...context}
      args={hasLocale ? storyProps : { ...storyProps, locale }}
    />
  );
};
// Get default locale from Storybook globals if available, else 'en'
const defaultLocale =
  (window as any)?.__STORYBOOK_ADDONS_CHANNEL__?.data?.globalsUpdated?.[0]
    ?.globals?.locale || "en";

const meta: Meta<BcTextFieldProps> = {
  title: "Components/BcTextField",
  component: BcTextField as any,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: getText(defaultLocale, "componentDocsDescription"),
      },
    },
  },
  args: {
    // Varsayılan değerler - Controls panelinde değiştirilebilir
    appearance: "premium",
    size: "normal",
    color: "primary",
    showClearButton: false,
    enablePerformanceTracking: false,
    responsiveWidth: false,
    enableRTL: false,
    enableAsyncValidation: false,
    enableAutoComplete: false,
    enableAccessibility: false,
    
    // İKİNCİ 10 ÖNEMLİ PROP
    enableRichText: false,
    enableCharacterCount: false,
    enableAutoResize: false,
    enableHighContrast: false,
    enableReducedMotion: false,
    enableFormatting: false,
    enableTransformation: false,
    enableWordCount: false,
    enableLinks: false,
    enableColors: false,
  },
  argTypes: {
    // EN ÖNEMLİ 10 PROP - Controls panelinde gösterilecek
    appearance: {
      description: getText(defaultLocale, "appearanceDescription"),
      control: "select",
      options: [
        "premium",
        "soft",
        "glass",
        "minimal",
        "neumorph",
        "underline",
        "dark",
        "borderless",
      ],
    },
    size: {
      description: getText(defaultLocale, "sizeDescription"),
      control: "select",
      options: ["small", "normal", "large"],
    },
    color: {
      description: getText(defaultLocale, "colorDescription"),
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    showClearButton: {
      description: getText(defaultLocale, "showClearButtonDescription"),
      control: "boolean",
    },
    enablePerformanceTracking: {
      description: getText(defaultLocale, "enablePerformanceTrackingDescription"),
      control: "boolean",
    },
    responsiveWidth: {
      description: getText(defaultLocale, "missingPropsResponsiveWidth"),
      control: "boolean",
    },
    enableRTL: {
      description: getText(defaultLocale, "missingPropsEnableRTL"),
      control: "boolean",
    },
    enableAsyncValidation: {
      description: getText(defaultLocale, "enableAsyncValidationDescription"),
      control: "boolean",
    },
    enableAutoComplete: {
      description: getText(defaultLocale, "missingPropsEnableAutoComplete"),
      control: "boolean",
    },
    enableAccessibility: {
      description: getText(defaultLocale, "missingPropsEnableAccessibility"),
      control: "boolean",
    },
    
    // İKİNCİ 10 ÖNEMLİ PROP - Controls panelinde gösterilecek
    enableRichText: {
      description: getText(defaultLocale, "missingPropsEnableRichText"),
      control: "boolean",
    },
    enableCharacterCount: {
      description: getText(defaultLocale, "missingPropsEnableCharacterCount"),
      control: "boolean",
    },
    enableAutoResize: {
      description: getText(defaultLocale, "missingPropsEnableAutoResize"),
      control: "boolean",
    },
    enableHighContrast: {
      description: getText(defaultLocale, "missingPropsEnableHighContrast"),
      control: "boolean",
    },
    enableReducedMotion: {
      description: getText(defaultLocale, "missingPropsEnableReducedMotion"),
      control: "boolean",
    },
    enableFormatting: {
      description: getText(defaultLocale, "missingPropsEnableFormatting"),
      control: "boolean",
    },
    enableTransformation: {
      description: getText(defaultLocale, "missingPropsEnableTransformation"),
      control: "boolean",
    },
    enableWordCount: {
      description: getText(defaultLocale, "missingPropsEnableWordCount"),
      control: "boolean",
    },
    enableLinks: {
      description: getText(defaultLocale, "missingPropsEnableLinks"),
      control: "boolean",
    },
    enableColors: {
      description: getText(defaultLocale, "missingPropsEnableColors"),
      control: "boolean",
    },
    
    // DİĞER TÜM PROPS'LARI GİZLE - MissingPropsTable'da gösterilecek
    onClear: { table: { disable: true } },
    name: { table: { disable: true } },
    helperText: { table: { disable: true } },
    error: { table: { disable: true } },
    status: { table: { disable: true } },
    statusMessage: { table: { disable: true } },
    loading: { table: { disable: true } },
    clearButtonLabel: { table: { disable: true } },
    translations: { table: { disable: true } },
    fontSize: { table: { disable: true } },
    validateInput: { table: { disable: true } },
    showValidationStatus: { table: { disable: true } },
    validationDebounceMs: { table: { disable: true } },
    monitoring: { table: { disable: true } },
    renderCustomIcon: { table: { disable: true } },
    renderHelperText: { table: { disable: true } },
    renderEndAdornment: { table: { disable: true } },
    fallbackLocale: { table: { disable: true } },
    autoFocus: { table: { disable: true } },
    autoComplete: { table: { disable: true } },
    inputMode: { table: { disable: true } },
    pattern: { table: { disable: true } },
    maxLength: { table: { disable: true } },
    minLength: { table: { disable: true } },
    spellCheck: { table: { disable: true } },
    inputComponent: { table: { disable: true } },
    loadingReadonly: { table: { disable: true } },
    inputPrefix: { table: { disable: true } },
    inputSuffix: { table: { disable: true } },
    type: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    required: { table: { disable: true } },
    disabled: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    label: { table: { disable: true } },
    
    // Rich Text Editor
    enableMarkdown: { table: { disable: true } },
    enableHTML: { table: { disable: true } },
    
    // Text Formatting
    enableLineCount: { table: { disable: true } },
    enableParagraphCount: { table: { disable: true } },
    
    // Text Counter
    enableCounter: { table: { disable: true } },
    maxCharacters: { table: { disable: true } },
    maxWords: { table: { disable: true } },
    maxLines: { table: { disable: true } },
    maxParagraphs: { table: { disable: true } },
    warningThreshold: { table: { disable: true } },
    criticalThreshold: { table: { disable: true } },
    
    // Auto Complete
    autoCompleteOptions: { table: { disable: true } },
    fetchAutoCompleteOptions: { table: { disable: true } },
    minAutoCompleteQueryLength: { table: { disable: true } },
    maxAutoCompleteSuggestions: { table: { disable: true } },
    autoCompleteDebounceMs: { table: { disable: true } },
    enableAutoCompleteCategories: { table: { disable: true } },
    enableAutoCompleteIcons: { table: { disable: true } },
    enableAutoCompleteKeyboardNavigation: { table: { disable: true } },
    
    // Smart Suggestions
    enableSmartSuggestions: { table: { disable: true } },
    enableRecentHistory: { table: { disable: true } },
    enableFavorites: { table: { disable: true } },
    enableTrending: { table: { disable: true } },
    enableRecommendations: { table: { disable: true } },
    maxHistoryItems: { table: { disable: true } },
    maxFavorites: { table: { disable: true } },
    maxTrending: { table: { disable: true } },
    maxRecommendations: { table: { disable: true } },
    suggestionDebounceMs: { table: { disable: true } },
    enableLearning: { table: { disable: true } },
    enablePersonalization: { table: { disable: true } },
    
    // Smart Validation
    enableSmartValidation: { table: { disable: true } },
    enableSmartRealTimeValidation: { table: { disable: true } },
    enableValidationSuggestions: { table: { disable: true } },
    enableValidationLearning: { table: { disable: true } },
    smartValidationDebounceMs: { table: { disable: true } },
    smartCustomValidationRules: { table: { disable: true } },
    
    // Advanced Validation
    enableAdvancedValidation: { table: { disable: true } },
    enableAdvancedAsyncValidation: { table: { disable: true } },
    enableContextValidation: { table: { disable: true } },
    enableAdvancedBusinessRules: { table: { disable: true } },
    enableAdvancedCrossFieldValidation: { table: { disable: true } },
    enableAdvancedRealTimeValidation: { table: { disable: true } },
    maxConcurrentValidations: { table: { disable: true } },
    advancedCustomValidationRules: { table: { disable: true } },
    validationContext: { table: { disable: true } },
    
    // Business Rules
    enableBusinessRules: { table: { disable: true } },
    enableBusinessRealTimeEvaluation: { table: { disable: true } },
    enableRuleLearning: { table: { disable: true } },
    enableRuleOptimization: { table: { disable: true } },
    businessEvaluationDebounceMs: { table: { disable: true } },
    customBusinessRules: { table: { disable: true } },
    businessContext: { table: { disable: true } },
    
    // Cross Field Validation
    enableCrossFieldValidation: { table: { disable: true } },
    enableCrossFieldDependencyTracking: { table: { disable: true } },
    customCrossFieldRules: { table: { disable: true } },
    crossFieldContext: { table: { disable: true } },
    
    // Smart Placeholder
    enableSmartPlaceholder: { table: { disable: true } },
    enableContextualPlaceholders: { table: { disable: true } },
    enableTimeBasedPlaceholders: { table: { disable: true } },
    enablePersonalizedPlaceholders: { table: { disable: true } },
    enablePlaceholderLearning: { table: { disable: true } },
    customPlaceholderTemplates: { table: { disable: true } },
    placeholderContext: { table: { disable: true } },
    
    // Smart Help
    enableSmartHelp: { table: { disable: true } },
    enableContextualHelp: { table: { disable: true } },
    enableProgressiveHelp: { table: { disable: true } },
    enableHelpLearning: { table: { disable: true } },
    enableHelpPersonalization: { table: { disable: true } },
    customHelpItems: { table: { disable: true } },
    helpContext: { table: { disable: true } },
    
    // Progressive Disclosure
    enableProgressiveDisclosure: { table: { disable: true } },
    enableContextualDisclosure: { table: { disable: true } },
    enableDisclosureLearning: { table: { disable: true } },
    enableDisclosurePersonalization: { table: { disable: true } },
    customDisclosureRules: { table: { disable: true } },
    customDisclosureContent: { table: { disable: true } },
    disclosureContext: { table: { disable: true } },
    
    // Accessibility
    enableScreenReaderSupport: { table: { disable: true } },
    enableKeyboardNavigation: { table: { disable: true } },
    enableAccessibilityHighContrast: { table: { disable: true } },
    enableAccessibilityReducedMotion: { table: { disable: true } },
    enableFocusManagement: { table: { disable: true } },
    enableARIALabels: { table: { disable: true } },
    enableLiveRegions: { table: { disable: true } },
    enableSkipLinks: { table: { disable: true } },
    enableTooltips: { table: { disable: true } },
    enableErrorAnnouncements: { table: { disable: true } },
    enableStatusAnnouncements: { table: { disable: true } },
    enableProgressAnnouncements: { table: { disable: true } },
    
    // Performance
    enableRenderTracking: { table: { disable: true } },
    enableMemoryTracking: { table: { disable: true } },
    enableNetworkTracking: { table: { disable: true } },
    enableUserInteractionTracking: { table: { disable: true } },
    enablePerformanceOptimization: { table: { disable: true } },
    enableDebouncing: { table: { disable: true } },
    enableThrottling: { table: { disable: true } },
    enableCaching: { table: { disable: true } },
    enableMemoization: { table: { disable: true } },
    
    // Monitoring
    enableMonitoring: { table: { disable: true } },
    enableRealTimeMonitoring: { table: { disable: true } },
    enableAnalytics: { table: { disable: true } },
    enableErrorReporting: { table: { disable: true } },
    enablePerformanceMonitoring: { table: { disable: true } },
    enableUserBehaviorTracking: { table: { disable: true } },
    enableSecurityMonitoring: { table: { disable: true } },
    enableCustomEvents: { table: { disable: true } },
    monitoringApiEndpoint: { table: { disable: true } },
    monitoringApiKey: { table: { disable: true } },
    
    // Testing
    enableTesting: { table: { disable: true } },
    enableTestMode: { table: { disable: true } },
    enableMockData: { table: { disable: true } },
    enableTestHelpers: { table: { disable: true } },
    enableTestUtilities: { table: { disable: true } },
    enableTestValidation: { table: { disable: true } },
    enableTestPerformance: { table: { disable: true } },
    enableTestAccessibility: { table: { disable: true } },
    enableTestMonitoring: { table: { disable: true } },
    enableTestDebugging: { table: { disable: true } },
    enableTestLogging: { table: { disable: true } },
    enableTestAssertions: { table: { disable: true } },
    enableTestSnapshots: { table: { disable: true } },
    enableTestCoverage: { table: { disable: true } },
    enableTestReporting: { table: { disable: true } },
    testTimeout: { table: { disable: true } },
    testRetries: { table: { disable: true } },
    testDelay: { table: { disable: true } },
    mockData: { table: { disable: true } },
    testConfig: { table: { disable: true } },
    customTestHelpers: { table: { disable: true } },
    customTestUtilities: { table: { disable: true } },
    customTestValidators: { table: { disable: true } },
    customTestAssertions: { table: { disable: true } },
    
    // Integration
    enableIntegration: { table: { disable: true } },
    enableFormIntegration: { table: { disable: true } },
    enableValidationIntegration: { table: { disable: true } },
    enableStateIntegration: { table: { disable: true } },
    enableEventIntegration: { table: { disable: true } },
    enableDataIntegration: { table: { disable: true } },
    enableAPIIntegration: { table: { disable: true } },
    enableStorageIntegration: { table: { disable: true } },
    enableThemeIntegration: { table: { disable: true } },
    enableI18nIntegration: { table: { disable: true } },
    enableAccessibilityIntegration: { table: { disable: true } },
    enablePerformanceIntegration: { table: { disable: true } },
    enableMonitoringIntegration: { table: { disable: true } },
    enableTestingIntegration: { table: { disable: true } },
    enableCustomIntegration: { table: { disable: true } },
    integrationTimeout: { table: { disable: true } },
    integrationRetries: { table: { disable: true } },
    integrationDelay: { table: { disable: true } },
    customIntegrations: { table: { disable: true } },
    integrationConfig: { table: { disable: true } },
    apiEndpoints: { table: { disable: true } },
    storageKeys: { table: { disable: true } },
    eventTypes: { table: { disable: true } },
    dataFormats: { table: { disable: true } },
    validationRules: { table: { disable: true } },
    stateKeys: { table: { disable: true } },
    themeKeys: { table: { disable: true } },
    i18nKeys: { table: { disable: true } },
    accessibilityKeys: { table: { disable: true } },
    performanceKeys: { table: { disable: true } },
    monitoringKeys: { table: { disable: true } },
    testingKeys: { table: { disable: true } },
  },
  decorators: [withLocale],
};

export default meta;
type Story = StoryObj<BcTextFieldProps>;

// Ana Story - Controls panelindeki prop'lar bu story'de çalışır
export const Default: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <BcTextField
        {...args}
        label={getText(locale, "label")}
        placeholder={getText(locale, "placeholder")}
        helperText={getText(locale, "helperText")}
        locale={locale}
      />
    );
  },
};

// Missing Props Table / Eksik Prop'lar Tablosu - EN ÜSTTE (Kullanıcılar önce tüm prop'ları görebilir)
export const MissingPropsTable: Story = {
  args: {
    // Varsayılan değerler - Controls panelinde değiştirilebilir
    appearance: "premium",
    size: "normal",
    color: "primary",
    showClearButton: true,
    enablePerformanceTracking: false,
    responsiveWidth: false,
    enableRTL: false,
    enableAsyncValidation: false,
    enableAutoComplete: false,
    enableAccessibility: false,
    enableRichText: false,
    enableCharacterCount: false,
    enableAutoResize: false,
    enableHighContrast: false,
    enableReducedMotion: false,
    enableFormatting: false,
    enableTransformation: false,
    enableWordCount: false,
    enableLinks: false,
    enableColors: false,
  },
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");
    const itemsPerPage = 10;

    const missingProps = [
      // DİĞER PROPS'LAR - Controls panelinde gizlenen, MissingPropsTable'da gösterilecek
      // (En önemli 10 prop Controls panelinde gösteriliyor)
      {
        name: "renderEndAdornment",
        type: "function",
        category: getText(locale, "categoryBasicProps"),
        description: getText(locale, "missingPropsRenderEndAdornment"),
      },
      {
        name: "clearButtonLabel",
        type: "string",
        category: getText(locale, "categoryBasicProps"),
        description: getText(locale, "missingPropsClearButtonLabel"),
      },
      {
        name: "translations",
        type: "object",
        category: getText(locale, "categoryBasicProps"),
        description: getText(locale, "missingPropsTranslations"),
      },
      {
        name: "locale",
        type: "string",
        category: getText(locale, "categoryInternationalization"),
        description: getText(locale, "missingPropsLocale"),
      },

      // Rich Text Editor
      {
        name: "enableMarkdown",
        type: "boolean",
        category: getText(locale, "categoryRichTextEditor"),
        description: getText(locale, "missingPropsEnableMarkdown"),
      },
      {
        name: "enableHTML",
        type: "boolean",
        category: getText(locale, "categoryRichTextEditor"),
        description: getText(locale, "missingPropsEnableHTML"),
      },

      // Text Formatting
      {
        name: "enableLineCount",
        type: "boolean",
        category: getText(locale, "categoryTextFormatting"),
        description: getText(locale, "missingPropsEnableLineCount"),
      },
      {
        name: "enableParagraphCount",
        type: "boolean",
        category: getText(locale, "categoryTextFormatting"),
        description: getText(locale, "missingPropsEnableParagraphCount"),
      },

      // Text Counter
      {
        name: "enableCounter",
        type: "boolean",
        category: getText(locale, "categoryTextCounter"),
        description: getText(locale, "missingPropsEnableCounter"),
      },
      {
        name: "maxCharacters",
        type: "number",
        category: getText(locale, "categoryTextCounter"),
        description: getText(locale, "missingPropsMaxCharacters"),
      },
      {
        name: "maxWords",
        type: "number",
        category: getText(locale, "categoryTextCounter"),
        description: getText(locale, "missingPropsMaxWords"),
      },
      {
        name: "maxLines",
        type: "number",
        category: getText(locale, "categoryTextCounter"),
        description: getText(locale, "missingPropsMaxLines"),
      },
      {
        name: "maxParagraphs",
        type: "number",
        category: getText(locale, "categoryTextCounter"),
        description: getText(locale, "missingPropsMaxParagraphs"),
      },
      {
        name: "warningThreshold",
        type: "number",
        category: getText(locale, "categoryTextCounter"),
        description: getText(locale, "missingPropsWarningThreshold"),
      },
      {
        name: "criticalThreshold",
        type: "number",
        category: getText(locale, "categoryTextCounter"),
        description: getText(locale, "missingPropsCriticalThreshold"),
      },

      // Auto Complete
      {
        name: "autoCompleteOptions",
        type: "array",
        category: getText(locale, "categoryAutoComplete"),
        description: getText(locale, "missingPropsAutoCompleteOptions"),
      },
      {
        name: "fetchAutoCompleteOptions",
        type: "function",
        category: getText(locale, "categoryAutoComplete"),
        description: getText(locale, "missingPropsFetchAutoCompleteOptions"),
      },
      {
        name: "minAutoCompleteQueryLength",
        type: "number",
        category: getText(locale, "categoryAutoComplete"),
        description: getText(locale, "missingPropsMinAutoCompleteQueryLength"),
      },
      {
        name: "maxAutoCompleteSuggestions",
        type: "number",
        category: getText(locale, "categoryAutoComplete"),
        description: getText(locale, "missingPropsMaxAutoCompleteSuggestions"),
      },
      {
        name: "autoCompleteDebounceMs",
        type: "number",
        category: getText(locale, "categoryAutoComplete"),
        description: getText(locale, "missingPropsAutoCompleteDebounceMs"),
      },
      {
        name: "enableAutoCompleteCategories",
        type: "boolean",
        category: getText(locale, "categoryAutoComplete"),
        description: getText(
          locale,
          "missingPropsEnableAutoCompleteCategories"
        ),
      },
      {
        name: "enableAutoCompleteIcons",
        type: "boolean",
        category: getText(locale, "categoryAutoComplete"),
        description: getText(locale, "missingPropsEnableAutoCompleteIcons"),
      },
      {
        name: "enableAutoCompleteKeyboardNavigation",
        type: "boolean",
        category: getText(locale, "categoryAutoComplete"),
        description: getText(
          locale,
          "missingPropsEnableAutoCompleteKeyboardNavigation"
        ),
      },

      // Smart Suggestions
      {
        name: "enableSmartSuggestions",
        type: "boolean",
        category: getText(locale, "categorySmartSuggestions"),
        description: getText(locale, "missingPropsEnableSmartSuggestions"),
      },
      {
        name: "enableRecentHistory",
        type: "boolean",
        category: getText(locale, "categorySmartSuggestions"),
        description: getText(locale, "missingPropsEnableRecentHistory"),
      },
      {
        name: "enableFavorites",
        type: "boolean",
        category: getText(locale, "categorySmartSuggestions"),
        description: getText(locale, "missingPropsEnableFavorites"),
      },
      {
        name: "enableTrending",
        type: "boolean",
        category: getText(locale, "categorySmartSuggestions"),
        description: getText(locale, "missingPropsEnableTrending"),
      },
      {
        name: "enableRecommendations",
        type: "boolean",
        category: getText(locale, "categorySmartSuggestions"),
        description: getText(locale, "missingPropsEnableRecommendations"),
      },
      {
        name: "maxHistoryItems",
        type: "number",
        category: getText(locale, "categorySmartSuggestions"),
        description: getText(locale, "missingPropsMaxHistoryItems"),
      },
      {
        name: "maxFavorites",
        type: "number",
        category: getText(locale, "categorySmartSuggestions"),
        description: getText(locale, "missingPropsMaxFavorites"),
      },
      {
        name: "maxTrending",
        type: "number",
        category: getText(locale, "categorySmartSuggestions"),
        description: getText(locale, "missingPropsMaxTrending"),
      },
      {
        name: "maxRecommendations",
        type: "number",
        category: getText(locale, "categorySmartSuggestions"),
        description: getText(locale, "missingPropsMaxRecommendations"),
      },
      {
        name: "suggestionDebounceMs",
        type: "number",
        category: getText(locale, "categorySmartSuggestions"),
        description: getText(locale, "missingPropsSuggestionDebounceMs"),
      },
      {
        name: "enableLearning",
        type: "boolean",
        category: getText(locale, "categorySmartSuggestions"),
        description: getText(locale, "missingPropsEnableLearning"),
      },
      {
        name: "enablePersonalization",
        type: "boolean",
        category: getText(locale, "categorySmartSuggestions"),
        description: getText(locale, "missingPropsEnablePersonalization"),
      },

      // Smart Validation
      {
        name: "enableSmartValidation",
        type: "boolean",
        category: getText(locale, "categorySmartValidation"),
        description: getText(locale, "missingPropsEnableSmartValidation"),
      },
      {
        name: "enableSmartRealTimeValidation",
        type: "boolean",
        category: getText(locale, "categorySmartValidation"),
        description: getText(locale, "missingPropsEnableSmartRealTimeValidation"),
      },
      {
        name: "enableValidationSuggestions",
        type: "boolean",
        category: getText(locale, "categorySmartValidation"),
        description: getText(locale, "missingPropsEnableValidationSuggestions"),
      },
      {
        name: "enableValidationLearning",
        type: "boolean",
        category: getText(locale, "categorySmartValidation"),
        description: getText(locale, "missingPropsEnableValidationLearning"),
      },
      {
        name: "smartValidationDebounceMs",
        type: "number",
        category: getText(locale, "categorySmartValidation"),
        description: getText(locale, "missingPropsSmartValidationDebounceMs"),
      },
      {
        name: "smartCustomValidationRules",
        type: "array",
        category: getText(locale, "categorySmartValidation"),
        description: getText(locale, "missingPropsSmartCustomValidationRules"),
      },

      // Advanced Validation
      {
        name: "enableAdvancedValidation",
        type: "boolean",
        category: getText(locale, "categoryAdvancedValidation"),
        description: getText(locale, "missingPropsEnableAdvancedValidation"),
      },
      {
        name: "enableAdvancedAsyncValidation",
        type: "boolean",
        category: getText(locale, "categoryAdvancedValidation"),
        description: getText(locale, "missingPropsEnableAdvancedAsyncValidation"),
      },
      {
        name: "enableContextValidation",
        type: "boolean",
        category: getText(locale, "categoryAdvancedValidation"),
        description: getText(locale, "missingPropsEnableContextValidation"),
      },
      {
        name: "enableAdvancedBusinessRules",
        type: "boolean",
        category: getText(locale, "categoryAdvancedValidation"),
        description: getText(locale, "missingPropsEnableAdvancedBusinessRules"),
      },
      {
        name: "enableAdvancedCrossFieldValidation",
        type: "boolean",
        category: getText(locale, "categoryAdvancedValidation"),
        description: getText(locale, "missingPropsEnableAdvancedCrossFieldValidation"),
      },
      {
        name: "enableAdvancedRealTimeValidation",
        type: "boolean",
        category: getText(locale, "categoryAdvancedValidation"),
        description: getText(locale, "missingPropsEnableAdvancedRealTimeValidation"),
      },
      {
        name: "maxConcurrentValidations",
        type: "number",
        category: getText(locale, "categoryAdvancedValidation"),
        description: getText(locale, "missingPropsMaxConcurrentValidations"),
      },
      {
        name: "advancedCustomValidationRules",
        type: "array",
        category: getText(locale, "categoryAdvancedValidation"),
        description: getText(locale, "missingPropsAdvancedCustomValidationRules"),
      },
      {
        name: "validationContext",
        type: "object",
        category: getText(locale, "categoryAdvancedValidation"),
        description: getText(locale, "missingPropsValidationContext"),
      },

      // Business Rules
      {
        name: "enableBusinessRules",
        type: "boolean",
        category: getText(locale, "categoryBusinessRules"),
        description: getText(locale, "missingPropsEnableBusinessRules"),
      },
      {
        name: "enableBusinessRealTimeEvaluation",
        type: "boolean",
        category: getText(locale, "categoryBusinessRules"),
        description: getText(locale, "missingPropsEnableBusinessRealTimeEvaluation"),
      },
      {
        name: "enableRuleLearning",
        type: "boolean",
        category: getText(locale, "categoryBusinessRules"),
        description: getText(locale, "missingPropsEnableRuleLearning"),
      },
      {
        name: "enableRuleOptimization",
        type: "boolean",
        category: getText(locale, "categoryBusinessRules"),
        description: getText(locale, "missingPropsEnableRuleOptimization"),
      },
      {
        name: "businessEvaluationDebounceMs",
        type: "number",
        category: getText(locale, "categoryBusinessRules"),
        description: getText(locale, "missingPropsBusinessEvaluationDebounceMs"),
      },
      {
        name: "customBusinessRules",
        type: "array",
        category: getText(locale, "categoryBusinessRules"),
        description: getText(locale, "missingPropsCustomBusinessRules"),
      },
      {
        name: "businessContext",
        type: "object",
        category: getText(locale, "categoryBusinessRules"),
        description: getText(locale, "missingPropsBusinessContext"),
      },

      // Cross Field Validation
      {
        name: "enableCrossFieldValidation",
        type: "boolean",
        category: getText(locale, "categoryCrossFieldValidation"),
        description: getText(locale, "missingPropsEnableCrossFieldValidation"),
      },
      {
        name: "enableCrossFieldDependencyTracking",
        type: "boolean",
        category: getText(locale, "categoryCrossFieldValidation"),
        description: getText(locale, "missingPropsEnableCrossFieldDependencyTracking"),
      },
      {
        name: "customCrossFieldRules",
        type: "array",
        category: getText(locale, "categoryCrossFieldValidation"),
        description: getText(locale, "missingPropsCustomCrossFieldRules"),
      },
      {
        name: "crossFieldContext",
        type: "object",
        category: getText(locale, "categoryCrossFieldValidation"),
        description: getText(locale, "missingPropsCrossFieldContext"),
      },

      // Smart Placeholder
      {
        name: "enableSmartPlaceholder",
        type: "boolean",
        category: getText(locale, "categorySmartPlaceholder"),
        description: getText(locale, "missingPropsEnableSmartPlaceholder"),
      },
      {
        name: "enableContextualPlaceholders",
        type: "boolean",
        category: getText(locale, "categorySmartPlaceholder"),
        description: getText(locale, "missingPropsEnableContextualPlaceholders"),
      },
      {
        name: "enableTimeBasedPlaceholders",
        type: "boolean",
        category: getText(locale, "categorySmartPlaceholder"),
        description: getText(locale, "missingPropsEnableTimeBasedPlaceholders"),
      },
      {
        name: "enablePersonalizedPlaceholders",
        type: "boolean",
        category: getText(locale, "categorySmartPlaceholder"),
        description: getText(locale, "missingPropsEnablePersonalizedPlaceholders"),
      },
      {
        name: "enablePlaceholderLearning",
        type: "boolean",
        category: getText(locale, "categorySmartPlaceholder"),
        description: getText(locale, "missingPropsEnablePlaceholderLearning"),
      },
      {
        name: "customPlaceholderTemplates",
        type: "array",
        category: getText(locale, "categorySmartPlaceholder"),
        description: getText(locale, "missingPropsCustomPlaceholderTemplates"),
      },
      {
        name: "placeholderContext",
        type: "object",
        category: getText(locale, "categorySmartPlaceholder"),
        description: getText(locale, "missingPropsPlaceholderContext"),
      },

      // Smart Help
      {
        name: "enableSmartHelp",
        type: "boolean",
        category: getText(locale, "categorySmartHelp"),
        description: getText(locale, "missingPropsEnableSmartHelp"),
      },
      {
        name: "enableContextualHelp",
        type: "boolean",
        category: getText(locale, "categorySmartHelp"),
        description: getText(locale, "missingPropsEnableContextualHelp"),
      },
      {
        name: "enableProgressiveHelp",
        type: "boolean",
        category: getText(locale, "categorySmartHelp"),
        description: getText(locale, "missingPropsEnableProgressiveHelp"),
      },
      {
        name: "enableHelpLearning",
        type: "boolean",
        category: getText(locale, "categorySmartHelp"),
        description: getText(locale, "missingPropsEnableHelpLearning"),
      },
      {
        name: "enableHelpPersonalization",
        type: "boolean",
        category: getText(locale, "categorySmartHelp"),
        description: getText(locale, "missingPropsEnableHelpPersonalization"),
      },
      {
        name: "customHelpItems",
        type: "array",
        category: getText(locale, "categorySmartHelp"),
        description: getText(locale, "missingPropsCustomHelpItems"),
      },
      {
        name: "helpContext",
        type: "object",
        category: getText(locale, "categorySmartHelp"),
        description: getText(locale, "missingPropsHelpContext"),
      },

      // Progressive Disclosure
      {
        name: "enableProgressiveDisclosure",
        type: "boolean",
        category: getText(locale, "categoryProgressiveDisclosure"),
        description: getText(locale, "missingPropsEnableProgressiveDisclosure"),
      },
      {
        name: "enableContextualDisclosure",
        type: "boolean",
        category: getText(locale, "categoryProgressiveDisclosure"),
        description: getText(locale, "missingPropsEnableContextualDisclosure"),
      },
      {
        name: "enableDisclosureLearning",
        type: "boolean",
        category: getText(locale, "categoryProgressiveDisclosure"),
        description: getText(locale, "missingPropsEnableDisclosureLearning"),
      },
      {
        name: "enableDisclosurePersonalization",
        type: "boolean",
        category: getText(locale, "categoryProgressiveDisclosure"),
        description: getText(locale, "missingPropsEnableDisclosurePersonalization"),
      },
      {
        name: "customDisclosureRules",
        type: "array",
        category: getText(locale, "categoryProgressiveDisclosure"),
        description: getText(locale, "missingPropsCustomDisclosureRules"),
      },
      {
        name: "customDisclosureContent",
        type: "array",
        category: getText(locale, "categoryProgressiveDisclosure"),
        description: getText(locale, "missingPropsCustomDisclosureContent"),
      },
      {
        name: "disclosureContext",
        type: "object",
        category: getText(locale, "categoryProgressiveDisclosure"),
        description: getText(locale, "missingPropsDisclosureContext"),
      },

      // Accessibility
      {
        name: "enableScreenReaderSupport",
        type: "boolean",
        category: getText(locale, "categoryAccessibility"),
        description: getText(locale, "missingPropsEnableScreenReaderSupport"),
      },
      {
        name: "enableKeyboardNavigation",
        type: "boolean",
        category: getText(locale, "categoryAccessibility"),
        description: getText(locale, "missingPropsEnableKeyboardNavigation"),
      },
      {
        name: "enableAccessibilityHighContrast",
        type: "boolean",
        category: getText(locale, "categoryAccessibility"),
        description: getText(locale, "missingPropsEnableAccessibilityHighContrast"),
      },
      {
        name: "enableAccessibilityReducedMotion",
        type: "boolean",
        category: getText(locale, "categoryAccessibility"),
        description: getText(locale, "missingPropsEnableAccessibilityReducedMotion"),
      },
      {
        name: "enableFocusManagement",
        type: "boolean",
        category: getText(locale, "categoryAccessibility"),
        description: getText(locale, "missingPropsEnableFocusManagement"),
      },
      {
        name: "enableARIALabels",
        type: "boolean",
        category: getText(locale, "categoryAccessibility"),
        description: getText(locale, "missingPropsEnableARIALabels"),
      },
      {
        name: "enableLiveRegions",
        type: "boolean",
        category: getText(locale, "categoryAccessibility"),
        description: getText(locale, "missingPropsEnableLiveRegions"),
      },
      {
        name: "enableSkipLinks",
        type: "boolean",
        category: getText(locale, "categoryAccessibility"),
        description: getText(locale, "missingPropsEnableSkipLinks"),
      },
      {
        name: "enableTooltips",
        type: "boolean",
        category: getText(locale, "categoryAccessibility"),
        description: getText(locale, "missingPropsEnableTooltips"),
      },
      {
        name: "enableErrorAnnouncements",
        type: "boolean",
        category: getText(locale, "categoryAccessibility"),
        description: getText(locale, "missingPropsEnableErrorAnnouncements"),
      },
      {
        name: "enableStatusAnnouncements",
        type: "boolean",
        category: getText(locale, "categoryAccessibility"),
        description: getText(locale, "missingPropsEnableStatusAnnouncements"),
      },
      {
        name: "enableProgressAnnouncements",
        type: "boolean",
        category: getText(locale, "categoryAccessibility"),
        description: getText(locale, "missingPropsEnableProgressAnnouncements"),
      },

      // Performance
      {
        name: "enablePerformanceTracking",
        type: "boolean",
        category: getText(locale, "categoryPerformance"),
        description: getText(locale, "missingPropsEnablePerformanceTracking"),
      },
      {
        name: "enableRenderTracking",
        type: "boolean",
        category: getText(locale, "categoryPerformance"),
        description: getText(locale, "missingPropsEnableRenderTracking"),
      },
      {
        name: "enableMemoryTracking",
        type: "boolean",
        category: getText(locale, "categoryPerformance"),
        description: getText(locale, "missingPropsEnableMemoryTracking"),
      },
      {
        name: "enableNetworkTracking",
        type: "boolean",
        category: getText(locale, "categoryPerformance"),
        description: getText(locale, "missingPropsEnableNetworkTracking"),
      },
      {
        name: "enableUserInteractionTracking",
        type: "boolean",
        category: getText(locale, "categoryPerformance"),
        description: getText(locale, "missingPropsEnableUserInteractionTracking"),
      },
      {
        name: "enablePerformanceOptimization",
        type: "boolean",
        category: getText(locale, "categoryPerformance"),
        description: getText(locale, "missingPropsEnablePerformanceOptimization"),
      },
      {
        name: "enableDebouncing",
        type: "boolean",
        category: getText(locale, "categoryPerformance"),
        description: getText(locale, "missingPropsEnableDebouncing"),
      },
      {
        name: "enableThrottling",
        type: "boolean",
        category: getText(locale, "categoryPerformance"),
        description: getText(locale, "missingPropsEnableThrottling"),
      },
      {
        name: "enableCaching",
        type: "boolean",
        category: getText(locale, "categoryPerformance"),
        description: getText(locale, "missingPropsEnableCaching"),
      },
      {
        name: "enableMemoization",
        type: "boolean",
        category: getText(locale, "categoryPerformance"),
        description: getText(locale, "missingPropsEnableMemoization"),
      },

      // Monitoring
      {
        name: "enableMonitoring",
        type: "boolean",
        category: getText(locale, "categoryMonitoring"),
        description: getText(locale, "missingPropsEnableMonitoring"),
      },
      {
        name: "enableRealTimeMonitoring",
        type: "boolean",
        category: getText(locale, "categoryMonitoring"),
        description: getText(locale, "missingPropsEnableRealTimeMonitoring"),
      },
      {
        name: "enableAnalytics",
        type: "boolean",
        category: getText(locale, "categoryMonitoring"),
        description: getText(locale, "missingPropsEnableAnalytics"),
      },
      {
        name: "enableErrorReporting",
        type: "boolean",
        category: getText(locale, "categoryMonitoring"),
        description: getText(locale, "missingPropsEnableErrorReporting"),
      },
      {
        name: "enablePerformanceMonitoring",
        type: "boolean",
        category: getText(locale, "categoryMonitoring"),
        description: getText(locale, "missingPropsEnablePerformanceMonitoring"),
      },
      {
        name: "enableUserBehaviorTracking",
        type: "boolean",
        category: getText(locale, "categoryMonitoring"),
        description: getText(locale, "missingPropsEnableUserBehaviorTracking"),
      },
      {
        name: "enableSecurityMonitoring",
        type: "boolean",
        category: getText(locale, "categoryMonitoring"),
        description: getText(locale, "missingPropsEnableSecurityMonitoring"),
      },
      {
        name: "enableCustomEvents",
        type: "boolean",
        category: getText(locale, "categoryMonitoring"),
        description: getText(locale, "missingPropsEnableCustomEvents"),
      },
      {
        name: "monitoringApiEndpoint",
        type: "string",
        category: getText(locale, "categoryMonitoring"),
        description: getText(locale, "missingPropsMonitoringApiEndpoint"),
      },
      {
        name: "monitoringApiKey",
        type: "string",
        category: getText(locale, "categoryMonitoring"),
        description: getText(locale, "missingPropsMonitoringApiKey"),
      },

      // Testing
      {
        name: "enableTesting",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTesting"),
      },
      {
        name: "enableTestMode",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestMode"),
      },
      {
        name: "enableMockData",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableMockData"),
      },
      {
        name: "enableTestHelpers",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestHelpers"),
      },
      {
        name: "enableTestUtilities",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestUtilities"),
      },
      {
        name: "enableTestValidation",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestValidation"),
      },
      {
        name: "enableTestPerformance",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestPerformance"),
      },
      {
        name: "enableTestAccessibility",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestAccessibility"),
      },
      {
        name: "enableTestMonitoring",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestMonitoring"),
      },
      {
        name: "enableTestDebugging",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestDebugging"),
      },
      {
        name: "enableTestLogging",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestLogging"),
      },
      {
        name: "enableTestAssertions",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestAssertions"),
      },
      {
        name: "enableTestSnapshots",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestSnapshots"),
      },
      {
        name: "enableTestCoverage",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestCoverage"),
      },
      {
        name: "enableTestReporting",
        type: "boolean",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsEnableTestReporting"),
      },
      {
        name: "testTimeout",
        type: "number",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsTestTimeout"),
      },
      {
        name: "testRetries",
        type: "number",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsTestRetries"),
      },
      {
        name: "testDelay",
        type: "number",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsTestDelay"),
      },
      {
        name: "mockData",
        type: "object",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsMockData"),
      },
      {
        name: "testConfig",
        type: "object",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsTestConfig"),
      },
      {
        name: "customTestHelpers",
        type: "object",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsCustomTestHelpers"),
      },
      {
        name: "customTestUtilities",
        type: "object",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsCustomTestUtilities"),
      },
      {
        name: "customTestValidators",
        type: "object",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsCustomTestValidators"),
      },
      {
        name: "customTestAssertions",
        type: "object",
        category: getText(locale, "categoryTesting"),
        description: getText(locale, "missingPropsCustomTestAssertions"),
      },

      // Integration
      {
        name: "enableIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableIntegration"),
      },
      {
        name: "enableFormIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableFormIntegration"),
      },
      {
        name: "enableValidationIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableValidationIntegration"),
      },
      {
        name: "enableStateIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableStateIntegration"),
      },
      {
        name: "enableEventIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableEventIntegration"),
      },
      {
        name: "enableDataIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableDataIntegration"),
      },
      {
        name: "enableAPIIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableAPIIntegration"),
      },
      {
        name: "enableStorageIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableStorageIntegration"),
      },
      {
        name: "enableThemeIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableThemeIntegration"),
      },
      {
        name: "enableI18nIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableI18nIntegration"),
      },
      {
        name: "enableAccessibilityIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableAccessibilityIntegration"),
      },
      {
        name: "enablePerformanceIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnablePerformanceIntegration"),
      },
      {
        name: "enableMonitoringIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableMonitoringIntegration"),
      },
      {
        name: "enableTestingIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableTestingIntegration"),
      },
      {
        name: "enableCustomIntegration",
        type: "boolean",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEnableCustomIntegration"),
      },
      {
        name: "integrationTimeout",
        type: "number",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsIntegrationTimeout"),
      },
      {
        name: "integrationRetries",
        type: "number",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsIntegrationRetries"),
      },
      {
        name: "integrationDelay",
        type: "number",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsIntegrationDelay"),
      },
      {
        name: "customIntegrations",
        type: "object",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsCustomIntegrations"),
      },
      {
        name: "integrationConfig",
        type: "object",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsIntegrationConfig"),
      },
      {
        name: "apiEndpoints",
        type: "object",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsApiEndpoints"),
      },
      {
        name: "storageKeys",
        type: "object",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsStorageKeys"),
      },
      {
        name: "eventTypes",
        type: "array",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsEventTypes"),
      },
      {
        name: "dataFormats",
        type: "array",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsDataFormats"),
      },
      {
        name: "validationRules",
        type: "object",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsValidationRules"),
      },
      {
        name: "stateKeys",
        type: "array",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsStateKeys"),
      },
      {
        name: "themeKeys",
        type: "array",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsThemeKeys"),
      },
      {
        name: "i18nKeys",
        type: "array",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsI18nKeys"),
      },
      {
        name: "accessibilityKeys",
        type: "array",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsAccessibilityKeys"),
      },
      {
        name: "performanceKeys",
        type: "array",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsPerformanceKeys"),
      },
      {
        name: "monitoringKeys",
        type: "array",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsMonitoringKeys"),
      },
      {
        name: "testingKeys",
        type: "array",
        category: getText(locale, "categoryIntegration"),
        description: getText(locale, "missingPropsTestingKeys"),
      },
    ];

    const filteredProps = missingProps.filter(
      (prop) =>
        prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProps.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProps = filteredProps.slice(startIndex, endIndex);

    const getTypeColor = (type: string) => {
      switch (type) {
        case "boolean":
          return "#e3f2fd";
        case "string":
          return "#f3e5f5";
        case "number":
          return "#e8f5e8";
        case "array":
          return "#fff3e0";
        case "object":
          return "#fce4ec";
        case "function":
          return "#f1f8e9";
        default:
          return "#f5f5f5";
      }
    };

    const getTypeIcon = (type: string) => {
      switch (type) {
        case "boolean":
          return "🔘";
        case "string":
          return "📝";
        case "number":
          return "🔢";
        case "array":
          return "📋";
        case "object":
          return "📦";
        case "function":
          return "⚙️";
        default:
          return "❓";
      }
    };

    return (
      <div
        style={{
          padding: 24,
          background: "#f8f9fa",
          borderRadius: 8,
          border: "1px solid #e9ecef",
        }}
      >
        <div
          style={{
            marginBottom: 16,
            padding: "12px 16px",
            background: "#e3f2fd",
            borderRadius: 6,
            border: "1px solid #bbdefb",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#1976d2",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {getText(locale, "missingPropsTableStoryDescription")}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "bold",
              color: "#495057",
            }}
          >
            📋 {getText(locale, "missingPropsTableTitle")}
          </h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setCurrentPage(1)}
              style={{
                padding: "8px 16px",
                border: "1px solid #ccc",
                background: locale === "en" ? "#007bff" : "white",
                color: locale === "en" ? "white" : "black",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              English
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              style={{
                padding: "8px 16px",
                border: "1px solid #ccc",
                background: locale === "tr" ? "#007bff" : "white",
                color: locale === "tr" ? "white" : "black",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Türkçe
            </button>
          </div>
          </div>
          
        <div style={{ marginBottom: 20 }}>
          <BcTextField
            {...args}
            placeholder={getText(locale, "missingPropsSearchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            locale={locale}
            style={{
              width: "100%",
            }}
          />
        </div>
          
        <div
          style={{
            background: "white",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  background: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                }}
              >
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#495057",
                  }}
                >
                  {getText(locale, "missingPropsPropName")}
                </th>
                <th
                  style={{
                    padding: "15px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#495057",
                  }}
                >
                  {getText(locale, "missingPropsType")}
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#495057",
                  }}
                >
                  {getText(locale, "missingPropsCategory")}
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#495057",
                  }}
                >
                  {getText(locale, "missingPropsDescription")}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProps.map((prop, index) => (
                <tr
                  key={prop.name}
                  style={{ borderBottom: "1px solid #dee2e6" }}
                >
                  <td
                    style={{
                      padding: "16px",
                      fontWeight: "500",
                      color: "#212529",
                    }}
                  >
                    <code
                      style={{
                        background: "#f8f9fa",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    >
                      {prop.name}
                    </code>
                  </td>
                  <td style={{ padding: "14px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                        background: getTypeColor(prop.type),
                        color: "#495057",
                      }}
                    >
                      {getTypeIcon(prop.type)} {prop.type}
                    </span>
                  </td>
                  <td style={{ padding: "16px", color: "#6c757d" }}>
                    {prop.category}
                  </td>
                  <td style={{ padding: "16px", color: "#6c757d" }}>
                    {getText(
                      locale,
                      `missingProps${
                        prop.name.charAt(0).toUpperCase() + prop.name.slice(1)
                      }`
                    ) || prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <div style={{ color: "#6c757d", fontSize: "14px" }}>
            {getText(locale, "missingPropsShowing")} {filteredProps.length}{" "}
            {getText(locale, "missingPropsProps")} ({startIndex + 1}-
            {Math.min(endIndex, filteredProps.length)})
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                padding: "8px 16px",
                border: "1px solid #ccc",
                background: currentPage === 1 ? "#f8f9fa" : "white",
                color: currentPage === 1 ? "#6c757d" : "#495057",
                borderRadius: "4px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              {getText(locale, "missingPropsPrevious")}
            </button>
            <span
              style={{
                padding: "8px 16px",
                color: "#495057",
                display: "flex",
                alignItems: "center",
              }}
            >
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              style={{
                padding: "8px 16px",
                border: "1px solid #ccc",
                background: currentPage === totalPages ? "#f8f9fa" : "white",
                color: currentPage === totalPages ? "#6c757d" : "#495057",
                borderRadius: "4px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              {getText(locale, "missingPropsNext")}
            </button>
          </div>
        </div>
      </div>
    );
  },
  argTypes: {
    // EN ÖNEMLİ 20 PROP - Controls panelinde gösterilecek
    appearance: {
      description: getText(defaultLocale, "appearanceDescription"),
      control: "select",
      options: [
        "premium",
        "soft",
        "glass",
        "minimal",
        "neumorph",
        "underline",
        "dark",
        "borderless",
      ],
    },
    size: {
      description: getText(defaultLocale, "sizeDescription"),
      control: "select",
      options: ["small", "normal", "large"],
    },
    color: {
      description: getText(defaultLocale, "colorDescription"),
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    showClearButton: {
      description: getText(defaultLocale, "showClearButtonDescription"),
      control: "boolean",
    },
    enablePerformanceTracking: {
      description: getText(defaultLocale, "enablePerformanceTrackingDescription"),
      control: "boolean",
    },
    responsiveWidth: {
      description: getText(defaultLocale, "missingPropsResponsiveWidth"),
      control: "boolean",
    },
    enableRTL: {
      description: getText(defaultLocale, "missingPropsEnableRTL"),
      control: "boolean",
    },
    enableAsyncValidation: {
      description: getText(defaultLocale, "enableAsyncValidationDescription"),
      control: "boolean",
    },
    enableAutoComplete: {
      description: getText(defaultLocale, "missingPropsEnableAutoComplete"),
      control: "boolean",
    },
    enableAccessibility: {
      description: getText(defaultLocale, "missingPropsEnableAccessibility"),
      control: "boolean",
    },
    enableRichText: {
      description: getText(defaultLocale, "missingPropsEnableRichText"),
      control: "boolean",
    },
    enableCharacterCount: {
      description: getText(defaultLocale, "missingPropsEnableCharacterCount"),
      control: "boolean",
    },
    enableAutoResize: {
      description: getText(defaultLocale, "missingPropsEnableAutoResize"),
      control: "boolean",
    },
    enableHighContrast: {
      description: getText(defaultLocale, "missingPropsEnableHighContrast"),
      control: "boolean",
    },
    enableReducedMotion: {
      description: getText(defaultLocale, "missingPropsEnableReducedMotion"),
      control: "boolean",
    },
    enableFormatting: {
      description: getText(defaultLocale, "missingPropsEnableFormatting"),
      control: "boolean",
    },
    enableTransformation: {
      description: getText(defaultLocale, "missingPropsEnableTransformation"),
      control: "boolean",
    },
    enableWordCount: {
      description: getText(defaultLocale, "missingPropsEnableWordCount"),
      control: "boolean",
    },
    enableLinks: {
      description: getText(defaultLocale, "missingPropsEnableLinks"),
      control: "boolean",
    },
    enableColors: {
      description: getText(defaultLocale, "missingPropsEnableColors"),
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      description: {
        story: getText(defaultLocale, 'missingPropsTableStoryDescription'),
      },
    },
  },
};

// Yeni Gelişmiş Input Özellikleri Stories
export const RichTextEditor: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcTextField
          label={getText(locale, "richTextEditorLabel")}
          placeholder={getText(locale, "richTextEditorPlaceholder")}
          enableRichText={true}
          enableHTML={true}
          enableFormatting={true}
          enableLinks={true}
          enableColors={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          {getText(locale, "richTextEditorDescription")}
        </div>
      </div>
    );
  },
};

export const TextFormatting: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcTextField
          label={getText(locale, "textFormattingLabel")}
          placeholder={getText(locale, "textFormattingPlaceholder")}
          enableTransformation={true}
          enableAutoResize={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          {getText(locale, "textFormattingDescription")}
        </div>
      </div>
    );
  },
};

export const TextCounter: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcTextField
          label={getText(locale, "textCounterLabel")}
          placeholder={getText(locale, "textCounterPlaceholder")}
          enableCounter={true}
          enableCharacterCount={true}
          enableWordCount={true}
          enableLineCount={true}
          enableParagraphCount={true}
          maxCharacters={100}
          maxWords={20}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          {getText(locale, "textCounterDescription")}
        </div>
      </div>
    );
  },
};

export const AdvancedFeatures: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcTextField
          label={getText(locale, "advancedFeaturesLabel")}
          placeholder={getText(locale, "advancedFeaturesPlaceholder")}
          enableRichText={true}
          enableHTML={true}
          enableFormatting={true}
          enableLinks={true}
          enableColors={true}
          enableTransformation={true}
          enableAutoResize={true}
          enableCounter={true}
          enableCharacterCount={true}
          enableWordCount={true}
          enableLineCount={true}
          enableParagraphCount={true}
          maxCharacters={200}
          maxWords={50}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          {getText(locale, "advancedFeaturesDescription")}
        </div>
      </div>
    );
  },
};

export const AutoComplete: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    const mockOptions = [
      {
        value: "react",
        label: "React",
        description: getText(locale, "mockOptionReactDescription"),
        category: "framework",
      },
      {
        value: "typescript",
        label: "TypeScript",
        description: getText(locale, "mockOptionTypeScriptDescription"),
        category: "language",
      },
      {
        value: "material-ui",
        label: "Material-UI",
        description: getText(locale, "mockOptionMaterialUiDescription"),
        category: "ui",
      },
      {
        value: "storybook",
        label: "Storybook",
        description: getText(locale, "mockOptionStorybookDescription"),
        category: "tool",
      },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcTextField
          label={getText(locale, "autoCompleteLabel")}
          placeholder={getText(locale, "autoCompletePlaceholder")}
          enableAutoComplete={true}
          autoCompleteOptions={mockOptions}
          enableAutoCompleteCategories={true}
          enableAutoCompleteIcons={true}
          enableAutoCompleteKeyboardNavigation={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          {getText(locale, "autoCompleteDescription")}
        </div>
      </div>
    );
  },
};

export const SmartSuggestions: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcTextField
          label={getText(locale, "smartSuggestionsLabel")}
          placeholder={getText(locale, "smartSuggestionsPlaceholder")}
          enableSmartSuggestions={true}
          enableRecentHistory={true}
          enableFavorites={true}
          enableTrending={true}
          enableRecommendations={true}
          enableLearning={true}
          enablePersonalization={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          {getText(locale, "smartSuggestionsDescription")}
        </div>
      </div>
    );
  },
};

export const SmartValidation: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcTextField
          label={getText(locale, "smartValidationLabel")}
          placeholder={getText(locale, "smartValidationPlaceholder")}
          enableSmartValidation={true}
          enableSmartRealTimeValidation={true}
          enableValidationSuggestions={true}
          enableValidationLearning={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          {getText(locale, "smartValidationDescription")}
        </div>
      </div>
    );
  },
};

export const AdvancedValidation: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcTextField
          label={getText(locale, "advancedValidationLabel")}
          placeholder={getText(locale, "advancedValidationPlaceholder")}
          enableAdvancedValidation={true}
          enableAdvancedAsyncValidation={true}
          enableContextValidation={true}
          enableAdvancedRealTimeValidation={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          {getText(locale, "advancedValidationDescription")}
        </div>
      </div>
    );
  },
};

export const BusinessRules: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcTextField
          label={getText(locale, "businessRulesLabel")}
          placeholder={getText(locale, "businessRulesPlaceholder")}
          enableBusinessRules={true}
          enableBusinessRealTimeEvaluation={true}
          enableRuleLearning={true}
          enableRuleOptimization={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          {getText(locale, "businessRulesDescription")}
        </div>
      </div>
    );
  },
};

export const CrossFieldValidation: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <BcTextField
          label={getText(locale, "crossFieldValidationLabel")}
          placeholder={getText(locale, "crossFieldValidationPlaceholder")}
          enableCrossFieldValidation={true}
          enableCrossFieldDependencyTracking={true}
          locale={locale}
        />
        <div style={{ fontSize: 12, color: "#666" }}>
          {getText(locale, "crossFieldValidationDescription")}
        </div>
      </div>
    );
  },
};

export const ProfessionalShowcase: Story = {
  render: (args, context: any) => {
    const locale = context.globals?.locale ?? context.locale ?? "en";
    const mockOptions = [
      {
        value: "react",
        label: "React",
        description: getText(locale, "mockOptionReactDescription"),
        category: "framework",
      },
      {
        value: "typescript",
        label: "TypeScript",
        description: getText(locale, "mockOptionTypeScriptDescription"),
        category: "language",
      },
      {
        value: "material-ui",
        label: "Material-UI",
        description: getText(locale, "mockOptionMaterialUiDescription"),
        category: "ui",
      },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Rich Text Editor</h3>
          <BcTextField
            label={getText(locale, "professionalShowcaseRichTextEditorLabel")}
            placeholder={getText(locale, "professionalShowcaseRichTextEditorPlaceholder")}
            enableRichText={true}
            enableHTML={true}
            enableFormatting={true}
            enableLinks={true}
            enableColors={true}
            locale={locale}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Text Formatting</h3>
          <BcTextField
            label={getText(locale, "professionalShowcaseTextFormattingLabel")}
            placeholder={getText(locale, "professionalShowcaseTextFormattingPlaceholder")}
            enableTransformation={true}
            enableAutoResize={true}
            locale={locale}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Text Counter</h3>
          <BcTextField
            label={getText(locale, "professionalShowcaseTextCounterLabel")}
            placeholder={getText(locale, "professionalShowcaseTextCounterPlaceholder")}
            enableCounter={true}
            enableCharacterCount={true}
            enableWordCount={true}
            enableLineCount={true}
            maxCharacters={150}
            maxWords={30}
            locale={locale}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Auto Complete</h3>
          <BcTextField
            label={getText(locale, "professionalShowcaseAutoCompleteLabel")}
            placeholder={getText(locale, "professionalShowcaseAutoCompletePlaceholder")}
            enableAutoComplete={true}
            autoCompleteOptions={mockOptions}
            enableAutoCompleteCategories={true}
            enableAutoCompleteIcons={true}
            locale={locale}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Smart Suggestions</h3>
          <BcTextField
            label={getText(locale, "professionalShowcaseSmartSuggestionsLabel")}
            placeholder={getText(locale, "professionalShowcaseSmartSuggestionsPlaceholder")}
            enableSmartSuggestions={true}
            enableRecentHistory={true}
            enableFavorites={true}
            enableLearning={true}
            locale={locale}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Smart Validation</h3>
          <BcTextField
            label={getText(locale, "professionalShowcaseSmartValidationLabel")}
            placeholder={getText(locale, "professionalShowcaseSmartValidationPlaceholder")}
            enableSmartValidation={true}
            enableSmartRealTimeValidation={true}
            enableValidationSuggestions={true}
            locale={locale}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Advanced Validation</h3>
          <BcTextField
            label={getText(locale, "professionalShowcaseAdvancedValidationLabel")}
            placeholder={getText(locale, "professionalShowcaseAdvancedValidationPlaceholder")}
            enableAdvancedValidation={true}
            enableAsyncValidation={true}
            enableContextValidation={true}
            locale={locale}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Business Rules</h3>
          <BcTextField
            label={getText(locale, "professionalShowcaseBusinessRulesLabel")}
            placeholder={getText(locale, "professionalShowcaseBusinessRulesPlaceholder")}
            enableBusinessRules={true}
            enableBusinessRealTimeEvaluation={true}
            locale={locale}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Cross Field Validation</h3>
          <BcTextField
            label={getText(locale, "professionalShowcaseCrossFieldValidationLabel")}
            placeholder={getText(locale, "professionalShowcaseCrossFieldValidationPlaceholder")}
            enableCrossFieldValidation={true}
            enableCrossFieldDependencyTracking={true}
            locale={locale}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Smart Placeholder</h3>
          <BcTextField
            label={getText(locale, "professionalShowcaseSmartPlaceholderLabel")}
            placeholder={getText(locale, "professionalShowcaseSmartPlaceholderPlaceholder")}
            enableSmartPlaceholder={true}
            enableContextualPlaceholders={true}
            enableTimeBasedPlaceholders={true}
            enablePersonalizedPlaceholders={true}
            enablePlaceholderLearning={true}
            placeholderContext={{
              fieldName: "email",
              fieldType: "email",
              userContext: { userLevel: "intermediate" },
              formContext: { formType: "registration" },
              locale: locale,
            }}
            locale={locale}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Smart Help</h3>
          <BcTextField
            label={getText(locale, "professionalShowcaseSmartHelpLabel")}
            placeholder={getText(locale, "professionalShowcaseSmartHelpPlaceholder")}
            enableSmartHelp={true}
            enableContextualHelp={true}
            enableProgressiveHelp={true}
            enableHelpLearning={true}
            enableHelpPersonalization={true}
            helpContext={{
              fieldName: "password",
              fieldType: "password",
              userContext: { userLevel: "beginner" },
              formContext: { formType: "login" },
              locale: locale,
              userLevel: "beginner",
              deviceType: "desktop",
              timeSpent: 30,
              errorCount: 0,
            }}
            locale={locale}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Progressive Disclosure</h3>
          <BcTextField
            label={getText(locale, "professionalShowcaseProgressiveDisclosureLabel")}
            placeholder={getText(locale, "professionalShowcaseProgressiveDisclosurePlaceholder")}
            enableProgressiveDisclosure={true}
            enableContextualDisclosure={true}
            enableDisclosureLearning={true}
            enableDisclosurePersonalization={true}
            disclosureContext={{
              fieldName: "username",
              fieldType: "text",
              userContext: { userLevel: "advanced" },
              formContext: { formType: "profile" },
              locale: locale,
              userLevel: "advanced",
              deviceType: "mobile",
              timeSpent: 60,
              interactionCount: 5,
              errorCount: 1,
            }}
            locale={locale}
          />
        </div>

        <div style={{ fontSize: 12, color: "#666" }}>
          {getText(locale, "professionalShowcaseDescription")}
        </div>
      </div>
    );
  },
};

// 4. Kullanıcı Deneyimi - Ayrı Story'ler
export const SmartPlaceholder: Story = {
  args: {
    label: getText('en', "smartPlaceholderLabel"),
    placeholder: getText('en', "smartPlaceholderPlaceholder"),
    enableSmartPlaceholder: true,
    enableContextualPlaceholders: true,
    enableTimeBasedPlaceholders: true,
    enablePersonalizedPlaceholders: true,
    enablePlaceholderLearning: true,
    placeholderContext: {
      fieldName: "email",
      fieldType: "email",
      userContext: { userLevel: "intermediate" },
      formContext: { formType: "registration" },
      locale: "tr",
    },
    locale: "tr",
  },
  render: (args) => {
    const [locale, setLocale] = React.useState<Locale>("tr");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label>Dil:</label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>

        <BcTextField
          {...args}
          locale={locale}
          placeholderContext={{
            ...args.placeholderContext,
            locale: locale,
          }}
        />

        <div style={{ fontSize: 12, color: "#666" }}>
          🎯 Akıllı Placeholder - Contextual, time-based, personalized
          placeholders
        </div>
      </div>
    );
  },
};

export const SmartHelp: Story = {
  args: {
    label: getText('en', "smartHelpLabel"),
    placeholder: getText('en', "smartHelpPlaceholder"),
    enableSmartHelp: true,
    enableContextualHelp: true,
    enableProgressiveHelp: true,
    enableHelpLearning: true,
    enableHelpPersonalization: true,
    helpContext: {
      fieldName: "password",
      fieldType: "password",
      userContext: { userLevel: "beginner" },
      formContext: { formType: "login" },
      locale: "tr",
      userLevel: "beginner",
      deviceType: "desktop",
      timeSpent: 30,
      errorCount: 0,
    },
    locale: "tr",
  },
  render: (args) => {
    const [locale, setLocale] = React.useState<Locale>("tr");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label>Dil:</label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>

        <BcTextField
          {...args}
          locale={locale}
          helpContext={{
            ...args.helpContext,
            locale: locale,
          }}
        />

        <div style={{ fontSize: 12, color: "#666" }}>
          🎯 Akıllı Yardım - Contextual, progressive, learning help system
        </div>
      </div>
    );
  },
};

export const ProgressiveDisclosure: Story = {
  args: {
    label: getText('en', "progressiveDisclosureLabel"),
    placeholder: getText('en', "progressiveDisclosurePlaceholder"),
    enableProgressiveDisclosure: true,
    enableContextualDisclosure: true,
    enableDisclosureLearning: true,
    enableDisclosurePersonalization: true,
    disclosureContext: {
      fieldName: "username",
      fieldType: "text",
      userContext: { userLevel: "advanced" },
      formContext: { formType: "profile" },
      locale: "tr",
      userLevel: "advanced",
      deviceType: "mobile",
      timeSpent: 60,
      interactionCount: 5,
      errorCount: 1,
    },
    locale: "tr",
  },
  render: (args) => {
    const [locale, setLocale] = React.useState<Locale>("tr");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label>Dil:</label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>

        <BcTextField
          {...args}
          locale={locale}
          disclosureContext={{
            ...args.disclosureContext,
            locale: locale,
          }}
        />

        <div style={{ fontSize: 12, color: "#666" }}>
          🎯 Progressive Disclosure - Contextual, learning, personalized
          disclosure
        </div>
      </div>
    );
  },
};

// 5. Erişilebilirlik ve Performans - Ayrı Story'ler
export const Accessibility: Story = {
  args: {
    label: getText('en', "accessibilityLabel"),
    placeholder: getText('en', "accessibilityFeaturesPlaceholder"),
    enableAccessibility: true,
    enableScreenReaderSupport: true,
    enableKeyboardNavigation: true,
    enableHighContrast: false,
    enableReducedMotion: false,
    enableFocusManagement: true,
    enableARIALabels: true,
    enableLiveRegions: true,
    enableSkipLinks: true,
    enableTooltips: true,
    enableErrorAnnouncements: true,
    enableStatusAnnouncements: true,
    enableProgressAnnouncements: true,
    locale: "tr",
  },
  render: (args) => {
    const [locale, setLocale] = React.useState<Locale>("tr");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label>Dil:</label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>

        <BcTextField {...args} locale={locale} />

        <div style={{ fontSize: 12, color: "#666" }}>
          🎯 Erişilebilirlik - Screen reader, keyboard navigation, ARIA labels
        </div>
      </div>
    );
  },
};

export const Performance: Story = {
  args: {
    label: getText('en', "performanceLabel"),
    placeholder: getText('en', "performanceFeaturesPlaceholder"),
    enablePerformanceTracking: true,
    enableRenderTracking: true,
    enableMemoryTracking: true,
    enableNetworkTracking: true,
    enableUserInteractionTracking: true,
    enablePerformanceOptimization: true,
    enableDebouncing: true,
    enableThrottling: true,
    enableCaching: true,
    enableMemoization: true,
    locale: "tr",
  },
  render: (args) => {
    const [locale, setLocale] = React.useState<Locale>("tr");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label>Dil:</label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>

        <BcTextField {...args} locale={locale} />

        <div style={{ fontSize: 12, color: "#666" }}>
          🎯 Performans - Render tracking, memory monitoring, optimization
        </div>
      </div>
    );
  },
};

export const Monitoring: Story = {
  args: {
    label: getText('en', "monitoringLabel"),
    placeholder: getText('en', "monitoringFeaturesPlaceholder"),
    enableMonitoring: true,
    enableRealTimeMonitoring: true,
    enableAnalytics: true,
    enableErrorReporting: true,
    enablePerformanceMonitoring: true,
    enableUserBehaviorTracking: true,
    enableSecurityMonitoring: false,
    enableCustomEvents: true,
    locale: "tr",
  },
  render: (args) => {
    const [locale, setLocale] = React.useState<Locale>("tr");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label>Dil:</label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>

        <BcTextField {...args} locale={locale} />

        <div style={{ fontSize: 12, color: "#666" }}>
          🎯 İzleme - Analytics, error reporting, user behavior tracking
        </div>
      </div>
    );
  },
};

// 6. Entegrasyon ve Test - Ayrı Story'ler
export const Testing: Story = {
  args: {
    label: getText('en', "testingLabel"),
    placeholder: getText('en', "testingFeaturesPlaceholder"),
    enableTesting: true,
    enableTestMode: true,
    enableMockData: true,
    enableTestHelpers: true,
    enableTestUtilities: true,
    enableTestValidation: true,
    enableTestPerformance: true,
    enableTestAccessibility: true,
    enableTestMonitoring: true,
    enableTestDebugging: false,
    enableTestLogging: true,
    enableTestAssertions: true,
    enableTestSnapshots: true,
    enableTestCoverage: true,
    enableTestReporting: true,
    testTimeout: 5000,
    testRetries: 3,
    testDelay: 100,
    mockData: { testValue: "mock data" },
    testConfig: { environment: "development" },
    locale: "tr",
  },
  render: (args) => {
    const [locale, setLocale] = React.useState<Locale>("tr");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label>Dil:</label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>

        <BcTextField {...args} locale={locale} />

        <div style={{ fontSize: 12, color: "#666" }}>
          🎯 Test - Test utilities, assertions, mocking, validation
        </div>
      </div>
    );
  },
};

export const Integration: Story = {
  args: {
    label: getText('en', "integrationLabel"),
    placeholder: getText('en', "integrationFeaturesPlaceholder"),
    enableIntegration: true,
    enableFormIntegration: true,
    enableValidationIntegration: true,
    enableStateIntegration: true,
    enableEventIntegration: true,
    enableDataIntegration: true,
    enableAPIIntegration: false,
    enableStorageIntegration: true,
    enableThemeIntegration: true,
    enableI18nIntegration: true,
    enableAccessibilityIntegration: true,
    enablePerformanceIntegration: true,
    enableMonitoringIntegration: false,
    enableTestingIntegration: false,
    enableCustomIntegration: false,
    integrationTimeout: 5000,
    integrationRetries: 3,
    integrationDelay: 1000,
    customIntegrations: { custom1: "value1" },
    integrationConfig: { debug: true },
    apiEndpoints: { users: "/api/users" },
    storageKeys: { settings: "user-settings" },
    eventTypes: ["input_change", "focus", "blur"],
    dataFormats: ["json", "xml"],
    validationRules: { required: true, minLength: 3 },
    stateKeys: ["value", "error", "touched"],
    themeKeys: ["primary", "secondary"],
    i18nKeys: ["label", "placeholder", "error"],
    accessibilityKeys: ["aria-label", "aria-describedby"],
    performanceKeys: ["renderTime", "memoryUsage"],
    monitoringKeys: ["events", "errors"],
    testingKeys: ["testResults", "coverage"],
    locale: "tr",
  },
  render: (args) => {
    const [locale, setLocale] = React.useState<Locale>("tr");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label>Dil:</label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>

        <BcTextField {...args} locale={locale} />

        <div style={{ fontSize: 12, color: "#666" }}>
          🎯 Entegrasyon - Form, state, events, data, API, storage integration
        </div>
      </div>
    );
  },
};

