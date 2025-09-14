import { useState, useCallback } from 'react';

export interface CounterConfig {
  showCharacterCount?: boolean;
  showWordCount?: boolean;
  showLineCount?: boolean;
  showParagraphCount?: boolean;
  maxCharacters?: number;
  maxWords?: number;
  maxLines?: number;
  maxParagraphs?: number;
  warningThreshold?: number; // Percentage (0-1)
  criticalThreshold?: number; // Percentage (0-1)
}

export interface CounterStats {
  characters: number;
  words: number;
  lines: number;
  paragraphs: number;
  charactersRemaining: number;
  wordsRemaining: number;
  linesRemaining: number;
  paragraphsRemaining: number;
  characterPercentage: number;
  wordPercentage: number;
  linePercentage: number;
  paragraphPercentage: number;
  isWarning: boolean;
  isCritical: boolean;
  isOverLimit: boolean;
}

export interface UseTextCounterProps extends CounterConfig {
  enableCounter?: boolean;
  onStatsChange?: (stats: CounterStats) => void;
  onLimitReached?: (type: 'characters' | 'words' | 'lines' | 'paragraphs') => void;
}

export interface UseTextCounterReturn {
  stats: CounterStats;
  updateCounter: (text: string) => void;
  resetCounter: () => void;
  getCounterDisplay: () => {
    show: boolean;
    text: string;
    color: string;
    icon: string;
  };
  isLimitReached: (type: 'characters' | 'words' | 'lines' | 'paragraphs') => boolean;
}

/**
 * Text Counter hook'u
 * Karakter, kelime, satır ve paragraf sayacı
 */
