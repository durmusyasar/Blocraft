import { useState, useEffect, useCallback } from 'react';

export interface UseOtpValidationProps {
  value: string;
  validateOtp?: (value: string) => boolean | Promise<boolean>;
  autoValidate?: boolean;
  validationDebounceMs?: number;
  monitoring?: {
    onError?: (error: Error) => void;
  };
}

export const useOtpValidation = ({
  value,
  validateOtp,
  autoValidate = false,
  validationDebounceMs = 300,
  monitoring,
}: UseOtpValidationProps) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message?: string;
  } | null>(null);

  const validate = useCallback(async (otpValue: string) => {
    if (!validateOtp || !autoValidate) return;

    setIsValidating(true);
    try {
      const result = await validateOtp(otpValue);
      setValidationResult({
        isValid: result,
        message: result ? 'OTP is valid' : 'Invalid OTP'
      });
    } catch (error) {
      setValidationResult({
        isValid: false,
        message: 'Validation error'
      });
      if (monitoring?.onError) {
        monitoring.onError(error as Error);
      }
    } finally {
      setIsValidating(false);
    }
  }, [validateOtp, autoValidate, monitoring]);
/*> {
    if (value.length === 0) {
      setValidationResult(null);
      return;
    }

    if (autoValidate && validateOtp) {
      const timeout = setTimeout(() => {
        validate(value);
      }, validationDebounceMs);

      return () => clearTimeout(timeout);
    }
  }, [value, autoValidate, validateOtp, validationDebounceMs, validate]);
*/
  return {
    isValidating,
    validationResult,
    validate,
  };
};
