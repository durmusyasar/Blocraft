import { useState, useCallback, useMemo } from 'react';
import { PasswordSecurityFeatures, PasswordSecurityWarning } from '../types';

/**
 * Default security features configuration
 */
const defaultSecurityFeatures: PasswordSecurityFeatures = {
  enableBreachDetection: false,
  enableCommonPasswordCheck: true,
  enablePatternDetection: true,
  enableKeyboardPatternCheck: true,
  enableRepeatedCharCheck: true,
  enableSequentialCharCheck: true,
  enableDictionaryCheck: false,
  commonPasswordsList: [],
  dictionaryWords: [],
};

/**
 * Common passwords list (top 100 most common passwords)
 */
const commonPasswords = [
  '123456', 'password', '123456789', '12345678', '12345', '1234567', '1234567890',
  'qwerty', 'abc123', '111111', '123123', 'admin', 'letmein', 'welcome', 'monkey',
  'dragon', 'pass', 'master', 'hello', 'freedom', 'whatever', 'qazwsx', 'trustno1',
  'jordan23', 'harley', 'password123', 'fuckyou', '1234', 'pussy', '12345', 'dragon',
  'mustang', 'letmein', 'baseball', 'shadow', 'michael', 'jennifer', 'jordan', 'hunter',
  'ranger', 'daniel', 'hannah', 'maggie', 'jessica', 'charlie', 'samantha', 'summer',
  'winter', 'spring', 'autumn', 'february', 'march', 'april', 'may', 'june', 'july',
  'august', 'september', 'october', 'november', 'december', 'monday', 'tuesday',
  'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'january', 'february',
  'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october',
  'november', 'december', 'password1', 'password2', 'password3', 'password4',
  'password5', 'password6', 'password7', 'password8', 'password9', 'password0',
  'iloveyou', 'princess', 'rockyou', '1234567890', '123456789', '12345678',
  '1234567', '123456', '12345', '1234', '123', '12', '1', 'qwertyuiop',
  'asdfghjkl', 'zxcvbnm', 'qwerty', 'asdf', 'zxcv', 'qwertyui', 'asdfghjk',
  'zxcvbn', 'qwertyu', 'asdfghj', 'zxcvb', 'qwerty', 'asdfgh', 'zxcv',
  'qwert', 'asdfg', 'zxc', 'qwer', 'asdf', 'zx', 'qwe', 'asd', 'z',
  'qw', 'as', 'q', 'a', 'z', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm',
  'qwertyui', 'asdfghjk', 'zxcvbn', 'qwertyu', 'asdfghj', 'zxcvb',
  'qwerty', 'asdfgh', 'zxcv', 'qwert', 'asdfg', 'zxc', 'qwer', 'asdf',
  'zx', 'qwe', 'asd', 'z', 'qw', 'as', 'q', 'a', 'z'
];

/**
 * Dictionary words for checking
 */
const dictionaryWords = [
  'password', 'admin', 'user', 'login', 'welcome', 'hello', 'world', 'test',
  'demo', 'sample', 'example', 'default', 'guest', 'public', 'private',
  'secret', 'hidden', 'secure', 'safe', 'protect', 'guard', 'shield',
  'defend', 'secure', 'safety', 'security', 'privacy', 'confidential',
  'personal', 'private', 'secret', 'hidden', 'secure', 'safe', 'protect'
];

/**
 * Hook for password security analysis and monitoring
 */
