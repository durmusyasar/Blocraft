import { useState, useCallback, useMemo } from 'react';
import { PasswordStrength, PasswordStrengthConfig, PasswordStrengthResult } from '../types';

/**
 * Default password strength configuration
 */
const defaultStrengthConfig: PasswordStrengthConfig = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  customRules: [],
  strengthThresholds: {
    veryWeak: 0,
    weak: 20,
    fair: 40,
    good: 60,
    strong: 80,
  },
};

/**
 * Common password patterns for detection
 */
const commonPatterns = [
  /123456/,
  /password/i,
  /qwerty/i,
  /abc123/i,
  /admin/i,
  /letmein/i,
  /welcome/i,
  /monkey/i,
  /dragon/i,
  /master/i,
  /hello/i,
  /login/i,
  /princess/i,
  /qwertyui/i,
  /solo/i,
  /passw0rd/i,
  /starwars/i,
  /freedom/i,
  /whatever/i,
  /trustno1/i,
];

/**
 * Keyboard patterns for detection
 */
const keyboardPatterns = [
  /qwerty/i,
  /asdf/i,
  /zxcv/i,
  /qwertyuiop/i,
  /asdfghjkl/i,
  /zxcvbnm/i,
  /1234567890/i,
  /0987654321/i,
];

/**
 * Hook for password strength calculation and validation
 */
