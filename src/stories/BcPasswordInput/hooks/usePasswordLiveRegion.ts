import { useState, useEffect, useRef } from 'react';

export interface PasswordLiveRegionOptions {
  password: string;
  strength: number;
  rules: Record<string, boolean>;
  ruleLabels: Array<{ key: string; label: string; custom?: boolean; test?: (password: string) => boolean }>;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecial: boolean;
  useZxcvbnStrength?: boolean;
  i18nStrengthBar: string;
  i18nRules: string;
  showValidationStatus: boolean;
  enableAsyncValidation: boolean;
  validationResult?: { isValid: boolean; message?: string } | null;
  isValidating: boolean;
}

export function usePasswordLiveRegion({
  password,
  strength,
  rules,
  ruleLabels,
  requireUppercase,
  requireLowercase,
  requireNumber,
  requireSpecial,
  useZxcvbnStrength = false,
  i18nStrengthBar,
  i18nRules,
  showValidationStatus,
  enableAsyncValidation,
  validationResult,
  isValidating,
}: PasswordLiveRegionOptions) {
  const [liveRegionMessage, setLiveRegionMessage] = useState('');
  const liveRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let msg = `${i18nStrengthBar}: `;
    
    // Add strength information
    if (useZxcvbnStrength) {
      if (!password) msg += 'Çok zayıf';
      else if (strength === 1) msg += 'Çok zayıf';
      else if (strength === 2) msg += 'Zayıf';
      else if (strength === 3) msg += 'Orta';
      else if (strength === 4) msg += 'Güçlü';
      else if (strength >= 5) msg += 'Çok güçlü';
    } else {
      if (strength === 0) msg += 'Çok zayıf';
      else if (strength === 1) msg += 'Zayıf';
      else if (strength === 2) msg += 'Orta';
      else if (strength === 3) msg += 'Güçlü';
      else if (strength >= 4) msg += 'Çok güçlü';
    }
    
    // Add validation status if enabled
    if (showValidationStatus && enableAsyncValidation) {
      if (isValidating) {
        msg += '. Doğrulanıyor...';
      } else if (validationResult) {
        msg += `. ${validationResult.message || ''}`;
      }
    }
    
    // Add rules information
    msg += '. ' + i18nRules + ': ';
    const ruleMessages = ruleLabels.map(rule => {
      // Skip disabled rules
      if (!rule.custom) {
        if (rule.key === "uppercase" && !requireUppercase) return null;
        if (rule.key === "lowercase" && !requireLowercase) return null;
        if (rule.key === "number" && !requireNumber) return null;
        if (rule.key === "special" && !requireSpecial) return null;
      }
      
      const passed = rule.custom && rule.test
        ? rule.test(password)
        : rules[rule.key as keyof typeof rules];
      
      return `${rule.label}: ${passed ? 'sağlandı' : 'eksik'}`;
    }).filter(Boolean);
    
    msg += ruleMessages.join(', ');
    setLiveRegionMessage(msg);
  }, [
    password,
    strength,
    rules,
    ruleLabels,
    requireUppercase,
    requireLowercase,
    requireNumber,
    requireSpecial,
    useZxcvbnStrength,
    i18nStrengthBar,
    i18nRules,
    showValidationStatus,
    enableAsyncValidation,
    validationResult,
    isValidating
  ]);

  return {
    liveRegionRef,
    liveRegionMessage,
  };
}
