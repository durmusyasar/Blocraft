import type { ReactNode, RefObject } from "react";
import type { BcTextFieldProps } from "../BcTextField/BcTextField";

/**
 * OTP Input Shape Options
 */
export type OtpInputShape = 'square' | 'circle' | 'hexagon' | 'rounded';

/**
 * OTP Input Size Options
 */
export type OtpInputSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * OTP Input Type Options
 */
export type OtpInputType = 'number' | 'text' | 'alphanumeric';

/**
 * OTP Input Appearance Options
 */
export type OtpInputAppearance = 'premium' | 'soft' | 'glass' | 'minimal' | 'neumorph' | 'underline' | 'dark' | 'borderless';

/**
 * OTP Animation Options
 */
export interface OtpAnimationOptions {
  enableAnimations?: boolean;
  animationDuration?: number;
  enableSuccessAnimation?: boolean;
  enableErrorAnimation?: boolean;
  enableFocusAnimation?: boolean;
  enableTypingAnimation?: boolean;
  enableShakeAnimation?: boolean;
  enablePulseAnimation?: boolean;
}

/**
 * OTP Styling Options
 */
export interface OtpStylingOptions {
  inputShape?: OtpInputShape;
  inputSize?: OtpInputSize;
  customTheme?: string;
  enableCustomColors?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  errorColor?: string;
  successColor?: string;
  warningColor?: string;
  infoColor?: string;
  enableGradient?: boolean;
  enableGlow?: boolean;
  enableShadow?: boolean;
  enableBorder?: boolean;
  borderWidth?: number;
  borderStyle?: string;
  borderRadius?: number;
  enableBackground?: boolean;
  backgroundColor?: string;
  enableTextShadow?: boolean;
  textShadow?: string;
}

/**
 * OTP Accessibility Options
 */
export interface OtpAccessibilityOptions {
  enableHighContrast?: boolean;
  enableReducedMotion?: boolean;
  enableScreenReader?: boolean;
  enableKeyboardNavigation?: boolean;
  enableVoiceInput?: boolean;
  enableHapticFeedback?: boolean;
  enableFocusManagement?: boolean;
  enableLiveRegions?: boolean;
}

/**
 * OTP Security Options
 */
export interface OtpSecurityOptions {
  enableMasking?: boolean;
  maskCharacter?: string;
  enableAutoClear?: boolean;
  clearDelay?: number;
  enableSecureInput?: boolean;
  enableAntiKeylog?: boolean;
  enableScreenCapture?: boolean;
  enableCopyPaste?: boolean;
}

/**
 * OTP Validation Options
 */
export interface OtpValidationOptions {
  enableAutoValidation?: boolean;
  validationDebounceMs?: number;
  enableRealTimeValidation?: boolean;
  enableAsyncValidation?: boolean;
  validateOnBlur?: boolean;
  validateOnComplete?: boolean;
  customValidationRules?: Array<(value: string) => boolean | string>;
  enableRetryValidation?: boolean;
  maxRetryAttempts?: number;
}

/**
 * OTP Interaction Options
 */
export interface OtpInteractionOptions {
  enableKeyboardNavigation?: boolean;
  enablePasteSupport?: boolean;
  enableAutoFocus?: boolean;
  enableAutoComplete?: boolean;
  enableSmartPaste?: boolean;
  enableBulkInput?: boolean;
  enableGestureInput?: boolean;
  enableTouchInput?: boolean;
  enableMouseInput?: boolean;
  enableDragDrop?: boolean;
  validateOnBlur?: boolean;
}

/**
 * OTP Performance Options
 */
export interface OtpPerformanceOptions {
  enableVirtualization?: boolean;
  enableLazyLoading?: boolean;
  enableMemoization?: boolean;
  enableDebouncing?: boolean;
  debounceMs?: number;
  enableThrottling?: boolean;
  throttleMs?: number;
  enableBatchUpdates?: boolean;
  batchSize?: number;
  enablePerformanceTracking?: boolean;
}

/**
 * OTP Analytics Options
 */
