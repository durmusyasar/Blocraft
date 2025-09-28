import React, { forwardRef, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { Box, InputBase, Typography, useTheme } from '@mui/material';
import { getTranslation } from '../i18n/i18nHelpers';
import { BcOtpInputProps } from './BcOtpInput.types';
import { getAppearanceStyles } from './styles';

export const BcOtpInput = forwardRef<HTMLDivElement, BcOtpInputProps>((props, ref) => {
  const theme = useTheme();
  
  // Destructure OTP-specific props
  const {
    length = 6,
    otpValue = '',
    onOtpChange,
    onOtpComplete,
    inputType = 'number',
    inputShape = 'square',
    inputSize = 'medium',
    mask = false,
    maskCharacter = '•',
    autoFocusNext = true,
    // Extract BcTextField props (rest)
    ...textFieldProps
  } = props;

  // Memoize textFieldProps to prevent unnecessary re-renders
  const memoizedTextFieldProps = useMemo(() => textFieldProps, [textFieldProps]);

  // Local state for OTP values
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(''));

  // Use refs to store callbacks to prevent infinite re-renders
  const onOtpChangeRef = useRef(onOtpChange);
  const onOtpCompleteRef = useRef(onOtpComplete);
  
  // Update refs when callbacks change
  onOtpChangeRef.current = onOtpChange;
  onOtpCompleteRef.current = onOtpComplete;

  // Initialize OTP values from prop
  useEffect(() => {
    if (otpValue) {
      const valueArray = otpValue.split('').slice(0, length);
      const paddedArray = [...valueArray, ...Array(length - valueArray.length).fill('')];
      setOtpValues(prevValues => {
        // Only update if the values are actually different
        const isDifferent = paddedArray.some((val, index) => val !== prevValues[index]);
        return isDifferent ? paddedArray : prevValues;
      });
    }
  }, [otpValue, length]);

  // Handle input change
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;
    
    // Filter input based on inputType
    let filteredValue = value;
    if (inputType === 'number') {
      filteredValue = value.replace(/[^0-9]/g, '');
    } else if (inputType === 'alphanumeric') {
      filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
    }

    // Take only the last character if multiple characters are entered
    const newValue = filteredValue.slice(-1);

    setOtpValues(prevValues => {
      const newOtpValues = [...prevValues];
      newOtpValues[index] = newValue;
      const otpString = newOtpValues.join('');
      
      onOtpChangeRef.current?.(otpString);
      
      // Check if OTP is complete
      if (otpString.length === length) {
        onOtpCompleteRef.current?.(otpString);
      }
      
      return newOtpValues;
    });

    // Auto focus next input only if we actually entered a character
    if (autoFocusNext && newValue && index < length - 1) {
      setTimeout(() => {
        const nextInput = document.querySelector(`[data-testid="otp-input-${index + 1}"]`) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        }
      }, 100);
    }
  }, [inputType, length, autoFocusNext]);

  // Handle key down
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace') {
      setOtpValues(prevValues => {
        if (!prevValues[index] && index > 0) {
          // Move to previous input if current is empty
          setTimeout(() => {
            const prevInput = document.querySelector(`[data-testid="otp-input-${index - 1}"]`) as HTMLInputElement;
            if (prevInput) {
              prevInput.focus();
            }
          }, 0);
        }
        return prevValues;
      });
    } else if (event.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.querySelector(`[data-testid="otp-input-${index - 1}"]`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    } else if (event.key === 'ArrowRight' && index < length - 1) {
      const nextInput = document.querySelector(`[data-testid="otp-input-${index + 1}"]`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }, [length]);

  // Get helper text ID
  const helperId = useMemo(() => `otp-helper-${Math.random().toString(36).substr(2, 9)}`, []);

  // Get translated text
  const getText = useCallback((key: string) => {
    return getTranslation(key, memoizedTextFieldProps.locale || 'en', memoizedTextFieldProps.translations, memoizedTextFieldProps.fallbackLocale || 'en');
  }, [memoizedTextFieldProps.locale, memoizedTextFieldProps.fallbackLocale, memoizedTextFieldProps.translations]);

  // Memoize appearance styles to prevent unnecessary re-renders
  const appearanceStyles = useMemo(() => 
    getAppearanceStyles(
      theme,
      memoizedTextFieldProps.appearance || 'premium',
      inputSize,
      inputShape,
      memoizedTextFieldProps.status,
      memoizedTextFieldProps.disabled || false
    ), 
    [theme, memoizedTextFieldProps.appearance, inputSize, inputShape, memoizedTextFieldProps.status, memoizedTextFieldProps.disabled]
  );


  // Render OTP inputs
  const otpInputs = useMemo(() => {
    return Array.from({ length }).map((_, index) => {
      const inputValue = otpValues[index] || '';
      const displayValue = mask ? maskCharacter : inputValue;
      
      return (
        <InputBase
          key={index}
          value={displayValue}
          onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, index)}
          onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>, index)}
          disabled={memoizedTextFieldProps.disabled}
          type={mask ? 'password' : inputType === 'number' ? 'tel' : 'text'}
          className="otp-input"
          inputProps={{
            'aria-label': `OTP digit ${index + 1}`,
            'aria-describedby': helperId,
            'data-testid': `otp-input-${index}`,
          }}
          sx={appearanceStyles}
        />
      );
    });
  }, [
    length,
    otpValues,
    mask,
    maskCharacter,
    inputType,
    handleInputChange,
    handleKeyDown,
    helperId,
    appearanceStyles,
    memoizedTextFieldProps.disabled,
  ]);

  // Use BcTextField for styling and structure, but render our custom OTP inputs
  return (
    <Box
      ref={ref}
      className={memoizedTextFieldProps.className}
      id={memoizedTextFieldProps.id}
      data-testid={`otp-container-${memoizedTextFieldProps.id || 'default'}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        ...memoizedTextFieldProps.sx,
      }}
    >
      {/* Label */}
      {memoizedTextFieldProps.label && (
        <Typography
          variant="body2"
          sx={{
            color: memoizedTextFieldProps.status === 'error' ? theme.palette.error.main : theme.palette.text.primary,
            fontWeight: 500,
          }}
        >
          {getText(String(memoizedTextFieldProps.label))}
        </Typography>
      )}

      {/* OTP Inputs Container */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {otpInputs}
      </Box>

      {/* Helper Text */}
      {(memoizedTextFieldProps.helperText || memoizedTextFieldProps.statusMessage) && (
        <Typography
          id={helperId}
          variant="caption"
          sx={{
            color: memoizedTextFieldProps.status === 'error' 
              ? theme.palette.error.main 
              : memoizedTextFieldProps.status === 'success' 
              ? theme.palette.success.main 
              : theme.palette.text.secondary,
            fontSize: '0.75rem',
          }}
        >
          {memoizedTextFieldProps.statusMessage || getText(String(memoizedTextFieldProps.helperText))}
        </Typography>
      )}
    </Box>
  );
});

BcOtpInput.displayName = 'BcOtpInput';