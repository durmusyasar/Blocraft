import { useState, useCallback, useMemo, useEffect } from 'react';

export interface ValidationRule {
  id: string;
  name: string;
  test: (value: string) => boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
  category: 'format' | 'length' | 'pattern' | 'custom';
  enabled: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationRule[];
  warnings: ValidationRule[];
  info: ValidationRule[];
  score: number; // 0-100
  suggestions: string[];
}

export interface UseSmartValidationProps {
  enableSmartValidation?: boolean;
  enableRealTimeValidation?: boolean;
  enableSuggestions?: boolean;
  enableLearning?: boolean;
  validationDebounceMs?: number;
  customRules?: ValidationRule[];
  onValidationChange?: (result: ValidationResult) => void;
  onSuggestionAccept?: (suggestion: string) => void;
}

export interface UseSmartValidationReturn {
  validationResult: ValidationResult;
  isValidating: boolean;
  validate: (value: string) => Promise<ValidationResult>;
  validateSync: (value: string) => ValidationResult;
  addCustomRule: (rule: ValidationRule) => void;
  removeCustomRule: (ruleId: string) => void;
  updateRule: (ruleId: string, updates: Partial<ValidationRule>) => void;
  getSuggestions: (value: string) => string[];
  acceptSuggestion: (suggestion: string) => void;
  clearValidation: () => void;
}

/**
 * Smart Validation hook'u
 * Akıllı doğrulama ve öneriler
 */
export const useSmartValidation = ({
  enableSmartValidation = true,
  enableRealTimeValidation = true,
  enableSuggestions = true,
  enableLearning = true,
  validationDebounceMs = 500,
  customRules = [],
  onValidationChange,
  onSuggestionAccept,
}: UseSmartValidationProps): UseSmartValidationReturn => {
  
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    errors: [],
    warnings: [],
    info: [],
    score: 100,
    suggestions: [],
  });
  const [isValidating, setIsValidating] = useState(false);
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
    },
    {
      id: 'minLength',
      name: 'Minimum Length',
      test: (value: string) => value.length >= 3,
      message: 'Must be at least 3 characters',
      severity: 'error',
      category: 'length',
      enabled: true,
    },
    {
      id: 'maxLength',
      name: 'Maximum Length',
      test: (value: string) => value.length <= 100,
      message: 'Must be no more than 100 characters',
      severity: 'error',
      category: 'length',
      enabled: true,
    },
    {
      id: 'noSpaces',
      name: 'No Spaces',
      test: (value: string) => !value.includes(' '),
      message: 'Spaces are not allowed',
      severity: 'warning',
      category: 'format',
      enabled: false,
    },
    {
      id: 'email',
      name: 'Email Format',
      test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email address',
      severity: 'error',
      category: 'pattern',
      enabled: false,
    },
    {
      id: 'phone',
      name: 'Phone Format',
      test: (value: string) => /^[\\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, '')),
      message: 'Please enter a valid phone number',
      severity: 'error',
      category: 'pattern',
      enabled: false,
    },
    {
      id: 'url',
      name: 'URL Format',
      test: (value: string) => /^https?:\/\/.+/.test(value),
      message: 'Please enter a valid URL',
      severity: 'error',
      category: 'pattern',
      enabled: false,
    },
    {
      id: 'strongPassword',
      name: 'Strong Password',
      test: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
      message: 'Password must contain uppercase, lowercase, number, and special character',
      severity: 'warning',
      category: 'pattern',
      enabled: false,
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
    if (!enableSuggestions) return [];
    
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
        default:
          suggestions.push(`Fix: ${error.message}`);
      }
    });
    
    return suggestions;
  }, [enableSuggestions]);

  // Validate synchronously
  const validateSync = useCallback((value: string): ValidationResult => {
    if (!enableSmartValidation) {
      return {
        isValid: true,
        errors: [],
        warnings: [],
        info: [],
        score: 100,
        suggestions: [],
      };
    }
    
    const enabledRules = rules.filter(rule => rule.enabled);
    const errors: ValidationRule[] = [];
    const warnings: ValidationRule[] = [];
    const info: ValidationRule[] = [];
    
    enabledRules.forEach(rule => {
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
    });
    
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
    };
    
    return result;
  }, [enableSmartValidation, rules, calculateScore, generateSuggestions]);

  // Validate asynchronously
  const validate = useCallback(async (value: string): Promise<ValidationResult> => {
    if (!enableRealTimeValidation) {
      return validateSync(value);
    }
    
    setIsValidating(true);
    
    // Simulate async validation
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = validateSync(value);
        setValidationResult(result);
        onValidationChange?.(result);
        setIsValidating(false);
        resolve(result);
      }, validationDebounceMs);
    });
  }, [enableRealTimeValidation, validateSync, validationDebounceMs, onValidationChange]);

  // Add custom rule
  const addCustomRule = useCallback((rule: ValidationRule) => {
    setRules(prev => [...prev, rule]);
  }, []);

  // Remove custom rule
  const removeCustomRule = useCallback((ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
  }, []);

  // Update rule
  const updateRule = useCallback((ruleId: string, updates: Partial<ValidationRule>) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, ...updates } : rule
    ));
  }, []);

  // Get suggestions
  const getSuggestions = useCallback((value: string): string[] => {
    const result = validateSync(value);
    return result.suggestions;
  }, [validateSync]);

  // Accept suggestion
  const acceptSuggestion = useCallback((suggestion: string) => {
    onSuggestionAccept?.(suggestion);
  }, [onSuggestionAccept]);

  // Clear validation
  const clearValidation = useCallback(() => {
    setValidationResult({
      isValid: true,
      errors: [],
      warnings: [],
      info: [],
      score: 100,
      suggestions: [],
    });
  }, []);

  return {
    validationResult,
    isValidating,
    validate,
    validateSync,
    addCustomRule,
    removeCustomRule,
    updateRule,
    getSuggestions,
    acceptSuggestion,
    clearValidation,
  };
};
