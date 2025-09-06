import { useCallback, RefObject } from 'react';

export interface UseOtpFocusProps {
  inputsRef: RefObject<Array<HTMLInputElement | null>>;
  length: number;
  autoFocus?: boolean;
  onFocus: (idx: number) => void;
  onBlur: (idx: number) => void;
}

export const useOtpFocus = ({
  inputsRef,
  length,
  autoFocus = false,
  onFocus,
  onBlur,
}: UseOtpFocusProps) => {
  const handleFocus = useCallback((idx: number) => {
    onFocus(idx);
  }, [onFocus]);

  const handleBlur = useCallback((idx: number) => {
    onBlur(idx);
  }, [onBlur]);

  const focusNext = useCallback((currentIdx: number) => {
    if (currentIdx < length - 1) {
      inputsRef.current?.[currentIdx + 1]?.focus();
    }
  }, [inputsRef, length]);

  const focusPrevious = useCallback((currentIdx: number) => {
    if (currentIdx > 0) {
      inputsRef.current?.[currentIdx - 1]?.focus();
    }
  }, [inputsRef]);

  const focusFirst = useCallback(() => {
    inputsRef.current?.[0]?.focus();
  }, [inputsRef]);

  const focusLast = useCallback(() => {
    inputsRef.current?.[length - 1]?.focus();
  }, [inputsRef, length]);

  const focusIndex = useCallback((idx: number) => {
    if (idx >= 0 && idx < length) {
      inputsRef.current?.[idx]?.focus();
    }
  }, [inputsRef, length]);

  const blurAll = useCallback(() => {
    inputsRef.current?.forEach(input => {
      if (input) {
        input.blur();
      }
    });
  }, [inputsRef]);

  const getFocusState = useCallback(() => {
    const focusedIndex = inputsRef.current?.findIndex(input => 
      input === document.activeElement
    );
    return focusedIndex ?? -1;
  }, [inputsRef]);

  return {
    handleFocus,
    handleBlur,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    focusIndex,
    blurAll,
    getFocusState,
  };
};
