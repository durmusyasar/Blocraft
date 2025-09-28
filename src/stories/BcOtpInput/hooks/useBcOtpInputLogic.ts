import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type {
  OtpInputState,
  OtpInteractionOptions,
  OtpSecurityOptions,
  OtpPerformanceOptions,
  OtpMonitoringCallbacks,
} from '../BcOtpInput.types';

/**
 * Hook Options Interface
 */
interface UseBcOtpInputLogicOptions {
  length: number;
  inputType: 'number' | 'text' | 'alphanumeric';
  value: string;
  isControlled: boolean;
  setInternalValue: (value: string) => void;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  validateOtp?: (value: string) => boolean | string | Promise<boolean | string>;
  autoClear?: boolean;
  autoFocusNext?: boolean;
  autoValidate?: boolean;
  validationDebounceMs?: number;
  monitoring?: OtpMonitoringCallbacks;
  interactionOptions?: OtpInteractionOptions;
  securityOptions?: OtpSecurityOptions;
  performanceOptions?: OtpPerformanceOptions;
}

/**
 * useBcOtpInputLogic Hook
 * 
 * OTP input component'inin ana mantık hook'u
 * - Input yönetimi
 * - Keyboard navigation
 * - Paste support
 * - Auto-clear functionality
 * - Performance optimizations
 * - Monitoring callbacks
 * - Security features
 */
