import { useState, useCallback, useMemo } from 'react';
import { PasswordValidationRule, PasswordValidationResult, PasswordStrengthResult } from '../types';

/**
 * Default password validation rules
 */
const defaultValidationRules: PasswordValidationRule[] = [
  {
    id: 'minLength',
    name: 'Minimum Length',
    test: (password: string) => password.length >= 8,
    message: 'En az 8 karakter olmalı',
    weight: 10,
    enabled: true,
  },
  {
    id: 'uppercase',
    name: 'Uppercase Letter',
    test: (password: string) => /[A-Z]/.test(password),
    message: 'En az bir büyük harf içermeli',
    weight: 10,
    enabled: true,
  },
  {
    id: 'lowercase',
    name: 'Lowercase Letter',
    test: (password: string) => /[a-z]/.test(password),
    message: 'En az bir küçük harf içermeli',
    weight: 10,
    enabled: true,
  },
  {
    id: 'numbers',
    name: 'Numbers',
    test: (password: string) => /[0-9]/.test(password),
    message: 'En az bir rakam içermeli',
    weight: 10,
    enabled: true,
  },
  {
    id: 'specialChars',
    name: 'Special Characters',
    test: (password: string) => /[^a-zA-Z0-9]/.test(password),
    message: 'En az bir özel karakter içermeli',
    weight: 15,
    enabled: true,
  },
  {
    id: 'noCommonPasswords',
    name: 'No Common Passwords',
    test: (password: string) => {
      const commonPasswords = ['password', '123456', 'admin', 'qwerty', 'letmein'];
      return !commonPasswords.includes(password.toLowerCase());
    },
    message: 'Yaygın şifrelerden kaçının',
    weight: 20,
    enabled: true,
  },
  {
    id: 'noRepeatedChars',
    name: 'No Repeated Characters',
    test: (password: string) => !/(.)\1{2,}/.test(password),
    message: 'Tekrarlanan karakterlerden kaçının',
    weight: 10,
    enabled: true,
  },
  {
    id: 'noSequentialChars',
    name: 'No Sequential Characters',
    test: (password: string) => {
      const sequentialPatterns = [
        /123|234|345|456|567|678|789|890|012/,
        /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i,
      ];
      return !sequentialPatterns.some(pattern => pattern.test(password));
    },
    message: 'Ardışık karakterlerden kaçının',
    weight: 10,
    enabled: true,
  },
];

/**
 * Hook for password validation functionality
 */
