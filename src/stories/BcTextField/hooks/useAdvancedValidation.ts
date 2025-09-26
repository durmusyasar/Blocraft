import { useState, useCallback, useMemo, useEffect } from 'react';

export interface ValidationRule {
  id: string;
  name: string;
  test: (value: string) => boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
  category: 'format' | 'length' | 'pattern' | 'custom' | 'business';
  enabled: boolean;
  priority: number;
  dependencies?: string[];
  customValidator?: (value: string, context?: unknown) => Promise<boolean>;
}

export interface ValidationContext {
  fieldName?: string;
  formData?: Record<string, unknown>;
  userContext?: Record<string, unknown>;
  locale?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationRule[];
  warnings: ValidationRule[];
  info: ValidationRule[];
  score: number;
  suggestions: string[];
  context: ValidationContext;
  timestamp: number;
  executionTime: number;
}

export interface UseAdvancedValidationProps {
  enableAdvancedValidation?: boolean;
  enableAsyncValidation?: boolean;
  enableContextValidation?: boolean;
  enableBusinessRules?: boolean;
  enableCrossFieldValidation?: boolean;
  enableRealTimeValidation?: boolean;
  validationDebounceMs?: number;
  maxConcurrentValidations?: number;
  customRules?: ValidationRule[];
  validationContext?: ValidationContext;
  onValidationComplete?: (result: ValidationResult) => void;
  onValidationError?: (error: Error) => void;
}

export interface UseAdvancedValidationReturn {
  validationResult: ValidationResult;
  isValidating: boolean;
  validationQueue: string[];
  validate: (value: string, context?: ValidationContext) => Promise<ValidationResult>;
  validateSync: (value: string, context?: ValidationContext) => ValidationResult;
  addRule: (rule: ValidationRule) => void;
  removeRule: (ruleId: string) => void;
  updateRule: (ruleId: string, updates: Partial<ValidationRule>) => void;
  enableRule: (ruleId: string) => void;
  disableRule: (ruleId: string) => void;
  getRule: (ruleId: string) => ValidationRule | undefined;
  getAllRules: () => ValidationRule[];
  clearValidation: () => void;
  getValidationSummary: () => {
    totalRules: number;
    enabledRules: number;
    disabledRules: number;
    errorRules: number;
    warningRules: number;
    infoRules: number;
  };
}

/**
 * Advanced Validation hook'u
 * Gelişmiş doğrulama ve iş kuralları
 */
