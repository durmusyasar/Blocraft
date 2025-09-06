import { useCallback, RefObject } from 'react';

export interface UseOtpKeyboardProps {
  inputsRef: RefObject<Array<HTMLInputElement | null>>;
  length: number;
  onKeyDown: (e: React.KeyboardEvent, idx: number) => void;
  onArrowLeft: (idx: number) => boolean;
  onArrowRight: (idx: number) => boolean;
  onArrowUp: (idx: number, value: string) => void;
  onArrowDown: (idx: number, value: string) => void;
  onBackspace: (idx: number) => void;
  onEnter: () => void;
  enabled?: boolean;
}

export const useOtpKeyboard = ({
  inputsRef,
  length,
  onKeyDown,
  onArrowLeft,
  onArrowRight,
  onArrowUp,
  onArrowDown,
  onBackspace,
  onEnter,
  enabled = true,
}: UseOtpKeyboardProps) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    if (!enabled) return;

    switch (e.key) {
      case 'Backspace':
        onBackspace(idx);
        e.preventDefault();
        break;
      
      case 'ArrowLeft':
        if (onArrowLeft(idx)) {
          inputsRef.current?.[idx - 1]?.focus();
          e.preventDefault();
        }
        break;
      
      case 'ArrowRight':
        if (onArrowRight(idx)) {
          inputsRef.current?.[idx + 1]?.focus();
          e.preventDefault();
        }
        break;
      
      case 'ArrowUp':
        const currentValue = inputsRef.current?.[idx]?.value || '';
        onArrowUp(idx, currentValue);
        e.preventDefault();
        break;
      
      case 'ArrowDown':
        const currentValueDown = inputsRef.current?.[idx]?.value || '';
        onArrowDown(idx, currentValueDown);
        e.preventDefault();
        break;
      
      case 'Enter':
        onEnter();
        e.preventDefault();
        break;
      
      case 'Tab':
        // Allow default tab behavior
        break;
      
      default:
        // Handle other keys
        onKeyDown(e, idx);
        break;
    }
  }, [enabled, inputsRef, onKeyDown, onArrowLeft, onArrowRight, onArrowUp, onArrowDown, onBackspace, onEnter]);

  const getShortcuts = useCallback(() => {
    if (!enabled) return {};
    
    return {
      'Arrow Keys': 'Navigate between inputs',
      'Arrow Up/Down': 'Increase/decrease current digit',
      'Backspace': 'Clear current input and move back',
      'Enter': 'Complete OTP',
      'Tab': 'Move to next input',
    };
  }, [enabled]);

  return {
    handleKeyDown,
    getShortcuts,
  };
};
