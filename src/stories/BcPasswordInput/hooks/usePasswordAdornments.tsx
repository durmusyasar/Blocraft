import React, { useMemo } from 'react';
import { InputAdornment, CircularProgress } from '@mui/material';

export interface PasswordAdornmentsOptions {
  endAdornment?: React.ReactNode;
  showPasswordToggle: boolean;
  showCopyButton: boolean;
  showClearButton: boolean;
  showPassword: boolean;
  password: string;
  copied: boolean;
  loading: boolean;
  disabled: boolean;
  statusIcon?: React.ReactNode;
  i18nShowPassword: string;
  i18nHidePassword: string;
  i18nCopyPassword: string;
  i18nCopied: string;
  i18nClearButton: string;
  onTogglePassword: () => void;
  onCopy: () => void;
  onClear: () => void;
  renderEndAdornment?: (defaultAdornment: React.ReactNode) => React.ReactNode;
}

export function usePasswordAdornments({
  endAdornment,
  showPasswordToggle,
  showCopyButton,
  showClearButton,
  showPassword,
  password,
  copied,
  loading,
  disabled,
  statusIcon,
  i18nShowPassword,
  i18nHidePassword,
  i18nCopyPassword,
  i18nCopied,
  i18nClearButton,
  onTogglePassword,
  onCopy,
  onClear,
  renderEndAdornment,
}: PasswordAdornmentsOptions) {
  
  // Password toggle button
  const passwordToggleButton = useMemo(() => {
    if (!showPasswordToggle) return null;
    
    return (
      <span
        key="toggle"
        style={{ cursor: "pointer", marginRight: 8 }}
        onClick={onTogglePassword}
        title={showPassword ? i18nHidePassword : i18nShowPassword}
        aria-label={showPassword ? i18nHidePassword : i18nShowPassword}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => { 
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onTogglePassword();
          }
        }}
      >
        {showPassword ? "🙈" : "👁️"}
      </span>
    );
  }, [showPasswordToggle, showPassword, i18nHidePassword, i18nShowPassword, onTogglePassword]);

  // Copy button
  const copyButton = useMemo(() => {
    if (!showCopyButton || !password) return null;
    
    return (
      <span
        key="copy"
        style={{ cursor: "pointer", marginRight: 8, fontSize: 18 }}
        onClick={onCopy}
        aria-label={i18nCopyPassword}
        title={i18nCopyPassword}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => { 
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onCopy();
          }
        }}
      >
        📋
      </span>
    );
  }, [showCopyButton, password, i18nCopyPassword, onCopy]);

  // Copied indicator
  const copiedIndicator = useMemo(() => {
    if (!copied) return null;
    
    return (
      <span 
        key="copied" 
        style={{ marginRight: 4, color: '#4caf50', fontSize: 13 }} 
        aria-live="polite"
      >
        {i18nCopied}
      </span>
    );
  }, [copied, i18nCopied]);

  // Clear button
  const clearButton = useMemo(() => {
    if (!showClearButton || !password) return null;
    
    return (
      <span
        key="clear"
        style={{ cursor: "pointer", marginRight: 8 }}
        onClick={onClear}
        aria-label={i18nClearButton}
        title={i18nClearButton}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => { 
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClear();
          }
        }}
      >
        ✕
      </span>
    );
  }, [showClearButton, password, i18nClearButton, onClear]);

  // Loading spinner
  const loadingSpinner = useMemo(() => {
    if (!loading) return null;
    
    return (
      <CircularProgress
        key="loading"
        size={20}
        color="inherit"
        aria-label="Yükleniyor"
      />
    );
  }, [loading]);

  // Compose all adornments
  const allAdornments = useMemo(() => {
    const elements: React.ReactNode[] = [];
    
    // Add status icon first (if not loading and status exists)
    if (statusIcon && !loading) elements.push(statusIcon);
    
    // Add loading spinner (overrides status icon)
    if (loadingSpinner) elements.push(loadingSpinner);
    
    // Add password toggle
    if (passwordToggleButton) elements.push(passwordToggleButton);
    
    // Add copy button
    if (copyButton) elements.push(copyButton);
    
    // Add copied indicator
    if (copiedIndicator) elements.push(copiedIndicator);
    
    // Add clear button
    if (clearButton) elements.push(clearButton);
    
    // Add existing endAdornment last (to avoid conflicts)
    if (endAdornment) elements.push(endAdornment);
    
    return elements;
  }, [statusIcon, loading, loadingSpinner, passwordToggleButton, copyButton, copiedIndicator, clearButton, endAdornment]);

  // Final endAdornment
  const finalEndAdornment = useMemo(() => {
    if (allAdornments.length === 0) return undefined;
    
    const combinedAdornment = (
      <InputAdornment position="end">
        {allAdornments.map((adornment, index) => (
          <span
            key={index}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            {adornment}
          </span>
        ))}
      </InputAdornment>
    );

    // Apply custom render function if provided
    if (renderEndAdornment) {
      const rendered = renderEndAdornment(combinedAdornment);
      if (React.isValidElement(rendered)) return rendered;
    }
    
    return combinedAdornment;
  }, [allAdornments, renderEndAdornment]);

  return finalEndAdornment;
}
