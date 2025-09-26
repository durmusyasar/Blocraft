import { useState, useCallback, useMemo } from 'react';
import { PasswordGenerationOptions, PasswordGenerationResult, PasswordStrength } from '../types';

/**
 * Default password generation options
 */
const defaultGenerationOptions: PasswordGenerationOptions = {
  length: 12,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSpecialChars: true,
  excludeSimilar: true,
  excludeAmbiguous: false,
};

/**
 * Character sets for password generation
 */
const characterSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  similarChars: 'il1Lo0O', // Characters that look similar
  ambiguousChars: '{}[]()/\\\'"`~,;.<>', // Characters that might be ambiguous
};

/**
 * Hook for password generation functionality
 */
export const usePasswordGeneration = (options: Partial<PasswordGenerationOptions> = {}) => {
  const generationOptions = useMemo(() => ({
    ...defaultGenerationOptions,
    ...options,
  }), [options]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [generationHistory, setGenerationHistory] = useState<string[]>([]);

  /**
   * Generate a random password based on options
   */
  const generatePassword = useCallback((): string => {
    const {
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSpecialChars,
      excludeSimilar,
      excludeAmbiguous,
      customChars,
    } = generationOptions;

    let charset = '';

    // Build character set based on options
    if (includeUppercase) {
      charset += characterSets.uppercase;
    }
    if (includeLowercase) {
      charset += characterSets.lowercase;
    }
    if (includeNumbers) {
      charset += characterSets.numbers;
    }
    if (includeSpecialChars) {
      charset += characterSets.specialChars;
    }
    if (customChars) {
      charset += customChars;
    }

    // Remove similar characters if requested
    if (excludeSimilar) {
      characterSets.similarChars.split('').forEach(char => {
        charset = charset.replace(new RegExp(char, 'g'), '');
      });
    }

    // Remove ambiguous characters if requested
    if (excludeAmbiguous) {
      characterSets.ambiguousChars.split('').forEach(char => {
        charset = charset.replace(new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '');
      });
    }

    if (charset.length === 0) {
      throw new Error('En az bir karakter seti seçilmelidir');
    }

    // Generate password
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }, [generationOptions]);

  /**
   * Analyze password strength
   */
  const analyzePasswordStrength = useCallback((password: string): PasswordStrength => {
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

    // Determine strength level
    if (score >= 80) return 'strong';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    if (score >= 20) return 'weak';
    return 'very-weak';
  }, []);

  /**
   * Calculate password score
   */
  const calculatePasswordScore = useCallback((password: string): number => {
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

    return Math.min(100, score);
  }, []);

  /**
   * Generate password with strength analysis
   */
  const generatePasswordWithAnalysis = useCallback(async (): Promise<PasswordGenerationResult> => {
    setIsGenerating(true);
    
    try {
      const password = generatePassword();
      
      // Analyze password strength
      const strength = analyzePasswordStrength(password);
      const score = calculatePasswordScore(password);
      
      const result: PasswordGenerationResult = {
        password,
        strength,
        score,
        features: {
          length: password.length,
          hasUppercase: /[A-Z]/.test(password),
          hasLowercase: /[a-z]/.test(password),
          hasNumbers: /[0-9]/.test(password),
          hasSpecialChars: /[^a-zA-Z0-9]/.test(password),
        },
      };

      setGeneratedPassword(password);
      setGenerationHistory(prev => [password, ...prev.slice(0, 9)]); // Keep last 10 passwords
      
      return result;
    } finally {
      setIsGenerating(false);
    }
  }, [generatePassword, analyzePasswordStrength, calculatePasswordScore]);

  /**
   * Copy password to clipboard
   */
  const copyToClipboard = useCallback(async (password: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(password);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = password;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const result = document.execCommand('copy');
        document.body.removeChild(textArea);
        return result;
      }
    } catch (error) {
      console.error('Failed to copy password to clipboard:', error);
      return false;
    }
  }, []);

  /**
   * Clear generation history
   */
  const clearHistory = useCallback(() => {
    setGenerationHistory([]);
  }, []);

  return {
    isGenerating,
    generatedPassword,
    generationHistory,
    generatePassword,
    generatePasswordWithAnalysis,
    copyToClipboard,
    clearHistory,
    analyzePasswordStrength,
    calculatePasswordScore,
  };
};