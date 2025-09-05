/**
 * PasswordRuleType describes a custom password validation rule
 * @property key - Unique identifier for the rule
 * @property label - Display label for the rule
 * @property test - Function to test if the rule is satisfied
 */
export interface PasswordRuleType {
  key: string;
  label: string;
  test: (password: string) => boolean;
}

/**
 * PasswordStrengthLevel describes password strength levels
 */
export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * PasswordValidationResult describes the result of password validation
 * @property isValid - Whether the password is valid
 * @property message - Optional validation message
 */
export interface PasswordValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * PasswordMonitoringCallbacks describes monitoring callbacks for password input
 * @property onChange - Called when password value changes
 * @property onError - Called when an error occurs
 * @property onPerformance - Called with performance metrics
 * @property onStrengthChange - Called when password strength changes
 */
export interface PasswordMonitoringCallbacks {
  onChange?: (value: string) => void;
  onError?: (error: Error) => void;
  onPerformance?: (metrics: any) => void;
  onStrengthChange?: (strength: number) => void;
}

/**
 * PasswordStrengthOptions describes options for password strength calculation
 * @property minLength - Minimum password length
 * @property requireUppercase - Require uppercase letters
 * @property requireLowercase - Require lowercase letters
 * @property requireNumber - Require numbers
 * @property requireSpecial - Require special characters
 * @property useZxcvbnStrength - Use zxcvbn for advanced strength calculation
 * @property customRules - Custom validation rules
 */
export interface PasswordStrengthOptions {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecial: boolean;
  useZxcvbnStrength?: boolean;
  customRules?: PasswordRuleType[];
}

/**
 * PasswordStrengthResult describes the result of password strength calculation
 * @property strength - Password strength level (0-5)
 * @property rules - Object with rule validation results
 * @property ruleLabels - Array of rule labels with validation status
 * @property allPassed - Whether all rules are satisfied
 * @property zxcvbnResult - Optional zxcvbn analysis result
 */
export interface PasswordStrengthResult {
  strength: PasswordStrengthLevel;
  rules: Record<string, boolean>;
  ruleLabels: Array<{ 
    key: string; 
    label: string; 
    custom?: boolean; 
    test?: (password: string) => boolean 
  }>;
  allPassed: boolean;
  zxcvbnResult?: any;
}
