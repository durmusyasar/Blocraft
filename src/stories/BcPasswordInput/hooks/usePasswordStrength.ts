import { useMemo } from 'react';
import { getPasswordStrength, getPasswordRules } from '../utils';
import zxcvbn from 'zxcvbn';

export interface PasswordStrengthOptions {
  password: string;
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecial: boolean;
  useZxcvbnStrength?: boolean;
  customRules?: Array<{ key: string; label: string; test: (password: string) => boolean }>;
}

export interface PasswordStrengthResult {
  strength: number;
  rules: Record<string, boolean>;
  ruleLabels: Array<{ key: string; label: string; custom?: boolean; test?: (password: string) => boolean }>;
  allPassed: boolean;
  zxcvbnResult?: any;
}

export function usePasswordStrength({
  password,
  minLength,
  requireUppercase,
  requireLowercase,
  requireNumber,
  requireSpecial,
  useZxcvbnStrength = false,
  customRules = [],
}: PasswordStrengthOptions): PasswordStrengthResult {
  // Zxcvbn result
  const zxcvbnResult = useMemo(() => {
    return useZxcvbnStrength ? zxcvbn(password) : undefined;
  }, [password, useZxcvbnStrength]);

  // Password strength calculation
  const strength = useMemo(() => {
    if (useZxcvbnStrength && zxcvbnResult) {
      return zxcvbnResult.score + 1;
    }
    return getPasswordStrength(
      password,
      minLength,
      requireUppercase,
      requireLowercase,
      requireNumber,
      requireSpecial
    );
  }, [password, minLength, requireUppercase, requireLowercase, requireNumber, requireSpecial, useZxcvbnStrength, zxcvbnResult]);

  // Password rules
  const rules = useMemo(() => {
    return getPasswordRules(
      password,
      minLength,
      requireUppercase,
      requireLowercase,
      requireNumber,
      requireSpecial
    );
  }, [password, minLength, requireUppercase, requireLowercase, requireNumber, requireSpecial]);

  // Rule labels with custom rules
  const ruleLabels = useMemo(() => {
    const labels = [
      ...customRules.map(rule => ({
        key: rule.key,
        label: rule.label,
        custom: true as const,
        test: rule.test
      })),
      { key: "minLength", label: `Minimum uzunluk: ${minLength}` },
      { key: "uppercase", label: "Büyük harf gereksinimi" },
      { key: "lowercase", label: "Küçük harf gereksinimi" },
      { key: "number", label: "Rakam gereksinimi" },
      { key: "special", label: "Özel karakter gereksinimi" },
    ];
    return labels;
  }, [customRules, minLength]);

  // Check if all rules passed
  const allPassed = useMemo(() => {
    return ruleLabels.every(rule => {
      if ('custom' in rule && rule.custom && 'test' in rule && rule.test) {
        return rule.test(password);
      }
      
      // Skip disabled rules
      if (rule.key === "uppercase" && !requireUppercase) return true;
      if (rule.key === "lowercase" && !requireLowercase) return true;
      if (rule.key === "number" && !requireNumber) return true;
      if (rule.key === "special" && !requireSpecial) return true;
      
      return (rules as any)[rule.key];
    });
  }, [ruleLabels, rules, requireUppercase, requireLowercase, requireNumber, requireSpecial, password]);

  return {
    strength,
    rules: rules as unknown as Record<string, boolean>,
    ruleLabels,
    allPassed,
    zxcvbnResult,
  };
}