export const useAdvancedValidation = ({
  enableAdvancedValidation = true,
  enableAsyncValidation = true,
  enableContextValidation = true,
  enableBusinessRules = true,
  enableCrossFieldValidation = true,
  enableRealTimeValidation = true,
  validationDebounceMs = 500,
  maxConcurrentValidations = 5,
  customRules = [],
  validationContext = {},
  onValidationComplete,
  onValidationError,
}: UseAdvancedValidationProps): UseAdvancedValidationReturn => {
  
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    errors: [],
    warnings: [],
    info: [],
    score: 100,
    suggestions: [],
    context: validationContext,
    timestamp: Date.now(),
    executionTime: 0,
  });
  const [isValidating, setIsValidating] = useState(false);
  const [validationQueue, setValidationQueue] = useState<string[]>([]);
  const [rules, setRules] = useState<ValidationRule[]>([]);

  // Default validation rules
  const defaultRules: ValidationRule[] = useMemo(() => [
    {
      id: 'required',
      name: 'Required Field',
      test: (value: string) => value.trim().length > 0,
      message: 'This field is required',
      severity: 'error',
      category: 'format',
      enabled: true,
      priority: 1,
    },
    {
      id: 'minLength',
      name: 'Minimum Length',
      test: (value: string) => value.length >= 3,
      message: 'Must be at least 3 characters',
      severity: 'error',
      category: 'length',
      enabled: true,
      priority: 2,
    },
    {
      id: 'maxLength',
      name: 'Maximum Length',
      test: (value: string) => value.length <= 100,
      message: 'Must be no more than 100 characters',
      severity: 'error',
      category: 'length',
      enabled: true,
      priority: 2,
    },
    {
      id: 'email',
      name: 'Email Format',
      test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email address',
      severity: 'error',
      category: 'pattern',
      enabled: false,
      priority: 3,
    },
    {
      id: 'phone',
      name: 'Phone Format',
      test: (value: string) => /^[+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, '')),
      message: 'Please enter a valid phone number',
      severity: 'error',
      category: 'pattern',
      enabled: false,
      priority: 3,
    },
    {
      id: 'url',
      name: 'URL Format',
      test: (value: string) => /^https?:\/\/.+/.test(value),
      message: 'Please enter a valid URL',
      severity: 'error',
      category: 'pattern',
      enabled: false,
      priority: 3,
    },
    {
      id: 'strongPassword',
      name: 'Strong Password',
      test: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
      message: 'Password must contain uppercase, lowercase, number, and special character',
      severity: 'warning',
      category: 'pattern',
      enabled: false,
      priority: 4,
    },
    {
      id: 'noSpaces',
      name: 'No Spaces',
      test: (value: string) => !value.includes(' '),
      message: 'Spaces are not allowed',
      severity: 'warning',
      category: 'format',
      enabled: false,
      priority: 5,
    },
    {
      id: 'alphanumeric',
      name: 'Alphanumeric Only',
      test: (value: string) => /^[a-zA-Z0-9]+$/.test(value),
      message: 'Only letters and numbers are allowed',
      severity: 'warning',
      category: 'pattern',
      enabled: false,
      priority: 5,
    },
    {
      id: 'noSpecialChars',
      name: 'No Special Characters',
      test: (value: string) => /^[a-zA-Z0-9\s]+$/.test(value),
      message: 'Special characters are not allowed',
      severity: 'warning',
      category: 'pattern',
      enabled: false,
      priority: 5,
    },
  ], []);

  // Initialize rules
  useEffect(() => {
    setRules([...defaultRules, ...customRules]);
  }, [defaultRules, customRules]);

  // Calculate validation score
  const calculateScore = useCallback((errors: ValidationRule[], warnings: ValidationRule[]): number => {
    const totalRules = rules.filter(rule => rule.enabled).length;
    if (totalRules === 0) return 100;
    
    const errorWeight = 3;
    const warningWeight = 1;
    const totalWeight = totalRules * errorWeight;
    const penalty = (errors.length * errorWeight) + (warnings.length * warningWeight);
    
    return Math.max(0, Math.round(((totalWeight - penalty) / totalWeight) * 100));
  }, [rules]);

  // Generate suggestions
  const generateSuggestions = useCallback((value: string, errors: ValidationRule[]): string[] => {
    const suggestions: string[] = [];
    
    errors.forEach(error => {
      switch (error.id) {
        case 'minLength':
          suggestions.push('Try adding more characters to meet the minimum length requirement');
          break;
        case 'maxLength':
          suggestions.push('Try shortening the text to meet the maximum length requirement');
          break;
        case 'email':
          suggestions.push('Try adding @ and a domain (e.g., example@domain.com)');
          break;
        case 'phone':
          suggestions.push('Try using only numbers and optional + prefix');
          break;
        case 'url':
          suggestions.push('Try adding https:// or http:// prefix');
          break;
        case 'strongPassword':
          suggestions.push('Try adding uppercase letters, numbers, and special characters');
          break;
        case 'noSpaces':
          suggestions.push('Try removing spaces or using underscores instead');
          break;
        case 'alphanumeric':
          suggestions.push('Try using only letters and numbers');
          break;
        case 'noSpecialChars':
          suggestions.push('Try removing special characters');
          break;
        default:
          suggestions.push(`Fix: ${error.message}`);
      }
    });
    
    return suggestions;
  }, []);

  // Validate synchronously
  const validateSync = useCallback((value: string, context?: ValidationContext): ValidationResult => {
    if (!enableAdvancedValidation) {
      return {
        isValid: true,
        errors: [],
        warnings: [],
        info: [],
        score: 100,
        suggestions: [],
        context: context || validationContext,
        timestamp: Date.now(),
        executionTime: 0,
      };
    }
    
    const startTime = performance.now();
    const enabledRules = rules.filter(rule => rule.enabled);
    const errors: ValidationRule[] = [];
    const warnings: ValidationRule[] = [];
    const info: ValidationRule[] = [];
    
    // Sort rules by priority
    const sortedRules = enabledRules.sort((a, b) => a.priority - b.priority);
    
    sortedRules.forEach(rule => {
      try {
        const passed = rule.test(value);
        if (!passed) {
          switch (rule.severity) {
            case 'error':
              errors.push(rule);
              break;
            case 'warning':
              warnings.push(rule);
              break;
            case 'info':
              info.push(rule);
              break;
          }
        }
      } catch (error) {
        console.warn(`Validation rule ${rule.id} failed:`, error);
      }
    });
    
    const endTime = performance.now();
    const score = calculateScore(errors, warnings);
    const suggestions = generateSuggestions(value, errors);
    const isValid = errors.length === 0;
    
    const result: ValidationResult = {
      isValid,
      errors,
      warnings,
      info,
      score,
      suggestions,
      context: context || validationContext,
      timestamp: Date.now(),
      executionTime: endTime - startTime,
    };
    
    return result;
  }, [enableAdvancedValidation, rules, calculateScore, generateSuggestions, validationContext]);

  // Validate asynchronously
  const validate = useCallback(async (value: string, context?: ValidationContext): Promise<ValidationResult> => {
    if (!enableAsyncValidation) {
      return validateSync(value, context);
    }
    
    setIsValidating(true);
    
    try {
      // Add to validation queue
      setValidationQueue(prev => [...prev, value]);
      
      // Simulate async validation
      const result = await new Promise<ValidationResult>((resolve) => {
        setTimeout(() => {
          const syncResult = validateSync(value, context);
          resolve(syncResult);
        }, validationDebounceMs);
      });
      
      setValidationResult(result);
      onValidationComplete?.(result);
      
      // Remove from queue
      setValidationQueue(prev => prev.filter(item => item !== value));
      
      return result;
    } catch (error) {
      onValidationError?.(error as Error);
      throw error;
    } finally {
      setIsValidating(false);
    }
  }, [enableAsyncValidation, validateSync, validationDebounceMs, onValidationComplete, onValidationError]);

  // Add rule
  const addRule = useCallback((rule: ValidationRule) => {
    setRules(prev => [...prev, rule]);
  }, []);

  // Remove rule
  const removeRule = useCallback((ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
  }, []);

  // Update rule
  const updateRule = useCallback((ruleId: string, updates: Partial<ValidationRule>) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, ...updates } : rule
    ));
  }, []);

  // Enable rule
  const enableRule = useCallback((ruleId: string) => {
    updateRule(ruleId, { enabled: true });
  }, [updateRule]);

  // Disable rule
  const disableRule = useCallback((ruleId: string) => {
    updateRule(ruleId, { enabled: false });
  }, [updateRule]);

  // Get rule
  const getRule = useCallback((ruleId: string): ValidationRule | undefined => {
    return rules.find(rule => rule.id === ruleId);
  }, [rules]);

  // Get all rules
  const getAllRules = useCallback((): ValidationRule[] => {
    return [...rules];
  }, [rules]);

  // Clear validation
  const clearValidation = useCallback(() => {
    setValidationResult({
      isValid: true,
      errors: [],
      warnings: [],
      info: [],
      score: 100,
      suggestions: [],
      context: validationContext,
      timestamp: Date.now(),
      executionTime: 0,
    });
  }, [validationContext]);

  // Get validation summary
  const getValidationSummary = useCallback(() => {
    const totalRules = rules.length;
    const enabledRules = rules.filter(rule => rule.enabled).length;
    const disabledRules = totalRules - enabledRules;
    const errorRules = rules.filter(rule => rule.severity === 'error').length;
    const warningRules = rules.filter(rule => rule.severity === 'warning').length;
    const infoRules = rules.filter(rule => rule.severity === 'info').length;
    
    return {
      totalRules,
      enabledRules,
      disabledRules,
      errorRules,
      warningRules,
      infoRules,
    };
  }, [rules]);

  return {
    validationResult,
    isValidating,
    validationQueue,
    validate,
    validateSync,
    addRule,
    removeRule,
    updateRule,
    enableRule,
    disableRule,
    getRule,
    getAllRules,
    clearValidation,
    getValidationSummary,
  };
};
