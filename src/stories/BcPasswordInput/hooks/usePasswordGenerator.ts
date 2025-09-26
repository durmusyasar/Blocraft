import { useCallback, useMemo } from 'react';

export interface PasswordGeneratorOptions {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecial: boolean;
  customRules?: Array<{ key: string; label: string; test: (password: string) => boolean }>;
}

export interface PasswordGeneratorResult {
  generatePassword: () => string;
  generateSecurePassword: () => string;
  validateGeneratedPassword: (password: string) => boolean;
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export function usePasswordGenerator(options: PasswordGeneratorOptions): PasswordGeneratorResult {
  const { minLength, requireUppercase, requireLowercase, requireNumber, requireSpecial, customRules } = options;

  const generatePassword = useCallback(() => {
    let charset = '';
    let password = '';

    // Build character set based on requirements
    if (requireLowercase) charset += LOWERCASE;
    if (requireUppercase) charset += UPPERCASE;
    if (requireNumber) charset += NUMBERS;
    if (requireSpecial) charset += SPECIAL;

    // Ensure at least one character from each required category
    if (requireLowercase) password += LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)];
    if (requireUppercase) password += UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)];
    if (requireNumber) password += NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
    if (requireSpecial) password += SPECIAL[Math.floor(Math.random() * SPECIAL.length)];

    // Fill remaining length
    const remainingLength = Math.max(0, minLength - password.length);
    for (let i = 0; i < remainingLength; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }, [minLength, requireUppercase, requireLowercase, requireNumber, requireSpecial]);

  const validateGeneratedPassword = useCallback((password: string) => {
    if (password.length < minLength) return false;
    if (requireUppercase && !/[A-Z]/.test(password)) return false;
    if (requireLowercase && !/[a-z]/.test(password)) return false;
    if (requireNumber && !/[0-9]/.test(password)) return false;
    if (requireSpecial && !/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)) return false;
    
    // Check custom rules
    if (customRules) {
      for (const rule of customRules) {
        if (!rule.test(password)) return false;
      }
    }

    return true;
  }, [minLength, requireUppercase, requireLowercase, requireNumber, requireSpecial, customRules]);

  const generateSecurePassword = useCallback(() => {
    // Generate a longer, more secure password
    let password = '';
    let attempts = 0;
    const maxAttempts = 10;

    do {
      password = generatePassword();
      attempts++;
    } while (!validateGeneratedPassword(password) && attempts < maxAttempts);

    return password;
  }, [generatePassword, validateGeneratedPassword]);

  return useMemo(() => ({
    generatePassword,
    generateSecurePassword,
    validateGeneratedPassword
  }), [generatePassword, generateSecurePassword, validateGeneratedPassword]);
}
