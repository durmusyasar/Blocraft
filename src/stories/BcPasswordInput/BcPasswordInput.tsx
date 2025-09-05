import React, { useState, forwardRef, useCallback, useId } from "react";
import { BcTextField } from "../BcTextField/BcTextField";
import type { BcTextFieldProps } from "../BcTextField/BcTextField";
import { barContainerStyle, barStyle, strengthColors, barGradient, allPassedCheckStyle } from "./styles";
import { usePasswordStrength } from './hooks/usePasswordStrength';
import { usePasswordAdornments } from './hooks/usePasswordAdornments';
import { usePasswordValidation } from './hooks/usePasswordValidation';
import { usePasswordLiveRegion } from './hooks/usePasswordLiveRegion';
import { getStatusIconAndColor } from './hooks/useStatusIcon';
import { getTranslationsObject } from './hooks/useTranslationsObject';
import { getTranslation } from "../i18n/i18nHelpers";
import type { PasswordRuleType, PasswordMonitoringCallbacks } from './types';
import PasswordInputErrorBoundary from './ErrorBoundary';
import { usePasswordGenerator } from './hooks/usePasswordGenerator';
import { usePasswordBreachCheck } from './hooks/usePasswordBreachCheck';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { usePasswordScoring } from './hooks/usePasswordScoring';
import { useThemeAwareStyles } from './hooks/useThemeAwareStyles';
import { useAdvancedMonitoring } from './hooks/useAdvancedMonitoring';
import { useMobileOptimizations, useHapticFeedback } from './hooks/useMobileOptimizations';
import { useAdvancedI18n } from './hooks/useAdvancedI18n';

/**
 * BcPasswordInputProps
 * @property showStrengthBar - Şifre gücü barı gösterilsin mi / Show password strength bar
 * @property minLength - Minimum şifre uzunluğu / Minimum password length
 * @property requireUppercase - Büyük harf gereksinimi / Require uppercase letter
 * @property requireLowercase - Küçük harf gereksinimi / Require lowercase letter
 * @property requireNumber - Rakam gereksinimi / Require number
 * @property requireSpecial - Özel karakter gereksinimi / Require special character
 * @property onStrengthChange - Şifre gücü değişince çağrılır / Called when password strength changes
 * @property customRules - Özel şifre kuralları [{ key, label, test }] / Custom password rules [{ key, label, test }]
 * @property useZxcvbnStrength - Gelişmiş şifre gücü ölçümü için zxcvbn kullanılsın mı? / Use zxcvbn for advanced password strength?
 * @property showPasswordToggle - Şifre göster/gizle butonu gösterilsin mi / Show password toggle button
 * @property showCopyButton - Kopyala butonu gösterilsin mi / Show copy button
 * @property enableAsyncValidation - Asenkron validasyon / Enable async validation
 * @property validatePassword - Asenkron şifre validasyon fonksiyonu / Async password validation function
 * @property showValidationStatus - Validasyon durumu gösterilsin mi / Show validation status
 * @property validationDebounceMs - Validasyon debounce süresi / Validation debounce ms
 * @property monitoring - İzleme fonksiyonları / Monitoring callbacks
 * @property ...rest - Diğer BcTextFieldProps / Other BcTextFieldProps
 */
