import { useState, useCallback, useMemo, useEffect } from 'react';

export interface BusinessRule {
  id: string;
  name: string;
  description: string;
  category: 'pricing' | 'inventory' | 'user' | 'product' | 'order' | 'custom';
  priority: number;
  enabled: boolean;
  conditions: BusinessRuleCondition[];
  actions: BusinessRuleAction[];
  metadata?: Record<string, unknown>;
}

export interface BusinessRuleCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'in' | 'not_in' | 'regex' | 'custom';
  value: unknown;
  customFunction?: (value: unknown, context: unknown) => boolean;
}

export interface BusinessRuleAction {
  type: 'validation' | 'transformation' | 'notification' | 'calculation' | 'custom';
  field?: string;
  value?: unknown;
  message?: string;
  customFunction?: (value: unknown, context: unknown) => unknown;
}

export interface BusinessRuleContext {
  formData: Record<string, unknown>;
  userContext: Record<string, unknown>;
  systemContext: Record<string, unknown>;
  locale: string;
}

export interface BusinessRuleResult {
  isValid: boolean;
  appliedRules: BusinessRule[];
  transformations: Record<string, unknown>;
  notifications: string[];
  calculations: Record<string, unknown>;
  errors: string[];
  warnings: string[];
  info: string[];
  executionTime: number;
  timestamp: number;
}

export interface UseBusinessRulesProps {
  enableBusinessRules?: boolean;
  enableRealTimeEvaluation?: boolean;
  enableRuleLearning?: boolean;
  enableRuleOptimization?: boolean;
  evaluationDebounceMs?: number;
  customRules?: BusinessRule[];
  businessContext?: BusinessRuleContext;
  onRuleApplied?: (rule: BusinessRule, result: unknown) => void;
  onRuleFailed?: (rule: BusinessRule, error: Error) => void;
}

export interface UseBusinessRulesReturn {
  businessRules: BusinessRule[];
  evaluationResult: BusinessRuleResult;
  isEvaluating: boolean;
  evaluateRules: (value: string, context?: BusinessRuleContext) => Promise<BusinessRuleResult>;
  evaluateRulesSync: (value: string, context?: BusinessRuleContext) => BusinessRuleResult;
  addRule: (rule: BusinessRule) => void;
  removeRule: (ruleId: string) => void;
  updateRule: (ruleId: string, updates: Partial<BusinessRule>) => void;
  enableRule: (ruleId: string) => void;
  disableRule: (ruleId: string) => void;
  getRule: (ruleId: string) => BusinessRule | undefined;
  getRulesByCategory: (category: BusinessRule['category']) => BusinessRule[];
  clearEvaluation: () => void;
  getRuleStatistics: () => {
    totalRules: number;
    enabledRules: number;
    disabledRules: number;
    rulesByCategory: Record<string, number>;
    averageExecutionTime: number;
  };
}

/**
 * Business Rules hook'u
 * İş kuralları ve dinamik doğrulama
 */
