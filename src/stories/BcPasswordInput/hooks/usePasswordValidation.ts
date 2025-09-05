import { useState, useEffect, useCallback } from 'react';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface PasswordValidationOptions {
  password: string;
  enableAsyncValidation: boolean;
  validatePassword?: (password: string) => Promise<ValidationResult>;
  validationDebounceMs: number;
  monitoring?: {
    onError?: (error: Error) => void;
  };
}

export interface PasswordValidationResult {
  validationResult: ValidationResult | null;
  isValidating: boolean;
}

export function usePasswordValidation({
  password,
  enableAsyncValidation,
  validatePassword,
  validationDebounceMs,
  monitoring,
}: PasswordValidationOptions): PasswordValidationResult {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  // Async validation effect
  useEffect(() => {
    if (!enableAsyncValidation || !validatePassword || !password) {
      setValidationResult(null);
      setIsValidating(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsValidating(true);
      try {
        const result = await validatePassword(password);
        setValidationResult(result);
      } catch (error) {
        // AbortError'ı ignore et (component unmount veya request iptal)
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('BcPasswordInput: Validation request aborted');
          return;
        }
        
        console.warn('BcPasswordInput: Async validation failed:', error);
        if (monitoring?.onError) {
          monitoring.onError(error as Error);
        }
        setValidationResult({ isValid: false, message: 'Validation failed' });
      } finally {
        setIsValidating(false);
      }
    }, validationDebounceMs);

    return () => clearTimeout(timeoutId);
  }, [password, enableAsyncValidation, validatePassword, validationDebounceMs, monitoring]);

  return {
    validationResult,
    isValidating,
  };
}
