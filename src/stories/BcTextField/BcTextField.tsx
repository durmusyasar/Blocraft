import type { TextFieldProps } from "@mui/material";
import {
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { forwardRef, useCallback, useId, useState, useMemo } from "react";
import {
  borderlessStyles,
  getDynamicDarkStyles,
  getDynamicLightStyles,
  glassStyles,
  minimalStyles,
  neumorphStyles,
  premiumStyles,
  responsiveWidthStyles,
  sizeStyles,
  softStyles,
  underlineStyles,
} from "./styles";
import type { Appearance, Size } from "../types";
import useHighContrast from "./hooks/useHighContrast";
import useReducedMotion from "./hooks/useReducedMotion";
import { getTranslation } from "../i18n/i18nHelpers";
import useTextFieldValidation from "./hooks/useTextValidation";
import { ValidationResult } from "../interface";
import { getTranslationsObject } from './hooks/useTranslationsObject';
import { usePaletteColor } from './hooks/usePaletteColor';
import { getStatusIconAndColor } from './hooks/useStatusIcon';
import { getAppearanceSx } from './hooks/useAppearanceSx';
import { useInputAdornments } from './hooks/useInputAdornments';
import { useLiveRegion } from './hooks/useLiveRegion';
import { useRichTextEditor } from './hooks/useRichTextEditor';
import { useTextFormatting } from './hooks/useTextFormatting';
import { useTextCounter } from './hooks/useTextCounter';
import { useAutoComplete } from './hooks/useAutoComplete';
import { useSmartSuggestions } from './hooks/useSmartSuggestions';
import { useSmartValidation } from './hooks/useSmartValidation';
import { useAdvancedValidation } from './hooks/useAdvancedValidation';
import { useBusinessRules } from './hooks/useBusinessRules';
import { useCrossFieldValidation } from './hooks/useCrossFieldValidation';
import { useSmartPlaceholder } from './hooks/useSmartPlaceholder';
import { useSmartHelp } from './hooks/useSmartHelp';
import { useProgressiveDisclosure } from './hooks/useProgressiveDisclosure';
import { useAccessibility } from './hooks/useAccessibility';
import { usePerformance } from './hooks/usePerformance';
import { useTesting } from './hooks/useTesting';
import { useIntegration } from './hooks/useIntegration';


/**
 * BcTextFieldProps
 * @property responsiveWidth - Genişlik otomatik ayarlansın mı / Should width be responsive
 * @property showClearButton - Temizle butonu gösterilsin mi / Show clear button
 * @property onClear - Temizle butonuna tıklanınca çağrılır / Called when clear button is clicked
 * @property size - Büyüklük (normal, small, large) / Size (normal, small, large)
 * @property appearance - Görünüm stili / Appearance style
 * @property renderEndAdornment - Sağ ikona özel render / Custom render for end adornment
 * @property name - Input adı / Input name
 * @property helperText - Yardım metni / Helper text
 * @property error - Hata durumu / Error state
 * @property status - Durum (error, warning, success, info) / Status (error, warning, success, info)
 * @property statusMessage - Durum mesajı / Status message
 * @property loading - Yükleniyor göstergesi / Loading indicator
 * @property clearButtonLabel - Temizle butonu etiketi / Clear button label
 * @property translations - Çeviri nesnesi / Translations object
 * @property enableRTL - RTL desteği / Enable RTL
 * @property enableHighContrast - Yüksek kontrast modu / High contrast mode
 * @property enableReducedMotion - Azaltılmış animasyon / Reduced motion
 * @property fontSize - Yazı boyutu / Font size
 * @property enableAsyncValidation - Asenkron validasyon / Enable async validation
 * @property validateInput - Asenkron validasyon fonksiyonu / Async validation function
 * @property showValidationStatus - Validasyon durumu gösterilsin mi / Show validation status
 * @property validationDebounceMs - Validasyon debounce süresi / Validation debounce ms
 * @property monitoring - İzleme fonksiyonları / Monitoring callbacks
 * @property renderCustomIcon - Özel ikon render fonksiyonu / Custom icon render function
 * @property renderHelperText - Yardım metni render fonksiyonu / Custom helper text render function
 * @property locale - Dil kodu / Locale code
 * @property fallbackLocale - Yedek dil kodu / Fallback locale
 * @property autoFocus - Otomatik odaklanma / Auto focus
 * @property autoComplete - Otomatik tamamlama / Auto complete
 * @property inputMode - inputMode (örn. 'tel') / inputMode (e.g. 'tel')
 * @property pattern - Regex pattern / Regex pattern
 * @property maxLength - Maksimum karakter / Max length
 * @property minLength - Minimum karakter / Min length
 * @property spellCheck - Yazım denetimi / Spell check
 * @property inputComponent - Özel input bileşeni / Custom input component
 * @property loadingReadonly - Yüklenirken sadece readonly / Readonly while loading
 * @property inputPrefix - Input başına özel node/ikon / Custom node/icon at input start
 * @property inputSuffix - Input sonuna özel node/ikon / Custom node/icon at input end
 * @property ...rest - Diğer TextFieldProps / Other TextFieldProps
 */
export interface BcTextFieldProps
  extends Omit<TextFieldProps, "variant" | "size"> {
  responsiveWidth?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
  size?: Size;
  appearance?: Appearance;
  renderEndAdornment?: (defaultAdornment: React.ReactNode) => React.ReactNode;
  name?: string;
  helperText?: string | React.ReactNode;
  error?: boolean;
  status?: "error" | "warning" | "success" | "info";
  statusMessage?: string;
  loading?: boolean;
  clearButtonLabel?: string;
  translations?: Record<string, string>;
  enableRTL?: boolean;
  enableHighContrast?: boolean;
  enableReducedMotion?: boolean;
  fontSize?: number | string;
  enableAsyncValidation?: boolean;
  validateInput?: (value: string) => Promise<ValidationResult>;
  showValidationStatus?: boolean;
  validationDebounceMs?: number;
  monitoring?: {
    onChange?: (value: string) => void;
    onError?: (error: Error) => void;
    onPerformance?: (metrics: Record<string, unknown>) => void;
  };
  renderCustomIcon?: (status: string) => React.ReactNode;
  renderHelperText?: (helperText: React.ReactNode) => React.ReactNode;
  locale?: string;
  fallbackLocale?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  maxLength?: number;
  minLength?: number;
  spellCheck?: boolean;
  inputComponent?: React.ElementType;
  loadingReadonly?: boolean;
  inputPrefix?: React.ReactNode;
  inputSuffix?: React.ReactNode;
  /** Rich Text Editor */
  enableRichText?: boolean;
  enableMarkdown?: boolean;
  enableHTML?: boolean;
  enableFormatting?: boolean;
  enableLinks?: boolean;
  enableColors?: boolean;
  /** Text Formatting */
  enableTransformation?: boolean;
  enableAutoResize?: boolean;
  enableCharacterCount?: boolean;
  enableWordCount?: boolean;
  enableLineCount?: boolean;
  enableParagraphCount?: boolean;
  /** Text Counter */
  enableCounter?: boolean;
  maxCharacters?: number;
  maxWords?: number;
  maxLines?: number;
  maxParagraphs?: number;
  warningThreshold?: number;
  criticalThreshold?: number;
  /** Auto Complete */
  enableAutoComplete?: boolean;
  autoCompleteOptions?: Array<{ value: string; label: string; description?: string; category?: string; icon?: string; disabled?: boolean }>;
  fetchAutoCompleteOptions?: (query: string) => Promise<Array<{ value: string; label: string; description?: string; category?: string; icon?: string; disabled?: boolean }>>;
  minAutoCompleteQueryLength?: number;
  maxAutoCompleteSuggestions?: number;
  autoCompleteDebounceMs?: number;
  enableAutoCompleteCategories?: boolean;
  enableAutoCompleteIcons?: boolean;
  enableAutoCompleteKeyboardNavigation?: boolean;
  /** Smart Suggestions */
  enableSmartSuggestions?: boolean;
  enableRecentHistory?: boolean;
  enableFavorites?: boolean;
  enableTrending?: boolean;
  enableRecommendations?: boolean;
  maxHistoryItems?: number;
  maxFavorites?: number;
  maxTrending?: number;
  maxRecommendations?: number;
  suggestionDebounceMs?: number;
  enableLearning?: boolean;
  enablePersonalization?: boolean;
  /** Smart Validation */
  enableSmartValidation?: boolean;
  enableSmartRealTimeValidation?: boolean;
  enableValidationSuggestions?: boolean;
  enableValidationLearning?: boolean;
  smartValidationDebounceMs?: number;
  smartCustomValidationRules?: Array<{
    id: string;
    name: string;
    test: (value: string) => boolean;
    message: string;
    severity: 'error' | 'warning' | 'info';
    category: 'format' | 'length' | 'pattern' | 'custom';
    enabled: boolean;
  }>;
  /** Advanced Validation */
  enableAdvancedValidation?: boolean;
  enableAdvancedAsyncValidation?: boolean;
  enableContextValidation?: boolean;
  enableAdvancedBusinessRules?: boolean;
  enableAdvancedCrossFieldValidation?: boolean;
  enableAdvancedRealTimeValidation?: boolean;
  maxConcurrentValidations?: number;
  advancedCustomValidationRules?: Array<{
    id: string;
    name: string;
    test: (value: string) => boolean;
    message: string;
    severity: 'error' | 'warning' | 'info';
    category: 'format' | 'length' | 'pattern' | 'custom' | 'business';
    enabled: boolean;
    priority: number;
    dependencies?: string[];
    customValidator?: (value: string, context?: Record<string, unknown>) => Promise<boolean>;
  }>;
  validationContext?: {
    fieldName?: string;
    formData?: Record<string, unknown>;
    userContext?: Record<string, unknown>;
    locale?: string;
  };
  /** Business Rules */
  enableBusinessRules?: boolean;
  enableBusinessRealTimeEvaluation?: boolean;
  enableRuleLearning?: boolean;
  enableRuleOptimization?: boolean;
  businessEvaluationDebounceMs?: number;
  customBusinessRules?: Array<{
    id: string;
    name: string;
    description: string;
    category: 'pricing' | 'inventory' | 'user' | 'product' | 'order' | 'custom';
    priority: number;
    enabled: boolean;
    conditions: Array<{
      field: string;
      operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'in' | 'not_in' | 'regex' | 'custom';
      value: unknown;
      customFunction?: (value: unknown, context: Record<string, unknown>) => boolean;
    }>;
    actions: Array<{
      type: 'validation' | 'transformation' | 'notification' | 'calculation' | 'custom';
      field?: string;
      value?: unknown;
      message?: string;
      customFunction?: (value: unknown, context: Record<string, unknown>) => unknown;
    }>;
    metadata?: Record<string, unknown>;
  }>;
  businessContext?: {
    formData: Record<string, unknown>;
    userContext: Record<string, unknown>;
    systemContext: Record<string, unknown>;
    locale: string;
  };
  /** Cross Field Validation */
  enableCrossFieldValidation?: boolean;
  enableCrossFieldDependencyTracking?: boolean;
  customCrossFieldRules?: Array<{
    id: string;
    name: string;
    description: string;
    fields: string[];
    condition: (values: Record<string, unknown>) => boolean;
    message: string;
    severity: 'error' | 'warning' | 'info';
    enabled: boolean;
    priority: number;
    dependencies?: string[];
  }>;
  crossFieldContext?: {
    formData: Record<string, unknown>;
    fieldValues: Record<string, unknown>;
    fieldErrors: Record<string, string[]>;
    fieldWarnings: Record<string, string[]>;
    fieldInfo: Record<string, string[]>;
    locale: string;
  };
  /** Smart Placeholder */
  enableSmartPlaceholder?: boolean;
  enableContextualPlaceholders?: boolean;
  enableTimeBasedPlaceholders?: boolean;
  enablePersonalizedPlaceholders?: boolean;
  enablePlaceholderLearning?: boolean;
  customPlaceholderTemplates?: Array<{
    id: string;
    name: string;
    template: string;
    context: string[];
    priority: number;
    enabled: boolean;
    conditions?: (context: Record<string, unknown>) => boolean;
    customFunction?: (context: Record<string, unknown>) => string;
  }>;
  placeholderContext?: {
    fieldName?: string;
    fieldType?: string;
    userContext?: Record<string, unknown>;
    formContext?: Record<string, unknown>;
    locale?: string;
    timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
    dayOfWeek?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    season?: 'spring' | 'summer' | 'autumn' | 'winter';
  };
  /** Smart Help */
  enableSmartHelp?: boolean;
  enableContextualHelp?: boolean;
  enableProgressiveHelp?: boolean;
  enableHelpLearning?: boolean;
  enableHelpPersonalization?: boolean;
  customHelpItems?: Array<{
    id: string;
    title: string;
    content: string;
    type: 'tip' | 'warning' | 'info' | 'example' | 'tutorial' | 'faq';
    priority: number;
    enabled: boolean;
    context: string[];
    conditions?: (context: Record<string, unknown>) => boolean;
    customFunction?: (context: Record<string, unknown>) => string;
    metadata?: Record<string, unknown>;
  }>;
  helpContext?: {
    fieldName?: string;
    fieldType?: string;
    fieldValue?: string;
    userContext?: Record<string, unknown>;
    formContext?: Record<string, unknown>;
    locale?: string;
    userLevel?: 'beginner' | 'intermediate' | 'advanced';
    deviceType?: 'desktop' | 'tablet' | 'mobile';
    timeSpent?: number;
    errorCount?: number;
  };
  /** Progressive Disclosure */
  enableProgressiveDisclosure?: boolean;
  enableContextualDisclosure?: boolean;
  enableDisclosureLearning?: boolean;
  enableDisclosurePersonalization?: boolean;
  customDisclosureRules?: Array<{
    id: string;
    name: string;
    description: string;
    trigger: 'immediate' | 'onFocus' | 'onError' | 'onTimeout' | 'onInteraction' | 'custom';
    delay?: number;
    priority: number;
    enabled: boolean;
    context: string[];
    conditions?: (context: Record<string, unknown>) => boolean;
    customFunction?: (context: Record<string, unknown>) => boolean;
    metadata?: Record<string, unknown>;
  }>;
  customDisclosureContent?: Array<{
    id: string;
    title: string;
    content: string;
    type: 'tooltip' | 'popover' | 'modal' | 'inline' | 'sidebar' | 'overlay';
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
    size?: 'small' | 'medium' | 'large' | 'full';
    priority: number;
    enabled: boolean;
    context: string[];
    conditions?: (context: Record<string, unknown>) => boolean;
    customFunction?: (context: Record<string, unknown>) => string;
    metadata?: Record<string, unknown>;
  }>;
  disclosureContext?: {
    fieldName?: string;
    fieldType?: string;
    fieldValue?: string;
    userContext?: Record<string, unknown>;
    formContext?: Record<string, unknown>;
    locale?: string;
    userLevel?: 'beginner' | 'intermediate' | 'advanced';
    deviceType?: 'desktop' | 'tablet' | 'mobile';
    timeSpent?: number;
    interactionCount?: number;
    errorCount?: number;
  };
  /** Accessibility */
  enableAccessibility?: boolean;
  enableScreenReaderSupport?: boolean;
  enableKeyboardNavigation?: boolean;
  enableAccessibilityHighContrast?: boolean;
  enableAccessibilityReducedMotion?: boolean;
  enableFocusManagement?: boolean;
  enableARIALabels?: boolean;
  enableLiveRegions?: boolean;
  enableSkipLinks?: boolean;
  enableTooltips?: boolean;
  enableErrorAnnouncements?: boolean;
  enableStatusAnnouncements?: boolean;
  enableProgressAnnouncements?: boolean;
  /** Performance */
  enablePerformanceTracking?: boolean;
  enableRenderTracking?: boolean;
  enableMemoryTracking?: boolean;
  enableNetworkTracking?: boolean;
  enableUserInteractionTracking?: boolean;
  enablePerformanceOptimization?: boolean;
  enableDebouncing?: boolean;
  enableThrottling?: boolean;
  enableCaching?: boolean;
  enableMemoization?: boolean;
  /** Monitoring */
  enableMonitoring?: boolean;
  enableRealTimeMonitoring?: boolean;
  enableAnalytics?: boolean;
  enableErrorReporting?: boolean;
  enablePerformanceMonitoring?: boolean;
  enableUserBehaviorTracking?: boolean;
  enableSecurityMonitoring?: boolean;
  enableCustomEvents?: boolean;
  monitoringApiEndpoint?: string;
  monitoringApiKey?: string;
  /** Testing */
  enableTesting?: boolean;
  enableTestMode?: boolean;
  enableMockData?: boolean;
  enableTestHelpers?: boolean;
  enableTestUtilities?: boolean;
  enableTestValidation?: boolean;
  enableTestPerformance?: boolean;
  enableTestAccessibility?: boolean;
  enableTestMonitoring?: boolean;
  enableTestDebugging?: boolean;
  enableTestLogging?: boolean;
  enableTestAssertions?: boolean;
  enableTestSnapshots?: boolean;
  enableTestCoverage?: boolean;
  enableTestReporting?: boolean;
  testTimeout?: number;
  testRetries?: number;
  testDelay?: number;
  mockData?: Record<string, unknown>;
  testConfig?: Record<string, unknown>;
  customTestHelpers?: Record<string, Function>;
  customTestUtilities?: Record<string, Function>;
  customTestValidators?: Record<string, Function>;
  customTestAssertions?: Record<string, Function>;
  /** Integration */
  enableIntegration?: boolean;
  enableFormIntegration?: boolean;
  enableValidationIntegration?: boolean;
  enableStateIntegration?: boolean;
  enableEventIntegration?: boolean;
  enableDataIntegration?: boolean;
  enableAPIIntegration?: boolean;
  enableStorageIntegration?: boolean;
  enableThemeIntegration?: boolean;
  enableI18nIntegration?: boolean;
  enableAccessibilityIntegration?: boolean;
  enablePerformanceIntegration?: boolean;
  enableMonitoringIntegration?: boolean;
  enableTestingIntegration?: boolean;
  enableCustomIntegration?: boolean;
  integrationTimeout?: number;
  integrationRetries?: number;
  integrationDelay?: number;
  customIntegrations?: Record<string, unknown>;
  integrationConfig?: Record<string, unknown>;
  apiEndpoints?: Record<string, string>;
  storageKeys?: Record<string, string>;
  eventTypes?: string[];
  dataFormats?: string[];
  validationRules?: Record<string, unknown>;
  stateKeys?: string[];
  themeKeys?: string[];
  i18nKeys?: string[];
  accessibilityKeys?: string[];
  performanceKeys?: string[];
  monitoringKeys?: string[];
  testingKeys?: string[];
}

const BcTextFieldInner = forwardRef<HTMLInputElement, BcTextFieldProps>(
  (props, ref) => {
    const {
      responsiveWidth = true,
      color = "primary",
      showClearButton = false,
      onClear,
      size = "normal",
      type = "text",
      label,
      placeholder,
      disabled,
      value: valueProp,
      defaultValue,
      slotProps = {},
      sx,
      onChange,
      appearance,
      renderEndAdornment,
      name,
      helperText,
      error,
      status,
      statusMessage,
      loading = false,
      clearButtonLabel,
      translations,
      locale = 'en',
      fallbackLocale = 'en',
      enableRTL,
      enableHighContrast,
      enableReducedMotion,
      fontSize,
      enableAsyncValidation,
      validateInput,
      showValidationStatus,
      validationDebounceMs,
      monitoring: monitoringProp,
      renderCustomIcon,
      renderHelperText,
      inputPrefix,
      inputSuffix,
      // Rich Text Editor
      enableRichText = false,
      enableMarkdown = false,
      enableHTML = false,
      enableFormatting = true,
      enableLinks = true,
      enableColors = true,
      // Text Formatting
      enableTransformation = true,
      enableAutoResize = true,
      enableCharacterCount = true,
      enableWordCount = true,
      enableLineCount = false,
      enableParagraphCount = false,
      // Text Counter
      enableCounter = true,
      maxCharacters,
      maxWords,
      maxLines,
      maxParagraphs,
      warningThreshold = 0.8,
      criticalThreshold = 0.95,
      // Auto Complete
      enableAutoComplete = false,
      autoCompleteOptions = [],
      fetchAutoCompleteOptions,
      minAutoCompleteQueryLength = 1,
      maxAutoCompleteSuggestions = 10,
      autoCompleteDebounceMs = 300,
      enableAutoCompleteCategories = true,
      enableAutoCompleteIcons = true,
      enableAutoCompleteKeyboardNavigation = true,
      // Smart Suggestions
      enableSmartSuggestions = false,
      enableRecentHistory = true,
      enableFavorites = true,
      enableTrending = false,
      enableRecommendations = false,
      maxHistoryItems = 50,
      maxFavorites = 20,
      maxTrending = 10,
      maxRecommendations = 15,
      suggestionDebounceMs = 300,
      enableLearning = true,
      enablePersonalization = true,
      // Smart Validation
      enableSmartValidation = false,
      enableSmartRealTimeValidation = true,
      enableValidationSuggestions = true,
      enableValidationLearning = true,
      smartValidationDebounceMs = 500,
      smartCustomValidationRules = [],
      // Advanced Validation
      enableAdvancedValidation = false,
      enableAdvancedAsyncValidation = true,
      enableContextValidation = true,
      enableAdvancedBusinessRules = false,
      enableAdvancedCrossFieldValidation = false,
      enableAdvancedRealTimeValidation = true,
      maxConcurrentValidations = 5,
      advancedCustomValidationRules = [],
      validationContext = {},
      // Business Rules
      enableBusinessRules: enableBusinessRulesValidation = false,
      enableBusinessRealTimeEvaluation = true,
      enableRuleLearning = true,
      enableRuleOptimization = true,
      businessEvaluationDebounceMs = 300,
      customBusinessRules = [],
      businessContext = {
        formData: {},
        userContext: {},
        systemContext: {},
        locale: 'en',
      },
      // Cross Field Validation
      enableCrossFieldValidation: enableCrossFieldValidationValidation = false,
      enableCrossFieldDependencyTracking = true,
      customCrossFieldRules = [],
      crossFieldContext = {
        formData: {},
        fieldValues: {},
        fieldErrors: {},
        fieldWarnings: {},
        fieldInfo: {},
        locale: 'en',
      },
      // Smart Placeholder
      enableSmartPlaceholder = false,
      enableContextualPlaceholders = true,
      enableTimeBasedPlaceholders = true,
      enablePersonalizedPlaceholders = true,
      enablePlaceholderLearning = true,
      customPlaceholderTemplates = [],
      placeholderContext = {},
      // Smart Help
      enableSmartHelp = false,
      enableContextualHelp = true,
      enableProgressiveHelp = true,
      enableHelpLearning = true,
      enableHelpPersonalization = true,
      customHelpItems = [],
      helpContext = {},
      // Progressive Disclosure
      enableProgressiveDisclosure = false,
      enableContextualDisclosure = true,
      enableDisclosureLearning = true,
      enableDisclosurePersonalization = true,
      customDisclosureRules = [],
      customDisclosureContent = [],
      disclosureContext = {},
      // Accessibility
      enableAccessibility = true,
      enableScreenReaderSupport = true,
      enableKeyboardNavigation = true,
      enableAccessibilityHighContrast = false,
      enableAccessibilityReducedMotion = false,
      enableFocusManagement = true,
      enableARIALabels = true,
      enableLiveRegions = true,
      enableSkipLinks = false,
      enableTooltips = true,
      enableErrorAnnouncements = true,
      enableStatusAnnouncements = true,
      enableProgressAnnouncements = true,
      // Performance
      enablePerformanceTracking = true,
      enableRenderTracking = true,
      enableMemoryTracking = true,
      enableNetworkTracking = true,
      enableUserInteractionTracking = true,
      enablePerformanceOptimization = true,
      enableDebouncing = true,
      enableThrottling = true,
      enableCaching = true,
      enableMemoization = true,
      // Monitoring
      enableMonitoring = false,
      enableRealTimeMonitoring,
      enableAnalytics,
      enableErrorReporting,
      enablePerformanceMonitoring,
      enableUserBehaviorTracking,
      enableSecurityMonitoring,
      enableCustomEvents,
      monitoringApiEndpoint,
      monitoringApiKey,
      // Testing
      enableTesting = false,
      enableTestMode = false,
      enableMockData = false,
      enableTestHelpers = true,
      enableTestUtilities = true,
      enableTestValidation = true,
      enableTestPerformance = true,
      enableTestAccessibility = true,
      enableTestMonitoring = true,
      enableTestDebugging = false,
      enableTestLogging = true,
      enableTestAssertions = true,
      enableTestSnapshots = true,
      enableTestCoverage = true,
      enableTestReporting = true,
      testTimeout = 5000,
      testRetries = 3,
      testDelay = 100,
      mockData = {},
      testConfig = {},
      customTestHelpers = {},
      customTestUtilities = {},
      customTestValidators = {},
      customTestAssertions = {},
      // Integration
      enableIntegration = true,
      enableFormIntegration = true,
      enableValidationIntegration = true,
      enableStateIntegration = true,
      enableEventIntegration = true,
      enableDataIntegration = true,
      enableAPIIntegration = false,
      enableStorageIntegration = true,
      enableThemeIntegration = true,
      enableI18nIntegration = true,
      enableAccessibilityIntegration = true,
      enablePerformanceIntegration = true,
      enableMonitoringIntegration = false,
      enableTestingIntegration = false,
      enableCustomIntegration = false,
      integrationTimeout = 5000,
      integrationRetries = 3,
      integrationDelay = 1000,
      customIntegrations = {},
      integrationConfig = {},
      apiEndpoints = {},
      storageKeys = {},
      eventTypes = [],
      dataFormats = [],
      validationRules = {},
      stateKeys = [],
      themeKeys = [],
      i18nKeys = [],
      accessibilityKeys = [],
      performanceKeys = [],
      monitoringKeys = [],
      testingKeys = [],
      ...rest
    } = props;

    // Controlled/uncontrolled value
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const value = isControlled ? valueProp : internalValue;

    // Focus state for floating label
    const [focused, setFocused] = useState(false);

    // Accessibility: id'ler ve aria bağlantıları
    const reactId = useId();
    const inputId = rest.id || `bc-tf-input-${reactId}`;
    const labelId = `bc-tf-label-${reactId}`;
    const helperId = `bc-tf-helper-${reactId}`;
    const statusId = `bc-tf-status-${reactId}`;

    // aria-describedby: helperText, statusMessage varsa ekle
    let ariaDescribedByArr: string[] = [];
    if (helperText) ariaDescribedByArr.push(helperId);
    if (status && statusMessage) ariaDescribedByArr.push(statusId);
    const ariaDescribedByStr =
      ariaDescribedByArr.length > 0 ? ariaDescribedByArr.join(" ") : undefined;


    // Clear handler
    const handleClear = useCallback(() => {
      if (!isControlled) setInternalValue("");
      if (isControlled && onChange) {
        // Controlled ise, boş bir event ile value'yu sıfırla
        const event = { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
        if (monitoringProp && typeof monitoringProp.onChange === 'function') {
          try {
            monitoringProp.onChange("");
          } catch (err) {
            if (monitoringProp.onError) monitoringProp.onError(err as Error);
          }
        }
      }
      if (onClear) onClear();
    }, [isControlled, onClear, onChange, monitoringProp]);

    // Compose adornments için gerekli değişkenler
    let startAdornment: React.ReactNode = undefined;
    let endAdornment: React.ReactNode = undefined;
    if (
      slotProps.input &&
      typeof slotProps.input === "object" &&
      !Array.isArray(slotProps.input)
    ) {
      startAdornment = (slotProps.input as Record<string, unknown>).startAdornment as React.ReactNode;
      endAdornment = (slotProps.input as Record<string, unknown>).endAdornment as React.ReactNode;
    }
    // inputPrefix ve inputSuffix'i mevcut adornment'larla birleştir
    if (props.inputPrefix) {
      startAdornment = (
        <>
          {props.inputPrefix}
          {startAdornment}
        </>
      );
    }
    if (props.inputSuffix) {
      endAdornment = (
        <>
          {endAdornment}
          {props.inputSuffix}
        </>
      );
    }
    const hasStartAdornment = Boolean(startAdornment);

    // Helper to ensure translations is a Record<string, string>
    const translationsCandidate = translations && typeof translations === 'object' && 'BcTextField' in translations ? translations.BcTextField : translations;
    const translationsObj = getTranslationsObject(
      typeof translationsCandidate === 'object' && translationsCandidate ? translationsCandidate : {}
    );
    const i18nLabel = label || getTranslation('label', locale, translationsObj, fallbackLocale);
    const i18nStatusMessage = statusMessage || getTranslation('statusMessage', locale, translationsObj, fallbackLocale);
    const i18nClearButton = clearButtonLabel || getTranslation('clearButtonLabel', locale, translationsObj, fallbackLocale) || 'Temizle';

    // Clear button
    const showClear = showClearButton && value && !disabled;

    // Loading durumunda input disabled olmalı
    // loadingReadonly true ise sadece readonly yap
    const isDisabled = disabled || (loading && !props.loadingReadonly);
    const isReadonly = loading && !!props.loadingReadonly;

    // RTL desteği
    const direction = enableRTL ? 'rtl' : undefined;

    // Async validation state
    const { validationResult, isValidating } = useTextFieldValidation({
      inputValue: typeof value === 'string' ? value : '',
      enableAsyncValidation,
      validateInput,
      validationDebounceMs,
      monitoring: monitoringProp ? {
        enableUsageAnalytics: true,
        enableErrorTracking: true,
        componentId: 'BcTextField',
        trackError: monitoringProp.onError ? (error) => {
          monitoringProp.onError?.(new Error(error.message));
        } : undefined,
      } : undefined,
      keyboardNavigationAnnouncements: false,
      liveRegionRef: { current: null },
      setScreenReaderMessage: () => {
        // Empty implementation for screen reader messages
      },
    });

    // Status ve mesajı validation'a göre override et
    let finalStatus = status;
    let finalStatusMessage = i18nStatusMessage;
    let finalLoading = loading;
    if (showValidationStatus && enableAsyncValidation) {
      if (isValidating) {
        finalLoading = true;
      } else if (validationResult) {
        finalStatus = validationResult.type || status;
        finalStatusMessage = validationResult.message || i18nStatusMessage || '';
      }
    }

    // Status ikonunu ve helperText rengini ayarla
    const theme = useTheme();
    const { isPaletteColor, getColor } = usePaletteColor();
    const { statusIcon: defaultStatusIcon, statusColor } = getStatusIconAndColor(finalStatus, color);
    let statusIcon = defaultStatusIcon;
    if (renderCustomIcon) {
      const customIcon = renderCustomIcon(finalStatus || '');
      if (customIcon) statusIcon = customIcon;
    }

    // Status varsa error, warning, success, info prop'unu ayarla
    let finalError = error;
    if (finalStatus === "error") finalError = true;

    // High contrast ve reduced motion hook'ları
    const isHighContrast = useHighContrast(enableHighContrast);
    const reducedMotion = useReducedMotion(enableReducedMotion);

    // Compose endAdornment using custom hook
    const finalEndAdornment = useInputAdornments({
      endAdornment,
      showClear: !!showClear,
      i18nClearButton,
      handleClear,
      disabled: !!disabled,
      loading: !!finalLoading,
      statusIcon,
      renderEndAdornment,
    });

    const textCounter = useTextCounter({
      enableCounter,
      showCharacterCount: enableCharacterCount,
      showWordCount: enableWordCount,
      showLineCount: enableLineCount,
      showParagraphCount: enableParagraphCount,
      maxCharacters,
      maxWords,
      maxLines,
      maxParagraphs,
      warningThreshold,
      criticalThreshold,
    });


    // Status varsa helperText'i override et (memoize)
    const finalHelperText = useMemo(() => {
      let result = helperText;
      
      // Counter bilgisini ekle
      if (enableCounter && textCounter) {
        const counterDisplay = textCounter.getCounterDisplay();
        if (counterDisplay.show) {
          const counterText = (
            <span style={{ 
              display: 'block', 
              color: counterDisplay.color, 
              fontSize: 12, 
              marginTop: 4 
            }}>
              {counterDisplay.icon} {counterDisplay.text}
            </span>
          );
          
          if (result) {
            result = (
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ display: 'block' }}>{result}</span>
                {counterText}
              </span>
            );
          } else {
            result = counterText;
          }
        }
      }
      
      if (finalStatus && finalStatusMessage) {
        if (result) {
          result = (
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ display: 'block', marginBottom: 2 }}>{finalStatusMessage}</span>
              <span style={{ display: 'block', color: '#888', fontSize: 13, marginTop: 2 }}>{result}</span>
            </span>
          );
        } else {
          result = finalStatusMessage;
        }
      }
      if (renderHelperText) {
        result = renderHelperText(result);
      }
      return result;
    }, [helperText, enableCounter, textCounter, finalStatus, finalStatusMessage, renderHelperText]);

    // Style composition (memoize)
    const composedSx = useMemo(() => {
      let sx: Record<string, unknown> = {};
      if (responsiveWidth)
        sx = { ...sx, ...responsiveWidthStyles };
      if (size && sizeStyles[size])
        sx = { ...sx, ...sizeStyles[size] };
      if (isHighContrast) {
        sx = {
          ...sx,
          backgroundColor: '#000',
          color: '#fff',
          border: '2px solid #fff',
          caretColor: '#fff',
          fontSize: fontSize ? fontSize : undefined,
          transition: reducedMotion ? 'none' : 'all 0.2s',
          '& input, & textarea': { background: '#000', color: '#fff', fontSize: fontSize ? fontSize : undefined, transition: reducedMotion ? 'none' : 'all 0.2s' },
          '& fieldset': { borderColor: '#fff' },
          '& label': { color: '#fff', fontSize: fontSize ? fontSize : undefined, transition: reducedMotion ? 'none' : 'all 0.2s' },
        };
      } else {
        if (fontSize) {
          sx = { ...sx, fontSize: fontSize, transition: reducedMotion ? 'none' : 'all 0.2s' };
        } else {
          sx = { ...sx, transition: reducedMotion ? 'none' : 'all 0.2s' };
        }
      }
      // Appearance stillerinde border ve label color'ı color veya statusColor'a göre ayarla
      const colorKey = statusColor || (isPaletteColor(color) ? color : "primary");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getSxForAppearance = (baseStyles: (theme: any) => any) => getAppearanceSx(baseStyles(theme), colorKey, getColor);
      if (appearance === "premium")
        sx = {
          ...sx,
          ...getSxForAppearance(premiumStyles),
        };
      else if (appearance === "soft")
        sx = {
          ...sx,
          ...getSxForAppearance(softStyles),
        };
      else if (appearance === "glass")
        sx = {
          ...sx,
          ...getSxForAppearance(glassStyles),
        };
      else if (appearance === "minimal")
        sx = {
          ...sx,
          ...getSxForAppearance(minimalStyles),
        };
      else if (appearance === "neumorph")
        sx = {
          ...sx,
          ...getSxForAppearance(neumorphStyles),
        };
      else if (appearance === "underline")
        sx = {
          ...sx,
          ...getSxForAppearance(underlineStyles),
        };
      else if (appearance === "dark") {
        sx = {
          ...sx,
          ...getSxForAppearance(theme.palette.mode === "dark" ? getDynamicDarkStyles : getDynamicLightStyles),
        };
      } else if (appearance === "borderless")
        sx = {
          ...sx,
          ...getSxForAppearance(borderlessStyles),
        };
      if (sx) sx = { ...sx, ...props.sx };
      if (direction) {
        sx = { ...sx, direction };
      }
      return sx;
    }, [responsiveWidth, size, isHighContrast, statusColor, isPaletteColor, color, appearance, props.sx, direction, fontSize, reducedMotion, theme, getColor]);

    // Live region for screen reader
    const { liveRegionRef, liveRegionMessage } = useLiveRegion({
      showValidationStatus: !!showValidationStatus,
      enableAsyncValidation: !!enableAsyncValidation,
      validationResult,
    });

    // Yeni gelişmiş hook'lar
    const richTextEditor = useRichTextEditor({
      enableRichText,
      enableMarkdown,
      enableHTML,
      enableFormatting,
      enableLinks,
      enableColors,
    });

    const textFormatting = useTextFormatting({
      enableTransformation,
      enableAutoResize,
      enableCharacterCount,
      enableWordCount,
      maxLength: maxCharacters,
      minLength: props.minLength,
    });

    // Akıllı özellikler hook'ları
    const autoComplete = useAutoComplete({
      enableAutoComplete,
      options: autoCompleteOptions,
      fetchOptions: fetchAutoCompleteOptions,
      minQueryLength: minAutoCompleteQueryLength,
      maxSuggestions: maxAutoCompleteSuggestions,
      debounceMs: autoCompleteDebounceMs,
      enableCategories: enableAutoCompleteCategories,
      enableIcons: enableAutoCompleteIcons,
      enableKeyboardNavigation: enableAutoCompleteKeyboardNavigation,
    });

    const smartSuggestions = useSmartSuggestions({
      enableSmartSuggestions,
      enableRecentHistory,
      enableFavorites,
      enableTrending,
      enableRecommendations,
      maxHistoryItems,
      maxFavorites,
      maxTrending,
      maxRecommendations,
      suggestionDebounceMs,
      enableLearning,
      enablePersonalization,
    });

    const smartValidation = useSmartValidation({
      enableSmartValidation,
      enableRealTimeValidation: enableSmartRealTimeValidation,
      enableSuggestions: enableValidationSuggestions,
      enableLearning: enableValidationLearning,
      validationDebounceMs: smartValidationDebounceMs,
      customRules: smartCustomValidationRules,
    });

    // Gelişmiş doğrulama hook'ları
    const advancedValidation = useAdvancedValidation({
      enableAdvancedValidation,
      enableAsyncValidation: enableAdvancedAsyncValidation,
      enableContextValidation,
      enableBusinessRules: enableAdvancedBusinessRules,
      enableCrossFieldValidation: enableAdvancedCrossFieldValidation,
      enableRealTimeValidation: enableAdvancedRealTimeValidation,
      validationDebounceMs: smartValidationDebounceMs,
      maxConcurrentValidations,
      customRules: advancedCustomValidationRules?.map(rule => ({
        ...rule,
        customValidator: rule.customValidator ? (value: string, context?: unknown) => 
          rule.customValidator!(value, context as Record<string, unknown>) : undefined
      })),
      validationContext,
    });

    const businessRules = useBusinessRules({
      enableBusinessRules: enableBusinessRulesValidation,
      enableRealTimeEvaluation: enableBusinessRealTimeEvaluation,
      enableRuleLearning,
      enableRuleOptimization,
      evaluationDebounceMs: businessEvaluationDebounceMs,
      customRules: customBusinessRules?.map(rule => ({
        ...rule,
        conditions: rule.conditions.map(condition => ({
          ...condition,
          customFunction: condition.customFunction ? (value: unknown, context: unknown) =>
            condition.customFunction!(value, context as Record<string, unknown>) : undefined
        })),
        actions: rule.actions.map(action => ({
          ...action,
          customFunction: action.customFunction ? (value: unknown, context: unknown) =>
            action.customFunction!(value, context as Record<string, unknown>) : undefined
        }))
      })),
      businessContext,
    });

    const crossFieldValidation = useCrossFieldValidation({
      enableCrossFieldValidation: enableCrossFieldValidationValidation,
      enableRealTimeValidation: enableAdvancedRealTimeValidation,
      enableDependencyTracking: enableCrossFieldDependencyTracking,
      validationDebounceMs: smartValidationDebounceMs,
      customRules: customCrossFieldRules,
      crossFieldContext,
    });

    // Kullanıcı deneyimi hook'ları
    const smartPlaceholder = useSmartPlaceholder({
      enableSmartPlaceholder,
      enableContextualPlaceholders,
      enableTimeBasedPlaceholders,
      enablePersonalizedPlaceholders,
      enableLearning: enablePlaceholderLearning,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      customTemplates: customPlaceholderTemplates as any,
      placeholderContext,
    });

    const smartHelp = useSmartHelp({
      enableSmartHelp,
      enableContextualHelp,
      enableProgressiveHelp,
      enableLearning: enableHelpLearning,
      enablePersonalization: enableHelpPersonalization,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      customHelpItems: customHelpItems as any,
      helpContext,
    });

    const progressiveDisclosure = useProgressiveDisclosure({
      enableProgressiveDisclosure,
      enableContextualDisclosure,
      enableLearning: enableDisclosureLearning,
      enablePersonalization: enableDisclosurePersonalization,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      customRules: customDisclosureRules as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      customContent: customDisclosureContent as any,
      disclosureContext,
    });

    // Erişilebilirlik ve Performans hook'ları
    const accessibility = useAccessibility({
      enableScreenReaderSupport,
      enableKeyboardNavigation,
      enableHighContrast: enableAccessibilityHighContrast,
      enableReducedMotion: enableAccessibilityReducedMotion,
      enableFocusManagement,
      enableARIALabels,
      enableLiveRegions,
      enableSkipLinks,
      enableTooltips,
      enableErrorAnnouncements,
      enableStatusAnnouncements,
      enableProgressAnnouncements,
    });

    const performance = usePerformance({
      enablePerformanceTracking,
      enableRenderTracking,
      enableMemoryTracking,
      enableNetworkTracking,
      enableUserInteractionTracking,
      enablePerformanceOptimization,
      enableDebouncing,
      enableThrottling,
      enableCaching,
      enableMemoization,
    });


    // Testing ve Integration hook'ları
    const testing = useTesting({
      enableTesting,
      enableTestMode,
      enableMockData,
      enableTestHelpers,
      enableTestUtilities,
      enableTestValidation,
      enableTestPerformance,
      enableTestAccessibility,
      enableTestMonitoring,
      enableTestDebugging,
      enableTestLogging,
      enableTestAssertions,
      enableTestSnapshots,
      enableTestCoverage,
      enableTestReporting,
      testTimeout,
      testRetries,
      testDelay,
      mockData,
      testConfig,
      customTestHelpers,
      customTestUtilities,
      customTestValidators,
      customTestAssertions,
    });

    const integration = useIntegration({
      enableIntegration,
      enableFormIntegration,
      enableValidationIntegration,
      enableStateIntegration,
      enableEventIntegration,
      enableDataIntegration,
      enableAPIIntegration,
      enableStorageIntegration,
      enableThemeIntegration,
      enableI18nIntegration,
      enableAccessibilityIntegration,
      enablePerformanceIntegration,
      enableMonitoringIntegration,
      enableTestingIntegration,
      enableCustomIntegration,
      integrationTimeout,
      integrationRetries,
      integrationDelay,
      customIntegrations,
      integrationConfig,
      apiEndpoints,
      storageKeys,
      eventTypes,
      dataFormats,
      validationRules,
      stateKeys,
      themeKeys,
      i18nKeys,
      accessibilityKeys,
      performanceKeys,
      monitoringKeys,
      testingKeys,
    });

    // OnChange handler
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        
        // Text formatting uygula
        if (enableTransformation && textFormatting.transformation) {
          const activeTransformation = Object.entries(textFormatting.transformation)
            .find(([_, isActive]) => isActive)?.[0] as keyof typeof textFormatting.transformation;
          
          if (activeTransformation) {
            newValue = textFormatting.transformText(newValue, activeTransformation);
          }
        }
        
        // Rich text editor uygula
        if (enableRichText && richTextEditor.isRichTextEnabled) {
          newValue = richTextEditor.getFormattedText(newValue);
        }
        
        // Counter güncelle
        if (enableCounter) {
          textCounter.updateCounter(newValue);
        }
        
        // Auto complete güncelle
        if (enableAutoComplete) {
          autoComplete.showSuggestions(newValue);
        }
        
        // Smart suggestions güncelle
        if (enableSmartSuggestions) {
          smartSuggestions.searchSuggestions(newValue);
        }
        
        // Smart validation güncelle
        if (enableSmartValidation) {
          smartValidation.validate(newValue);
        }
        
        // Advanced validation güncelle
        if (enableAdvancedValidation) {
          advancedValidation.validate(newValue, validationContext);
        }
        
        // Business rules güncelle
        if (enableBusinessRulesValidation) {
          businessRules.evaluateRules(newValue, businessContext);
        }
        
        // Cross field validation güncelle
        if (enableCrossFieldValidationValidation) {
          crossFieldValidation.validateCrossFields(name || 'field', newValue, crossFieldContext);
        }
        
        // Smart placeholder güncelle
        if (enableSmartPlaceholder) {
          const context = {
            fieldName: name,
            fieldType: type,
            fieldValue: newValue,
            userContext: placeholderContext.userContext,
            formContext: placeholderContext.formContext,
            locale: placeholderContext.locale || locale,
          };
          smartPlaceholder.generatePlaceholder(context);
        }
        
        // Smart help güncelle
        if (enableSmartHelp) {
          const context = {
            fieldName: name,
            fieldType: type,
            fieldValue: newValue,
            userContext: helpContext.userContext,
            formContext: helpContext.formContext,
            locale: helpContext.locale || locale,
            userLevel: helpContext.userLevel,
            deviceType: helpContext.deviceType,
            timeSpent: helpContext.timeSpent,
            errorCount: helpContext.errorCount,
          };
          smartHelp.generateHelp(context);
        }
        
        // Progressive disclosure güncelle
        if (enableProgressiveDisclosure) {
          const context = {
            fieldName: name,
            fieldType: type,
            fieldValue: newValue,
            userContext: disclosureContext.userContext,
            formContext: disclosureContext.formContext,
            locale: disclosureContext.locale || locale,
            userLevel: disclosureContext.userLevel,
            deviceType: disclosureContext.deviceType,
            timeSpent: disclosureContext.timeSpent,
            interactionCount: disclosureContext.interactionCount,
            errorCount: disclosureContext.errorCount,
          };
          progressiveDisclosure.generateDisclosure(context);
        }
        
        // Accessibility güncelle
        if (enableAccessibility) {
          accessibility.actions.announce(`Değer değişti: ${newValue}`, 'polite');
          if (enableUserInteractionTracking) {
            accessibility.actions.updateContext({
              fieldName: name,
              fieldType: type,
              fieldValue: newValue,
            });
          }
        }
        
        // Performance tracking
        if (enablePerformanceTracking) {
          const renderStart = window.performance.now();
          performance.actions.trackRender('BcTextField', renderStart);
          performance.actions.trackUserInteraction('input_change');
        }
        
        // Monitoring
        if (enableMonitoring && monitoringProp) {
          if (monitoringProp.onChange) {
            monitoringProp.onChange(newValue);
          }
        }
        
        // Testing
        if (enableTesting) {
          testing.actions.logTest('info', `Input changed: ${newValue}`, {
            fieldName: name,
            fieldType: type,
            value: newValue,
          });
          
          if (enableTestValidation) {
            testing.actions.validateInput(newValue, validationRules);
          }
          
          if (enableTestPerformance) {
            testing.actions.validatePerformance(() => {
              // Simulate some processing
            }, 100);
          }
        }
        
        // Integration
        if (enableIntegration) {
          if (enableFormIntegration) {
            integration.actions.updateFormData(name || 'field', newValue);
          }
          
          if (enableStateIntegration) {
            integration.actions.updateState(name || 'field', newValue);
          }
          
          if (enableEventIntegration) {
            integration.actions.emitEvent('input_change', {
              fieldName: name,
              fieldType: type,
              value: newValue,
            });
          }
          
          if (enableDataIntegration) {
            integration.actions.cacheData(name || 'field', newValue);
          }
        }
        
        if (!isControlled) setInternalValue(newValue);
        if (onChange) {
          // Formatlanmış değerle event oluştur
          const formattedEvent = {
            ...e,
            target: { ...e.target, value: newValue }
          };
          onChange(formattedEvent);
        }
        if (monitoringProp && typeof monitoringProp.onChange === 'function') {
          try {
            monitoringProp.onChange(newValue);
          } catch (err) {
            if (monitoringProp.onError) monitoringProp.onError(err as Error);
          }
        }
      },
      [
        isControlled, 
        onChange, 
        monitoringProp, 
        enableTransformation, 
        textFormatting, 
        enableRichText, 
        richTextEditor, 
        enableCounter, 
        textCounter,
        enableAutoComplete,
        autoComplete,
        enableSmartSuggestions,
        smartSuggestions,
        enableSmartValidation,
        smartValidation,
        enableAdvancedValidation,
        advancedValidation,
        validationContext,
        enableBusinessRulesValidation,
        businessRules,
        businessContext,
        enableCrossFieldValidationValidation,
        crossFieldValidation,
        crossFieldContext,
        name,
        enableSmartPlaceholder,
        smartPlaceholder,
        placeholderContext,
        type,
        enableSmartHelp,
        smartHelp,
        helpContext,
        enableProgressiveDisclosure,
        progressiveDisclosure,
        disclosureContext,
        locale,
        enableAccessibility,
        accessibility,
        enableUserInteractionTracking,
        enablePerformanceTracking,
        performance,
        enableMonitoring,
        enableTesting,
        testing,
        enableTestValidation,
        validationRules,
        enableTestPerformance,
        enableIntegration,
        integration,
        enableFormIntegration,
        enableStateIntegration,
        enableEventIntegration,
        enableDataIntegration
      ]
    );

    // slotProps.input'a ekle
    let inputSlotProps = {
      ...(typeof slotProps.input === "object" && !Array.isArray(slotProps.input) ? slotProps.input : {}),
      startAdornment: startAdornment,
      endAdornment: finalEndAdornment,
      id: inputId,
      "aria-labelledby": labelId,
      "aria-describedby": ariaDescribedByStr,
      "aria-invalid": finalError ? true : undefined,
      "aria-busy": finalLoading ? true : undefined,
      "aria-required": rest.required ? true : undefined, // A11y: zorunlu alan
      readOnly: isReadonly || undefined,
      autoFocus: props.autoFocus,
      autoComplete: props.autoComplete,
      inputMode: props.inputMode,
      pattern: props.pattern,
      maxLength: props.maxLength,
      minLength: props.minLength,
      spellCheck: props.spellCheck,
      ...(typeof props.inputComponent === 'function' ? { inputComponent: props.inputComponent } : {}),
    };
    // enableRTL için input'a özel bir şey eklemiyoruz, sadece TextField'a dir verilecek

    // Floating label: placeholder varsa label yukarıda sabit kalır, focus olunca da yukarıda olmalı
    const shrink = Boolean(placeholder) || Boolean(value) || focused;

    return (
      <>
        {/* Visually hidden live region for screen reader validation messages */}
        <div
          ref={liveRegionRef}
          aria-live="polite"
          aria-atomic="true"
          style={{ position: 'absolute', width: 1, height: 1, margin: -1, padding: 0, overflow: 'hidden', clip: 'rect(0 0 0 0)', border: 0 }}
        >
          {liveRegionMessage}
        </div>
        <TextField
          ref={ref}
          inputRef={ref}
          id={inputId}
          label={i18nLabel}
          placeholder={placeholder}
          name={name}
          helperText={typeof finalHelperText === 'string' ? finalHelperText : React.isValidElement(finalHelperText) ? finalHelperText : ''}
          error={finalError}
          color={color}
          disabled={isDisabled}
          value={value}
          onChange={handleChange}
          type={type}
          sx={composedSx}
          slotProps={{
            ...slotProps,
            input: inputSlotProps,
            inputLabel: {
              ...(slotProps.inputLabel || {}),
              shrink,
              sx: {
                ...(slotProps.inputLabel && (slotProps.inputLabel as Record<string, unknown>).sx as Record<string, unknown>),
                ...(hasStartAdornment && !shrink ? { left: 40 } : {}),
                // textAlign kaldırıldı
              },
              id: labelId,
              htmlFor: inputId,
            },
            formHelperText: {
              id: helperId,
              "aria-live": finalStatus && finalStatusMessage ? "polite" : undefined,
              // style/textAlign kaldırıldı
            },
          }}
          onFocus={(e) => {
            setFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
          variant="outlined"
          dir={direction}
          {...rest}
        />
      </>
    );
  }
);

export const BcTextField = React.memo(BcTextFieldInner);
BcTextField.displayName = "BcTextField";