export const useBcOtpInputLogic = (options: UseBcOtpInputLogicOptions) => {
  const {
    length,
    inputType,
    value,
    isControlled,
    setInternalValue,
    onChange,
    onComplete,
    validateOtp,
    autoClear,
    autoFocusNext = true, // Default true for better UX
    autoValidate,
    validationDebounceMs = 300,
    monitoring,
    interactionOptions,
    securityOptions,
    performanceOptions,
  } = options;

  // State management
  const [state, setState] = useState<OtpInputState>({
    value: value || '',
    focusedIndex: null,
    isValid: false,
    isValidating: false,
    error: null,
    success: false,
    loading: false,
    disabled: false,
    readonly: false,
    retryCount: 0,
    lastUpdate: Date.now(),
    inputRefs: [],
    containerRef: null,
  });

  // Refs
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(length).fill(null));
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const autoClearTimer = useRef<NodeJS.Timeout | null>(null);
  const performanceTimer = useRef<number | null>(null);
  const lastInputTime = useRef<number>(0);
  const inputHistory = useRef<Array<{ value: string; timestamp: number }>>([]);

  // Performance tracking
  const startPerformanceTimer = useCallback(() => {
    if (performanceOptions?.enablePerformanceTracking) {
      performanceTimer.current = performance.now();
    }
  }, [performanceOptions?.enablePerformanceTracking]);

  const endPerformanceTimer = useCallback((metric: string) => {
    if (performanceTimer.current && performanceOptions?.enablePerformanceTracking) {
      const duration = performance.now() - performanceTimer.current;
      monitoring?.onPerformanceMetric?.(metric, duration, Date.now());
      performanceTimer.current = null;
    }
  }, [performanceOptions?.enablePerformanceTracking, monitoring]);

  // Update state with performance tracking
  const updateState = useCallback((updates: Partial<OtpInputState>) => {
    startPerformanceTimer();
    setState(prev => ({ ...prev, ...updates, lastUpdate: Date.now() }));
    endPerformanceTimer('state-update');
  }, [startPerformanceTimer, endPerformanceTimer]);

  // Filter input based on type
  const filterInput = useCallback((input: string): string => {
    switch (inputType) {
      case 'number':
        return input.replace(/[^0-9]/g, '');
      case 'text':
        return input.replace(/[^a-zA-Z]/g, '');
      case 'alphanumeric':
        return input.replace(/[^a-zA-Z0-9]/g, '');
      default:
        return input;
    }
  }, [inputType]);

  // Handle input change
  const handleInputChange = useCallback((newValue: string, index: number) => {
    const startTime = performance.now();
    
    // Security: Anti-keylog protection
    if (securityOptions?.enableAntiKeylog) {
      // Add random delay to prevent keylog detection
      const randomDelay = Math.random() * 50;
      setTimeout(() => {
        // Inline processInputChange logic to avoid circular dependency
        const filteredValue = filterInput(newValue);
        const singleChar = filteredValue;
        
        const currentValue = value || '';
        let updatedValue = currentValue;
        
        if (singleChar) {
          updatedValue = currentValue.substring(0, index) + singleChar + currentValue.substring(index + 1);
        } else {
          updatedValue = currentValue.substring(0, index) + currentValue.substring(index + 1);
        }
        
        // Limit to max length
        if (updatedValue.length > length) {
          updatedValue = updatedValue.substring(0, length);
        }
        
        // Update state with auto focus next logic
        const nextFocusedIndex = autoFocusNext && singleChar 
          ? Math.min(index + 1, length - 1) 
          : index;
        
        updateState({
          value: updatedValue,
          focusedIndex: nextFocusedIndex,
        });
        
        // Update controlled/uncontrolled value
        if (isControlled) {
          onChange?.(updatedValue);
        } else {
          setInternalValue(updatedValue);
        }
        
        // Monitoring
        monitoring?.onInputChange?.(updatedValue, index, Date.now());
        
        // Performance tracking
        const duration = performance.now() - startTime;
        monitoring?.onPerformanceMetric?.('input-change', duration, Date.now());
        
        // Check for completion
        if (updatedValue.length === length) {
          onComplete?.(updatedValue);
          monitoring?.onComplete?.(updatedValue, Date.now());
          updateState({ success: true });
        }
        
        // Auto-clear timer
        if (autoClear && updatedValue.length > 0) {
          clearTimeout(autoClearTimer.current as NodeJS.Timeout);
          autoClearTimer.current = setTimeout(() => {
            setInternalValue('');
            updateState({ value: '', focusedIndex: 0 });
            monitoring?.onClear?.(Date.now());
          }, securityOptions?.clearDelay || 3000);
        }
        
        // Debounced validation
        if (autoValidate && validateOtp) {
          clearTimeout(debounceTimer.current as NodeJS.Timeout);
          debounceTimer.current = setTimeout(() => {
            Promise.resolve(validateOtp(updatedValue)).then((result: boolean | string) => {
              const isValid = typeof result === 'boolean' ? result : Boolean(result);
              const message = typeof result === 'string' ? result : undefined;
              
              updateState({
                isValid,
                error: isValid ? null : message || 'Invalid OTP',
                success: isValid,
              });
              
              if (isValid) {
                monitoring?.onSuccess?.(updatedValue, Date.now());
              } else {
                monitoring?.onError?.(message || 'Invalid OTP', Date.now());
              }
            }).catch((error: Error) => {
              updateState({
                isValid: false,
                error: error.message || 'Validation error',
                success: false,
              });
              monitoring?.onError?.(error.message || 'Validation error', Date.now());
            });
          }, validationDebounceMs);
        }
        
        lastInputTime.current = Date.now();
      }, randomDelay);
    } else {
      // Inline processInputChange logic to avoid circular dependency
      const filteredValue = filterInput(newValue);
      const singleChar = filteredValue;
      
      const currentValue = value || '';
      let updatedValue = currentValue;
      
      if (singleChar) {
        updatedValue = currentValue.substring(0, index) + singleChar + currentValue.substring(index + 1);
      } else {
        updatedValue = currentValue.substring(0, index) + currentValue.substring(index + 1);
      }
      
      // Limit to max length
      if (updatedValue.length > length) {
        updatedValue = updatedValue.substring(0, length);
      }
      
      // Update state with auto focus next logic
      const nextFocusedIndex = autoFocusNext && singleChar 
        ? Math.min(index + 1, length - 1) 
        : index;
      
      updateState({
        value: updatedValue,
        focusedIndex: nextFocusedIndex,
      });
      
      // Update controlled/uncontrolled value
      if (isControlled) {
        onChange?.(updatedValue);
      } else {
        setInternalValue(updatedValue);
      }
      
      // Monitoring
      monitoring?.onInputChange?.(updatedValue, index, Date.now());
      
      // Performance tracking
      const duration = performance.now() - startTime;
      monitoring?.onPerformanceMetric?.('input-change', duration, Date.now());
      
      // Check for completion
      if (updatedValue.length === length) {
        onComplete?.(updatedValue);
        monitoring?.onComplete?.(updatedValue, Date.now());
        updateState({ success: true });
      }
      
      // Auto-clear timer
      if (autoClear && updatedValue.length > 0) {
        clearTimeout(autoClearTimer.current as NodeJS.Timeout);
        autoClearTimer.current = setTimeout(() => {
          setInternalValue('');
          updateState({ value: '', focusedIndex: 0 });
          monitoring?.onClear?.(Date.now());
        }, securityOptions?.clearDelay || 3000);
      }
      
      // Debounced validation
      if (autoValidate && validateOtp) {
        clearTimeout(debounceTimer.current as NodeJS.Timeout);
        debounceTimer.current = setTimeout(() => {
          Promise.resolve(validateOtp(updatedValue)).then((result: boolean | string) => {
            const isValid = typeof result === 'boolean' ? result : Boolean(result);
            const message = typeof result === 'string' ? result : undefined;
            
            updateState({
              isValid,
              error: isValid ? null : message || 'Invalid OTP',
              success: isValid,
            });
            
            if (isValid) {
              monitoring?.onSuccess?.(updatedValue, Date.now());
            } else {
              monitoring?.onError?.(message || 'Invalid OTP', Date.now());
            }
          }).catch((error) => {
            updateState({
              isValid: false,
              error: error.message || 'Validation error',
              success: false,
            });
            monitoring?.onError?.(error.message || 'Validation error', Date.now());
          });
        }, validationDebounceMs);
      }
      
      lastInputTime.current = Date.now();
    }
  }, [
    securityOptions?.enableAntiKeylog,
    filterInput,
    value,
    length,
    updateState,
    isControlled,
    onChange,
    setInternalValue,
    monitoring,
    autoClear,
    autoFocusNext,
    securityOptions?.clearDelay,
    autoValidate,
    validateOtp,
    validationDebounceMs,
    onComplete,
  ]);


  // Handle completion
  const handleCompletion = useCallback((completedValue: string) => {
    updateState({ success: true });
    onComplete?.(completedValue);
    monitoring?.onComplete?.(completedValue, Date.now());
    
    // Auto-validate on completion
    if (autoValidate && validateOtp) {
      // Inline validation to avoid circular dependency
      Promise.resolve(validateOtp(completedValue)).then((result: boolean | string) => {
        const isValid = typeof result === 'boolean' ? result : Boolean(result);
        const message = typeof result === 'string' ? result : undefined;
        
        updateState({
          isValid,
          error: isValid ? null : message || 'Invalid OTP',
          success: isValid,
        });
        
        if (isValid) {
          monitoring?.onSuccess?.(completedValue, Date.now());
        } else {
          monitoring?.onError?.(message || 'Invalid OTP', Date.now());
        }
      }).catch((error: Error) => {
        updateState({
          isValid: false,
          error: error.message || 'Validation error',
          success: false,
        });
        monitoring?.onError?.(error.message || 'Validation error', Date.now());
      });
    }
  }, [updateState, onComplete, monitoring, autoValidate, validateOtp]);

  // Handle validation
  const handleValidation = useCallback(async (valueToValidate: string) => {
    if (!validateOtp) return;
    
    updateState({ isValidating: true });
    
    try {
      const result = await validateOtp(valueToValidate);
      const isValid = typeof result === 'boolean' ? result : Boolean(result);
      const message = typeof result === 'string' ? result : undefined;
      
      updateState({
        isValid,
        error: isValid ? null : message || 'Invalid OTP',
        success: isValid,
        isValidating: false,
      });
      
      if (isValid) {
        monitoring?.onSuccess?.(valueToValidate, Date.now());
      } else {
        monitoring?.onError?.(message || 'Invalid OTP', Date.now());
      }
      
      monitoring?.onValidation?.(isValid, valueToValidate, Date.now());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Validation error';
      updateState({
        isValid: false,
        error: errorMessage,
        success: false,
        isValidating: false,
      });
      
      monitoring?.onError?.(errorMessage, Date.now());
    }
  }, [validateOtp, updateState, monitoring]);

  // Focus input by index
  const focusInput = useCallback((index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, index: number) => {
    if (!interactionOptions?.enableKeyboardNavigation) return;
    
    const { key } = event;
    let newIndex = index;
    let direction: 'left' | 'right' | 'up' | 'down' | null = null;
    
    switch (key) {
      case 'ArrowLeft':
        newIndex = Math.max(0, index - 1);
        direction = 'left';
        event.preventDefault();
        break;
      case 'ArrowRight':
        newIndex = Math.min(length - 1, index + 1);
        direction = 'right';
        event.preventDefault();
        break;
      case 'ArrowUp':
        newIndex = Math.max(0, index - 1);
        direction = 'up';
        event.preventDefault();
        break;
      case 'ArrowDown':
        newIndex = Math.min(length - 1, index + 1);
        direction = 'down';
        event.preventDefault();
        break;
      case 'Backspace':
        if (index > 0 && (!value || index >= value.length)) {
          newIndex = index - 1;
          direction = 'left';
        }
        break;
      case 'Delete':
        if (index < length - 1) {
          newIndex = index + 1;
          direction = 'right';
        }
        break;
      case 'Home':
        newIndex = 0;
        direction = 'left';
        event.preventDefault();
        break;
      case 'End':
        newIndex = length - 1;
        direction = 'right';
        event.preventDefault();
        break;
      case 'Tab':
        // Let default behavior handle tab navigation
        return;
      default:
        // Handle character input
        if (key.length === 1) {
          handleInputChange(key, index);
          // Move to next input if current is filled
          if (value && index < value.length) {
            newIndex = Math.min(length - 1, index + 1);
            direction = 'right';
          }
        }
        break;
    }
    
    // Update focus
    if (newIndex !== index) {
      updateState({ focusedIndex: newIndex });
      focusInput(newIndex);
      
      if (direction) {
        monitoring?.onKeyboardNavigation?.(direction, Date.now());
      }
    }
  }, [
    interactionOptions?.enableKeyboardNavigation,
    length,
    value,
    handleInputChange,
    updateState,
    monitoring,
    focusInput,
  ]);


  // Handle focus
  const handleFocus = useCallback((index: number) => {
    updateState({ focusedIndex: index });
    monitoring?.onFocus?.(index, Date.now());
    
    // Actually focus the DOM element
    setTimeout(() => {
      focusInput(index);
    }, 0);
  }, [updateState, monitoring, focusInput]);

  // Handle blur
  const handleBlur = useCallback((index: number) => {
    updateState({ focusedIndex: null });
    monitoring?.onBlur?.(index, Date.now());
    
    // Validate on blur if enabled
    if (interactionOptions?.validateOnBlur && validateOtp) {
      handleValidation(value || '');
    }
  }, [updateState, monitoring, interactionOptions?.validateOnBlur, validateOtp, value, handleValidation]);

  // Handle paste
  const handlePaste = useCallback((event: React.ClipboardEvent) => {
    if (!interactionOptions?.enablePasteSupport) return;
    
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    const filteredText = filterInput(pastedText).slice(0, length);
    
    updateState({
      value: filteredText,
      focusedIndex: Math.min(filteredText.length, length - 1),
    });
    
    if (isControlled) {
      onChange?.(filteredText);
    } else {
      setInternalValue(filteredText);
    }
    
    monitoring?.onPaste?.(filteredText, Date.now());
    
    // Focus last filled input
    if (filteredText.length > 0) {
      setTimeout(() => {
        focusInput(Math.min(filteredText.length - 1, length - 1));
      }, 0);
    }
    
    // Check for completion
    if (filteredText.length === length) {
      handleCompletion(filteredText);
    }
  }, [
    interactionOptions?.enablePasteSupport,
    filterInput,
    length,
    updateState,
    isControlled,
    onChange,
    setInternalValue,
    monitoring,
    focusInput,
    handleCompletion,
  ]);

  // Handle clear
  const handleClear = useCallback(() => {
    updateState({
      value: '',
      focusedIndex: 0,
      isValid: false,
      error: null,
      success: false,
      retryCount: 0,
    });
    
    if (isControlled) {
      onChange?.('');
    } else {
      setInternalValue('');
    }
    
    monitoring?.onClear?.(Date.now());
    
    // Focus first input
    setTimeout(() => {
      focusInput(0);
    }, 0);
  }, [updateState, isControlled, onChange, setInternalValue, monitoring, focusInput]);

  // Handle retry
  const handleRetry = useCallback(() => {
    const newRetryCount = state.retryCount + 1;
    updateState({
      retryCount: newRetryCount,
      error: null,
      isValid: false,
      success: false,
    });
    
    monitoring?.onRetry?.(newRetryCount, Date.now());
    
    // Focus first input
    setTimeout(() => {
      focusInput(0);
    }, 0);
  }, [state.retryCount, updateState, monitoring, focusInput]);

  // Public methods
  const methods = useMemo(() => ({
    focus: (index = 0) => {
      focusInput(index);
    },
    blur: (index = state.focusedIndex) => {
      if (index !== null) {
        const input = inputRefs.current[index];
        if (input) {
          input.blur();
        }
      }
    },
    clear: handleClear,
    validate: () => handleValidation(value || ''),
    reset: () => {
      updateState({
        value: '',
        focusedIndex: null,
        isValid: false,
        isValidating: false,
        error: null,
        success: false,
        retryCount: 0,
      });
    },
    getValue: () => value || '',
    setValue: (newValue: string) => {
      const filteredValue = filterInput(newValue).slice(0, length);
      updateState({ value: filteredValue });
      
      if (isControlled) {
        onChange?.(filteredValue);
      } else {
        setInternalValue(filteredValue);
      }
    },
    getState: () => state,
    getPerformanceMetrics: () => ({
      renderTime: 0, // Will be filled by component
      updateTime: Date.now() - state.lastUpdate,
      validationTime: 0, // Will be filled by validation hook
      focusTime: 0,
      blurTime: 0,
      inputTime: Date.now() - lastInputTime.current,
      pasteTime: 0,
      clearTime: 0,
      memoryUsage: 0,
      cpuUsage: 0,
    }),
    getAnalyticsData: () => ({
      sessionId: `otp-${Date.now()}`,
      componentId: `otp-input-${length}`,
      events: inputHistory.current.map(entry => ({
        type: 'input-change',
        timestamp: entry.timestamp,
        data: { value: entry.value },
      })),
      performance: {
        renderTime: 0,
        updateTime: Date.now() - state.lastUpdate,
        validationTime: 0,
        focusTime: 0,
        blurTime: 0,
        inputTime: Date.now() - lastInputTime.current,
        pasteTime: 0,
        clearTime: 0,
        memoryUsage: 0,
        cpuUsage: 0,
      },
      errors: [],
      userBehavior: {
        totalInputs: inputHistory.current.length,
        totalValidations: 0,
        totalErrors: state.error ? 1 : 0,
        totalSuccesses: state.success ? 1 : 0,
        averageInputTime: 0,
        averageValidationTime: 0,
        mostUsedFeatures: ['keyboard-navigation', 'paste'],
        accessibilityUsage: {},
      },
    }),
    exportData: () => ({
      value: value || '',
      state,
      inputHistory: inputHistory.current,
      lastUpdate: state.lastUpdate,
    }),
    importData: (data: Record<string, unknown>) => {
      if (typeof data.value === 'string') {
        methods.setValue(data.value);
      }
    },
  }), [
    focusInput,
    state,
    handleClear,
    handleValidation,
    updateState,
    filterInput,
    length,
    isControlled,
    onChange,
    setInternalValue,
    value,
  ]);

  // Handlers object
  const handlers = useMemo(() => ({
    handleInputChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleKeyUp: (event: React.KeyboardEvent, index: number) => {
      // Key up handler can be extended for additional functionality
      // Key up handler can be extended for additional functionality
      // monitoring?.onKeyboardNavigation?.('key-up', Date.now());
    },
    handlePaste,
    handleClear,
    handleRetry,
    handleValidation,
  }), [
    handleInputChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handlePaste,
    handleClear,
    handleRetry,
    handleValidation,
  ]);

  // Refs object
  const refs = useMemo(() => ({
    inputRefs: inputRefs.current.map((_, index) => ({
      current: inputRefs.current[index],
    })),
    containerRef: { current: containerRef.current },
  }), []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (autoClearTimer.current) {
        clearTimeout(autoClearTimer.current);
      }
    };
  }, []);

  // Update state when controlled value changes
  useEffect(() => {
    if (isControlled && value !== state.value) {
      updateState({ value: value || '' });
    }
  }, [isControlled, value, state.value, updateState]);

  return {
    state,
    methods,
    handlers,
    refs,
    analytics: methods.getAnalyticsData(),
    performance: methods.getPerformanceMetrics(),
  };
};

export default useBcOtpInputLogic;