export const usePasswordSecurity = (features: Partial<PasswordSecurityFeatures> = {}) => {
  const securityFeatures = useMemo(() => ({
    ...defaultSecurityFeatures,
    ...features,
    commonPasswordsList: features.commonPasswordsList || commonPasswords,
    dictionaryWords: features.dictionaryWords || dictionaryWords,
  }), [features]);

  const [securityWarnings, setSecurityWarnings] = useState<PasswordSecurityWarning[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  /**
   * Check for common passwords
   */
  const checkCommonPasswords = useCallback((password: string): PasswordSecurityWarning | null => {
    if (!securityFeatures.enableCommonPasswordCheck) return null;

    const lowerPassword = password.toLowerCase();
    const isCommon = securityFeatures.commonPasswordsList?.some(commonPwd => 
      commonPwd.toLowerCase() === lowerPassword
    );

    if (isCommon) {
      return {
        type: 'common',
        message: 'Bu şifre çok yaygın kullanılan bir şifredir',
        severity: 'high',
        suggestion: 'Daha benzersiz ve karmaşık bir şifre seçin',
      };
    }

    return null;
  }, [securityFeatures]);

  /**
   * Check for keyboard patterns
   */
  const checkKeyboardPatterns = useCallback((password: string): PasswordSecurityWarning | null => {
    if (!securityFeatures.enableKeyboardPatternCheck) return null;

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

    const hasKeyboardPattern = keyboardPatterns.some(pattern => pattern.test(password));

    if (hasKeyboardPattern) {
      return {
        type: 'keyboard',
        message: 'Şifre klavye sıralaması içeriyor',
        severity: 'medium',
        suggestion: 'Klavye sıralamasından kaçının',
      };
    }

    return null;
  }, [securityFeatures]);

  /**
   * Check for repeated characters
   */
  const checkRepeatedChars = useCallback((password: string): PasswordSecurityWarning | null => {
    if (!securityFeatures.enableRepeatedCharCheck) return null;

    const hasRepeatedChars = /(.)\1{2,}/.test(password);

    if (hasRepeatedChars) {
      return {
        type: 'repeated',
        message: 'Şifre tekrarlanan karakterler içeriyor',
        severity: 'medium',
        suggestion: 'Tekrarlanan karakterlerden kaçının',
      };
    }

    return null;
  }, [securityFeatures]);

  /**
   * Check for sequential characters
   */
  const checkSequentialChars = useCallback((password: string): PasswordSecurityWarning | null => {
    if (!securityFeatures.enableSequentialCharCheck) return null;

    const sequentialPatterns = [
      /123|234|345|456|567|678|789|890|012/i,
      /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i,
    ];

    const hasSequentialChars = sequentialPatterns.some(pattern => pattern.test(password));

    if (hasSequentialChars) {
      return {
        type: 'sequential',
        message: 'Şifre ardışık karakterler içeriyor',
        severity: 'medium',
        suggestion: 'Ardışık karakterlerden kaçının',
      };
    }

    return null;
  }, [securityFeatures]);

  /**
   * Check for dictionary words
   */
  const checkDictionaryWords = useCallback((password: string): PasswordSecurityWarning | null => {
    if (!securityFeatures.enableDictionaryCheck) return null;

    const lowerPassword = password.toLowerCase();
    const hasDictionaryWord = securityFeatures.dictionaryWords?.some(word => 
      lowerPassword.includes(word.toLowerCase())
    );

    if (hasDictionaryWord) {
      return {
        type: 'dictionary',
        message: 'Şifre sözlük kelimeleri içeriyor',
        severity: 'low',
        suggestion: 'Sözlük kelimelerinden kaçının',
      };
    }

    return null;
  }, [securityFeatures]);

  /**
   * Check for general patterns
   */
  const checkPatterns = useCallback((password: string): PasswordSecurityWarning | null => {
    if (!securityFeatures.enablePatternDetection) return null;

    const patterns = [
      /^[0-9]+$/, // Only numbers
      /^[a-zA-Z]+$/, // Only letters
      /^[a-z]+$/, // Only lowercase
      /^[A-Z]+$/, // Only uppercase
    ];

    const hasPattern = patterns.some(pattern => pattern.test(password));

    if (hasPattern) {
      return {
        type: 'pattern',
        message: 'Şifre çok basit bir kalıp içeriyor',
        severity: 'medium',
        suggestion: 'Daha karmaşık bir şifre seçin',
      };
    }

    return null;
  }, [securityFeatures]);

  /**
   * Analyze password security
   */
  const analyzePasswordSecurity = useCallback(async (password: string): Promise<PasswordSecurityWarning[]> => {
    setIsAnalyzing(true);
    const warnings: PasswordSecurityWarning[] = [];

    try {
      // Check common passwords
      const commonWarning = checkCommonPasswords(password);
      if (commonWarning) warnings.push(commonWarning);

      // Check keyboard patterns
      const keyboardWarning = checkKeyboardPatterns(password);
      if (keyboardWarning) warnings.push(keyboardWarning);

      // Check repeated characters
      const repeatedWarning = checkRepeatedChars(password);
      if (repeatedWarning) warnings.push(repeatedWarning);

      // Check sequential characters
      const sequentialWarning = checkSequentialChars(password);
      if (sequentialWarning) warnings.push(sequentialWarning);

      // Check dictionary words
      const dictionaryWarning = checkDictionaryWords(password);
      if (dictionaryWarning) warnings.push(dictionaryWarning);

      // Check patterns
      const patternWarning = checkPatterns(password);
      if (patternWarning) warnings.push(patternWarning);

      setSecurityWarnings(warnings);
      return warnings;
    } finally {
      setIsAnalyzing(false);
    }
  }, [
    checkCommonPasswords,
    checkKeyboardPatterns,
    checkRepeatedChars,
    checkSequentialChars,
    checkDictionaryWords,
    checkPatterns,
  ]);

  /**
   * Clear security warnings
   */
  const clearWarnings = useCallback(() => {
    setSecurityWarnings([]);
  }, []);

  return {
    securityWarnings,
    isAnalyzing,
    analyzePasswordSecurity,
    clearWarnings,
    checkCommonPasswords,
    checkKeyboardPatterns,
    checkRepeatedChars,
    checkSequentialChars,
    checkDictionaryWords,
    checkPatterns,
  };
};