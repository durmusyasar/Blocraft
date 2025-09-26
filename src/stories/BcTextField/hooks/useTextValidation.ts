import { useState, useRef, useCallback, useEffect, RefObject } from 'react';

interface UseTextFieldValidationProps {
  inputValue: string;
  enableAsyncValidation?: boolean;
  validateInput?: (input: string) => Promise<{ isValid: boolean; message?: string; type?: 'error' | 'warning' | 'success' | 'info' }>;
  validationDebounceMs?: number;
  monitoring?: {
    enableUsageAnalytics?: boolean;
    enableErrorTracking?: boolean;
    componentId?: string;
    getMonitor?: () => { trackSearch?: (input: string) => void } | undefined;
    trackError?: (error: { type: string; message: string; inputValue: string; componentId: string }) => void;
  };
  keyboardNavigationAnnouncements?: boolean;
  liveRegionRef: RefObject<HTMLDivElement | null>;
  setScreenReaderMessage: (msg: string) => void;
}

const announceToScreenReader = (
  message: string,
  liveRegionRef: RefObject<HTMLDivElement | null>,
  setScreenReaderMessage?: (message: string) => void
) => {
  if (liveRegionRef.current) {
    liveRegionRef.current.textContent = message;
    setTimeout(() => {
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = '';
      }
    }, 1000);
  }
  if (setScreenReaderMessage) {
    setScreenReaderMessage(message);
  }
};

function useTextFieldValidation({
  inputValue,
  enableAsyncValidation,
  validateInput,
  validationDebounceMs,
  monitoring,
  keyboardNavigationAnnouncements,
  liveRegionRef,
  setScreenReaderMessage
}: UseTextFieldValidationProps) {
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message?: string; type?: 'error' | 'warning' | 'success' | 'info' } | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const validationDebounceRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const validationIdRef = useRef(0);
  // validateInput fonksiyonunu ref'e al
  const validateInputRef = useRef(validateInput);
  useEffect(() => {
    validateInputRef.current = validateInput;
  }, [validateInput]);

  const handleAsyncValidation = useCallback(async (input: string) => {
    if (!enableAsyncValidation || !validateInputRef.current || !input.trim()) {
      setValidationResult(null);
      setIsValidating(false);
      return;
    }
    if (validationDebounceRef.current) {
      clearTimeout(validationDebounceRef.current);
    }
    setIsValidating(true);
    const validationId = ++validationIdRef.current;
    validationDebounceRef.current = setTimeout(async () => {
      try {
        const result = await validateInputRef.current!(input);
        if (validationId === validationIdRef.current) {
          setValidationResult(result);
          setIsValidating(false);
          if (monitoring?.enableUsageAnalytics) {
            const monitor = monitoring.getMonitor ? monitoring.getMonitor() : undefined;
            monitor?.trackSearch?.(input);
          }
          if (keyboardNavigationAnnouncements && result.message) {
            const announcement = `${result.type === 'error' ? 'Error' : result.type === 'warning' ? 'Warning' : 'Success'}: ${result.message}`;
            announceToScreenReader(announcement, liveRegionRef, setScreenReaderMessage);
          }
        }
      } catch (err) {
        if (validationId === validationIdRef.current) {
          setValidationResult({
            isValid: false,
            message: 'Validation error',
            type: 'error'
          });
          setIsValidating(false);
          if (monitoring?.enableErrorTracking) {
            monitoring.trackError?.({
              type: 'validation_error',
              message: err instanceof Error ? err.message : 'Unknown validation error',
              inputValue: input,
              componentId: monitoring?.componentId || 'unknown',
            });
          }
        }
      }
    }, validationDebounceMs || 500);
    return () => {
      if (validationDebounceRef.current) {
        clearTimeout(validationDebounceRef.current);
      }
    };
  }, [enableAsyncValidation, validationDebounceMs, monitoring, keyboardNavigationAnnouncements, setScreenReaderMessage, liveRegionRef]);

  useEffect(() => {
    if (enableAsyncValidation && inputValue) {
      handleAsyncValidation(inputValue);
    } else if (enableAsyncValidation && !inputValue) {
      setValidationResult(null);
      setIsValidating(false);
    }
  }, [inputValue, enableAsyncValidation, handleAsyncValidation]);

  return { validationResult, isValidating, handleAsyncValidation };
}

export default useTextFieldValidation; 