import { useState, useCallback, useMemo, useEffect } from 'react';

export interface CrossFieldRule {
  id: string;
  name: string;
  description: string;
  fields: string[];
  condition: (values: Record<string, any>) => boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
  enabled: boolean;
  priority: number;
  dependencies?: string[];
  metadata?: {
    executionTime?: number;
    [key: string]: any;
  };
}

export interface CrossFieldContext {
  formData: Record<string, any>;
  fieldValues: Record<string, any>;
  fieldErrors: Record<string, string[]>;
  fieldWarnings: Record<string, string[]>;
  fieldInfo: Record<string, string[]>;
  locale: string;
}

export interface CrossFieldResult {
  isValid: boolean;
  appliedRules: CrossFieldRule[];
  fieldErrors: Record<string, string[]>;
  fieldWarnings: Record<string, string[]>;
  fieldInfo: Record<string, string[]>;
  globalErrors: string[];
  globalWarnings: string[];
  globalInfo: string[];
  executionTime: number;
  timestamp: number;
}

export interface UseCrossFieldValidationProps {
  enableCrossFieldValidation?: boolean;
  enableRealTimeValidation?: boolean;
  enableDependencyTracking?: boolean;
  validationDebounceMs?: number;
  customRules?: CrossFieldRule[];
  crossFieldContext?: CrossFieldContext;
  onRuleApplied?: (rule: CrossFieldRule, result: any) => void;
  onRuleFailed?: (rule: CrossFieldRule, error: Error) => void;
}

export interface UseCrossFieldValidationReturn {
  crossFieldRules: CrossFieldRule[];
  validationResult: CrossFieldResult;
  isValidating: boolean;
  validateCrossFields: (fieldName: string, value: any, context?: CrossFieldContext) => Promise<CrossFieldResult>;
  validateCrossFieldsSync: (fieldName: string, value: any, context?: CrossFieldContext) => CrossFieldResult;
  addRule: (rule: CrossFieldRule) => void;
  removeRule: (ruleId: string) => void;
  updateRule: (ruleId: string, updates: Partial<CrossFieldRule>) => void;
  enableRule: (ruleId: string) => void;
  disableRule: (ruleId: string) => void;
  getRule: (ruleId: string) => CrossFieldRule | undefined;
  getRulesForField: (fieldName: string) => CrossFieldRule[];
  clearValidation: () => void;
  getValidationSummary: () => {
    totalRules: number;
    enabledRules: number;
    disabledRules: number;
    rulesByField: Record<string, number>;
    averageExecutionTime: number;
  };
}

/**
 * Cross Field Validation hook'u
 * Çapraz alan doğrulama ve bağımlılık yönetimi
 */
