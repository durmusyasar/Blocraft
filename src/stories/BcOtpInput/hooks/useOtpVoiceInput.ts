import { useCallback, useState, useEffect, useRef } from 'react';

// Speech Recognition API types
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface UseOtpVoiceInputProps {
  enableVoiceInput?: boolean;
  onVoiceResult?: (text: string) => void;
  onVoiceError?: (error: Error) => void;
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

export interface VoiceInputState {
  isListening: boolean;
  isSupported: boolean;
  isAvailable: boolean;
  transcript: string;
  confidence: number;
  isInterim: boolean;
}

export const useOtpVoiceInput = ({
  enableVoiceInput = false,
  onVoiceResult,
  onVoiceError,
  language = 'en-US',
  continuous = false,
  interimResults = true,
  maxAlternatives = 1,
}: UseOtpVoiceInputProps) => {
  const [state, setState] = useState<VoiceInputState>({
    isListening: false,
    isSupported: false,
    isAvailable: false,
    transcript: '',
    confidence: 0,
    isInterim: false,
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check for speech recognition support
  useEffect(() => {
    if (!enableVoiceInput) return;

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setState(prev => ({ ...prev, isSupported: true, isAvailable: true }));
    } else {
      setState(prev => ({ ...prev, isSupported: false, isAvailable: false }));
    }
  }, [enableVoiceInput]);

  // Initialize speech recognition
  const initializeRecognition = useCallback(() => {
    if (!enableVoiceInput || !state.isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = language;
    recognition.maxAlternatives = maxAlternatives;

    recognition.onstart = () => {
      setState(prev => ({ ...prev, isListening: true, transcript: '', isInterim: false }));
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript.trim();
      const confidence = result[0].confidence;
      const isInterim = result.isFinal === false;

      setState(prev => ({
        ...prev,
        transcript,
        confidence,
        isInterim,
      }));

      if (result.isFinal && transcript) {
        onVoiceResult?.(transcript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const error = new Error(`Speech recognition error: ${event.error}`);
      setState(prev => ({ ...prev, isListening: false }));
      onVoiceError?.(error);
    };

    recognition.onend = () => {
      setState(prev => ({ ...prev, isListening: false }));
    };

    recognitionRef.current = recognition;
  }, [enableVoiceInput, state.isSupported, continuous, interimResults, language, maxAlternatives, onVoiceResult, onVoiceError]);

  // Start listening
  const startListening = useCallback(() => {
    if (!enableVoiceInput || !state.isSupported || state.isListening) return;

    try {
      initializeRecognition();
      recognitionRef.current?.start();
    } catch (error) {
      onVoiceError?.(error as Error);
    }
  }, [enableVoiceInput, state.isSupported, state.isListening, initializeRecognition, onVoiceError]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current && state.isListening) {
      recognitionRef.current.stop();
    }
  }, [state.isListening]);

  // Toggle listening
  const toggleListening = useCallback(() => {
    if (state.isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [state.isListening, startListening, stopListening]);

  // Clear transcript
  const clearTranscript = useCallback(() => {
    setState(prev => ({ ...prev, transcript: '', confidence: 0, isInterim: false }));
  }, []);

  // Auto-stop after timeout
  const startListeningWithTimeout = useCallback((timeoutMs: number = 5000) => {
    startListening();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      stopListening();
    }, timeoutMs);
  }, [startListening, stopListening]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Get voice input button props
  const getVoiceButtonProps = useCallback(() => {
    if (!enableVoiceInput || !state.isSupported) return null;

    return {
      'data-testid': 'voice-input-button',
      'aria-label': state.isListening ? 'Stop voice input' : 'Start voice input',
      'disabled': !state.isAvailable,
      'title': state.isListening ? 'Stop voice input' : 'Start voice input',
    };
  }, [enableVoiceInput, state.isSupported, state.isListening, state.isAvailable]);

  // Get voice input status
  const getVoiceStatus = useCallback(() => {
    if (!enableVoiceInput) return null;

    if (state.isListening) {
      return 'Listening...';
    }

    if (state.transcript) {
      return `Heard: ${state.transcript}`;
    }

    return 'Voice input ready';
  }, [enableVoiceInput, state.isListening, state.transcript]);

  return {
    ...state,
    startListening,
    stopListening,
    toggleListening,
    clearTranscript,
    startListeningWithTimeout,
    getVoiceButtonProps,
    getVoiceStatus,
  };
};