export interface BcPasswordInputProps extends Omit<BcTextFieldProps, "type"> {
  /** Şifre gücü barı gösterilsin mi */
  showStrengthBar?: boolean;
  /** Minimum şifre uzunluğu */
  minLength?: number;
  /** Büyük harf gereksinimi */
  requireUppercase?: boolean;
  /** Küçük harf gereksinimi */
  requireLowercase?: boolean;
  /** Rakam gereksinimi */
  requireNumber?: boolean;
  /** Özel karakter gereksinimi */
  requireSpecial?: boolean;
  /** Şifre gücü değişince çağrılır */
  onStrengthChange?: (strength: number) => void;
  /** Özel şifre kuralları */
  customRules?: PasswordRuleType[];
  /** Gelişmiş şifre gücü ölçümü için zxcvbn kullanılsın mı? */
  useZxcvbnStrength?: boolean;
  /** Şifre göster/gizle butonu gösterilsin mi */
  showPasswordToggle?: boolean;
  /** Kopyala butonu gösterilsin mi */
  showCopyButton?: boolean;
  /** Asenkron validasyon */
  enableAsyncValidation?: boolean;
  /** Asenkron şifre validasyon fonksiyonu */
  validatePassword?: (password: string) => Promise<{ isValid: boolean; message?: string }>;
  /** Validasyon durumu gösterilsin mi */
  showValidationStatus?: boolean;
  /** Validasyon debounce süresi */
  validationDebounceMs?: number;
  /** İzleme fonksiyonları */
  monitoring?: PasswordMonitoringCallbacks;
  /** Şifre üretme özelliği */
  enablePasswordGenerator?: boolean;
  /** Breach kontrolü */
  enableBreachCheck?: boolean;
  /** Klavye kısayolları */
  enableKeyboardShortcuts?: boolean;
  /** Gelişmiş şifre skorlama */
  enableAdvancedScoring?: boolean;
  /** Tema uyumlu stiller */
  enableThemeAwareStyles?: boolean;
  /** Gelişmiş izleme */
  enableAdvancedMonitoring?: boolean;
  /** Mobil optimizasyonlar */
  enableMobileOptimizations?: boolean;
  /** Gelişmiş i18n */
  enableAdvancedI18n?: boolean;
}