export const useCrossFieldValidation = ({
  enableCrossFieldValidation = true,
  enableRealTimeValidation = true,
  enableDependencyTracking = true,
  validationDebounceMs = 500,
  customRules = [],
  crossFieldContext = {
    formData: {},
    fieldValues: {},
    fieldErrors: {},
    fieldWarnings: {},
    fieldInfo: {},
    locale: 'en',
  },
  onRuleApplied,
  onRuleFailed,
}: UseCrossFieldValidationProps): UseCrossFieldValidationReturn => {
  
  const [crossFieldRules, setCrossFieldRules] = useState<CrossFieldRule[]>([]);
  const [validationResult, setValidationResult] = useState<CrossFieldResult>({
    isValid: true,
    appliedRules: [],
    fieldErrors: {},
    fieldWarnings: {},
    fieldInfo: {},
    globalErrors: [],
    globalWarnings: [],
    globalInfo: [],
    executionTime: 0,
    timestamp: Date.now(),
  });
  const [isValidating, setIsValidating] = useState(false);

  // Default cross field rules
  const defaultRules: CrossFieldRule[] = useMemo(() => [
    {
      id: 'password-confirmation',
      name: 'Password Confirmation',
      description: 'Password and confirmation must match',
      fields: ['password', 'confirmPassword'],
      condition: (values) => values.password === values.confirmPassword,
      message: 'Passwords do not match',
      severity: 'error',
      enabled: true,
      priority: 1,
    },
    {
      id: 'email-confirmation',
      name: 'Email Confirmation',
      description: 'Email and confirmation must match',
      fields: ['email', 'confirmEmail'],
      condition: (values) => values.email === values.confirmEmail,
      message: 'Email addresses do not match',
      severity: 'error',
      enabled: true,
      priority: 1,
    },
    {
      id: 'date-range',
      name: 'Date Range Validation',
      description: 'Start date must be before end date',
      fields: ['startDate', 'endDate'],
      condition: (values) => {
        if (!values.startDate || !values.endDate) return true;
        return new Date(values.startDate) < new Date(values.endDate);
      },
      message: 'Start date must be before end date',
      severity: 'error',
      enabled: true,
      priority: 2,
    },
    {
      id: 'age-verification',
      name: 'Age Verification',
      description: 'User must be at least 18 years old',
      fields: ['birthDate'],
      condition: (values) => {
        if (!values.birthDate) return true;
        const birthDate = new Date(values.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18;
      },
      message: 'You must be at least 18 years old',
      severity: 'error',
      enabled: true,
      priority: 3,
    },
    {
      id: 'phone-email-consistency',
      name: 'Phone Email Consistency',
      description: 'Phone and email should be consistent',
      fields: ['phone', 'email'],
      condition: (values) => {
        if (!values.phone || !values.email) return true;
        // Simple consistency check - both should be provided
        return values.phone.length > 0 && values.email.length > 0;
      },
      message: 'Please provide both phone and email',
      severity: 'warning',
      enabled: true,
      priority: 4,
    },
    {
      id: 'username-availability',
      name: 'Username Availability',
      description: 'Username should be available',
      fields: ['username'],
      condition: (values) => {
        if (!values.username) return true;
        // Mock availability check
        const unavailableUsernames = ['admin', 'user', 'test', 'demo'];
        return !unavailableUsernames.includes(values.username.toLowerCase());
      },
      message: 'Username is not available',
      severity: 'error',
      enabled: true,
      priority: 5,
    },
    {
      id: 'password-strength-context',
      name: 'Password Strength Context',
      description: 'Password strength based on user context',
      fields: ['password', 'username', 'email'],
      condition: (values) => {
        if (!values.password) return true;
        const password = values.password;
        const username = values.username || '';
        const email = values.email || '';
        
        // Password should not contain username or email
        return !password.toLowerCase().includes(username.toLowerCase()) &&
               !password.toLowerCase().includes(email.split('@')[0].toLowerCase());
      },
      message: 'Password should not contain username or email',
      severity: 'warning',
      enabled: true,
      priority: 6,
    },
    {
      id: 'address-completeness',
      name: 'Address Completeness',
      description: 'Address fields should be complete',
      fields: ['street', 'city', 'state', 'zipCode'],
      condition: (values) => {
        const addressFields = ['street', 'city', 'state', 'zipCode'];
        const filledFields = addressFields.filter(field => values[field] && values[field].trim().length > 0);
        return filledFields.length === 0 || filledFields.length === addressFields.length;
      },
      message: 'Please provide complete address information',
      severity: 'info',
      enabled: true,
      priority: 7,
    },
  ], []);

  // Initialize rules
  useEffect(() => {
    setCrossFieldRules([...defaultRules, ...customRules]);
  }, [defaultRules, customRules]);

  // Validate cross fields synchronously
  const validateCrossFieldsSync = useCallback((fieldName: string, value: any, context?: CrossFieldContext): CrossFieldResult => {
    if (!enableCrossFieldValidation) {
      return {
        isValid: true,
        appliedRules: [],
        fieldErrors: {},
        fieldWarnings: {},
        fieldInfo: {},
        globalErrors: [],
        globalWarnings: [],
        globalInfo: [],
        executionTime: 0,
        timestamp: Date.now(),
      };
    }
    
    const startTime = performance.now();
    const validationContext = context || crossFieldContext;
    const enabledRules = crossFieldRules.filter(rule => rule.enabled);
    const appliedRules: CrossFieldRule[] = [];
    const fieldErrors: Record<string, string[]> = {};
    const fieldWarnings: Record<string, string[]> = {};
    const fieldInfo: Record<string, string[]> = {};
    const globalErrors: string[] = [];
    const globalWarnings: string[] = [];
    const globalInfo: string[] = [];
    
    // Update field values with current value
    const updatedFieldValues = {
      ...validationContext.fieldValues,
      [fieldName]: value,
    };
    
    // Sort rules by priority
    const sortedRules = enabledRules.sort((a, b) => a.priority - b.priority);
    
    sortedRules.forEach(rule => {
      try {
        // Check if rule applies to current field
        if (!rule.fields.includes(fieldName)) return;
        
        // Check if all required fields have values
        const hasAllFields = rule.fields.every(field => 
          updatedFieldValues[field] !== undefined && updatedFieldValues[field] !== ''
        );
        
        if (!hasAllFields) return;
        
        // Evaluate rule condition
        const conditionMet = rule.condition(updatedFieldValues);
        
        if (!conditionMet) {
          appliedRules.push(rule);
          
          // Apply rule based on severity
          switch (rule.severity) {
            case 'error':
              rule.fields.forEach(field => {
                if (!fieldErrors[field]) fieldErrors[field] = [];
                fieldErrors[field].push(rule.message);
              });
              globalErrors.push(rule.message);
              break;
            case 'warning':
              rule.fields.forEach(field => {
                if (!fieldWarnings[field]) fieldWarnings[field] = [];
                fieldWarnings[field].push(rule.message);
              });
              globalWarnings.push(rule.message);
              break;
            case 'info':
              rule.fields.forEach(field => {
                if (!fieldInfo[field]) fieldInfo[field] = [];
                fieldInfo[field].push(rule.message);
              });
              globalInfo.push(rule.message);
              break;
          }
          
          onRuleApplied?.(rule, { fieldName, value, conditionMet });
        }
      } catch (error) {
        onRuleFailed?.(rule, error as Error);
        globalErrors.push(`Cross field rule ${rule.name} failed: ${(error as Error).message}`);
      }
    });
    
    const endTime = performance.now();
    const isValid = globalErrors.length === 0;
    
    const result: CrossFieldResult = {
      isValid,
      appliedRules,
      fieldErrors,
      fieldWarnings,
      fieldInfo,
      globalErrors,
      globalWarnings,
      globalInfo,
      executionTime: endTime - startTime,
      timestamp: Date.now(),
    };
    
    return result;
  }, [enableCrossFieldValidation, crossFieldRules, crossFieldContext, onRuleApplied, onRuleFailed]);

  // Validate cross fields asynchronously
  const validateCrossFields = useCallback(async (fieldName: string, value: any, context?: CrossFieldContext): Promise<CrossFieldResult> => {
    if (!enableRealTimeValidation) {
      return validateCrossFieldsSync(fieldName, value, context);
    }
    
    setIsValidating(true);
    
    try {
      // Simulate async validation
      const result = await new Promise<CrossFieldResult>((resolve) => {
        setTimeout(() => {
          const syncResult = validateCrossFieldsSync(fieldName, value, context);
          resolve(syncResult);
        }, validationDebounceMs);
      });
      
      setValidationResult(result);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsValidating(false);
    }
  }, [enableRealTimeValidation, validateCrossFieldsSync, validationDebounceMs]);

  // Add rule
  const addRule = useCallback((rule: CrossFieldRule) => {
    setCrossFieldRules(prev => [...prev, rule]);
  }, []);

  // Remove rule
  const removeRule = useCallback((ruleId: string) => {
    setCrossFieldRules(prev => prev.filter(rule => rule.id !== ruleId));
  }, []);

  // Update rule
  const updateRule = useCallback((ruleId: string, updates: Partial<CrossFieldRule>) => {
    setCrossFieldRules(prev => prev.map(rule => 
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
  const getRule = useCallback((ruleId: string): CrossFieldRule | undefined => {
    return crossFieldRules.find(rule => rule.id === ruleId);
  }, [crossFieldRules]);

  // Get rules for field
  const getRulesForField = useCallback((fieldName: string): CrossFieldRule[] => {
    return crossFieldRules.filter(rule => rule.fields.includes(fieldName));
  }, [crossFieldRules]);

  // Clear validation
  const clearValidation = useCallback(() => {
    setValidationResult({
      isValid: true,
      appliedRules: [],
      fieldErrors: {},
      fieldWarnings: {},
      fieldInfo: {},
      globalErrors: [],
      globalWarnings: [],
      globalInfo: [],
      executionTime: 0,
      timestamp: Date.now(),
    });
  }, []);

  // Get validation summary
  const getValidationSummary = useCallback(() => {
    const totalRules = crossFieldRules.length;
    const enabledRules = crossFieldRules.filter(rule => rule.enabled).length;
    const disabledRules = totalRules - enabledRules;
    
    const rulesByField = crossFieldRules.reduce((acc, rule) => {
      rule.fields.forEach(field => {
        acc[field] = (acc[field] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    
    const averageExecutionTime = crossFieldRules.length > 0 
      ? crossFieldRules.reduce((sum, rule) => sum + (rule.metadata?.executionTime || 0), 0) / crossFieldRules.length
      : 0;
    
    return {
      totalRules,
      enabledRules,
      disabledRules,
      rulesByField,
      averageExecutionTime,
    };
  }, [crossFieldRules]);

  return {
    crossFieldRules,
    validationResult,
    isValidating,
    validateCrossFields,
    validateCrossFieldsSync,
    addRule,
    removeRule,
    updateRule,
    enableRule,
    disableRule,
    getRule,
    getRulesForField,
    clearValidation,
    getValidationSummary,
  };
};
