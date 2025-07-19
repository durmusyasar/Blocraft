import { useRef, useState, useEffect } from 'react';

export function useLiveRegion({
  showValidationStatus,
  enableAsyncValidation,
  validationResult,
}: {
  showValidationStatus: boolean;
  enableAsyncValidation: boolean;
  validationResult: { message?: string } | null;
}) {
  const liveRegionRef = useRef<HTMLDivElement | null>(null);
  const [liveRegionMessage, setLiveRegionMessage] = useState("");

  useEffect(() => {
    if (showValidationStatus && enableAsyncValidation && validationResult && validationResult.message) {
      setLiveRegionMessage(validationResult.message);
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = validationResult.message;
        setTimeout(() => {
          if (liveRegionRef.current) liveRegionRef.current.textContent = '';
        }, 1000);
      }
    }
  }, [validationResult, showValidationStatus, enableAsyncValidation]);

  return { liveRegionRef, liveRegionMessage };
} 