import { useState, useCallback, useRef, useEffect, useMemo } from 'react';

export interface VoiceSearchResult {
  text: string;
  confidence: number;
  isFinal: boolean;
  error?: string;
}

export interface UseVoiceSearchProps {
  enableVoiceSearch?: boolean;
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
  onResult?: (result: VoiceSearchResult) => void;
  onError?: (error: Error) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

export interface UseVoiceSearchReturn {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  confidence: number;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  clearTranscript: () => void;
  isAvailable: boolean;
}

/**
 * Sesli arama desteği hook'u
 * Speech Recognition API kullanarak sesli giriş
 */
export const useVoiceSearch = ({
  enableVoiceSearch = true,
  language = 'tr-TR',
  continuous = false,
  interimResults = true,
  maxAlternatives = 1,
  onResult,
  onError,
  onStart,
  onEnd,
}: UseVoiceSearchProps): UseVoiceSearchReturn => {
  
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const isSupported = typeof window !== 'undefined' && 'webkitSpeechRecognition' in window;

  // Hata mesajlarını çevir
  const getErrorMessage = useCallback((errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      'no-speech': 'Ses algılanamadı. Lütfen tekrar deneyin.',
      'audio-capture': 'Mikrofon erişimi reddedildi.',
      'not-allowed': 'Mikrofon izni verilmedi.',
      'service-not-allowed': 'Sesli arama servisi kullanılamıyor.',
      'bad-grammar': 'Dilbilgisi hatası.',
      'language-not-supported': 'Dil desteklenmiyor.',
      'network': 'Ağ hatası. İnternet bağlantınızı kontrol edin.',
      'aborted': 'Sesli arama iptal edildi.',
      'start': 'Sesli arama başlatılamadı.',
    };

    return errorMessages[errorCode] || 'Bilinmeyen hata oluştu.';
  }, []);


  // Speech Recognition API'yi başlat
  const initializeRecognition = useCallback(() => {
    if (!isSupported || !enableVoiceSearch) return null;

    try {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      recognition.lang = language;
      recognition.maxAlternatives = maxAlternatives;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        onStart?.();
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        let maxConfidence = 0;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          const confidence = result[0].confidence || 0;

          if (result.isFinal) {
            finalTranscript += transcript;
            maxConfidence = Math.max(maxConfidence, confidence);
          } else {
            interimTranscript += transcript;
          }
        }

        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);
        setConfidence(maxConfidence);

        if (finalTranscript) {
          onResult?.({
            text: finalTranscript,
            confidence: maxConfidence,
            isFinal: true,
          });
        } else if (interimTranscript) {
          onResult?.({
            text: interimTranscript,
            confidence: maxConfidence,
            isFinal: false,
          });
        }
      };

      recognition.onerror = (event: any) => {
        const errorMessage = getErrorMessage(event.error);
        setError(errorMessage);
        setIsListening(false);
        
        const error = new Error(errorMessage);
        onError?.(error);
      };

      recognition.onend = () => {
        setIsListening(false);
        onEnd?.();
      };

      return recognition;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Speech recognition initialization failed');
      setError(error.message);
      onError?.(error);
      return null;
    }
  }, [isSupported, enableVoiceSearch, continuous, interimResults, language, maxAlternatives, onStart, onResult, getErrorMessage, onError, onEnd]);

  // Dinlemeyi durdur
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn('Error stopping recognition:', err);
      }
    }
  }, [isListening]);

  
  // Dinlemeyi başlat
  const startListening = useCallback(() => {
    if (!isSupported || !enableVoiceSearch) {
      setError('Sesli arama desteklenmiyor veya devre dışı.');
      return;
    }

    if (isListening) {
      stopListening();
      return;
    }

    try {
      if (!recognitionRef.current) {
        recognitionRef.current = initializeRecognition();
      }

      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to start listening');
      setError(error.message);
      onError?.(error);
    }
  }, [isSupported, enableVoiceSearch, isListening, stopListening, initializeRecognition, onError]);


  // Transcript'i temizle
  const clearTranscript = useCallback(() => {
    setTranscript('');
    setConfidence(0);
    setError(null);
  }, []);

  // Component unmount'ta temizlik
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.warn('Error cleaning up recognition:', err);
        }
      }
    };
  }, []);

  // Mikrofon izni kontrolü
  const isAvailable = useMemo(() => {
    return isSupported && enableVoiceSearch && navigator.permissions;
  }, [isSupported, enableVoiceSearch]);

  return {
    isListening,
    isSupported,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    clearTranscript,
    isAvailable: isAvailable as boolean,
  };
};
