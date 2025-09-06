import React, { useRef, useState, forwardRef, useCallback, useMemo } from "react";
import { Box, InputBase, Typography, CircularProgress, useTheme } from "@mui/material";
import type { BcTextFieldProps } from "../BcTextField/BcTextField";
import { getTranslation } from "../i18n/i18nHelpers";
import { getStatusIconAndColor } from './hooks/useStatusIcon';
import { useOtpInput } from './hooks/useOtpInput';
import { useOtpValidation } from './hooks/useOtpValidation';
import { useOtpKeyboard } from './hooks/useOtpKeyboard';
import { useOtpFocus } from './hooks/useOtpFocus';
import { useOtpI18n } from './hooks/useOtpI18n';
import OtpInputErrorBoundary from './ErrorBoundary';
import { useOtpAppearance } from "./hooks/useOtpAppearance";
import { useOtpPaste } from "./hooks/useOtpPaste";
import { useOtpResponsive } from "./hooks/useOtpResponsive";
import { getTranslationsObject } from "./hooks/useTranslationsObject";
import { useOtpAccessibilityEnhanced } from "./hooks/useOtpAccessibilityEnhanced";
import { useOtpBiometric } from "./hooks/useOtpBiometric";
import { useOtpQRCode } from "./hooks/useOtpQRCode";
import { useOtpSMS } from "./hooks/useOtpSMS";
import { useOtpDebug } from "./hooks/useOtpDebug";
import { useOtpMetrics } from "./hooks/useOtpMetrics";
import { useOtpAnimations } from "./hooks/useOtpAnimations";
import { useOtpCustomization } from "./hooks/useOtpCustomization";
import { useOtpVoiceInput } from "./hooks/useOtpVoiceInput";
import { useOtpCamera } from "./hooks/useOtpCamera";
import { useOtpNFC } from "./hooks/useOtpNFC";
import { useOtpBluetooth } from "./hooks/useOtpBluetooth";
import { useOtpSecurity } from "./hooks/useOtpSecurity";
import { useOtpMobile } from "./hooks/useOtpMobile";
import { useOtpPerformance } from "./hooks/useOtpPerformance";
import { useOtpIntegration } from "./hooks/useOtpIntegration";
import { useOtpUI } from "./hooks/useOtpUI";
import { useOtpData } from "./hooks/useOtpData";
import { useOtpAnalytics } from "./hooks/useOtpAnalytics";

export interface BcOtpInputProps extends Omit<BcTextFieldProps, "type" | "value" | "onChange"> {
  /** OTP uzunluğu */
  length?: number;
  /** OTP değeri */
  value?: string;
  /** OTP değiştiğinde çağrılır */
  onChange?: (value: string) => void;
  /** OTP temizlendiğinde çağrılır */
  onClear?: () => void;
  /** OTP doğrulandığında çağrılır */
  onComplete?: (value: string) => void;
  /** OTP doğrulama fonksiyonu */
  validateOtp?: (value: string) => boolean | Promise<boolean>;
  /** Maskelenmiş input (şifre gibi) */
  mask?: boolean;
  /** Input tipi */
  inputType?: "number" | "text";
  /** Otomatik odaklanma */
  autoFocus?: boolean;
  /** Otomatik temizleme (tamamlandıktan sonra) */
  autoClear?: boolean;
  /** Otomatik doğrulama */
  autoValidate?: boolean;
  /** Doğrulama debounce süresi */
  validationDebounceMs?: number;
  /** İzleme fonksiyonları */
  monitoring?: {
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    onClear?: () => void;
    onError?: (error: Error) => void;
    onPerformance?: (metrics: any) => void;
  };
  /** Gelişmiş özellikler */
  enableAdvancedFeatures?: boolean;
  enableKeyboardShortcuts?: boolean;
  enableAutoComplete?: boolean;
  enableHapticFeedback?: boolean;
  enableAdvancedMonitoring?: boolean;
  enableMobileOptimizations?: boolean;
  enableAdvancedI18n?: boolean;
  enableThemeAwareStyles?: boolean;
  enableNFC?: boolean;
  enableBluetooth?: boolean;
  /** Enhanced Accessibility */
  enableHighContrast?: boolean;
  enableReducedMotion?: boolean;
  enableVoiceInput?: boolean;
  enableScreenReaderAnnouncements?: boolean;
  /** Advanced Features */
  enableBiometric?: boolean;
  enableQRCode?: boolean;
  enableSMS?: boolean;
  phoneNumber?: string;
  qrCodeData?: string;
  /** Developer Experience */
  enableDebug?: boolean;
  enableMetrics?: boolean;
  onDebugLog?: (message: string, data?: any) => void;
  onPerformanceIssue?: (issue: any) => void;
  /** Animations */
  enableAnimations?: boolean;
  animationDuration?: number;
  enableSuccessAnimation?: boolean;
  enableErrorAnimation?: boolean;
  enableLoadingAnimation?: boolean;
  enableFocusAnimation?: boolean;
  /** Customization */
  inputShape?: 'square' | 'circle' | 'hexagon' | 'rounded';
  inputSize?: 'small' | 'medium' | 'large' | 'xlarge';
  customTheme?: 'light' | 'dark' | 'high-contrast' | 'auto';
  enableCustomColors?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  errorColor?: string;
  successColor?: string;
  warningColor?: string;
  infoColor?: string;
  enableGradient?: boolean;
  enableGlow?: boolean;
  enableShadow?: boolean;
}