export const useBusinessRules = ({
  enableBusinessRules = true,
  enableRealTimeEvaluation = true,
  enableRuleLearning = true,
  enableRuleOptimization = true,
  evaluationDebounceMs = 300,
  customRules = [],
  businessContext = {
    formData: {},
    userContext: {},
    systemContext: {},
    locale: 'en',
  },
  onRuleApplied,
  onRuleFailed,
}: UseBusinessRulesProps): UseBusinessRulesReturn => {
  
  const [businessRules, setBusinessRules] = useState<BusinessRule[]>([]);
  const [evaluationResult, setEvaluationResult] = useState<BusinessRuleResult>({
    isValid: true,
    appliedRules: [],
    transformations: {},
    notifications: [],
    calculations: {},
    errors: [],
    warnings: [],
    info: [],
    executionTime: 0,
    timestamp: Date.now(),
  });
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Default business rules
  const defaultRules: BusinessRule[] = useMemo(() => [
    {
      id: 'email-domain-validation',
      name: 'Email Domain Validation',
      description: 'Validate email domain against allowed list',
      category: 'user',
      priority: 1,
      enabled: true,
      conditions: [
        {
          field: 'email',
          operator: 'regex',
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
      ],
      actions: [
        {
          type: 'validation',
          message: 'Email domain is not allowed',
        },
      ],
    },
    {
      id: 'password-strength',
      name: 'Password Strength Validation',
      description: 'Enforce strong password requirements',
      category: 'user',
      priority: 2,
      enabled: true,
      conditions: [
        {
          field: 'password',
          operator: 'custom',
          value: null,
          customFunction: (value: unknown) => String(value).length >= 8,
        },
      ],
      actions: [
        {
          type: 'validation',
          message: 'Password must be at least 8 characters long',
        },
      ],
    },
    {
      id: 'phone-format',
      name: 'Phone Format Validation',
      description: 'Validate phone number format',
      category: 'user',
      priority: 3,
      enabled: true,
      conditions: [
        {
          field: 'phone',
          operator: 'regex',
          value: /^[\\+]?[1-9][\d]{0,15}$/,
        },
      ],
      actions: [
        {
          type: 'validation',
          message: 'Please enter a valid phone number',
        },
      ],
    },
    {
      id: 'name-capitalization',
      name: 'Name Capitalization',
      description: 'Auto-capitalize names',
      category: 'user',
      priority: 4,
      enabled: true,
      conditions: [
        {
          field: 'name',
          operator: 'not_equals',
          value: '',
        },
      ],
      actions: [
        {
          type: 'transformation',
          field: 'name',
          customFunction: (value: unknown) => String(value).replace(/\b\w/g, (char) => char.toUpperCase()),
        },
      ],
    },
    {
      id: 'price-calculation',
      name: 'Price Calculation',
      description: 'Calculate price based on quantity and discount',
      category: 'pricing',
      priority: 5,
      enabled: true,
      conditions: [
        {
          field: 'quantity',
          operator: 'greater_than',
          value: 0,
        },
      ],
      actions: [
        {
          type: 'calculation',
          field: 'totalPrice',
          customFunction: (value: unknown, context: unknown) => {
            const formData = (context as BusinessRuleContext).formData;
            const quantity = Number(formData.quantity) || 0;
            const unitPrice = Number(formData.unitPrice) || 0;
            const discount = Number(formData.discount) || 0;
            return (quantity * unitPrice) * (1 - discount / 100);
          },
        },
      ],
    },
  ], []);

  // Initialize rules
  useEffect(() => {
    setBusinessRules([...defaultRules, ...customRules]);
  }, [defaultRules, customRules]);

  // Evaluate condition
  const evaluateCondition = useCallback((condition: BusinessRuleCondition, value: unknown, context: BusinessRuleContext): boolean => {
    try {
      switch (condition.operator) {
        case 'equals':
          return value === condition.value;
        case 'not_equals':
          return value !== condition.value;
        case 'contains':
          return String(value).includes(String(condition.value));
        case 'not_contains':
          return !String(value).includes(String(condition.value));
        case 'greater_than':
          return Number(value) > Number(condition.value);
        case 'less_than':
          return Number(value) < Number(condition.value);
        case 'in':
          return Array.isArray(condition.value) && condition.value.includes(value);
        case 'not_in':
          return Array.isArray(condition.value) && !condition.value.includes(value);
        case 'regex':
          return condition.value instanceof RegExp && condition.value.test(String(value));
        case 'custom':
          return condition.customFunction ? condition.customFunction(value, context) : false;
        default:
          return false;
      }
    } catch (error) {
      console.warn(`Business rule condition evaluation failed:`, error);
      return false;
    }
  }, []);

  // Execute action
  const executeAction = useCallback((action: BusinessRuleAction, value: unknown, context: BusinessRuleContext): unknown => {
    try {
      switch (action.type) {
        case 'validation':
          return { isValid: true, message: action.message };
        case 'transformation':
          if (action.customFunction) {
            return action.customFunction(value, context);
          }
          return action.value;
        case 'notification':
          return action.message;
        case 'calculation':
          if (action.customFunction) {
            return action.customFunction(value, context);
          }
          return action.value;
        case 'custom':
          if (action.customFunction) {
            return action.customFunction(value, context);
          }
          return value;
        default:
          return value;
      }
    } catch (error) {
      console.warn(`Business rule action execution failed:`, error);
      return value;
    }
  }, []);

  // Evaluate rules synchronously
  const evaluateRulesSync = useCallback((value: string, context?: BusinessRuleContext): BusinessRuleResult => {
    if (!enableBusinessRules) {
      return {
        isValid: true,
        appliedRules: [],
        transformations: {},
        notifications: [],
        calculations: {},
        errors: [],
        warnings: [],
        info: [],
        executionTime: 0,
        timestamp: Date.now(),
      };
    }
    
    const startTime = performance.now();
    const evaluationContext = context || businessContext;
    const enabledRules = businessRules.filter(rule => rule.enabled);
    const appliedRules: BusinessRule[] = [];
    const transformations: Record<string, unknown> = {};
    const notifications: string[] = [];
    const calculations: Record<string, unknown> = {};
    const errors: string[] = [];
    const warnings: string[] = [];
    const info: string[] = [];
    
    // Sort rules by priority
    const sortedRules = enabledRules.sort((a, b) => a.priority - b.priority);
    
    sortedRules.forEach(rule => {
      try {
        // Check if all conditions are met
        const conditionsMet = rule.conditions.every(condition => 
          evaluateCondition(condition, value, evaluationContext)
        );
        
        if (conditionsMet) {
          appliedRules.push(rule);
          
          // Execute actions
          rule.actions.forEach(action => {
            const result = executeAction(action, value, evaluationContext);
            
            switch (action.type) {
              case 'validation':
                if ((result as Record<string, unknown>).message) {
                  errors.push(String((result as Record<string, unknown>).message));
                }
                break;
              case 'transformation':
                if (action.field) {
                  transformations[action.field] = result;
                }
                break;
              case 'notification':
                if (result) {
                  notifications.push(String(result));
                }
                break;
              case 'calculation':
                if (action.field) {
                  calculations[action.field] = result;
                }
                break;
            }
            
            onRuleApplied?.(rule, result);
          });
        }
      } catch (error) {
        onRuleFailed?.(rule, error as Error);
        errors.push(`Rule ${rule.name} failed: ${(error as Error).message}`);
      }
    });
    
    const endTime = performance.now();
    const isValid = errors.length === 0;
    
    const result: BusinessRuleResult = {
      isValid,
      appliedRules,
      transformations,
      notifications,
      calculations,
      errors,
      warnings,
      info,
      executionTime: endTime - startTime,
      timestamp: Date.now(),
    };
    
    return result;
  }, [enableBusinessRules, businessRules, businessContext, evaluateCondition, executeAction, onRuleApplied, onRuleFailed]);

  // Evaluate rules asynchronously
  const evaluateRules = useCallback(async (value: string, context?: BusinessRuleContext): Promise<BusinessRuleResult> => {
    if (!enableRealTimeEvaluation) {
      return evaluateRulesSync(value, context);
    }
    
    setIsEvaluating(true);
    
    try {
      // Simulate async evaluation
      const result = await new Promise<BusinessRuleResult>((resolve) => {
        setTimeout(() => {
          const syncResult = evaluateRulesSync(value, context);
          resolve(syncResult);
        }, evaluationDebounceMs);
      });
      
      setEvaluationResult(result);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsEvaluating(false);
    }
  }, [enableRealTimeEvaluation, evaluateRulesSync, evaluationDebounceMs]);

  // Add rule
  const addRule = useCallback((rule: BusinessRule) => {
    setBusinessRules(prev => [...prev, rule]);
  }, []);

  // Remove rule
  const removeRule = useCallback((ruleId: string) => {
    setBusinessRules(prev => prev.filter(rule => rule.id !== ruleId));
  }, []);

  // Update rule
  const updateRule = useCallback((ruleId: string, updates: Partial<BusinessRule>) => {
    setBusinessRules(prev => prev.map(rule => 
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
  const getRule = useCallback((ruleId: string): BusinessRule | undefined => {
    return businessRules.find(rule => rule.id === ruleId);
  }, [businessRules]);

  // Get rules by category
  const getRulesByCategory = useCallback((category: BusinessRule['category']): BusinessRule[] => {
    return businessRules.filter(rule => rule.category === category);
  }, [businessRules]);

  // Clear evaluation
  const clearEvaluation = useCallback(() => {
    setEvaluationResult({
      isValid: true,
      appliedRules: [],
      transformations: {},
      notifications: [],
      calculations: {},
      errors: [],
      warnings: [],
      info: [],
      executionTime: 0,
      timestamp: Date.now(),
    });
  }, []);

  // Get rule statistics
  const getRuleStatistics = useCallback(() => {
    const totalRules = businessRules.length;
    const enabledRules = businessRules.filter(rule => rule.enabled).length;
    const disabledRules = totalRules - enabledRules;
    
    const rulesByCategory = businessRules.reduce((acc, rule) => {
      acc[rule.category] = (acc[rule.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const averageExecutionTime = businessRules.length > 0 
      ? businessRules.reduce((sum, rule) => sum + (Number(rule.metadata?.executionTime) || 0), 0) / businessRules.length
      : 0;
    
    return {
      totalRules,
      enabledRules,
      disabledRules,
      rulesByCategory,
      averageExecutionTime,
    };
  }, [businessRules]);

  return {
    businessRules,
    evaluationResult,
    isEvaluating,
    evaluateRules,
    evaluateRulesSync,
    addRule,
    removeRule,
    updateRule,
    enableRule,
    disableRule,
    getRule,
    getRulesByCategory,
    clearEvaluation,
    getRuleStatistics,
  };
};
