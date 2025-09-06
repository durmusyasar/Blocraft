import { useCallback } from 'react';

export interface UseOtpPasteProps {
  length: number;
  onPaste: (pasted: string) => boolean;
  inputType?: 'number' | 'text';
}

export const useOtpPaste = ({
  length,
  onPaste,
  inputType = 'number',
}: UseOtpPasteProps) => {
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    
    const pasted = e.clipboardData.getData('Text');
    const success = onPaste(pasted);
    
    if (success) {
      // Focus the last filled input or the next empty one
      const filledLength = Math.min(pasted.length, length);
      const focusIndex = Math.min(filledLength, length - 1);
      
      // This will be handled by the parent component
      return focusIndex;
    }
    
    return -1;
  }, [length, onPaste]);

  const validatePastedContent = useCallback((content: string) => {
    const cleanContent = content.replace(/\s/g, '');
    
    if (inputType === 'number') {
      return /^[0-9]+$/.test(cleanContent);
    }
    
    return /^[0-9a-zA-Z]+$/.test(cleanContent);
  }, [inputType]);

  const getPasteInstructions = useCallback(() => {
    return `Paste ${inputType === 'number' ? 'numeric' : 'alphanumeric'} OTP code (${length} characters)`;
  }, [inputType, length]);

  return {
    handlePaste,
    validatePastedContent,
    getPasteInstructions,
  };
};
