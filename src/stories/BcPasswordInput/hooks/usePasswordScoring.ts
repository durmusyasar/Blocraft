import { useMemo } from 'react';

export interface PasswordScoringOptions {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecial: boolean;
  customRules?: Array<{ key: string; label: string; test: (password: string) => boolean }>;
}

export interface PasswordScore {
  score: number;
  maxScore: number;
  percentage: number;
  level: 'very-weak' | 'weak' | 'medium' | 'strong' | 'very-strong';
  entropy: number;
  feedback: string[];
}

export function usePasswordScoring(password: string, options: PasswordScoringOptions): PasswordScore {
  return useMemo(() => {
    const { minLength, requireUppercase, requireLowercase, requireNumber, requireSpecial, customRules } = options;
    
    let score = 0;
    const maxScore = 100;
    const feedback: string[] = [];

    // Length scoring (0-30 points)
    if (password.length >= minLength) {
      score += 20;
      if (password.length >= minLength + 4) score += 10;
    } else {
      feedback.push(`Password should be at least ${minLength} characters long`);
    }

    // Character variety scoring (0-40 points)
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\\[\]{}|;:,.<>?]/.test(password);

    if (hasUppercase) score += 10;
    if (hasLowercase) score += 10;
    if (hasNumber) score += 10;
    if (hasSpecial) score += 10;

    // Pattern scoring (0-20 points)
    const hasRepeatingChars = /(.)\1{2,}/.test(password);
    const hasSequentialChars = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789|890)/i.test(password);
    const hasCommonPatterns = /(password|123456|qwerty|admin|login)/i.test(password);

    if (!hasRepeatingChars) score += 5;
    if (!hasSequentialChars) score += 5;
    if (!hasCommonPatterns) score += 10;

    // Custom rules scoring (0-10 points)
    if (customRules) {
      const passedCustomRules = customRules.filter(rule => rule.test(password)).length;
      score += (passedCustomRules / customRules.length) * 10;
    }

    // Calculate entropy
    const entropy = calculateEntropy(password);

    // Determine level
    let level: PasswordScore['level'];
    if (score < 20) level = 'very-weak';
    else if (score < 40) level = 'weak';
    else if (score < 60) level = 'medium';
    else if (score < 80) level = 'strong';
    else level = 'very-strong';

    // Generate feedback
    if (requireUppercase && !hasUppercase) feedback.push('Add uppercase letters');
    if (requireLowercase && !hasLowercase) feedback.push('Add lowercase letters');
    if (requireNumber && !hasNumber) feedback.push('Add numbers');
    if (requireSpecial && !hasSpecial) feedback.push('Add special characters');
    if (hasRepeatingChars) feedback.push('Avoid repeating characters');
    if (hasSequentialChars) feedback.push('Avoid sequential characters');
    if (hasCommonPatterns) feedback.push('Avoid common patterns');

    return {
      score: Math.min(score, maxScore),
      maxScore,
      percentage: Math.round((score / maxScore) * 100),
      level,
      entropy,
      feedback
    };
  }, [password, options]);
}

function calculateEntropy(password: string): number {
  if (!password) return 0;

  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[!@#$%^&*()_+\-=\\[\]{}|;:,.<>?]/.test(password)) charsetSize += 32;

  return Math.log2(Math.pow(charsetSize, password.length));
}
