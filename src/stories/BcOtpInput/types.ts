export interface OtpInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onComplete?: (value: string) => void;
  validateOtp?: (value: string) => boolean | Promise<boolean>;
  mask?: boolean;
  inputType?: 'number' | 'text';
  autoFocus?: boolean;
  autoClear?: boolean;
  autoValidate?: boolean;
  validationDebounceMs?: number;
}

export interface OtpMonitoringCallbacks {
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  onClear?: () => void;
  onError?: (error: Error) => void;
  onPerformance?: (metrics: any) => void;
}

export interface OtpValidationResult {
  isValid: boolean;
  message?: string;
  errors?: string[];
}

export interface OtpAccessibilityProps {
  length: number;
  value: string;
  status?: 'error' | 'warning' | 'success' | 'info';
  disabled?: boolean;
  loading?: boolean;
}

export interface OtpAppearanceProps {
  appearance?: 'premium' | 'soft' | 'glass' | 'minimal' | 'neumorph' | 'underline' | 'dark' | 'borderless';
  status?: 'error' | 'warning' | 'success' | 'info';
  disabled?: boolean;
  loading?: boolean;
  enableThemeAwareStyles?: boolean;
}

export interface OtpResponsiveProps {
  responsiveWidth?: boolean;
  enableMobileOptimizations?: boolean;
}

export interface OtpI18nProps {
  locale?: string;
  fallbackLocale?: string;
  translations?: Record<string, string>;
  enableAdvancedI18n?: boolean;
}

export interface OtpKeyboardProps {
  inputsRef: React.RefObject<Array<HTMLInputElement | null>>;
  length: number;
  onKeyDown: (e: React.KeyboardEvent, idx: number) => void;
  onArrowLeft: (idx: number) => boolean;
  onArrowRight: (idx: number) => boolean;
  onBackspace: (idx: number) => void;
  onEnter: () => void;
  enabled?: boolean;
}

export interface OtpPasteProps {
  length: number;
  onPaste: (pasted: string) => boolean;
  inputType?: 'number' | 'text';
}

export interface OtpFocusProps {
  inputsRef: React.RefObject<Array<HTMLInputElement | null>>;
  length: number;
  autoFocus?: boolean;
  onFocus: (idx: number) => void;
  onBlur: (idx: number) => void;
}

export interface OtpMonitoringProps {
  monitoring?: OtpMonitoringCallbacks;
  enableAdvancedMonitoring?: boolean;
  value: string;
  length: number;
}

export interface OtpInputHookProps {
  length: number;
  value: string;
  isControlled: boolean;
  setInternalValue: (value: string) => void;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  autoClear?: boolean;
  autoValidate?: boolean;
  validateOtp?: (value: string) => boolean | Promise<boolean>;
  validationDebounceMs?: number;
  monitoring?: OtpMonitoringCallbacks;
}

export interface OtpValidationHookProps {
  value: string;
  validateOtp?: (value: string) => boolean | Promise<boolean>;
  autoValidate?: boolean;
  validationDebounceMs?: number;
  monitoring?: {
    onError?: (error: Error) => void;
  };
}

export interface OtpKeyboardHookProps {
  inputsRef: React.RefObject<Array<HTMLInputElement | null>>;
  length: number;
  onKeyDown: (e: React.KeyboardEvent, idx: number) => void;
  onArrowLeft: (idx: number) => boolean;
  onArrowRight: (idx: number) => boolean;
  onBackspace: (idx: number) => void;
  onEnter: () => void;
  enabled?: boolean;
}

export interface OtpPasteHookProps {
  length: number;
  onPaste: (pasted: string) => boolean;
  inputType?: 'number' | 'text';
}

export interface OtpFocusHookProps {
  inputsRef: React.RefObject<Array<HTMLInputElement | null>>;
  length: number;
  autoFocus?: boolean;
  onFocus: (idx: number) => void;
  onBlur: (idx: number) => void;
}

export interface OtpMonitoringHookProps {
  monitoring?: OtpMonitoringCallbacks;
  enableAdvancedMonitoring?: boolean;
  value: string;
  length: number;
}

export interface OtpAccessibilityHookProps {
  length: number;
  value: string;
  status?: 'error' | 'warning' | 'success' | 'info';
  disabled?: boolean;
  loading?: boolean;
}

export interface OtpAppearanceHookProps {
  appearance?: 'premium' | 'soft' | 'glass' | 'minimal' | 'neumorph' | 'underline' | 'dark' | 'borderless';
  status?: 'error' | 'warning' | 'success' | 'info';
  disabled?: boolean;
  loading?: boolean;
  enableThemeAwareStyles?: boolean;
}

export interface OtpResponsiveHookProps {
  responsiveWidth?: boolean;
  enableMobileOptimizations?: boolean;
}

export interface OtpI18nHookProps {
  locale?: string;
  fallbackLocale?: string;
  translations?: Record<string, string>;
  enableAdvancedI18n?: boolean;
}

export type OtpInputType = 'number' | 'text';
export type OtpStatus = 'error' | 'warning' | 'success' | 'info';
export type OtpAppearance = 'premium' | 'soft' | 'glass' | 'minimal' | 'neumorph' | 'underline' | 'dark' | 'borderless';
export type OtpScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