export interface OtpAnalyticsOptions {
  enableUsageTracking?: boolean;
  enableErrorTracking?: boolean;
  enablePerformanceTracking?: boolean;
  enableUserBehaviorTracking?: boolean;
  enableAccessibilityTracking?: boolean;
  customEvents?: Array<string>;
  trackingId?: string;
}

/**
 * OTP Monitoring Callbacks
 */
export interface OtpMonitoringCallbacks {
  onInputChange?: (value: string, index: number, timestamp: number) => void;
  onValidation?: (isValid: boolean, value: string, timestamp: number) => void;
  onFocus?: (index: number, timestamp: number) => void;
  onBlur?: (index: number, timestamp: number) => void;
  onComplete?: (value: string, timestamp: number) => void;
  onError?: (error: string, timestamp: number) => void;
  onSuccess?: (value: string, timestamp: number) => void;
  onRetry?: (attempts: number, timestamp: number) => void;
  onKeyboardNavigation?: (direction: 'left' | 'right' | 'up' | 'down' | 'none', timestamp: number) => void;
  onPaste?: (pastedValue: string, timestamp: number) => void;
  onClear?: (timestamp: number) => void;
  onResize?: (width: number, height: number, timestamp: number) => void;
  onAccessibilityAction?: (action: string, timestamp: number) => void;
  onPerformanceMetric?: (metric: string, value: number, timestamp: number) => void;
}

/**
 * OTP Input Configuration
 */
export interface OtpInputConfig {
  length: number;
  inputType: OtpInputType;
  placeholder?: string;
  mask?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'aria-busy'?: boolean;
  'data-testid'?: string;
}

/**
 * OTP Container Configuration
 */
export interface OtpContainerConfig {
  direction: 'horizontal' | 'vertical' | 'grid';
  spacing: number;
  alignment: 'start' | 'center' | 'end' | 'stretch';
  wrap: boolean;
  justifyContent: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  alignItems: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  gap: number;
  padding: number;
  margin: number;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderStyle: string;
  boxShadow: string;
  minHeight: number;
  minWidth: number;
  maxHeight?: number;
  maxWidth?: number;
}

/**
 * OTP Theme Configuration
 */
export interface OtpThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  primaryColor: string;
  secondaryColor: string;
  errorColor: string;
  successColor: string;
  warningColor: string;
  infoColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  focusColor: string;
  hoverColor: string;
  disabledColor: string;
  placeholderColor: string;
  shadowColor: string;
  gradientColors?: Array<string>;
  customCSS?: string;
}

/**
 * OTP Responsive Configuration
 */
export interface OtpResponsiveConfig {
  enableResponsive?: boolean;
  breakpoints?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  mobileConfig?: {
    inputSize: OtpInputSize;
    inputShape: OtpInputShape;
    spacing: number;
    fontSize: number;
  };
  tabletConfig?: {
    inputSize: OtpInputSize;
    inputShape: OtpInputShape;
    spacing: number;
    fontSize: number;
  };
  desktopConfig?: {
    inputSize: OtpInputSize;
    inputShape: OtpInputShape;
    spacing: number;
    fontSize: number;
  };
}

/**
 * OTP Internationalization Configuration
 */
export interface OtpI18nConfig {
  locale: string;
  fallbackLocale: string;
  translations: Record<string, Record<string, string>>;
  enableRTL?: boolean;
  textDirection?: 'ltr' | 'rtl' | 'auto';
  numberFormat?: 'western' | 'arabic' | 'persian' | 'devanagari';
  dateFormat?: string;
  timeFormat?: string;
}

/**
 * OTP Input State
 */
export interface OtpInputState {
  value: string;
  focusedIndex: number | null;
  isValid: boolean;
  isValidating: boolean;
  error: string | null;
  success: boolean;
  loading: boolean;
  disabled: boolean;
  readonly: boolean;
  retryCount: number;
  lastUpdate: number;
  inputRefs: Array<HTMLInputElement | null>;
  containerRef: HTMLDivElement | null;
}

/**
 * OTP Validation Result
 */
export interface OtpValidationResult {
  isValid: boolean;
  message?: string;
  errors?: Array<string>;
  warnings?: Array<string>;
  suggestions?: Array<string>;
  score?: number;
  timestamp: number;
}