const BcOtpInputInner = forwardRef<HTMLDivElement, BcOtpInputProps>(
  (
    {
      length = 6,
      value,
      defaultValue = "",
      onChange,
      onClear,
      onComplete,
      validateOtp,
      label = "OTP",
      status,
      statusMessage,
      helperText,
      showClearButton = false,
      loading = false,
      disabled = false,
      responsiveWidth = true,
      autoFocus = false,
      mask = false,
      inputType = "number",
      autoClear = false,
      autoValidate = false,
      validationDebounceMs = 300,
      monitoring,
      enableAdvancedFeatures = false,
      enableKeyboardShortcuts = true,
      enableAutoComplete = true,
      enableHapticFeedback = true,
      enableAdvancedMonitoring = false,
      enableMobileOptimizations = true,
      enableAdvancedI18n = false,
      enableThemeAwareStyles = true,
      enableNFC = false,
      enableBluetooth = false,
      enableHighContrast = false,
      enableReducedMotion = false,
      enableVoiceInput = false,
      enableScreenReaderAnnouncements = true,
      enableBiometric = false,
      enableQRCode = false,
      enableSMS = false,
      phoneNumber,
      qrCodeData,
      enableDebug = false,
      enableMetrics = false,
      onDebugLog,
      onPerformanceIssue,
      enableAnimations = true,
      animationDuration = 300,
      enableSuccessAnimation = true,
      enableErrorAnimation = true,
      enableLoadingAnimation = true,
      enableFocusAnimation = true,
      inputShape = 'square',
      inputSize = 'medium',
      customTheme = 'auto',
      enableCustomColors = false,
      primaryColor = '#1976d2',
      secondaryColor = '#424242',
      errorColor = '#f44336',
      successColor = '#4caf50',
      warningColor = '#ff9800',
      infoColor = '#2196f3',
      enableGradient = false,
      enableGlow = false,
      enableShadow = true,
      appearance,
      locale = 'en',
      fallbackLocale = 'en',
      translations,
      ...rest
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(String(defaultValue || "").padEnd(length, ""));
    const otpValue = isControlled ? (value ?? "").padEnd(length, "") : internalValue;
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    // i18n desteği - memoized for performance
    const translationsObj = useMemo(() => getTranslationsObject(translations), [translations]);
    const i18nLabel = useMemo(() => 
      label || getTranslation('label', locale, translationsObj, fallbackLocale), 
      [label, locale, translationsObj, fallbackLocale]
    );
    const i18nHelperText = useMemo(() => 
      helperText || getTranslation('helperText', locale, translationsObj, fallbackLocale), 
      [helperText, locale, translationsObj, fallbackLocale]
    );
    const i18nStatusMessage = statusMessage;

    // Custom hooks
    const otpInput = useOtpInput({
      length,
      value: otpValue,
      isControlled,
      setInternalValue,
      onChange,
      onComplete,
      autoClear,
      autoValidate,
      validateOtp,
      validationDebounceMs,
      monitoring,
    });

    // OTP validation hook
    const otpValidation = useOtpValidation({
      value: otpValue,
      validateOtp,
      autoValidate,
      validationDebounceMs,
      monitoring,
    });

    const otpKeyboard = useOtpKeyboard({
      inputsRef,
      length,
      onKeyDown: otpInput.handleKeyDown,
      onArrowLeft: otpInput.handleArrowLeft,
      onArrowRight: otpInput.handleArrowRight,
      onArrowUp: otpInput.handleArrowUp,
      onArrowDown: otpInput.handleArrowDown,
      onBackspace: otpInput.handleBackspace,
      onEnter: otpInput.handleEnter,
      enabled: enableKeyboardShortcuts,
    });

    const otpPaste = useOtpPaste({
      length,
      onPaste: otpInput.handlePaste,
      inputType,
    });

    const otpFocus = useOtpFocus({
      inputsRef,
      length,
      autoFocus,
      onFocus: otpInput.handleFocus,
      onBlur: otpInput.handleBlur,
    });



    const otpAppearance = useOtpAppearance({
      appearance,
      status,
      disabled,
      loading,
      enableThemeAwareStyles,
    });

    const otpResponsive = useOtpResponsive({
      responsiveWidth,
      enableMobileOptimizations,
    });

    const otpI18n = useOtpI18n({
      locale,
      fallbackLocale,
      translations,
      enableAdvancedI18n,
    });

    // Status ikonunu ayarla - validation sonucuna göre (memoized)
    const finalStatus = useMemo(() => 
      otpValidation.validationResult ? (otpValidation.validationResult.isValid ? 'success' : 'error') : status,
      [otpValidation.validationResult, status]
    );

    const muiTheme = useTheme();

    // Enhanced accessibility
    const otpAccessibilityEnhanced = useOtpAccessibilityEnhanced({
      length,
      value: otpValue,
      status: finalStatus,
      disabled,
      loading,
      locale,
      fallbackLocale,
      translations,
      enableHighContrast,
      enableReducedMotion,
      enableVoiceInput,
      enableScreenReaderAnnouncements,
    });

    // Advanced features
    const otpBiometric = useOtpBiometric({
      enableBiometric,
      onBiometricSuccess: (otp) => {
        // Auto-fill OTP from biometric
        if (onChange) onChange(otp);
      },
      onBiometricError: (error) => {
        console.error('Biometric authentication failed:', error);
      },
    });

    const otpQRCode = useOtpQRCode({
      enableQRCode,
      qrCodeData: qrCodeData || otpValue,
      onQRCodeGenerated: (url) => {
        console.log('QR Code generated:', url);
      },
      onQRCodeError: (error) => {
        console.error('QR Code generation failed:', error);
      },
    });

    const otpSMS = useOtpSMS({
      enableSMS,
      phoneNumber,
      onSMSSent: (phone) => {
        console.log('SMS sent to:', phone);
      },
      onSMSError: (error) => {
        console.error('SMS sending failed:', error);
      },
      onSMSReceived: (otp) => {
        if (onChange) onChange(otp);
      },
    });

    // Developer experience
    const otpDebug = useOtpDebug({
      enableDebug,
      componentName: 'BcOtpInput',
      onDebugLog,
    });

    const otpMetrics = useOtpMetrics({
      enableMetrics,
      onMetricUpdate: (metrics) => {
        console.log('OTP Metrics:', metrics);
      },
      onPerformanceIssue,
    });

    // Animations
    const otpAnimations = useOtpAnimations({
      enableAnimations,
      animationDuration,
      enableSuccessAnimation,
      enableErrorAnimation,
      enableLoadingAnimation,
      enableFocusAnimation,
      onAnimationComplete: (animationType) => {
        console.log('Animation completed:', animationType);
      },
    });

    // Customization
    const otpCustomization = useOtpCustomization({
      inputShape,
      inputSize,
      theme: customTheme,
      enableCustomColors,
      primaryColor,
      secondaryColor,
      errorColor,
      successColor,
      warningColor,
      infoColor,
      enableGradient,
      enableGlow,
      enableShadow,
    });

    // Voice Input
    const otpVoiceInput = useOtpVoiceInput({
      enableVoiceInput,
      onVoiceResult: (text) => {
        if (onChange) onChange(text);
      },
      onVoiceError: (error) => {
        console.error('Voice input error:', error);
      },
    });

    // Camera Integration
    const otpCamera = useOtpCamera({
      enableCamera: enableQRCode,
      onQRCodeDetected: (code) => {
        if (onChange) onChange(code);
      },
      onCameraError: (error) => {
        console.error('Camera error:', error);
      },
    });

    // NFC Support
    const otpNFC = useOtpNFC({
      enableNFC: enableBiometric,
      onNFCMessage: (message) => {
        if (onChange) onChange(message);
      },
      onNFCError: (error) => {
        console.error('NFC error:', error);
      },
    });

    // Bluetooth Integration
    const otpBluetooth = useOtpBluetooth({
      enableBluetooth: enableBiometric,
      onBluetoothMessage: (message) => {
        if (onChange) onChange(message);
      },
      onBluetoothError: (error) => {
        console.error('Bluetooth error:', error);
      },
    });

    // Security Enhancements
    const otpSecurity = useOtpSecurity({
      enableSecurity: true,
      onSecurityViolation: (violation) => {
        console.warn('Security violation:', violation);
      },
      onSecurityError: (error) => {
        console.error('Security error:', error);
      },
    });

    // Mobile Enhancements
    const otpMobile = useOtpMobile({
      enableMobileOptimizations,
      onHapticFeedback: (type) => {
        console.log('Haptic feedback:', type);
      },
      onTouchGesture: (gesture) => {
        console.log('Touch gesture:', gesture);
      },
      onSwipeGesture: (direction) => {
        console.log('Swipe gesture:', direction);
      },
    });

    // Performance Optimizations
    const otpPerformance = useOtpPerformance({
      enablePerformanceOptimizations: true,
      onPerformanceIssue: (issue) => {
        console.warn('Performance issue:', issue);
      },
      onPerformanceMetric: (metric) => {
        console.log('Performance metric:', metric);
      },
    });

    // Integration Features
    const otpIntegration = useOtpIntegration({
      enableIntegration: true,
      onIntegrationError: (error) => {
        console.error('Integration error:', error);
      },
      onIntegrationSuccess: (type) => {
        console.log('Integration success:', type);
      },
    });

    // UI/UX Improvements
    const otpUI = useOtpUI({
      enableUIEnhancements: true,
      onUIInteraction: (interaction) => {
        console.log('UI interaction:', interaction);
      },
      onUIError: (error) => {
        console.error('UI error:', error);
      },
    });

    // Data Management
    const otpData = useOtpData({
      enableDataManagement: true,
      onDataError: (error) => {
        console.error('Data error:', error);
      },
      onDataSuccess: (operation) => {
        console.log('Data operation:', operation);
      },
    });

    // Analytics
    const otpAnalytics = useOtpAnalytics({
      enableAnalytics: true,
      onAnalyticsEvent: (event) => {
        console.log('Analytics event:', event);
      },
      onAnalyticsError: (error) => {
        console.error('Analytics error:', error);
      },
    });

    const finalStatusMessage = useMemo(() => 
      otpValidation.validationResult?.message || i18nStatusMessage,
      [otpValidation.validationResult?.message, i18nStatusMessage]
    );
    
    const { statusIcon: defaultStatusIcon } = useMemo(() => 
      getStatusIconAndColor(finalStatus, 'primary'),
      [finalStatus]
    );
    
    const statusIcon = useMemo(() => {
      if (finalStatus && ['error', 'warning', 'success', 'info'].includes(finalStatus)) {
        return defaultStatusIcon;
      }
      return null;
    }, [finalStatus, defaultStatusIcon]);

    // Focus state for each box
    const [focusIdx, setFocusIdx] = useState<number | null>(null);

    // Change handler with enhanced features
    const handleChange = useCallback((idx: number, val: string) => {
      const startTime = performance.now();
      
      // Log interaction for metrics
      otpMetrics.recordInput();
      otpDebug.logInteraction('input', { idx, val });
      
      // Handle change
      otpInput.handleChange(idx, val);
      
      // Trigger focus animation
      if (val) {
        otpAnimations.triggerFocusAnimation(idx);
      }
      
      // Auto-focus next input when value is entered
      if (val && idx < length - 1) {
        const nextInput = inputsRef.current[idx + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
      
      // Record performance
      const endTime = performance.now();
      otpMetrics.recordInput(endTime - startTime);
    }, [otpInput, length, otpMetrics, otpDebug, otpAnimations]);


    // Status color
    const getBorderColor = useCallback((idx: number, focused: boolean) => {
      return otpAppearance.getBorderColor(idx, focused);
    }, [otpAppearance]);

    // Enhanced styles - memoized
    const containerSx = useMemo(() => ({
      ...otpResponsive.getContainerStyles(),
      ...otpCustomization.getContainerStyles(),
      ...otpAnimations.getContainerAnimationStyles(),
    }), [otpResponsive, otpCustomization, otpAnimations]);

    const inputSx = useMemo(() => ({
      ...otpResponsive.getInputStyles(),
      ...otpCustomization.getInputStyles(finalStatus, focusIdx !== null),
      ...otpAccessibilityEnhanced.getAccessibilityStyles,
    }), [otpResponsive, otpCustomization, otpAccessibilityEnhanced, finalStatus, focusIdx]);

    return (
      <>
        {/* Custom CSS for animations */}
        {enableAnimations && (
          <style>
            {otpAnimations.getKeyframes()}
          </style>
        )}
        
        <Box ref={ref}  sx={{ ...containerSx,  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0 }}>
        {i18nLabel && (
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 1, 
              textAlign: "left",
              ...otpI18n.getLabelStyles()
            }}
          >
            OTP Code
          </Typography>
        )}
        <Box
          sx={{
            ...otpAppearance.getContainerStyles(),
            display: "flex",
            mb: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
            position: "relative",
          }}
          onPaste={otpPaste.handlePaste}
        >
          {useMemo(() => Array.from({ length }).map((_, idx) => {
            const inputStyles = {
              ...inputSx,
              textAlign: "center" as const,
              border: `1.5px solid ${getBorderColor(idx, focusIdx === idx)}`,
              transition: "all 0.2s ease-in-out",
              outline: "none",
              backgroundColor: muiTheme.palette.mode === 'dark' ? '#424242' : '#ffffff',
              color: muiTheme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              '&:focus': {
                backgroundColor: muiTheme.palette.mode === 'dark' ? '#616161' : '#ffffff',
                borderColor: muiTheme.palette.primary.main,
                boxShadow: `0 0 0 2px ${muiTheme.palette.primary.main}33`,
              },
              '&:hover': {
                borderColor: muiTheme.palette.primary.main,
              },
              // Spinner'ları kapat
              MozAppearance: "textfield" as const,
              WebkitAppearance: "none" as const,
            };

            return (
              <InputBase
                key={idx}
                inputRef={el => (inputsRef.current[idx] = el)}
                value={otpValue[idx] || ""}
                onChange={e => handleChange(idx, e.target.value.slice(-1))}
                onKeyDown={e => {
                  otpKeyboard.handleKeyDown(e, idx);
                  otpMetrics.recordKeyboardNavigation();
                }}
                onFocus={() => {
                  setFocusIdx(idx);
                  otpFocus.handleFocus(idx);
                  otpAnimations.triggerFocusAnimation(idx);
                }}
                onBlur={() => {
                  setFocusIdx(focusIdx === idx ? null : focusIdx);
                  otpFocus.handleBlur(idx);
                }}
                disabled={disabled || loading}
                type={mask ? "password" : inputType}
                inputProps={{
                  ...otpAccessibilityEnhanced.getInputProps(idx),
                  'aria-busy': loading ? true : undefined,
                  'aria-invalid': finalStatus === 'error' ? true : false,
                  style: inputStyles as React.CSSProperties,
                } as any}
                sx={{
                  mx: 0,
                  "& input": {
                    padding: 0,
                    textAlign: "center !important",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // Spinner'ları tamamen kapat
                    "&::-webkit-outer-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                    "&::-webkit-inner-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                    "&[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                  },
                }}
                autoFocus={autoFocus && idx === 0}
                tabIndex={disabled ? -1 : 0}
                {...otpAccessibilityEnhanced.getAriaProps(idx)}
              />
            );
          }), [
            length, 
            otpValue, 
            handleChange, 
            otpKeyboard, 
            otpFocus, 
            otpMetrics,
            otpAnimations,
            disabled, 
            loading, 
            mask, 
            inputType, 
            autoFocus, 
            otpAccessibilityEnhanced, 
            getBorderColor, 
            inputSx, 
            focusIdx,
            finalStatus,
            muiTheme.palette.mode,
            muiTheme.palette.primary.main
          ])}
          {/* Status icon ve loading spinner input'ların sağında */}
          {(statusIcon || loading) && (
            <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
              {loading && <CircularProgress size={22} />}
              {statusIcon && !loading && statusIcon}
            </Box>
          )}
          
          {/* Advanced Features Buttons */}
          {(enableBiometric || enableQRCode || enableSMS || enableVoiceInput || enableNFC || enableBluetooth) && (
            <Box sx={{ ml: 1, display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
              {/* Voice Input Button */}
              {enableVoiceInput && otpVoiceInput.isSupported && (
                <button
                  {...otpVoiceInput.getVoiceButtonProps()}
                  onClick={() => otpVoiceInput.toggleListening()}
                  style={{
                    background: 'none',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  🎤
                </button>
              )}

              {/* Camera Button */}
              {enableQRCode && otpCamera.isSupported && (
                <button
                  {...otpCamera.getCameraButtonProps()}
                  onClick={() => otpCamera.toggleCamera()}
                  style={{
                    background: 'none',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  📷
                </button>
              )}

              {/* NFC Button */}
              {enableBiometric && otpNFC.isSupported && (
                <button
                  {...otpNFC.getNFCButtonProps()}
                  onClick={() => otpNFC.readNFC()}
                  style={{
                    background: 'none',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  📡
                </button>
              )}

              {/* Bluetooth Button */}
              {enableBiometric && otpBluetooth.isSupported && (
                <button
                  {...otpBluetooth.getBluetoothButtonProps()}
                  onClick={() => otpBluetooth.connectToDevice()}
                  style={{
                    background: 'none',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  📶
                </button>
              )}

              {/* Biometric Button */}
              {enableBiometric && otpBiometric.isSupported && (
                <button
                  {...otpBiometric.getBiometricButtonProps()}
                  onClick={() => otpBiometric.authenticate()}
                  style={{
                    background: 'none',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  🔐
                </button>
              )}
              
              {/* QR Code Button */}
              {enableQRCode && (
                <button
                  {...otpQRCode.getQRCodeProps()}
                  onClick={() => otpQRCode.generateQRCode(qrCodeData || otpValue)}
                  style={{
                    background: 'none',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  📱
                </button>
              )}
              
              {/* SMS Button */}
              {enableSMS && otpSMS.isSupported && (
                <button
                  {...otpSMS.getSMSButtonProps()}
                  onClick={() => phoneNumber && otpSMS.sendSMS(phoneNumber)}
                  style={{
                    background: 'none',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  📧
                </button>
              )}
            </Box>
          )}
        </Box>
        {(finalStatusMessage || i18nHelperText) && (
          <Typography
            variant="caption"
            sx={{
              minHeight: 20,
              mt: 1,
              width: "100%",
              textAlign: "left",
              ...otpI18n.getStatusMessageStyles(finalStatus),
              ...otpAnimations.getStatusAnimationStyles(finalStatus),
            }}
          >
            {finalStatusMessage || i18nHelperText}
          </Typography>
        )}
        
        </Box>
      </>
    );
  }
) as React.ForwardRefExoticComponent<React.PropsWithoutRef<BcOtpInputProps> & React.RefAttributes<HTMLDivElement>>;

BcOtpInputInner.displayName = "BcOtpInput";

// Performance optimized export with React.memo
const BcOtpInputMemo = React.memo(BcOtpInputInner);

// Error boundary wrapped export
export const BcOtpInput = React.forwardRef<HTMLDivElement, BcOtpInputProps>((props, ref) => (
  <OtpInputErrorBoundary>
    <BcOtpInputMemo {...props} ref={ref} />
  </OtpInputErrorBoundary>
));