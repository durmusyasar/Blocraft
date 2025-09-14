import { useState, useCallback } from 'react';

export interface RichTextFormat {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  code: boolean;
  link: string | null;
  color: string | null;
  backgroundColor: string | null;
}

export interface UseRichTextEditorProps {
  enableRichText?: boolean;
  enableMarkdown?: boolean;
  enableHTML?: boolean;
  enableFormatting?: boolean;
  enableLinks?: boolean;
  enableColors?: boolean;
  onFormatChange?: (format: RichTextFormat) => void;
}

export interface UseRichTextEditorReturn {
  isRichTextEnabled: boolean;
  currentFormat: RichTextFormat;
  applyFormat: (format: Partial<RichTextFormat>) => void;
  toggleFormat: (format: keyof RichTextFormat) => void;
  insertLink: (url: string, text: string) => void;
  removeFormat: () => void;
  getFormattedText: (text: string) => string;
  getPlainText: (html: string) => string;
  formatText: (text: string, format: RichTextFormat) => string;
}

/**
 * Rich Text Editor hook'u
 * Metin formatlama ve zengin metin editörü özellikleri
 */
export const useRichTextEditor = ({
  enableRichText = false,
  enableMarkdown = false,
  enableHTML = false,
  enableFormatting = true,
  enableLinks = true,
  enableColors = true,
  onFormatChange,
}: UseRichTextEditorProps): UseRichTextEditorReturn => {
  
  const [currentFormat, setCurrentFormat] = useState<RichTextFormat>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    code: false,
    link: null,
    color: null,
    backgroundColor: null,
  });

  const isRichTextEnabled = enableRichText && (enableMarkdown || enableHTML);

  // Format uygula
  const applyFormat = useCallback((format: Partial<RichTextFormat>) => {
    const newFormat = { ...currentFormat, ...format };
    setCurrentFormat(newFormat);
    onFormatChange?.(newFormat);
  }, [currentFormat, onFormatChange]);

  // Format'ı toggle et
  const toggleFormat = useCallback((format: keyof RichTextFormat) => {
    if (!enableFormatting) return;
    
    const newFormat = {
      ...currentFormat,
      [format]: !currentFormat[format],
    };
    
    // Link dışındaki formatları toggle et
    if (format !== 'link') {
      setCurrentFormat(newFormat);
      onFormatChange?.(newFormat);
    }
  }, [currentFormat, enableFormatting, onFormatChange]);

  // Link ekle
  const insertLink = useCallback((url: string, text: string) => {
    if (!enableLinks) return;
    
    const newFormat = {
      ...currentFormat,
      link: url,
    };
    setCurrentFormat(newFormat);
    onFormatChange?.(newFormat);
  }, [currentFormat, enableLinks, onFormatChange]);

  // Format'ı kaldır
  const removeFormat = useCallback(() => {
    const newFormat: RichTextFormat = {
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      code: false,
      link: null,
      color: null,
      backgroundColor: null,
    };
    setCurrentFormat(newFormat);
    onFormatChange?.(newFormat);
  }, [onFormatChange]);

  // HTML'i plain text'e çevir
  const getPlainText = useCallback((html: string): string => {
    if (!enableHTML) return html;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }, [enableHTML]);

  // Plain text'i HTML'e çevir
  const getFormattedText = useCallback((text: string): string => {
    if (!isRichTextEnabled) return text;
    
    let formatted = text;
    
    // Bold
    if (currentFormat.bold) {
      formatted = `<strong>${formatted}</strong>`;
    }
    
    // Italic
    if (currentFormat.italic) {
      formatted = `<em>${formatted}</em>`;
    }
    
    // Underline
    if (currentFormat.underline) {
      formatted = `<u>${formatted}</u>`;
    }
    
    // Strikethrough
    if (currentFormat.strikethrough) {
      formatted = `<s>${formatted}</s>`;
    }
    
    // Code
    if (currentFormat.code) {
      formatted = `<code>${formatted}</code>`;
    }
    
    // Link
    if (currentFormat.link) {
      formatted = `<a href="${currentFormat.link}" target="_blank" rel="noopener noreferrer">${formatted}</a>`;
    }
    
    // Color
    if (currentFormat.color) {
      formatted = `<span style="color: ${currentFormat.color}">${formatted}</span>`;
    }
    
    // Background color
    if (currentFormat.backgroundColor) {
      formatted = `<span style="background-color: ${currentFormat.backgroundColor}">${formatted}</span>`;
    }
    
    return formatted;
  }, [isRichTextEnabled, currentFormat]);

  // Metni formatla
  const formatText = useCallback((text: string, format: RichTextFormat): string => {
    if (!isRichTextEnabled) return text;
    
    let formatted = text;
    
    // Bold
    if (format.bold) {
      formatted = `<strong>${formatted}</strong>`;
    }
    
    // Italic
    if (format.italic) {
      formatted = `<em>${formatted}</em>`;
    }
    
    // Underline
    if (format.underline) {
      formatted = `<u>${formatted}</u>`;
    }
    
    // Strikethrough
    if (format.strikethrough) {
      formatted = `<s>${formatted}</s>`;
    }
    
    // Code
    if (format.code) {
      formatted = `<code>${formatted}</code>`;
    }
    
    // Link
    if (format.link) {
      formatted = `<a href="${format.link}" target="_blank" rel="noopener noreferrer">${formatted}</a>`;
    }
    
    // Color
    if (format.color) {
      formatted = `<span style="color: ${format.color}">${formatted}</span>`;
    }
    
    // Background color
    if (format.backgroundColor) {
      formatted = `<span style="background-color: ${format.backgroundColor}">${formatted}</span>`;
    }
    
    return formatted;
  }, [isRichTextEnabled]);

  return {
    isRichTextEnabled,
    currentFormat,
    applyFormat,
    toggleFormat,
    insertLink,
    removeFormat,
    getFormattedText,
    getPlainText,
    formatText,
  };
};