/**
 * OTP Performance Metrics
 */
export interface OtpPerformanceMetrics {
  renderTime: number;
  updateTime: number;
  validationTime: number;
  focusTime: number;
  blurTime: number;
  inputTime: number;
  pasteTime: number;
  clearTime: number;
  memoryUsage: number;
  cpuUsage: number;
}

/**
 * OTP Analytics Data
 */
export interface OtpAnalyticsData {
  sessionId: string;
  userId?: string;
  componentId: string;
  events: Array<{
    type: string;
    timestamp: number;
    data: Record<string, unknown>;
  }>;
  performance: OtpPerformanceMetrics;
  errors: Array<{
    message: string;
    stack?: string;
    timestamp: number;
  }>;
  userBehavior: {
    totalInputs: number;
    totalValidations: number;
    totalErrors: number;
    totalSuccesses: number;
    averageInputTime: number;
    averageValidationTime: number;
    mostUsedFeatures: Array<string>;
    accessibilityUsage: Record<string, number>;
  };
}

/**
 * OTP Component Methods
 */
export interface OtpComponentMethods {
  focus: (index?: number) => void;
  blur: (index?: number) => void;
  clear: () => void;
  validate: () => Promise<OtpValidationResult>;
  reset: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
  getState: () => OtpInputState;
  getPerformanceMetrics: () => OtpPerformanceMetrics;
  getAnalyticsData: () => OtpAnalyticsData;
  exportData: () => Record<string, unknown>;
  importData: (data: Record<string, unknown>) => void;
}

/**
 * OTP Hook Return Type
 */
export interface OtpHookReturn {
  state: OtpInputState;
  methods: OtpComponentMethods;
  handlers: {
    handleInputChange: (value: string, index: number) => void;
    handleFocus: (index: number) => void;
    handleBlur: (index: number) => void;
    handleKeyDown: (event: React.KeyboardEvent, index: number) => void;
    handleKeyUp: (event: React.KeyboardEvent, index: number) => void;
    handlePaste: (event: React.ClipboardEvent) => void;
    handleClear: () => void;
    handleRetry: () => void;
    handleValidation: (value: string) => Promise<OtpValidationResult>;
  };
  refs: {
    inputRefs: Array<React.RefObject<HTMLInputElement>>;
    containerRef: React.RefObject<HTMLDivElement>;
  };
  analytics: OtpAnalyticsData;
  performance: OtpPerformanceMetrics;
}

/**
 * OTP Input Error Types
 */
export enum OtpInputErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  SECURITY_ERROR = 'SECURITY_ERROR',
  PERFORMANCE_ERROR = 'PERFORMANCE_ERROR',
  ACCESSIBILITY_ERROR = 'ACCESSIBILITY_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * OTP Input Event Types
 */
export enum OtpInputEventType {
  INPUT_CHANGE = 'INPUT_CHANGE',
  FOCUS = 'FOCUS',
  BLUR = 'BLUR',
  KEY_DOWN = 'KEY_DOWN',
  KEY_UP = 'KEY_UP',
  PASTE = 'PASTE',
  CLEAR = 'CLEAR',
  VALIDATION = 'VALIDATION',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  RETRY = 'RETRY',
  RESIZE = 'RESIZE',
  ACCESSIBILITY_ACTION = 'ACCESSIBILITY_ACTION',
  PERFORMANCE_METRIC = 'PERFORMANCE_METRIC',
}

/**
 * OTP Input Status
 */
export enum OtpInputStatus {
  IDLE = 'IDLE',
  FOCUSED = 'FOCUSED',
  TYPING = 'TYPING',
  VALIDATING = 'VALIDATING',
  VALID = 'VALID',
  INVALID = 'INVALID',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  LOADING = 'LOADING',
  DISABLED = 'DISABLED',
  READONLY = 'READONLY',
}

/**
 * OTP Component Props
 * BcOtpInput component'inin tüm prop'ları
 */
