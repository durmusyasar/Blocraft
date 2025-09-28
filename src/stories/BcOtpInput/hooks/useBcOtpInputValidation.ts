import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type {
  OtpValidationResult,
  OtpValidationOptions,
  OtpMonitoringCallbacks,
  OtpPerformanceOptions,
} from '../BcOtpInput.types';

/**
 * Hook Options Interface
 */
interface UseBcOtpInputValidationOptions {
  value: string;
  length: number;
  validateOtp?: (value: string) => boolean | string | Promise<boolean | string>;
  autoValidate?: boolean;
  validationDebounceMs?: number;
  monitoring?: OtpMonitoringCallbacks;
  validationOptions?: OtpValidationOptions;
  performanceOptions?: OtpPerformanceOptions;
}

/**
 * Validation Rule Interface
 */
interface ValidationRule {
  name: string;
  validator: (value: string, ...args: unknown[]) => boolean | string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

/**
 * Built-in Validation Rules
 */
const BUILT_IN_VALIDATION_RULES: Record<string, ValidationRule> = {
  required: {
    name: 'required',
    validator: (value: string) => value.length > 0,
    message: 'OTP code is required',
    severity: 'error',
  },
  length: {
    name: 'length',
    validator: (value: string, ...args: unknown[]) => {
      const expectedLength = args[0] as number | undefined;
      return expectedLength ? value.length === expectedLength : value.length >= 4;
    },
    message: 'OTP code must be the correct length',
    severity: 'error',
  },
  numeric: {
    name: 'numeric',
    validator: (value: string) => /^\d+$/.test(value),
    message: 'OTP code must contain only numbers',
    severity: 'error',
  },
  alphanumeric: {
    name: 'alphanumeric',
    validator: (value: string) => /^[a-zA-Z0-9]+$/.test(value),
    message: 'OTP code must contain only letters and numbers',
    severity: 'error',
  },
  noSpaces: {
    name: 'noSpaces',
    validator: (value: string) => !/\s/.test(value),
    message: 'OTP code cannot contain spaces',
    severity: 'error',
  },
  noSpecialChars: {
    name: 'noSpecialChars',
    validator: (value: string) => !/[^a-zA-Z0-9]/.test(value),
    message: 'OTP code cannot contain special characters',
    severity: 'error',
  },
  noRepeatingChars: {
    name: 'noRepeatingChars',
    validator: (value: string) => {
      for (let i = 0; i < value.length - 1; i++) {
        if (value[i] === value[i + 1]) {
          return false;
        }
      }
      return true;
    },
    message: 'OTP code cannot have repeating characters',
    severity: 'warning',
  },
  noSequentialChars: {
    name: 'noSequentialChars',
    validator: (value: string) => {
      for (let i = 0; i < value.length - 1; i++) {
        const current = value.charCodeAt(i);
        const next = value.charCodeAt(i + 1);
        if (Math.abs(current - next) === 1) {
          return false;
        }
      }
      return true;
    },
    message: 'OTP code should not have sequential characters',
    severity: 'warning',
  },
  noCommonPatterns: {
    name: 'noCommonPatterns',
    validator: (value: string) => {
      const commonPatterns = ['123456', '000000', '111111', 'abcdef', 'qwerty'];
      return !commonPatterns.includes(value.toLowerCase());
    },
    message: 'OTP code should not use common patterns',
    severity: 'warning',
  },
};

/**
 * useBcOtpInputValidation Hook
 * 
 * OTP input component'inin validasyon hook'u
 * - Real-time validation
 * - Async validation support
 * - Custom validation rules
 * - Performance tracking
 * - Error handling
 * - Validation history
 */
export const useBcOtpInputValidation = (options: UseBcOtpInputValidationOptions) => {
  const {
    value,
    length,
    validateOtp,
    autoValidate,
    validationDebounceMs = 300,
    monitoring,
    validationOptions,
    performanceOptions,
  } = options;

  // State management
  const [validationState, setValidationState] = useState<{
    isValid: boolean;
    isValidating: boolean;
    error: string | null;
    warnings: string[];
    suggestions: string[];
    score: number;
    lastValidation: number;
    validationHistory: Array<{
      value: string;
      result: OtpValidationResult;
      timestamp: number;
    }>;
  }>({
    isValid: false,
    isValidating: false,
    error: null,
    warnings: [],
    suggestions: [],
    score: 0,
    lastValidation: 0,
    validationHistory: [],
  });

  // Refs
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const validationTimer = useRef<number | null>(null);
  const retryCount = useRef<number>(0);
  const validationCache = useRef<Map<string, OtpValidationResult>>(new Map());

  // Performance tracking
  const startValidationTimer = useCallback(() => {
    if (performanceOptions?.enablePerformanceTracking) {
      validationTimer.current = performance.now();
    }
  }, [performanceOptions?.enablePerformanceTracking]);

  const endValidationTimer = useCallback((metric: string) => {
    if (validationTimer.current && performanceOptions?.enablePerformanceTracking) {
      const duration = performance.now() - validationTimer.current;
      monitoring?.onPerformanceMetric?.(metric, duration, Date.now());
      validationTimer.current = null;
    }
  }, [performanceOptions?.enablePerformanceTracking, monitoring]);

  // Built-in validation rules
  const builtInRules = useMemo(() => {
    const rules: ValidationRule[] = [];
    
    // Required rule
    if (validationOptions?.validateOnBlur !== false) {
      rules.push(BUILT_IN_VALIDATION_RULES.required);
    }
    
    // Length rule
    rules.push({
      ...BUILT_IN_VALIDATION_RULES.length,
      validator: (val: string) => BUILT_IN_VALIDATION_RULES.length.validator(val, length),
    });
    
    // Type-specific rules
    if (value && value.length > 0) {
      if (/^\d+$/.test(value)) {
        rules.push(BUILT_IN_VALIDATION_RULES.numeric);
      } else if (/^[a-zA-Z0-9]+$/.test(value)) {
        rules.push(BUILT_IN_VALIDATION_RULES.alphanumeric);
      }
    }
    
    // Security rules
    rules.push(BUILT_IN_VALIDATION_RULES.noSpaces);
    rules.push(BUILT_IN_VALIDATION_RULES.noSpecialChars);
    
    // Optional security rules
    if (validationOptions?.customValidationRules?.length === 0) {
      rules.push(BUILT_IN_VALIDATION_RULES.noRepeatingChars);
      rules.push(BUILT_IN_VALIDATION_RULES.noSequentialChars);
      rules.push(BUILT_IN_VALIDATION_RULES.noCommonPatterns);
    }
    
    return rules;
  }, [validationOptions, value, length]);

  // Custom validation rules
  const customRules = useMemo(() => {
    if (!validationOptions?.customValidationRules) return [];
    
    return validationOptions.customValidationRules.map((validator, index) => ({
      name: `custom-${index}`,
      validator,
      message: 'Custom validation failed',
      severity: 'error' as const,
    }));
  }, [validationOptions?.customValidationRules]);

  // All validation rules
  const allRules = useMemo(() => {
    return [...builtInRules, ...customRules];
  }, [builtInRules, customRules]);

  // Calculate validation score
  const calculateScore = useCallback((errors: string[], warnings: string[]): number => {
    const errorCount = errors.length;
    const warningCount = warnings.length;
    
    const errorPenalty = errorCount * 2;
    const warningPenalty = warningCount * 1;
    
    const score = Math.max(0, 100 - (errorPenalty + warningPenalty));
    return Math.round(score);
  }, []);

  // Validate with built-in rules
  const validateWithRules = useCallback((valueToValidate: string): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    suggestions: string[];
  } => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    
    allRules.forEach(rule => {
      try {
        const result = rule.validator(valueToValidate);
        if (result === false) {
          if (rule.severity === 'error') {
            errors.push(rule.message);
          } else if (rule.severity === 'warning') {
            warnings.push(rule.message);
          }
        } else if (typeof result === 'string' && result !== 'true') {
          if (rule.severity === 'error') {
            errors.push(result);
          } else if (rule.severity === 'warning') {
            warnings.push(result);
          } else {
            suggestions.push(result);
          }
        }
      } catch (error) {
        console.warn(`Validation rule ${rule.name} failed:`, error);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
    };
  }, [allRules]);

  // Main validation function
  const validate = useCallback(async (valueToValidate: string): Promise<OtpValidationResult> => {
    startValidationTimer();
    
    try {
      // Check cache first
      if (performanceOptions?.enableMemoization && validationCache.current.has(valueToValidate)) {
        const cached = validationCache.current.get(valueToValidate)!;
        endValidationTimer('validation-cache-hit');
        return cached;
      }
      
      let result: OtpValidationResult;
      
      // Use custom validation function if provided
      if (validateOtp) {
        try {
          const customResult = await validateOtp(valueToValidate);
          const isValid = typeof customResult === 'boolean' ? customResult : customResult === 'true';
          const message = typeof customResult === 'string' ? customResult : undefined;
          
          // Also run built-in rules for additional feedback
          const rulesResult = validateWithRules(valueToValidate);
          
          result = {
            isValid,
            message: isValid ? undefined : (message || rulesResult.errors[0]),
            errors: isValid ? [] : [message || rulesResult.errors[0]],
            warnings: rulesResult.warnings,
            suggestions: rulesResult.suggestions,
            score: calculateScore(
              isValid ? [] : [message || rulesResult.errors[0]],
              rulesResult.warnings
            ),
            timestamp: Date.now(),
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Validation error';
          result = {
            isValid: false,
            message: errorMessage,
            errors: [errorMessage],
            warnings: [],
            suggestions: [],
            score: 0,
            timestamp: Date.now(),
          };
        }
      } else {
        // Use only built-in rules
        const rulesResult = validateWithRules(valueToValidate);
        result = {
          isValid: rulesResult.errors.length === 0,
          message: rulesResult.errors[0] || undefined,
          errors: rulesResult.errors,
          warnings: rulesResult.warnings,
          suggestions: rulesResult.suggestions,
          score: calculateScore(rulesResult.errors, rulesResult.warnings),
          timestamp: Date.now(),
        };
      }
      
      // Cache result
      if (performanceOptions?.enableMemoization) {
        validationCache.current.set(valueToValidate, result);
        
        // Limit cache size
        if (validationCache.current.size > 100) {
          const firstKey = validationCache.current.keys().next().value;
          if (firstKey !== undefined) {
            validationCache.current.delete(firstKey);
          }
        }
      }
      
      // Add to validation history
      setValidationState(prev => ({
        ...prev,
        validationHistory: [
          ...prev.validationHistory.slice(-49), // Keep last 50 validations
          {
            value: valueToValidate,
            result,
            timestamp: Date.now(),
          },
        ],
      }));
      
      endValidationTimer('validation-complete');
      return result;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown validation error';
      endValidationTimer('validation-error');
      
      const errorResult: OtpValidationResult = {
        isValid: false,
        message: errorMessage,
        errors: [errorMessage],
        warnings: [],
        suggestions: [],
        score: 0,
        timestamp: Date.now(),
      };
      
      monitoring?.onError?.(errorMessage, Date.now());
      return errorResult;
    }
  }, [
    startValidationTimer,
    endValidationTimer,
    performanceOptions?.enableMemoization,
    validationCache,
    validateOtp,
    validateWithRules,
    calculateScore,
    monitoring,
  ]);

  // Debounced validation
  const debouncedValidate = useCallback((valueToValidate: string) => {
    if (!autoValidate) return;
    
    clearTimeout(debounceTimer.current as NodeJS.Timeout);
    debounceTimer.current = setTimeout(async () => {
      setValidationState(prev => ({ ...prev, isValidating: true }));
      
      try {
        const result = await validate(valueToValidate);
        
        setValidationState(prev => ({
          ...prev,
          isValid: result.isValid,
          isValidating: false,
          error: result.isValid ? null : result.message || null,
          warnings: result.warnings || [],
          suggestions: result.suggestions || [],
          score: result.score || 0,
          lastValidation: Date.now(),
        }));
        
        // Monitoring callbacks
        monitoring?.onValidation?.(result.isValid, valueToValidate, Date.now());
        
        if (result.isValid) {
          monitoring?.onSuccess?.(valueToValidate, Date.now());
        } else {
          monitoring?.onError?.(result.message || 'Validation failed', Date.now());
        }
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Validation error';
        setValidationState(prev => ({
          ...prev,
          isValid: false,
          isValidating: false,
          error: errorMessage,
          warnings: [],
          suggestions: [],
          score: 0,
          lastValidation: Date.now(),
        }));
        
        monitoring?.onError?.(errorMessage, Date.now());
      }
    }, validationDebounceMs);
  }, [autoValidate, validate, monitoring, validationDebounceMs]);

  // Retry validation
  const retryValidation = useCallback(async (): Promise<OtpValidationResult | null> => {
    if (!validationOptions?.enableRetryValidation) return null;
    
    const maxRetries = validationOptions.maxRetryAttempts || 3;
    if (retryCount.current >= maxRetries) {
      monitoring?.onError?.('Maximum retry attempts exceeded', Date.now());
      return null;
    }
    
    retryCount.current++;
    monitoring?.onRetry?.(retryCount.current, Date.now());
    
    return await validate(value);
  }, [validationOptions, monitoring, validate, value]);

  // Clear validation
  const clearValidation = useCallback(() => {
    setValidationState(prev => ({
      ...prev,
      isValid: false,
      isValidating: false,
      error: null,
      warnings: [],
      suggestions: [],
      score: 0,
      lastValidation: 0,
    }));
    
    retryCount.current = 0;
  }, []);

  // Reset validation
  const resetValidation = useCallback(() => {
    clearValidation();
    validationCache.current.clear();
    setValidationState(prev => ({
      ...prev,
      validationHistory: [],
    }));
  }, [clearValidation]);

  // Get validation statistics
  const getValidationStats = useCallback(() => {
    const history = validationState.validationHistory;
    const totalValidations = history.length;
    const successfulValidations = history.filter(h => h.result.isValid).length;
    const failedValidations = totalValidations - successfulValidations;
    const averageScore = history.length > 0 
      ? history.reduce((sum, h) => sum + (h.result.score || 0), 0) / history.length 
      : 0;
    
    return {
      totalValidations,
      successfulValidations,
      failedValidations,
      successRate: totalValidations > 0 ? (successfulValidations / totalValidations) * 100 : 0,
      averageScore: Math.round(averageScore),
      retryCount: retryCount.current,
      cacheSize: validationCache.current.size,
    };
  }, [validationState.validationHistory]);

  // Auto-validate when value changes
  useEffect(() => {
    if (value && autoValidate) {
      debouncedValidate(value);
    }
  }, [value, autoValidate, debouncedValidate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Public API
  const validationAPI = useMemo(() => ({
    validate,
    retryValidation,
    clearValidation,
    resetValidation,
    getValidationStats,
    validationState,
    isValidationInProgress: validationState.isValidating,
    hasValidationError: !!validationState.error,
    hasValidationWarnings: validationState.warnings.length > 0,
    hasValidationSuggestions: validationState.suggestions.length > 0,
    validationScore: validationState.score,
    lastValidationTime: validationState.lastValidation,
    validationHistory: validationState.validationHistory,
  }), [
    validate,
    retryValidation,
    clearValidation,
    resetValidation,
    getValidationStats,
    validationState,
  ]);

  return validationAPI;
};

export default useBcOtpInputValidation;