const BcPasswordInputInner = forwardRef<HTMLInputElement, BcPasswordInputProps>(
  (
    {
      showStrengthBar = true,
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumber = true,
      requireSpecial = false,
      onStrengthChange,
      showPasswordToggle = true,
      showCopyButton = true,
      enableAsyncValidation = false,
      validatePassword,
      showValidationStatus = false,
      validationDebounceMs = 300,
      monitoring,
      enablePasswordGenerator = false,
      enableBreachCheck = false,
      enableKeyboardShortcuts = true,
      enableAdvancedScoring = false,
      enableThemeAwareStyles = true,
      enableAdvancedMonitoring = false,
      enableMobileOptimizations = true,
      enableAdvancedI18n = false,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState(rest.defaultValue ?? "");
    const [copied, setCopied] = useState(false);
    
    const isControlled = rest.value !== undefined;
    const password: string = isControlled ? String(rest.value ?? '') : String(value ?? '');

    // Accessibility: id'ler ve aria bağlantıları
    const reactId = useId();
    const strengthBarId = `bc-password-strength-${reactId}`;
    const rulesId = `bc-password-rules-${reactId}`;
    const liveRegionId = `bc-password-live-${reactId}`;

    // i18n desteği
    const locale = rest.locale || 'en';
    const fallbackLocale = rest.fallbackLocale || 'en';
    const translationsObj = getTranslationsObject(rest.translations);

    // Password strength calculation using hook
    const { strength, rules, ruleLabels, allPassed } = usePasswordStrength({
      password,
      minLength,
      requireUppercase,
      requireLowercase,
      requireNumber,
      requireSpecial,
      useZxcvbnStrength: rest.useZxcvbnStrength,
      customRules: rest.customRules,
    });

    // Advanced features hooks
    const passwordGenerator = usePasswordGenerator({
      minLength,
      requireUppercase,
      requireLowercase,
      requireNumber,
      requireSpecial,
      customRules: rest.customRules,
    });

    const breachCheck = usePasswordBreachCheck();

    const passwordScore = usePasswordScoring(password, {
      minLength,
      requireUppercase,
      requireLowercase,
      requireNumber,
      requireSpecial,
      customRules: rest.customRules,
    });

    const themeStyles = useThemeAwareStyles();

    const advancedMonitoring = useAdvancedMonitoring(monitoring || {}, {
      enableAnalytics: enableAdvancedMonitoring,
      enablePerformanceTracking: enableAdvancedMonitoring,
      enableUserBehaviorTracking: enableAdvancedMonitoring,
    });

    const mobileOptimizations = useMobileOptimizations();
    const { triggerHaptic } = useHapticFeedback();

    const advancedI18n = useAdvancedI18n({
      locale,
      fallbackLocale,
      translations: rest.translations,
      enablePluralization: enableAdvancedI18n,
      enableInterpolation: enableAdvancedI18n,
    });

    // i18n text'leri - advanced i18n varsa onu kullan, yoksa normal i18n
    const i18nLabel = rest.label || (enableAdvancedI18n ? advancedI18n.t('label') : getTranslation('label', locale, translationsObj, fallbackLocale));
    const i18nPlaceholder = rest.placeholder || (enableAdvancedI18n ? advancedI18n.t('placeholder') : getTranslation('placeholder', locale, translationsObj, fallbackLocale));
    const i18nHelperText = rest.helperText || (enableAdvancedI18n ? advancedI18n.t('helperText') : getTranslation('helperText', locale, translationsObj, fallbackLocale));
    const i18nStatusMessage = rest.statusMessage || (enableAdvancedI18n ? advancedI18n.t('statusMessage') : getTranslation('statusMessage', locale, translationsObj, fallbackLocale));
    const i18nShowPassword = enableAdvancedI18n ? advancedI18n.t('showPassword') : getTranslation('showPassword', locale, translationsObj, fallbackLocale);
    const i18nHidePassword = enableAdvancedI18n ? advancedI18n.t('hidePassword') : getTranslation('hidePassword', locale, translationsObj, fallbackLocale);
    const i18nRules = enableAdvancedI18n ? advancedI18n.t('rules') : getTranslation('rules', locale, translationsObj, fallbackLocale);
    const i18nStrengthBar = enableAdvancedI18n ? advancedI18n.t('strengthBar') : getTranslation('strengthBar', locale, translationsObj, fallbackLocale);
    const i18nCopyPassword = enableAdvancedI18n ? advancedI18n.t('copyPassword') : getTranslation('copyPassword', locale, translationsObj, fallbackLocale);
    const i18nCopied = enableAdvancedI18n ? advancedI18n.t('copied') : getTranslation('copied', locale, translationsObj, fallbackLocale);
    const i18nClearButton = enableAdvancedI18n ? advancedI18n.t('clearButtonLabel') : (getTranslation('clearButtonLabel', locale, translationsObj, fallbackLocale) || 'Temizle');
    const i18nStrengthVeryWeak = enableAdvancedI18n ? advancedI18n.t('strengthVeryWeak') : getTranslation('strengthVeryWeak', locale, translationsObj, fallbackLocale);
    const i18nStrengthWeak = enableAdvancedI18n ? advancedI18n.t('strengthWeak') : getTranslation('strengthWeak', locale, translationsObj, fallbackLocale);
    const i18nStrengthMedium = enableAdvancedI18n ? advancedI18n.t('strengthMedium') : getTranslation('strengthMedium', locale, translationsObj, fallbackLocale);
    const i18nStrengthStrong = enableAdvancedI18n ? advancedI18n.t('strengthStrong') : getTranslation('strengthStrong', locale, translationsObj, fallbackLocale);
    const i18nStrengthVeryStrong = enableAdvancedI18n ? advancedI18n.t('strengthVeryStrong') : getTranslation('strengthVeryStrong', locale, translationsObj, fallbackLocale);
    const i18nStrengthPerfect = enableAdvancedI18n ? advancedI18n.t('strengthPerfect') : getTranslation('strengthPerfect', locale, translationsObj, fallbackLocale);

    function isCustomRule(rule: any): rule is { key: string; label: string; custom: true; test: (password: string) => boolean } {
      return rule.custom === true && typeof rule.test === 'function';
    }

    // Async validation using hook
    const { validationResult: asyncValidationResult, isValidating } = usePasswordValidation({
      password,
      enableAsyncValidation,
      validatePassword,
      validationDebounceMs,
      monitoring,
    });

    // Status ikonunu ve helperText rengini ayarla
    const { statusIcon: defaultStatusIcon } = getStatusIconAndColor(rest.status, rest.color);
    let statusIcon = null;
    
    // Sadece gerçek bir status varsa icon göster
    if (rest.status && ['error', 'warning', 'success', 'info'].includes(rest.status)) {
      statusIcon = defaultStatusIcon;
      if (rest.renderCustomIcon) {
        const customIcon = rest.renderCustomIcon(rest.status);
        if (customIcon) statusIcon = customIcon;
      }
    }

    // Live region for screen reader
    const { liveRegionRef, liveRegionMessage } = usePasswordLiveRegion({
      password,
      strength,
      rules,
      ruleLabels,
      requireUppercase,
      requireLowercase,
      requireNumber,
      requireSpecial,
      useZxcvbnStrength: rest.useZxcvbnStrength,
      i18nStrengthBar,
      i18nRules,
      showValidationStatus,
      enableAsyncValidation,
      validationResult: asyncValidationResult,
      isValidating,
    });

    // Şifre gücü değişim callback'i
    React.useEffect(() => {
      if (onStrengthChange) onStrengthChange(strength);
      if (monitoring?.onStrengthChange) monitoring.onStrengthChange(strength);
    }, [strength, onStrengthChange, monitoring]);

    // Breach check - şifre değiştiğinde kontrol et
    React.useEffect(() => {
      if (enableBreachCheck && password.length > 0) {
        breachCheck.checkPassword(password);
      }
    }, [password, enableBreachCheck, breachCheck]);

    // Performans ölçümü
    React.useEffect(() => {
      const start = performance.now();
      return () => {
        const end = performance.now();
        if (monitoring?.onPerformance) {
          monitoring.onPerformance({
            renderTimeMs: end - start,
            passwordLength: password.length,
            timestamp: Date.now(),
          });
        }
      };
    }, [password, monitoring]);

    // Event handlers with useCallback
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setValue(e.target.value);
      if (rest.onChange) rest.onChange(e);
      if (monitoring?.onChange) {
        try {
          monitoring.onChange(e.target.value);
        } catch (err) {
          if (monitoring.onError) monitoring.onError(err as Error);
        }
      }
    }, [isControlled, rest, monitoring]);

    const handleTogglePassword = useCallback(() => {
      setShowPassword(prev => {
        const newValue = !prev;
        triggerHaptic('light');
        advancedMonitoring.onPasswordToggled?.(newValue);
        return newValue;
      });
    }, [triggerHaptic, advancedMonitoring]);

    const handleCopy = useCallback(async () => {
      if (!password) return;
      try {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        triggerHaptic('medium');
        advancedMonitoring.onPasswordCopied?.(password);
        setTimeout(() => setCopied(false), 1200);
      } catch (error) {
        console.warn('BcPasswordInput: Failed to copy password:', error);
        if (monitoring?.onError) {
          monitoring.onError(error as Error);
        }
      }
    }, [password, monitoring, triggerHaptic, advancedMonitoring]);

    const handleClear = useCallback(() => {
      if (!isControlled) setValue("");
      if (isControlled && rest.onChange) {
        // Controlled ise, boş bir event ile value'yu sıfırla
        const event = { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>;
        rest.onChange(event);
        if (monitoring?.onChange) {
          try {
            monitoring.onChange("");
          } catch (err) {
            if (monitoring.onError) monitoring.onError(err as Error);
          }
        }
      }
      triggerHaptic('light');
      advancedMonitoring.onPasswordCleared?.();
      if (rest.onClear) rest.onClear();
    }, [isControlled, rest, monitoring, triggerHaptic, advancedMonitoring]);

    // Keyboard shortcuts hook (moved after handlers)
    const { shortcuts } = useKeyboardShortcuts({
      onTogglePassword: handleTogglePassword,
      onCopyPassword: handleCopy,
      onClearPassword: handleClear,
      onGeneratePassword: () => {
        if (enablePasswordGenerator) {
          const newPassword = passwordGenerator.generatePassword();
          setValue(newPassword);
          if (rest.onChange) {
            const event = { target: { value: newPassword } } as React.ChangeEvent<HTMLInputElement>;
            rest.onChange(event);
          }
        }
      },
      enabled: enableKeyboardShortcuts,
    });



    // Status ve mesajı validation'a göre override et
    let finalStatus = rest.status;
    let finalStatusMessage = i18nStatusMessage;
    let finalLoading = rest.loading;
    if (showValidationStatus && enableAsyncValidation) {
      if (isValidating) {
        finalLoading = true;
      } else if (asyncValidationResult) {
        finalStatus = asyncValidationResult.isValid ? "success" : "error";
        finalStatusMessage = asyncValidationResult.message || i18nStatusMessage || '';
      }
    }

    // End adornment composition using hook
    const endAdornment = usePasswordAdornments({
      endAdornment: rest.inputSuffix,
      showPasswordToggle,
      showCopyButton,
      showClearButton: rest.showClearButton || false,
      showPassword,
      password,
      copied,
      loading: finalLoading || false,
      disabled: rest.disabled || false,
      statusIcon,
      i18nShowPassword,
      i18nHidePassword,
      i18nCopyPassword,
      i18nCopied,
      i18nClearButton,
      onTogglePassword: handleTogglePassword,
      onCopy: handleCopy,
      onClear: handleClear,
      renderEndAdornment: rest.renderEndAdornment,
    });

    return (
      <div>
        <BcTextField
          {...rest}
          ref={ref}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange}
          showClearButton={rest.showClearButton}
          status={undefined}
          statusMessage={undefined}
          helperText={finalStatusMessage || i18nHelperText}
          loading={false}
          error={finalStatus === 'error'}
          inputPrefix={rest.inputPrefix}
          inputSuffix={endAdornment}
          translations={rest.translations}
          locale={locale}
          fallbackLocale={fallbackLocale}
          appearance={rest.appearance}
          responsiveWidth={rest.responsiveWidth}
          disabled={rest.disabled}
          label={i18nLabel}
          placeholder={i18nPlaceholder}
          enableAsyncValidation={enableAsyncValidation}
          validateInput={validatePassword}
          showValidationStatus={showValidationStatus}
          validationDebounceMs={validationDebounceMs}
          monitoring={monitoring}
          enableRTL={rest.enableRTL}
          enableHighContrast={rest.enableHighContrast}
          enableReducedMotion={rest.enableReducedMotion}
          fontSize={rest.fontSize}
          renderCustomIcon={rest.renderCustomIcon}
          renderHelperText={rest.renderHelperText}
          autoFocus={rest.autoFocus}
          autoComplete={rest.autoComplete}
          inputMode={rest.inputMode}
          pattern={rest.pattern}
          maxLength={rest.maxLength}
          spellCheck={rest.spellCheck}
          inputComponent={rest.inputComponent}
          loadingReadonly={rest.loadingReadonly}
          aria-describedby={[
            typeof rest['aria-describedby'] === 'string' ? rest['aria-describedby'] : undefined,
            showStrengthBar ? strengthBarId : undefined,
            showStrengthBar ? rulesId : undefined,
            liveRegionRef.current ? liveRegionId : undefined
          ].filter(Boolean).join(' ') || undefined}
        />
        
        {/* Screen reader için live region */}
        <div 
          ref={liveRegionRef}
          id={liveRegionId}
          aria-live="polite" 
          aria-atomic="true" 
          style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}
        >
          {liveRegionMessage}
        </div>

        {showStrengthBar && (
          <>
            {/* Şifre gücü barı */}
            <div 
              id={strengthBarId}
              style={{
                ...barContainerStyle,
                ...(enableThemeAwareStyles ? themeStyles.containerStyles : {}),
              } as React.CSSProperties}
              role="progressbar"
              aria-valuenow={strength}
              aria-valuemin={0}
              aria-valuemax={rest.useZxcvbnStrength ? 5 : 4}
              aria-label={`${i18nStrengthBar}: ${strength}/${rest.useZxcvbnStrength ? 5 : 4}`}
              title={`${i18nStrengthBar}: ${strength}/${rest.useZxcvbnStrength ? 5 : 4}`}
            >
              <div
                style={{
                  ...barStyle(rest.useZxcvbnStrength ? Math.max(1, Math.min(strength, 5)) : strength),
                  background: enableThemeAwareStyles 
                    ? themeStyles.strengthBarGradient(rest.useZxcvbnStrength ? Math.max(1, Math.min(strength, 5)) : strength)
                    : barGradient(rest.useZxcvbnStrength ? Math.max(1, Math.min(strength, 5)) : strength),
                  transition: 'width 0.3s, background 0.3s',
                }}
              />
              {allPassed && (
                <span style={allPassedCheckStyle} aria-label="Tüm kurallar sağlandı" title="Tüm kurallar sağlandı">✔️</span>
              )}
            </div>
            
            {/* Şifre gücü metni */}
            <div 
              style={{ fontSize: 12, color: '#666', marginTop: 2, marginBottom: 4 }}
              aria-live="polite"
            >
              {(() => {
                const getStrengthLabel = (strength: number) => {
                  if (rest.useZxcvbnStrength) {
                    return strength === 0 ? i18nStrengthVeryWeak : 
                           strength === 1 ? i18nStrengthWeak : 
                           strength === 2 ? i18nStrengthMedium : 
                           strength === 3 ? i18nStrengthStrong : 
                           strength === 4 ? i18nStrengthVeryStrong : i18nStrengthPerfect;
                  } else {
                    return strength === 0 ? i18nStrengthVeryWeak : 
                           strength === 1 ? i18nStrengthWeak : 
                           strength === 2 ? i18nStrengthMedium : 
                           strength === 3 ? i18nStrengthStrong : i18nStrengthPerfect;
                  }
                };

                const maxStrength = rest.useZxcvbnStrength ? 5 : 4;
                const baseText = `${i18nStrengthBar}: ${strength}/${maxStrength} (${getStrengthLabel(strength)})`;
                
                // Advanced scoring bilgisi ekle
                if (enableAdvancedScoring && password.length > 0) {
                  return `${baseText} | Score: ${passwordScore.percentage}% | Entropy: ${passwordScore.entropy.toFixed(1)} bits`;
                }
                
                return baseText;
              })()}
            </div>

            {/* Breach check uyarısı */}
            {enableBreachCheck && breachCheck.isBreached && (
              <div 
                style={{ 
                  fontSize: 12, 
                  color: '#d32f2f', 
                  marginTop: 4, 
                  marginBottom: 4,
                  padding: 8,
                  backgroundColor: '#ffebee',
                  border: '1px solid #ffcdd2',
                  borderRadius: 4
                }}
                role="alert"
                aria-live="assertive"
              >
                ⚠️ Bu şifre {breachCheck.breachCount} veri ihlalinde bulundu. Güvenliğiniz için farklı bir şifre kullanın.
              </div>
            )}

            {/* Breach check loading */}
            {enableBreachCheck && breachCheck.isLoading && (
              <div 
                style={{ 
                  fontSize: 12, 
                  color: '#666', 
                  marginTop: 4, 
                  marginBottom: 4 
                }}
              >
                🔍 Şifre güvenlik kontrolü yapılıyor...
              </div>
            )}

            {/* Breach check error */}
            {enableBreachCheck && breachCheck.error && (
              <div 
                style={{ 
                  fontSize: 12, 
                  color: '#f57c00', 
                  marginTop: 4, 
                  marginBottom: 4 
                }}
              >
                ⚠️ Güvenlik kontrolü yapılamadı: {breachCheck.error}
              </div>
            )}
            
            {/* Kurallar başlığı */}
            <div 
              style={{ fontWeight: 600, fontSize: 13, marginTop: 4, marginBottom: 2 }}
              id={`${rulesId}-label`}
            >
              {i18nRules}
            </div>
            
            {/* Password generator butonu */}
            {enablePasswordGenerator && (
              <div 
                style={{ 
                  marginTop: 8, 
                  marginBottom: 8 
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    const newPassword = passwordGenerator.generatePassword();
                    setValue(newPassword);
                    if (rest.onChange) {
                      const event = { target: { value: newPassword } } as React.ChangeEvent<HTMLInputElement>;
                      rest.onChange(event);
                    }
                    triggerHaptic('medium');
                    advancedMonitoring.onPasswordGenerated?.(newPassword, 'manual');
                  }}
                  style={{
                    padding: '6px 12px',
                    fontSize: 12,
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    ...(mobileOptimizations.isMobile ? { 
                      padding: '8px 16px',
                      fontSize: 14 
                    } : {})
                  }}
                  disabled={rest.disabled}
                >
                  🎲 {enableAdvancedI18n ? advancedI18n.t('passwordGeneratorButton') : getTranslation('passwordGeneratorButton', locale, translationsObj, fallbackLocale)}
                </button>
              </div>
            )}

            {/* Keyboard shortcuts bilgisi */}
            {enableKeyboardShortcuts && shortcuts && (
              <div 
                style={{ 
                  fontSize: 11, 
                  color: '#888', 
                  marginTop: 8, 
                  marginBottom: 4,
                  fontStyle: 'italic'
                }}
              >
                💡 Kısayollar: {Object.entries(shortcuts).map(([key, desc]) => `${key}: ${desc}`).join(' | ')}
              </div>
            )}

            {/* Kurallar listesi */}
            <ul 
              id={rulesId}
              style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: 12 }}
              aria-labelledby={`${rulesId}-label`}
            >
              {ruleLabels.map((rule) => {
                if (!isCustomRule(rule)) {
                  if (rule.key === "uppercase" && !requireUppercase) return null;
                  if (rule.key === "lowercase" && !requireLowercase) return null;
                  if (rule.key === "number" && !requireNumber) return null;
                  if (rule.key === "special" && !requireSpecial) return null;
                }
                const passed = isCustomRule(rule)
                  ? rule.test(password)
                  : rules[rule.key as keyof typeof rules];
                return (
                  <li 
                    key={rule.key} 
                    style={{ 
                      color: enableThemeAwareStyles 
                        ? (passed ? themeStyles.ruleColors.passed : themeStyles.ruleColors.failed)
                        : (passed ? strengthColors[2] : "#aaa"), 
                      fontSize: mobileOptimizations.optimizedLayout ? 14 : 13,
                      ...(mobileOptimizations.isMobile ? { marginBottom: 4 } : {})
                    }} 
                    aria-checked={passed} 
                    role="checkbox"
                    aria-label={`${rule.label}: ${passed ? 'sağlandı' : 'eksik'}`}
                  >
                    <span style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}>
                      {rule.label}: {passed ? 'sağlandı' : 'eksik'}
                    </span>
                    {passed ? "✔️" : "❌"} {rule.label}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    );
  }
) as React.ForwardRefExoticComponent<React.PropsWithoutRef<BcPasswordInputProps> & React.RefAttributes<HTMLInputElement>>;

BcPasswordInputInner.displayName = "BcPasswordInput";

// Performance optimized export with React.memo
const BcPasswordInputMemo = React.memo(BcPasswordInputInner);

// Error boundary wrapped export
export const BcPasswordInput = React.forwardRef<HTMLInputElement, BcPasswordInputProps>((props, ref) => (
  <PasswordInputErrorBoundary>
    <BcPasswordInputMemo {...props} ref={ref} />
  </PasswordInputErrorBoundary>
)); 