export interface BcOtpInputProps extends Omit<BcTextFieldProps, 'monitoring' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'onKeyUp'> {
  // Core OTP Properties
  /** OTP kodunun uzunluğu / Length of the OTP code */
  length: number;
  
  /** OTP değeri / OTP value */
  otpValue?: string;
  
  /** OTP değişiklik callback'i / OTP change callback */
  onOtpChange?: (value: string) => void;
  
  /** OTP tamamlanma callback'i / OTP completion callback */
  onOtpComplete?: (value: string) => void;
  
  /** OTP validasyon fonksiyonu / OTP validation function */
  validateOtp?: (value: string) => boolean | string | Promise<boolean | string>;
  
  // Input Configuration
  /** Input türü / Input type */
  inputType?: OtpInputType;
  
  /** Input şekli / Input shape */
  inputShape?: OtpInputShape;
  
  /** Input boyutu / Input size */
  inputSize?: OtpInputSize;
  
  /** Maskelenme / Masking */
  mask?: boolean;
  
  /** Mask karakteri / Mask character */
  maskCharacter?: string;
  
  /** Otomatik odaklanma / Auto focus */
  autoFocus?: boolean;
  
  /** Otomatik temizleme / Auto clear */
  autoClear?: boolean;
  
  /** Otomatik sonraki kutuya geçiş / Auto focus next input */
  autoFocusNext?: boolean;
  
  /** Temizleme gecikmesi / Clear delay */
  clearDelay?: number;
  
  // Animation Options
  /** Animasyon seçenekleri / Animation options */
  animationOptions?: OtpAnimationOptions;
  
  // Styling Options
  /** Stil seçenekleri / Styling options */
  stylingOptions?: OtpStylingOptions;
  
  // Accessibility Options
  /** Erişilebilirlik seçenekleri / Accessibility options */
  accessibilityOptions?: OtpAccessibilityOptions;
  
  // Security Options
  /** Güvenlik seçenekleri / Security options */
  securityOptions?: OtpSecurityOptions;
  
  // Validation Options
  /** Validasyon seçenekleri / Validation options */
  validationOptions?: OtpValidationOptions;
  
  // Interaction Options
  /** Etkileşim seçenekleri / Interaction options */
  interactionOptions?: OtpInteractionOptions;
  
  // Performance Options
  /** Performans seçenekleri / Performance options */
  performanceOptions?: OtpPerformanceOptions;
  
  // Analytics Options
  /** Analitik seçenekleri / Analytics options */
  analyticsOptions?: OtpAnalyticsOptions;
  
  // Monitoring
  /** İzleme callback'leri / Monitoring callbacks */
  monitoring?: OtpMonitoringCallbacks;
  
  // Configuration Objects
  /** Input yapılandırması / Input configuration */
  inputConfig?: OtpInputConfig;
  
  /** Container yapılandırması / Container configuration */
  containerConfig?: OtpContainerConfig;
  
  /** Tema yapılandırması / Theme configuration */
  themeConfig?: OtpThemeConfig;
  
  /** Responsive yapılandırması / Responsive configuration */
  responsiveConfig?: OtpResponsiveConfig;
  
  /** i18n yapılandırması / i18n configuration */
  i18nConfig?: OtpI18nConfig;
  
  // Advanced Features
  /** Özel render fonksiyonu / Custom render function */
  renderCustomInput?: (props: OtpInputConfig, index: number) => ReactNode;
  
  /** Özel container render fonksiyonu / Custom container render function */
  renderCustomContainer?: (children: ReactNode, config: OtpContainerConfig) => ReactNode;
  
  /** Özel validasyon render fonksiyonu / Custom validation render function */
  renderCustomValidation?: (isValid: boolean, message: string) => ReactNode;
  
  /** Özel loading render fonksiyonu / Custom loading render function */
  renderCustomLoading?: () => ReactNode;
  
  /** Özel error render fonksiyonu / Custom error render function */
  renderCustomError?: (error: string) => ReactNode;
  
  /** Özel success render fonksiyonu / Custom success render function */
  renderCustomSuccess?: (message: string) => ReactNode;
  
  // Ref Support
  /** Component referansı / Component reference */
  ref?: RefObject<HTMLDivElement>;
  