export const usePasswordValidation = (customRules: PasswordValidationRule[] = []) => {
  const [validationResult, setValidationResult] = useState<PasswordValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  // Combine default and custom rules
  const validationRules = useMemo(() => {
    const allRules = [...defaultValidationRules, ...customRules];
    return allRules.filter(rule => rule.enabled);
  }, [customRules]);

  /**
   * Calculate password strength
   */
  const calculatePasswordStrength = useCallback((password: string): PasswordStrengthResult => {
    let score = 0;
    const length = password.length;

    // Length scoring
    if (length >= 8) score += 20;
    if (length >= 12) score += 10;
    if (length >= 16) score += 10;

    // Character variety scoring
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^a-zA-Z0-9]/.test(password)) score += 15;

    // Complexity scoring
    const uniqueChars = new Set(password).size;
    if (uniqueChars >= 8) score += 10;
    if (uniqueChars >= 12) score += 5;

    // Pattern penalties
    if (/(.)\1{2,}/.test(password)) score -= 15; // Repeated characters
    if (/123|234|345|456|567|678|789|890|012/.test(password)) score -= 20; // Sequential numbers
    if (/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) {
      score -= 20; // Sequential letters
    }

    // Determine strength level
    let strength: 'very-weak' | 'weak' | 'fair' | 'good' | 'strong';
    if (score >= 80) strength = 'strong';
    else if (score >= 60) strength = 'good';
    else if (score >= 40) strength = 'fair';
    else if (score >= 20) strength = 'weak';
    else strength = 'very-weak';

    // Check requirements
    const requirements = {
      minLength: length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /[0-9]/.test(password),
      specialChars: /[^a-zA-Z0-9]/.test(password),
      noCommonPasswords: !['password', '123456', 'admin', 'qwerty', 'letmein'].includes(password.toLowerCase()),
      noPersonalInfo: true, // This would need to be implemented based on context
    };

    return {
      strength,
      score: Math.max(0, Math.min(100, score)),
      feedback: [],
      suggestions: [],
      isValid: Object.values(requirements).every(Boolean),
      requirements,
    };
  }, []);

  /**
   * Validate password against all rules
   */
  const validatePassword = useCallback(async (password: string): Promise<PasswordValidationResult> => {
    setIsValidating(true);
    
    try {
      const errors: string[] = [];
      const warnings: string[] = [];
      const suggestions: string[] = [];
      
      // Validate against each rule
      validationRules.forEach(rule => {
        const isValid = rule.test(password);
        
        if (!isValid) {
          if (rule.weight >= 15) {
            errors.push(rule.message);
          } else if (rule.weight >= 10) {
            warnings.push(rule.message);
          } else {
            suggestions.push(rule.message);
          }
        }
      });

      // Calculate strength
      const strength = calculatePasswordStrength(password);
      
      // Generate additional suggestions based on strength
      if (strength.score < 60) {
        suggestions.push('Şifrenizi daha karmaşık hale getirin');
      }
      
      if (password.length < 12) {
        suggestions.push('Daha uzun bir şifre kullanın (en az 12 karakter)');
      }

      const result: PasswordValidationResult = {
        isValid: errors.length === 0,
        errors,
        warnings,
        suggestions,
        strength,
      };

      setValidationResult(result);
      return result;
    } finally {
      setIsValidating(false);
    }
  }, [calculatePasswordStrength, validationRules]);


  /**
   * Validate password with debouncing
   */
  const validatePasswordDebounced = useCallback(
    (password: string, debounceMs: number = 300) => {
      return new Promise<PasswordValidationResult>((resolve) => {
        const timeoutId = setTimeout(() => {
          validatePassword(password).then(resolve);
        }, debounceMs);

        return () => clearTimeout(timeoutId);
      });
    },
    [validatePassword]
  );

  /**
   * Get validation status for a specific rule
   */
  const getRuleStatus = useCallback((password: string, ruleId: string) => {
    const rule = validationRules.find(r => r.id === ruleId);
    if (!rule) return { isValid: true, message: '' };

    const isValid = rule.test(password);
    return {
      isValid,
      message: rule.message,
      weight: rule.weight,
    };
  }, [validationRules]);

  /**
   * Get all rule statuses
   */
  const getAllRuleStatuses = useCallback((password: string) => {
    return validationRules.map(rule => ({
      id: rule.id,
      name: rule.name,
      isValid: rule.test(password),
      message: rule.message,
      weight: rule.weight,
    }));
  }, [validationRules]);

  /**
   * Get validation summary
   */
  const getValidationSummary = useCallback((password: string) => {
    const ruleStatuses = getAllRuleStatuses(password);
    const passedRules = ruleStatuses.filter(rule => rule.isValid);
    const failedRules = ruleStatuses.filter(rule => !rule.isValid);
    
    const highPriorityFailed = failedRules.filter(rule => rule.weight >= 15);
    const mediumPriorityFailed = failedRules.filter(rule => rule.weight >= 10 && rule.weight < 15);
    const lowPriorityFailed = failedRules.filter(rule => rule.weight < 10);

    return {
      totalRules: ruleStatuses.length,
      passedRules: passedRules.length,
      failedRules: failedRules.length,
      highPriorityFailed: highPriorityFailed.length,
      mediumPriorityFailed: mediumPriorityFailed.length,
      lowPriorityFailed: lowPriorityFailed.length,
      completionPercentage: Math.round((passedRules.length / ruleStatuses.length) * 100),
    };
  }, [getAllRuleStatuses]);

  /**
   * Clear validation result
   */
  const clearValidation = useCallback(() => {
    setValidationResult(null);
  }, []);

  /**
   * Get validation progress
   */
  const getValidationProgress = useCallback((password: string) => {
    const summary = getValidationSummary(password);
    const strength = calculatePasswordStrength(password);
    
    return {
      ...summary,
      strength: strength.strength,
      score: strength.score,
      isValid: summary.highPriorityFailed === 0,
      needsAttention: summary.highPriorityFailed > 0 || summary.mediumPriorityFailed > 0,
    };
  }, [getValidationSummary, calculatePasswordStrength]);

  /**
   * Get validation recommendations
   */
  const getValidationRecommendations = useCallback((password: string) => {
    const ruleStatuses = getAllRuleStatuses(password);
    const failedRules = ruleStatuses.filter(rule => !rule.isValid);
    
    const recommendations = failedRules
      .sort((a, b) => b.weight - a.weight)
      .map(rule => ({
        priority: rule.weight >= 15 ? 'high' : rule.weight >= 10 ? 'medium' : 'low',
        message: rule.message,
        ruleId: rule.id,
      }));

    return recommendations;
  }, [getAllRuleStatuses]);

  return {
    validationResult,
    isValidating,
    validatePassword,
    validatePasswordDebounced,
    getRuleStatus,
    getAllRuleStatuses,
    getValidationSummary,
    getValidationProgress,
    getValidationRecommendations,
    clearValidation,
    calculatePasswordStrength,
  };
};