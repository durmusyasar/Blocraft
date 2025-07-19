import React, { useMemo } from 'react';
import { InputAdornment, CircularProgress } from '@mui/material';
import { ClearButton } from '../ClearButton';

export function useInputAdornments({
  endAdornment,
  showClear,
  i18nClearButton,
  handleClear,
  disabled,
  loading,
  statusIcon,
  renderEndAdornment,
}: {
  endAdornment: React.ReactNode;
  showClear: boolean;
  i18nClearButton: string;
  handleClear: () => void;
  disabled: boolean;
  loading: boolean;
  statusIcon: React.ReactNode;
  renderEndAdornment?: (defaultAdornment: React.ReactNode) => React.ReactNode;
}) {
  // Compose adornments
  const adornments = useMemo(() => {
    const arr: React.ReactNode[] = [];
    if (endAdornment) arr.push(endAdornment);
    if (showClear)
      arr.push(
        <span key="clear-btn-span" title={i18nClearButton}>
          <ClearButton
            onClick={handleClear}
            disabled={disabled}
            aria-label={i18nClearButton}
          />
        </span>
      );
    return arr;
  }, [endAdornment, showClear, i18nClearButton, handleClear, disabled]);

  // Loading spinner'ı endAdornment'ın başına ekle
  const adornmentsWithLoading = useMemo(() => {
    const arr = [...adornments];
    if (loading) {
      arr.unshift(
        <CircularProgress
          size={20}
          color="inherit"
          key="loading-spinner"
          aria-label="Yükleniyor"
        />
      );
    }
    return arr;
  }, [adornments, loading]);

  // Status varsa endAdornment'a ekle
  const adornmentsWithStatus = useMemo(() => {
    const arr = [...adornmentsWithLoading];
    if (statusIcon) {
      arr.unshift(statusIcon);
    }
    return arr;
  }, [adornmentsWithLoading, statusIcon]);

  // Compose endAdornment
  let combinedEndAdornment: React.ReactNode = undefined;
  if (adornmentsWithStatus.length > 0) {
    combinedEndAdornment = (
      <InputAdornment position="end">
        {adornmentsWithStatus.map((ad, i) => (
          <span
            key={i}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            {ad}
          </span>
        ))}
      </InputAdornment>
    );
  }

  // Render prop ile endAdornment özelleştirme
  const finalEndAdornment: React.ReactNode = useMemo(() => {
    if (combinedEndAdornment && React.isValidElement(combinedEndAdornment))
      return combinedEndAdornment;
    if (renderEndAdornment) {
      const rendered = renderEndAdornment(combinedEndAdornment);
      if (React.isValidElement(rendered)) return rendered;
    }
    return undefined;
  }, [combinedEndAdornment, renderEndAdornment]);

  return finalEndAdornment;
} 