import type { TextFieldProps } from "@mui/material";
import {
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { forwardRef, useCallback, useId, useState, useMemo } from "react";
import {
  borderlessStyles,
  getDynamicDarkStyles,
  getDynamicLightStyles,
  glassStyles,
  minimalStyles,
  neumorphStyles,
  premiumStyles,
  responsiveWidthStyles,
  sizeStyles,
  softStyles,
  underlineStyles,
} from "./styles";
import type { Appearance, Size } from "../types";
import useHighContrast from "./hooks/useHighContrast";
import useReducedMotion from "./hooks/useReducedMotion";
import { getTranslation } from "../i18n/i18nHelpers";
import useTextFieldValidation from "./hooks/useTextValidation";
import { ValidationResult } from "../interface";
import { getTranslationsObject } from './hooks/useTranslationsObject';
import { usePaletteColor } from './hooks/usePaletteColor';
import { getStatusIconAndColor } from './hooks/useStatusIcon';
import { getAppearanceSx } from './hooks/useAppearanceSx';
import { useInputAdornments } from './hooks/useInputAdornments';
import { useLiveRegion } from './hooks/useLiveRegion';


export interface BcTextFieldProps
  extends Omit<TextFieldProps, "variant" | "size"> {
  responsiveWidth?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
  size?: Size;
  appearance?: Appearance;
  renderEndAdornment?: (defaultAdornment: React.ReactNode) => React.ReactNode;
  name?: string;
  helperText?: string | React.ReactNode;
  error?: boolean;
  status?: "error" | "warning" | "success" | "info";
  statusMessage?: string;
  loading?: boolean;
  clearButtonLabel?: string;
  translations?: Record<string, string>;
  enableRTL?: boolean;
  enableHighContrast?: boolean;
  enableReducedMotion?: boolean;
  fontSize?: number | string;
  enableAsyncValidation?: boolean;
  validateInput?: (value: string) => Promise<ValidationResult>;
  showValidationStatus?: boolean;
  validationDebounceMs?: number;
  monitoring?: {
    onChange?: (value: string) => void;
    onError?: (error: Error) => void;
    onPerformance?: (metrics: any) => void;
  };
  renderCustomIcon?: (status: string) => React.ReactNode;
  renderHelperText?: (helperText: React.ReactNode) => React.ReactNode;
  locale?: string;
  fallbackLocale?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  maxLength?: number;
  minLength?: number;
  spellCheck?: boolean;
  inputComponent?: React.ElementType;
  loadingReadonly?: boolean;
  inputPrefix?: React.ReactNode;
  inputSuffix?: React.ReactNode;
}

const BcTextFieldInner = forwardRef<HTMLInputElement, BcTextFieldProps>(
  (props, ref) => {
    const {
      responsiveWidth = true,
      color = "primary",
      showClearButton = false,
      onClear,
      size = "normal",
      type = "text",
      label,
      placeholder,
      disabled,
      value: valueProp,
      defaultValue,
      slotProps = {},
      sx,
      onChange,
      appearance,
      renderEndAdornment,
      name,
      helperText,
      error,
      status,
      statusMessage,
      loading = false,
      clearButtonLabel,
      translations,
      locale = 'en',
      fallbackLocale = 'en',
      enableRTL,
      enableHighContrast,
      enableReducedMotion,
      fontSize,
      enableAsyncValidation,
      validateInput,
      showValidationStatus,
      validationDebounceMs,
      monitoring,
      renderCustomIcon,
      renderHelperText,
      inputPrefix,
      inputSuffix,
      ...rest
    } = props;

    // Controlled/uncontrolled value
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const value = isControlled ? valueProp : internalValue;

    // Focus state for floating label
    const [focused, setFocused] = useState(false);

    // Accessibility: id'ler ve aria bağlantıları
    const reactId = useId();
    const inputId = rest.id || `bc-tf-input-${reactId}`;
    const labelId = `bc-tf-label-${reactId}`;
    const helperId = `bc-tf-helper-${reactId}`;
    const statusId = `bc-tf-status-${reactId}`;

    // aria-describedby: helperText, statusMessage varsa ekle
    let ariaDescribedByArr: string[] = [];
    if (helperText) ariaDescribedByArr.push(helperId);
    if (status && statusMessage) ariaDescribedByArr.push(statusId);
    const ariaDescribedByStr =
      ariaDescribedByArr.length > 0 ? ariaDescribedByArr.join(" ") : undefined;

    // OnChange handler
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setInternalValue(e.target.value);
        if (onChange) onChange(e);
        if (monitoring && typeof monitoring.onChange === 'function') {
          try {
            monitoring.onChange(e.target.value);
          } catch (err) {
            if (monitoring.onError) monitoring.onError(err as Error);
          }
        }
      },
      [isControlled, onChange, monitoring]
    );

    // Clear handler
    const handleClear = useCallback(() => {
      if (!isControlled) setInternalValue("");
      if (isControlled && onChange) {
        // Controlled ise, boş bir event ile value'yu sıfırla
        const event = { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
        if (monitoring && typeof monitoring.onChange === 'function') {
          try {
            monitoring.onChange("");
          } catch (err) {
            if (monitoring.onError) monitoring.onError(err as Error);
          }
        }
      }
      if (onClear) onClear();
    }, [isControlled, onClear, onChange, monitoring]);

    // Compose adornments için gerekli değişkenler
    let startAdornment: React.ReactNode = undefined;
    let endAdornment: React.ReactNode = undefined;
    if (
      slotProps.input &&
      typeof slotProps.input === "object" &&
      !Array.isArray(slotProps.input)
    ) {
      startAdornment = (slotProps.input as any).startAdornment;
      endAdornment = (slotProps.input as any).endAdornment;
    }
    // inputPrefix ve inputSuffix'i mevcut adornment'larla birleştir
    if (props.inputPrefix) {
      startAdornment = (
        <>
          {props.inputPrefix}
          {startAdornment}
        </>
      );
    }
    if (props.inputSuffix) {
      endAdornment = (
        <>
          {endAdornment}
          {props.inputSuffix}
        </>
      );
    }
    const hasStartAdornment = Boolean(startAdornment);

    // Helper to ensure translations is a Record<string, string>
    const translationsCandidate = translations && typeof translations === 'object' && 'BcTextField' in translations ? translations.BcTextField : translations;
    const translationsObj = getTranslationsObject(translationsCandidate);
    const i18nLabel = label || getTranslation('label', locale, translationsObj, fallbackLocale);
    const i18nStatusMessage = statusMessage || getTranslation('statusMessage', locale, translationsObj, fallbackLocale);
    const i18nClearButton = clearButtonLabel || getTranslation('clearButtonLabel', locale, translationsObj, fallbackLocale) || 'Temizle';

    // Clear button
    const showClear = showClearButton && value && !disabled;

    // Loading durumunda input disabled olmalı
    // loadingReadonly true ise sadece readonly yap
    const isDisabled = disabled || (loading && !props.loadingReadonly);
    const isReadonly = loading && !!props.loadingReadonly;

    // RTL desteği
    const direction = enableRTL ? 'rtl' : undefined;

    // Async validation state
    const { validationResult, isValidating } = useTextFieldValidation({
      inputValue: typeof value === 'string' ? value : '',
      enableAsyncValidation,
      validateInput,
      validationDebounceMs,
      monitoring,
      keyboardNavigationAnnouncements: false,
      liveRegionRef: { current: null },
      setScreenReaderMessage: () => {},
    });

    // Status ve mesajı validation'a göre override et
    let finalStatus = status;
    let finalStatusMessage = i18nStatusMessage;
    let finalLoading = loading;
    if (showValidationStatus && enableAsyncValidation) {
      if (isValidating) {
        finalLoading = true;
      } else if (validationResult) {
        finalStatus = validationResult.type || status;
        finalStatusMessage = validationResult.message || i18nStatusMessage || '';
      }
    }

    // Status ikonunu ve helperText rengini ayarla
    const theme = useTheme();
    const { isPaletteColor, getColor } = usePaletteColor();
    const { statusIcon: defaultStatusIcon, statusColor } = getStatusIconAndColor(finalStatus, color);
    let statusIcon = defaultStatusIcon;
    if (renderCustomIcon) {
      const customIcon = renderCustomIcon(finalStatus || '');
      if (customIcon) statusIcon = customIcon;
    }

    // Status varsa error, warning, success, info prop'unu ayarla
    let finalError = error;
    if (finalStatus === "error") finalError = true;

    // High contrast ve reduced motion hook'ları
    const isHighContrast = useHighContrast(enableHighContrast);
    const reducedMotion = useReducedMotion(enableReducedMotion);

    // Compose endAdornment using custom hook
    const finalEndAdornment = useInputAdornments({
      endAdornment,
      showClear: !!showClear,
      i18nClearButton,
      handleClear,
      disabled: !!disabled,
      loading: !!finalLoading,
      statusIcon,
      renderEndAdornment,
    });

    // Status varsa helperText'i override et (memoize)
    const finalHelperText = useMemo(() => {
      let result = helperText;
      if (finalStatus && finalStatusMessage) {
        if (helperText) {
          result = (
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ display: 'block', marginBottom: 2 }}>{finalStatusMessage}</span>
              <span style={{ display: 'block', color: '#888', fontSize: 13, marginTop: 2 }}>{helperText}</span>
            </span>
          );
        } else {
          result = finalStatusMessage;
        }
      }
      if (renderHelperText) {
        result = renderHelperText(result);
      }
      return result;
    }, [helperText, finalStatus, finalStatusMessage, renderHelperText]);

    // Style composition (memoize)
    const composedSx = useMemo(() => {
      let sx: any = {};
      if (responsiveWidth)
        sx = { ...sx, ...responsiveWidthStyles };
      if (size && sizeStyles[size])
        sx = { ...sx, ...sizeStyles[size] };
      if (isHighContrast) {
        sx = {
          ...sx,
          backgroundColor: '#000',
          color: '#fff',
          border: '2px solid #fff',
          caretColor: '#fff',
          fontSize: fontSize ? fontSize : undefined,
          transition: reducedMotion ? 'none' : 'all 0.2s',
          '& input, & textarea': { background: '#000', color: '#fff', fontSize: fontSize ? fontSize : undefined, transition: reducedMotion ? 'none' : 'all 0.2s' },
          '& fieldset': { borderColor: '#fff' },
          '& label': { color: '#fff', fontSize: fontSize ? fontSize : undefined, transition: reducedMotion ? 'none' : 'all 0.2s' },
        };
      } else {
        if (fontSize) {
          sx = { ...sx, fontSize: fontSize, transition: reducedMotion ? 'none' : 'all 0.2s' };
        } else {
          sx = { ...sx, transition: reducedMotion ? 'none' : 'all 0.2s' };
        }
      }
      // Appearance stillerinde border ve label color'ı color veya statusColor'a göre ayarla
      const colorKey = statusColor || (isPaletteColor(color) ? color : "primary");
      const getSxForAppearance = (baseStyles: any) => getAppearanceSx(baseStyles(theme), colorKey, getColor);
      if (appearance === "premium")
        sx = {
          ...sx,
          ...getSxForAppearance(premiumStyles),
        };
      else if (appearance === "soft")
        sx = {
          ...sx,
          ...getSxForAppearance(softStyles),
        };
      else if (appearance === "glass")
        sx = {
          ...sx,
          ...getSxForAppearance(glassStyles),
        };
      else if (appearance === "minimal")
        sx = {
          ...sx,
          ...getSxForAppearance(minimalStyles),
        };
      else if (appearance === "neumorph")
        sx = {
          ...sx,
          ...getSxForAppearance(neumorphStyles),
        };
      else if (appearance === "underline")
        sx = {
          ...sx,
          ...getSxForAppearance(underlineStyles),
        };
      else if (appearance === "dark") {
        sx = {
          ...sx,
          ...getSxForAppearance(theme.palette.mode === "dark" ? getDynamicDarkStyles : getDynamicLightStyles),
        };
      } else if (appearance === "borderless")
        sx = {
          ...sx,
          ...getSxForAppearance(borderlessStyles),
        };
      if (sx) sx = { ...sx, ...props.sx };
      if (direction) {
        sx = { ...sx, direction };
      }
      return sx;
    }, [responsiveWidth, size, isHighContrast, statusColor, isPaletteColor, color, appearance, props.sx, direction, fontSize, reducedMotion, theme, getColor]);

    // Live region for screen reader
    const { liveRegionRef, liveRegionMessage } = useLiveRegion({
      showValidationStatus: !!showValidationStatus,
      enableAsyncValidation: !!enableAsyncValidation,
      validationResult,
    });

    // slotProps.input'a ekle
    let inputSlotProps = {
      ...(typeof slotProps.input === "object" && !Array.isArray(slotProps.input) ? slotProps.input : {}),
      startAdornment: startAdornment,
      endAdornment: finalEndAdornment,
      id: inputId,
      "aria-labelledby": labelId,
      "aria-describedby": ariaDescribedByStr,
      "aria-invalid": finalError ? true : undefined,
      "aria-busy": finalLoading ? true : undefined,
      "aria-required": rest.required ? true : undefined, // A11y: zorunlu alan
      readOnly: isReadonly || undefined,
      autoFocus: props.autoFocus,
      autoComplete: props.autoComplete,
      inputMode: props.inputMode,
      pattern: props.pattern,
      maxLength: props.maxLength,
      minLength: props.minLength,
      spellCheck: props.spellCheck,
      ...(typeof props.inputComponent === 'function' ? { inputComponent: props.inputComponent } : {}),
    };
    // enableRTL için input'a özel bir şey eklemiyoruz, sadece TextField'a dir verilecek

    // Floating label: placeholder varsa label yukarıda sabit kalır, focus olunca da yukarıda olmalı
    const shrink = Boolean(placeholder) || Boolean(value) || focused;

    return (
      <>
        {/* Visually hidden live region for screen reader validation messages */}
        <div
          ref={liveRegionRef}
          aria-live="polite"
          aria-atomic="true"
          style={{ position: 'absolute', width: 1, height: 1, margin: -1, padding: 0, overflow: 'hidden', clip: 'rect(0 0 0 0)', border: 0 }}
        >
          {liveRegionMessage}
        </div>
        <TextField
          ref={ref}
          inputRef={ref}
          id={inputId}
          label={i18nLabel}
          placeholder={placeholder}
          name={name}
          helperText={typeof finalHelperText === 'string' ? finalHelperText : React.isValidElement(finalHelperText) ? finalHelperText : ''}
          error={finalError}
          color={color}
          disabled={isDisabled}
          value={value}
          onChange={handleChange}
          type={type}
          sx={composedSx}
          slotProps={{
            ...slotProps,
            input: inputSlotProps,
            inputLabel: {
              ...(slotProps.inputLabel || {}),
              shrink,
              sx: {
                ...(slotProps.inputLabel && (slotProps.inputLabel as any).sx),
                ...(hasStartAdornment && !shrink ? { left: 40 } : {}),
                // textAlign kaldırıldı
              },
              id: labelId,
              htmlFor: inputId,
            },
            formHelperText: {
              id: helperId,
              "aria-live": finalStatus && finalStatusMessage ? "polite" : undefined,
              // style/textAlign kaldırıldı
            },
          }}
          onFocus={(e) => {
            setFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
          variant="outlined"
          dir={direction}
          {...rest}
        />
      </>
    );
  }
);

export const BcTextField = React.memo(BcTextFieldInner);
BcTextField.displayName = "BcTextField";
