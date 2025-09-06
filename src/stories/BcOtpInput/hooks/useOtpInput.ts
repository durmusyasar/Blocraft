import { useCallback, useRef } from 'react';
import { useOtpMonitoring } from './useOtpMonitoring';

export interface UseOtpInputProps {
  length: number;
  value: string;
  isControlled: boolean;
  setInternalValue: (value: string) => void;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  autoClear?: boolean;
  autoValidate?: boolean;
  validateOtp?: (value: string) => boolean | Promise<boolean>;
  validationDebounceMs?: number;
  monitoring?: {
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    onClear?: () => void;
    onError?: (error: Error) => void;
    onPerformance?: (metrics: any) => void;
  };
}

export const useOtpInput = ({
  length,
  value,
  isControlled,
  setInternalValue,
  onChange,
  onComplete,
  autoClear,
  autoValidate,
  validateOtp,
  validationDebounceMs = 300,
  monitoring,
}: UseOtpInputProps) => {
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Monitoring hook
  const otpMonitoring = useOtpMonitoring({
    monitoring,
    enableAdvancedMonitoring: true,
    value,
    length,
  });

  const handleChange = useCallback((idx: number, val: string) => {
    if (!/^[0-9a-zA-Z]?$/.test(val)) return;
    
    let chars = value.split("");
    chars[idx] = val;
    const newVal = chars.join("");
    
    if (!isControlled) setInternalValue(newVal);
    if (onChange) onChange(newVal);
    
    // Monitoring
    if (monitoring?.onChange) {
      try {
        monitoring.onChange(newVal);
      } catch (err) {
        if (monitoring.onError) monitoring.onError(err as Error);
      }
    }
    
    // Advanced monitoring
    otpMonitoring.trackChange(newVal);

    // Auto complete check
    if (newVal.length === length && onComplete) {
      onComplete(newVal);
      
      if (monitoring?.onComplete) {
        try {
          monitoring.onComplete(newVal);
        } catch (err) {
          if (monitoring.onError) monitoring.onError(err as Error);
        }
      }
      
      // Advanced monitoring
      otpMonitoring.trackComplete(newVal);
    }

    // Auto validation
    if (autoValidate && validateOtp && newVal.length === length) {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
      
      validationTimeoutRef.current = setTimeout(async () => {
        try {
          const isValid = await validateOtp(newVal);
          if (isValid && autoClear) {
            if (!isControlled) setInternalValue("".padEnd(length, ""));
            if (onChange) onChange("".padEnd(length, ""));
          }
        } catch (err) {
          if (monitoring?.onError) monitoring.onError(err as Error);
        }
      }, validationDebounceMs);
    }
  }, [
    length,
    value,
    isControlled,
    setInternalValue,
    onChange,
    onComplete,
    autoClear,
    autoValidate,
    validateOtp,
    validationDebounceMs,
    monitoring,
    otpMonitoring,
  ]);

  const handleClear = useCallback(() => {
    if (!isControlled) setInternalValue("".padEnd(length, ""));
    if (onChange) onChange("".padEnd(length, ""));
    
    if (monitoring?.onClear) {
      try {
        monitoring.onClear();
      } catch (err) {
        if (monitoring.onError) monitoring.onError(err as Error);
      }
    }
    
    // Advanced monitoring
    otpMonitoring.trackClear();
  }, [length, isControlled, setInternalValue, onChange, monitoring, otpMonitoring]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    // This will be handled by useOtpKeyboard
  }, []);

  const handleArrowLeft = useCallback((idx: number) => {
    return idx > 0;
  }, []);

  const handleArrowRight = useCallback((idx: number) => {
    return idx < length - 1;
  }, [length]);

  const handleBackspace = useCallback((idx: number) => {
    if (value[idx]) {
      handleChange(idx, "");
    } else if (idx > 0) {
      handleChange(idx - 1, "");
    }
  }, [value, handleChange]);

  const handleEnter = useCallback(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const handlePaste = useCallback((pasted: string) => {
    const cleanPasted = pasted.replace(/\s/g, "").slice(0, length);
    if (!/^[0-9a-zA-Z]+$/.test(cleanPasted)) return false;
    
    const newVal = cleanPasted.padEnd(length, "");
    if (!isControlled) setInternalValue(newVal);
    if (onChange) onChange(newVal);
    
    if (monitoring?.onChange) {
      try {
        monitoring.onChange(newVal);
      } catch (err) {
        if (monitoring.onError) monitoring.onError(err as Error);
      }
    }
    
    return true;
  }, [length, isControlled, setInternalValue, onChange, monitoring]);

  const handleFocus = useCallback((idx: number) => {
    // Focus handling logic
  }, []);

  const handleBlur = useCallback((idx: number) => {
    // Blur handling logic
  }, []);

  const handleArrowUp = useCallback((idx: number, currentValue: string) => {
    const currentDigit = currentValue || '0';
    let newDigit: string;
    
    if (currentDigit === '9') {
      newDigit = '0';
    } else if (currentDigit === '') {
      newDigit = '1';
    } else {
      newDigit = String(parseInt(currentDigit) + 1);
    }
    
    handleChange(idx, newDigit);
  }, [handleChange]);

  const handleArrowDown = useCallback((idx: number, currentValue: string) => {
    const currentDigit = currentValue || '0';
    let newDigit: string;
    
    if (currentDigit === '0') {
      newDigit = '9';
    } else if (currentDigit === '') {
      newDigit = '9';
    } else {
      newDigit = String(parseInt(currentDigit) - 1);
    }
    
    handleChange(idx, newDigit);
  }, [handleChange]);

  return {
    handleChange,
    handleClear,
    handleKeyDown,
    handleArrowLeft,
    handleArrowRight,
    handleArrowUp,
    handleArrowDown,
    handleBackspace,
    handleEnter,
    handlePaste,
    handleFocus,
    handleBlur,
  };
};