export const useTextCounter = ({
  enableCounter = true,
  showCharacterCount = true,
  showWordCount = true,
  showLineCount = false,
  showParagraphCount = false,
  maxCharacters,
  maxWords,
  maxLines,
  maxParagraphs,
  warningThreshold = 0.8, // 80%
  criticalThreshold = 0.95, // 95%
  onStatsChange,
  onLimitReached,
}: UseTextCounterProps): UseTextCounterReturn => {
  
  const [stats, setStats] = useState<CounterStats>({
    characters: 0,
    words: 0,
    lines: 0,
    paragraphs: 0,
    charactersRemaining: 0,
    wordsRemaining: 0,
    linesRemaining: 0,
    paragraphsRemaining: 0,
    characterPercentage: 0,
    wordPercentage: 0,
    linePercentage: 0,
    paragraphPercentage: 0,
    isWarning: false,
    isCritical: false,
    isOverLimit: false,
  });

  // Metin istatistiklerini hesapla
  const calculateStats = useCallback((text: string): CounterStats => {
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    
    // Kalan sayılar
    const charactersRemaining = maxCharacters ? Math.max(0, maxCharacters - characters) : 0;
    const wordsRemaining = maxWords ? Math.max(0, maxWords - words) : 0;
    const linesRemaining = maxLines ? Math.max(0, maxLines - lines) : 0;
    const paragraphsRemaining = maxParagraphs ? Math.max(0, maxParagraphs - paragraphs) : 0;
    
    // Yüzdeler
    const characterPercentage = maxCharacters ? characters / maxCharacters : 0;
    const wordPercentage = maxWords ? words / maxWords : 0;
    const linePercentage = maxLines ? lines / maxLines : 0;
    const paragraphPercentage = maxParagraphs ? paragraphs / maxParagraphs : 0;
    
    // Uyarı ve kritik durumlar
    const isWarning = characterPercentage >= warningThreshold || 
                     wordPercentage >= warningThreshold ||
                     linePercentage >= warningThreshold ||
                     paragraphPercentage >= warningThreshold;
    
    const isCritical = characterPercentage >= criticalThreshold || 
                      wordPercentage >= criticalThreshold ||
                      linePercentage >= criticalThreshold ||
                      paragraphPercentage >= criticalThreshold;
    
    const isOverLimit = characters > (maxCharacters || Infinity) ||
                       words > (maxWords || Infinity) ||
                       lines > (maxLines || Infinity) ||
                       paragraphs > (maxParagraphs || Infinity);
    
    return {
      characters,
      words,
      lines,
      paragraphs,
      charactersRemaining,
      wordsRemaining,
      linesRemaining,
      paragraphsRemaining,
      characterPercentage,
      wordPercentage,
      linePercentage,
      paragraphPercentage,
      isWarning,
      isCritical,
      isOverLimit,
    };
  }, [maxCharacters, maxWords, maxLines, maxParagraphs, warningThreshold, criticalThreshold]);

  // Sayaç güncelle
  const updateCounter = useCallback((text: string) => {
    if (!enableCounter) return;
    
    const newStats = calculateStats(text);
    setStats(newStats);
    onStatsChange?.(newStats);
    
    // Limit kontrolü
    if (newStats.isOverLimit) {
      if (newStats.characters > (maxCharacters || 0)) {
        onLimitReached?.('characters');
      }
      if (newStats.words > (maxWords || 0)) {
        onLimitReached?.('words');
      }
      if (newStats.lines > (maxLines || 0)) {
        onLimitReached?.('lines');
      }
      if (newStats.paragraphs > (maxParagraphs || 0)) {
        onLimitReached?.('paragraphs');
      }
    }
  }, [enableCounter, calculateStats, onStatsChange, onLimitReached, maxCharacters, maxWords, maxLines, maxParagraphs]);

  // Sayaç sıfırla
  const resetCounter = useCallback(() => {
    const emptyStats = calculateStats('');
    setStats(emptyStats);
    onStatsChange?.(emptyStats);
  }, [calculateStats, onStatsChange]);

  // Limit kontrolü
  const isLimitReached = useCallback((type: 'characters' | 'words' | 'lines' | 'paragraphs'): boolean => {
    switch (type) {
      case 'characters':
        return maxCharacters ? stats.characters > maxCharacters : false;
      case 'words':
        return maxWords ? stats.words > maxWords : false;
      case 'lines':
        return maxLines ? stats.lines > maxLines : false;
      case 'paragraphs':
        return maxParagraphs ? stats.paragraphs > maxParagraphs : false;
      default:
        return false;
    }
  }, [stats, maxCharacters, maxWords, maxLines, maxParagraphs]);

  // Sayaç görünümü
  const getCounterDisplay = useCallback(() => {
    if (!enableCounter) {
      return { show: false, text: '', color: '', icon: '' };
    }
    
    const parts: string[] = [];
    
    if (showCharacterCount) {
      const charText = maxCharacters 
        ? `${stats.characters}/${maxCharacters}`
        : stats.characters.toString();
      parts.push(`Karakter: ${charText}`);
    }
    
    if (showWordCount) {
      const wordText = maxWords 
        ? `${stats.words}/${maxWords}`
        : stats.words.toString();
      parts.push(`Kelime: ${wordText}`);
    }
    
    if (showLineCount) {
      const lineText = maxLines 
        ? `${stats.lines}/${maxLines}`
        : stats.lines.toString();
      parts.push(`Satır: ${lineText}`);
    }
    
    if (showParagraphCount) {
      const paraText = maxParagraphs 
        ? `${stats.paragraphs}/${maxParagraphs}`
        : stats.paragraphs.toString();
      parts.push(`Paragraf: ${paraText}`);
    }
    
    const text = parts.join(' • ');
    
    // Renk belirleme
    let color = '#666';
    let icon = '📊';
    
    if (stats.isCritical) {
      color = '#f44336';
      icon = '⚠️';
    } else if (stats.isWarning) {
      color = '#ff9800';
      icon = '⚠️';
    } else if (stats.isOverLimit) {
      color = '#f44336';
      icon = '❌';
    }
    
    return {
      show: parts.length > 0,
      text,
      color,
      icon,
    };
  }, [
    enableCounter,
    showCharacterCount,
    showWordCount,
    showLineCount,
    showParagraphCount,
    maxCharacters,
    maxWords,
    maxLines,
    maxParagraphs,
    stats,
  ]);

  return {
    stats,
    updateCounter,
    resetCounter,
    getCounterDisplay,
    isLimitReached,
  };
};