export const usePasswordStrength = (config: Partial<PasswordStrengthConfig> = {}) => {
  const strengthConfig = useMemo(() => ({
    ...defaultStrengthConfig,
    ...config,
  }), [config]);

  const [strengthResult, setStrengthResult] = useState<PasswordStrengthResult | null>(null);

  /**
   * Calculate password strength score
   */
  const calculateStrengthScore = useCallback((password: string): number => {
    if (!password) return 0;

    let score = 0;
    const length = password.length;

    // Length scoring
    if (length >= strengthConfig.minLength) {
      score += 20;
    }
    if (length >= 12) {
      score += 10;
    }
    if (length >= 16) {
      score += 10;
    }

    // Character variety scoring
    if (/[a-z]/.test(password)) {
      score += 10;
    }
    if (/[A-Z]/.test(password)) {
      score += 10;
    }
    if (/[0-9]/.test(password)) {
      score += 10;
    }
    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 15;
    }

    // Complexity scoring
    const uniqueChars = new Set(password).size;
    if (uniqueChars >= 8) {
      score += 10;
    }
    if (uniqueChars >= 12) {
      score += 5;
    }

    // Pattern detection (penalties)
    if (commonPatterns.some(pattern => pattern.test(password))) {
      score -= 30;
    }
    if (keyboardPatterns.some(pattern => pattern.test(password))) {
      score -= 20;
    }
    if (/(.)\1{2,}/.test(password)) {
      score -= 15; // Repeated characters
    }
    if (/123|234|345|456|567|678|789|890|012/.test(password)) {
      score -= 20; // Sequential numbers
    }
    if (/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/.test(password)) {
      score -= 20; // Sequential letters
    }

    // Custom rules scoring
    strengthConfig.customRules.forEach(rule => {
      if (rule.enabled && rule.test(password)) {
        score += rule.weight;
      }
    });

    return Math.max(0, Math.min(100, score));
  }, [strengthConfig]);

  /**
   * Determine password strength level
   */
  const getStrengthLevel = useCallback((score: number): PasswordStrength => {
    const { strengthThresholds } = strengthConfig;
    
    if (score >= strengthThresholds.strong) return 'strong';
    if (score >= strengthThresholds.good) return 'good';
    if (score >= strengthThresholds.fair) return 'fair';
    if (score >= strengthThresholds.weak) return 'weak';
    return 'very-weak';
  }, [strengthConfig]);

  /**
   * Generate password strength feedback
   */
  const generateFeedback = useCallback((password: string, score: number): string[] => {
    const feedback: string[] = [];
    const length = password.length;

    if (length < strengthConfig.minLength) {
      feedback.push(`En az ${strengthConfig.minLength} karakter olmalı`);
    }

    if (strengthConfig.requireUppercase && !/[A-Z]/.test(password)) {
      feedback.push('En az bir büyük harf içermeli');
    }

    if (strengthConfig.requireLowercase && !/[a-z]/.test(password)) {
      feedback.push('En az bir küçük harf içermeli');
    }

    if (strengthConfig.requireNumbers && !/[0-9]/.test(password)) {
      feedback.push('En az bir rakam içermeli');
    }

    if (strengthConfig.requireSpecialChars && !/[^a-zA-Z0-9]/.test(password)) {
      feedback.push('En az bir özel karakter içermeli');
    }

    if (commonPatterns.some(pattern => pattern.test(password))) {
      feedback.push('Yaygın şifre kalıplarından kaçının');
    }

    if (keyboardPatterns.some(pattern => pattern.test(password))) {
      feedback.push('Klavye sıralamasından kaçının');
    }

    if (/(.)\1{2,}/.test(password)) {
      feedback.push('Tekrarlanan karakterlerden kaçının');
    }

    if (/123|234|345|456|567|678|789|890|012/.test(password)) {
      feedback.push('Ardışık sayılardan kaçının');
    }

    return feedback;
  }, [strengthConfig]);

  /**
   * Generate password suggestions
   */
  const generateSuggestions = useCallback((password: string, score: number): string[] => {
    const suggestions: string[] = [];
    const length = password.length;

    if (length < 12) {
      suggestions.push('Daha uzun bir şifre kullanın (en az 12 karakter)');
    }

    if (!/[A-Z]/.test(password)) {
      suggestions.push('Büyük harfler ekleyin');
    }

    if (!/[a-z]/.test(password)) {
      suggestions.push('Küçük harfler ekleyin');
    }

    if (!/[0-9]/.test(password)) {
      suggestions.push('Rakamlar ekleyin');
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      suggestions.push('Özel karakterler ekleyin (!@#$%^&*)');
    }

    if (new Set(password).size < 8) {
      suggestions.push('Daha fazla farklı karakter kullanın');
    }

    if (score < 60) {
      suggestions.push('Şifrenizi daha karmaşık hale getirin');
    }

    return suggestions;
  }, []);

  /**
   * Check password requirements
   */
  const checkRequirements = useCallback((password: string) => {
    const length = password.length;
    
    return {
      minLength: length >= strengthConfig.minLength,
      uppercase: !strengthConfig.requireUppercase || /[A-Z]/.test(password),
      lowercase: !strengthConfig.requireLowercase || /[a-z]/.test(password),
      numbers: !strengthConfig.requireNumbers || /[0-9]/.test(password),
      specialChars: !strengthConfig.requireSpecialChars || /[^a-zA-Z0-9]/.test(password),
      noCommonPasswords: !commonPatterns.some(pattern => pattern.test(password)),
      noPersonalInfo: true, // This would need to be implemented based on context
    };
  }, [strengthConfig]);

  /**
   * Analyze password strength
   */
  const analyzePassword = useCallback((password: string): PasswordStrengthResult => {
    const score = calculateStrengthScore(password);
    const strength = getStrengthLevel(score);
    const feedback = generateFeedback(password, score);
    const suggestions = generateSuggestions(password, score);
    const requirements = checkRequirements(password);
    const isValid = Object.values(requirements).every(Boolean);

    const result: PasswordStrengthResult = {
      strength,
      score,
      feedback,
      suggestions,
      isValid,
      requirements,
    };

    setStrengthResult(result);
    return result;
  }, [calculateStrengthScore, getStrengthLevel, generateFeedback, generateSuggestions, checkRequirements]);

  /**
   * Reset strength result
   */
  const resetStrength = useCallback(() => {
    setStrengthResult(null);
  }, []);

  /**
   * Get strength color
   */
  const getStrengthColor = useCallback((strength: PasswordStrength): string => {
    const colors = {
      'very-weak': '#f44336',
      'weak': '#ff9800',
      'fair': '#ffeb3b',
      'good': '#4caf50',
      'strong': '#2196f3',
    };
    return colors[strength];
  }, []);

  /**
   * Get strength label
   */
  const getStrengthLabel = useCallback((strength: PasswordStrength): string => {
    const labels = {
      'very-weak': 'Çok Zayıf',
      'weak': 'Zayıf',
      'fair': 'Orta',
      'good': 'İyi',
      'strong': 'Güçlü',
    };
    return labels[strength];
  }, []);

  return {
    strengthResult,
    analyzePassword,
    resetStrength,
    getStrengthColor,
    getStrengthLabel,
    calculateStrengthScore,
    getStrengthLevel,
    generateFeedback,
    generateSuggestions,
    checkRequirements,
  };
};