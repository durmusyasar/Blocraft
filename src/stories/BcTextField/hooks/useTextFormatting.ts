import { useState, useCallback, useMemo } from 'react';

export interface TextTransformation {
  uppercase: boolean;
  lowercase: boolean;
  capitalize: boolean;
  titleCase: boolean;
  sentenceCase: boolean;
}

export interface UseTextFormattingProps {
  enableTransformation?: boolean;
  enableAutoResize?: boolean;
  enableCharacterCount?: boolean;
  enableWordCount?: boolean;
  maxLength?: number;
  minLength?: number;
  onTransformationChange?: (transformation: TextTransformation) => void;
  onCountChange?: (charCount: number, wordCount: number) => void;
}

export interface UseTextFormattingReturn {
  transformation: TextTransformation;
  characterCount: number;
  wordCount: number;
  isOverLimit: boolean;
  isUnderLimit: boolean;
  remainingCharacters: number;
  missingCharacters: number;
  applyTransformation: (type: keyof TextTransformation) => void;
  transformText: (text: string, type: keyof TextTransformation) => string;
  getTextStats: (text: string) => {
    characters: number;
    words: number;
    lines: number;
    paragraphs: number;
  };
  resetTransformation: () => void;
  autoResize: (element: HTMLTextAreaElement | null) => void;
}

/**
 * Text Formatting hook'u
 * Metin dönüşümü, sayaç ve otomatik boyutlandırma
 */
export const useTextFormatting = ({
  enableTransformation = true,
  enableAutoResize = true,
  enableCharacterCount = true,
  enableWordCount = true,
  maxLength,
  minLength,
  onTransformationChange,
  onCountChange,
}: UseTextFormattingProps): UseTextFormattingReturn => {
  
  const [transformation, setTransformation] = useState<TextTransformation>({
    uppercase: false,
    lowercase: false,
    capitalize: false,
    titleCase: false,
    sentenceCase: false,
  });

  const [characterCount, setCharacterCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  // Karakter sayısını hesapla
  const calculateCounts = useCallback((text: string) => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    setCharacterCount(chars);
    setWordCount(words);
    onCountChange?.(chars, words);
  }, [onCountChange]);

  // Limit kontrolü
  const isOverLimit = useMemo(() => {
    return maxLength ? characterCount > maxLength : false;
  }, [characterCount, maxLength]);

  // Minimum limit kontrolü
  const isUnderLimit = useMemo(() => {
    return minLength ? characterCount < minLength : false;
  }, [characterCount, minLength]);

  // Kalan karakter sayısı
  const remainingCharacters = useMemo(() => {
    return maxLength ? Math.max(0, maxLength - characterCount) : 0;
  }, [characterCount, maxLength]);

  // Eksik karakter sayısı (minimum limit için)
  const missingCharacters = useMemo(() => {
    return minLength ? Math.max(0, minLength - characterCount) : 0;
  }, [characterCount, minLength]);

  // Metin dönüşümü uygula
  const applyTransformation = useCallback((type: keyof TextTransformation) => {
    if (!enableTransformation) return;
    
    const newTransformation = {
      uppercase: false,
      lowercase: false,
      capitalize: false,
      titleCase: false,
      sentenceCase: false,
      [type]: true,
    };
    
    setTransformation(newTransformation);
    onTransformationChange?.(newTransformation);
    
    // Use calculateCounts when transformation is applied
    if (enableCharacterCount || enableWordCount) {
      console.log(`Transformation applied: ${type}`);
    }
  }, [enableTransformation, onTransformationChange, enableCharacterCount, enableWordCount]);

  // Metni dönüştür
  const transformText = useCallback((text: string, type: keyof TextTransformation): string => {
    if (!enableTransformation) return text;
    
    let transformedText: string;
    
    switch (type) {
      case 'uppercase':
        transformedText = text.toUpperCase();
        break;
      case 'lowercase':
        transformedText = text.toLowerCase();
        break;
      case 'capitalize':
        transformedText = text.replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case 'titleCase':
        transformedText = text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case 'sentenceCase':
        transformedText = text.replace(/(^\w|\.\s+\w)/g, (txt) => txt.toUpperCase());
        break;
      default:
        transformedText = text;
    }
    
    // Use calculateCounts to update counts after transformation
    if (enableCharacterCount || enableWordCount) {
      calculateCounts(transformedText);
    }
    
    return transformedText;
  }, [enableTransformation, enableCharacterCount, enableWordCount, calculateCounts]);

  // Metin istatistikleri
  const getTextStats = useCallback((text: string) => {
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    
    // Use calculateCounts to update internal counts
    if (enableCharacterCount || enableWordCount) {
      calculateCounts(text);
    }
    
    return {
      characters,
      words,
      lines,
      paragraphs,
    };
  }, [enableCharacterCount, enableWordCount, calculateCounts]);

  // Dönüşümü sıfırla
  const resetTransformation = useCallback(() => {
    const newTransformation: TextTransformation = {
      uppercase: false,
      lowercase: false,
      capitalize: false,
      titleCase: false,
      sentenceCase: false,
    };
    setTransformation(newTransformation);
    onTransformationChange?.(newTransformation);
    
    // Use calculateCounts when resetting transformation
    if (enableCharacterCount || enableWordCount) {
      console.log('Transformation reset');
    }
  }, [onTransformationChange, enableCharacterCount, enableWordCount]);

  // Otomatik boyutlandırma
  const autoResize = useCallback((element: HTMLTextAreaElement | null) => {
    if (!enableAutoResize || !element) return;
    
    // Reset height to auto to get the correct scrollHeight
    element.style.height = 'auto';
    
    // Set height to scrollHeight
    const newHeight = Math.min(element.scrollHeight, 200); // Max height 200px
    element.style.height = `${newHeight}px`;
    
    // Use calculateCounts when auto-resizing to update counts
    if (enableCharacterCount || enableWordCount) {
      calculateCounts(element.value);
    }
  }, [enableAutoResize, enableCharacterCount, enableWordCount, calculateCounts]);

  return {
    transformation,
    characterCount,
    wordCount,
    isOverLimit,
    isUnderLimit,
    remainingCharacters,
    missingCharacters,
    applyTransformation,
    transformText,
    getTextStats,
    resetTransformation,
    autoResize,
  };
};
