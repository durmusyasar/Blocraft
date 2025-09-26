import { BcTextFieldProps } from '../BcTextField/BcTextField';

/**
 * Password strength levels
 */
export type PasswordStrength = 'very-weak' | 'weak' | 'fair' | 'good' | 'strong';

/**
 * Password validation rules
 */
export interface PasswordValidationRule {
  id: string;
  name: string;
  test: (password: string) => boolean;
  message: string;
  weight: number;
  enabled: boolean;
}

/**
 * Password strength configuration
 */
export interface PasswordStrengthConfig {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  customRules: PasswordValidationRule[];
  strengthThresholds: {
    veryWeak: number;
    weak: number;
    fair: number;
    good: number;
    strong: number;
  };
}

/**
 * Password visibility toggle configuration
 */
export interface PasswordVisibilityConfig {
  showToggle: boolean;
  toggleIcon?: React.ReactNode;
  toggleLabel?: string;
  togglePosition?: 'start' | 'end';
  rememberVisibility?: boolean;
}

/**
 * Password generation options
 */
export interface PasswordGenerationOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSpecialChars: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
  customChars?: string;
}

/**
 * Password security features
 */
export interface PasswordSecurityFeatures {
  enableBreachDetection: boolean;
  enableCommonPasswordCheck: boolean;
  enablePatternDetection: boolean;
  enableKeyboardPatternCheck: boolean;
  enableRepeatedCharCheck: boolean;
  enableSequentialCharCheck: boolean;
  enableDictionaryCheck: boolean;
  breachDetectionApi?: string;
  commonPasswordsList?: string[];
  dictionaryWords?: string[];
}

/**
 * Password analytics and monitoring
 */
export interface PasswordAnalytics {
  trackStrengthChanges: boolean;
  trackVisibilityToggles: boolean;
  trackGenerationUsage: boolean;
  trackValidationEvents: boolean;
  trackSecurityWarnings: boolean;
  onStrengthChange?: (strength: PasswordStrength, score: number) => void;
  onVisibilityToggle?: (visible: boolean) => void;
  onPasswordGenerated?: (password: string) => void;
  onValidationEvent?: (event: string, details: Record<string, unknown>) => void;
  onSecurityWarning?: (warning: string, severity: 'low' | 'medium' | 'high') => void;
}

/**
 * BcPasswordInput specific props that extend BcTextField
 */
export interface BcPasswordInputProps extends Omit<BcTextFieldProps, 'type' | 'inputMode' | 'autoComplete'> {
  // Password-specific props
  showPasswordToggle?: boolean;
  passwordToggleLabel?: string;
  passwordTogglePosition?: 'start' | 'end';
  rememberPasswordVisibility?: boolean;
  
  // Password strength
  enableStrengthIndicator?: boolean;
  showStrengthMeter?: boolean;
  strengthConfig?: Partial<PasswordStrengthConfig>;
  onStrengthChange?: (strength: PasswordStrength, score: number) => void;
  
  // Password validation
  enablePasswordValidation?: boolean;
  customValidationRules?: PasswordValidationRule[];
  validationDebounceMs?: number;
  showValidationMessages?: boolean;
  
  // Password generation
  enablePasswordGeneration?: boolean;
  generationOptions?: Partial<PasswordGenerationOptions>;
  onPasswordGenerated?: (password: string) => void;
  
  // Security features
  securityFeatures?: Partial<PasswordSecurityFeatures>;
  onSecurityWarning?: (warning: string, severity: 'low' | 'medium' | 'high') => void;
  
  // Individual security feature toggles
  enableBreachDetection?: boolean;
  enableCommonPasswordCheck?: boolean;
  enablePatternDetection?: boolean;
  enableKeyboardPatternCheck?: boolean;
  enableRepeatedCharCheck?: boolean;
  enableSequentialCharCheck?: boolean;
  enableDictionaryCheck?: boolean;
  breachDetectionApi?: string;
  commonPasswordsList?: string[];
  dictionaryWords?: string[];
  
  // Analytics
  analytics?: Partial<PasswordAnalytics>;
  
  // Password visibility state
  defaultVisible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  
  // Password strength display
  strengthDisplayMode?: 'text' | 'meter' | 'both' | 'none';
  strengthColorScheme?: 'default' | 'material' | 'custom';
  customStrengthColors?: {
    veryWeak: string;
    weak: string;
    fair: string;
    good: string;
    strong: string;
  };
  
  // Password requirements display
  showRequirements?: boolean;
  requirementsPosition?: 'below' | 'tooltip' | 'popover';
  requirementsStyle?: 'list' | 'inline' | 'compact';
  
  // Password history
  enablePasswordHistory?: boolean;
  maxHistoryItems?: number;
  onPasswordHistoryChange?: (history: string[]) => void;
  
  // Password suggestions
  enablePasswordSuggestions?: boolean;
  suggestionSource?: 'builtin' | 'api' | 'custom';
  customSuggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
  
  // Accessibility
  passwordToggleAriaLabel?: string;
  strengthMeterAriaLabel?: string;
  requirementsAriaLabel?: string;
  
  // Translations
  passwordTranslations?: {
    toggleVisibility?: string;
    showPassword?: string;
    hidePassword?: string;
    strengthLabel?: string;
    requirementsLabel?: string;
    generatePassword?: string;
    copyPassword?: string;
    copied?: string;
    veryWeak?: string;
    weak?: string;
    fair?: string;
    good?: string;
    strong?: string;
    requirements?: {
      minLength?: string;
      uppercase?: string;
      lowercase?: string;
      numbers?: string;
      specialChars?: string;
      noCommonPasswords?: string;
      noPersonalInfo?: string;
    };
  };
  
  // Locale support
  locale?: string;
}

/**
 * Password strength result
 */
export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number;
  feedback: string[];
  suggestions: string[];
  isValid: boolean;
  requirements: {
    minLength: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    specialChars: boolean;
    noCommonPasswords: boolean;
    noPersonalInfo: boolean;
  };
}

/**
 * Password validation result
 */
export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  strength: PasswordStrengthResult;
}

/**
 * Password generation result
 */
export interface PasswordGenerationResult {
  password: string;
  strength: PasswordStrength;
  score: number;
  features: {
    length: number;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecialChars: boolean;
  };
}

/**
 * Password security warning
 */
export interface PasswordSecurityWarning {
  type: 'breach' | 'common' | 'pattern' | 'keyboard' | 'repeated' | 'sequential' | 'dictionary';
  message: string;
  severity: 'low' | 'medium' | 'high';
  suggestion?: string;
}

/**
 * Password component state
 */
export interface PasswordComponentState {
  isVisible: boolean;
  strength: PasswordStrengthResult | null;
  validation: PasswordValidationResult | null;
  securityWarnings: PasswordSecurityWarning[];
  isGenerating: boolean;
  isAnalyzing: boolean;
  history: string[];
  suggestions: string[];
}