  // Event Handlers
  /** Focus event handler / Focus event handler */
  onFocus?: (index: number) => void;
  
  /** Blur event handler / Blur event handler */
  onBlur?: (index: number) => void;
  
  /** Key down event handler / Key down event handler */
  onKeyDown?: (event: React.KeyboardEvent, index: number) => void;
  
  /** Key up event handler / Key up event handler */
  onKeyUp?: (event: React.KeyboardEvent, index: number) => void;
  
  /** Paste event handler / Paste event handler */
  onPaste?: (event: React.ClipboardEvent) => void;
  
  /** Clear event handler / Clear event handler */
  onClear?: () => void;
  
  /** Retry event handler / Retry event handler */
  onRetry?: (attempts: number) => void;
  
  /** Resize event handler / Resize event handler */
  onResize?: (width: number, height: number) => void;
  
  /** Accessibility action event handler / Accessibility action event handler */
  onAccessibilityAction?: (action: string) => void;
}

/**
 * Default OTP Configuration
 */
export const DEFAULT_OTP_CONFIG: Partial<BcOtpInputProps> = {
  length: 6,
  inputType: 'number',
  inputShape: 'square',
  inputSize: 'medium',
  mask: false,
  maskCharacter: '*',
  autoFocus: false,
  autoClear: false,
  clearDelay: 3000,
  animationOptions: {
    enableAnimations: true,
    animationDuration: 300,
    enableSuccessAnimation: true,
    enableErrorAnimation: true,
    enableFocusAnimation: true,
    enableTypingAnimation: true,
    enableShakeAnimation: true,
    enablePulseAnimation: true,
  },
  stylingOptions: {
    inputShape: 'square',
    inputSize: 'medium',
    customTheme: 'auto',
    enableCustomColors: false,
    primaryColor: '#1976d2',
    secondaryColor: '#424242',
    errorColor: '#f44336',
    successColor: '#4caf50',
    warningColor: '#ff9800',
    infoColor: '#2196f3',
    enableGradient: false,
    enableGlow: false,
    enableShadow: true,
    enableBorder: true,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 8,
    enableBackground: true,
    backgroundColor: '#ffffff',
    enableTextShadow: false,
    textShadow: 'none',
  },
  accessibilityOptions: {
    enableHighContrast: false,
    enableReducedMotion: false,
    enableScreenReader: true,
    enableKeyboardNavigation: true,
    enableVoiceInput: false,
    enableHapticFeedback: false,
    enableFocusManagement: true,
    enableLiveRegions: true,
  },
  securityOptions: {
    enableMasking: false,
    maskCharacter: '*',
    enableAutoClear: false,
    clearDelay: 3000,
    enableSecureInput: false,
    enableAntiKeylog: false,
    enableScreenCapture: true,
    enableCopyPaste: true,
  },
  validationOptions: {
    enableAutoValidation: false,
    validationDebounceMs: 300,
    enableRealTimeValidation: true,
    enableAsyncValidation: false,
    validateOnBlur: true,
    validateOnComplete: true,
    customValidationRules: [],
    enableRetryValidation: false,
    maxRetryAttempts: 3,
  },
  interactionOptions: {
    enableKeyboardNavigation: true,
    enablePasteSupport: true,
    enableAutoFocus: false,
    enableAutoComplete: false,
    enableSmartPaste: true,
    enableBulkInput: true,
    enableGestureInput: false,
    enableTouchInput: true,
    enableMouseInput: true,
    enableDragDrop: false,
  },
  performanceOptions: {
    enableVirtualization: false,
    enableLazyLoading: false,
    enableMemoization: true,
    enableDebouncing: true,
    debounceMs: 300,
    enableThrottling: false,
    throttleMs: 100,
    enableBatchUpdates: false,
    batchSize: 10,
  },
  analyticsOptions: {
    enableUsageTracking: false,
    enableErrorTracking: true,
    enablePerformanceTracking: true,
    enableUserBehaviorTracking: false,
    enableAccessibilityTracking: false,
    customEvents: [],
    trackingId: '',
  },
};

export default BcOtpInputProps;