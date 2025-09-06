import { useCallback, useState, useEffect } from 'react';

export interface UseOtpNFCProps {
  enableNFC?: boolean;
  onNFCMessage?: (message: string) => void;
  onNFCError?: (error: Error) => void;
  onNFCSuccess?: () => void;
  timeout?: number;
}

export interface NFCState {
  isSupported: boolean;
  isAvailable: boolean;
  isReading: boolean;
  isWriting: boolean;
  error: string | null;
  lastMessage: string | null;
}

export const useOtpNFC = ({
  enableNFC = false,
  onNFCMessage,
  onNFCError,
  onNFCSuccess,
  timeout = 10000,
}: UseOtpNFCProps) => {
  const [state, setState] = useState<NFCState>({
    isSupported: false,
    isAvailable: false,
    isReading: false,
    isWriting: false,
    error: null,
    lastMessage: null,
  });

  // Check for NFC support
  useEffect(() => {
    if (!enableNFC) return;

    const isSupported = 'NDEFReader' in window;
    setState(prev => ({ ...prev, isSupported, isAvailable: isSupported }));
  }, [enableNFC]);

  // Read NFC messages
  const readNFC = useCallback(async () => {
    if (!enableNFC || !state.isSupported || state.isReading) return;

    try {
      setState(prev => ({ ...prev, isReading: true, error: null }));

      const reader = new (window as any).NDEFReader();
      
      await reader.scan();
      
      reader.addEventListener('reading', (event: any) => {
        const message = event.message;
        const record = message.records[0];
        
        if (record && record.data) {
          const text = new TextDecoder().decode(record.data);
          setState(prev => ({ ...prev, lastMessage: text }));
          onNFCMessage?.(text);
          onNFCSuccess?.();
        }
      });

      reader.addEventListener('readingerror', (event: any) => {
        const error = new Error(`NFC reading error: ${event.error}`);
        setState(prev => ({ ...prev, error: error.message }));
        onNFCError?.(error);
      });

      // Timeout
      setTimeout(() => {
        setState(prev => ({ ...prev, isReading: false }));
      }, timeout);

    } catch (error) {
      const err = error as Error;
      setState(prev => ({ 
        ...prev, 
        error: err.message, 
        isReading: false 
      }));
      onNFCError?.(err);
    }
  }, [enableNFC, state.isSupported, state.isReading, timeout, onNFCMessage, onNFCError, onNFCSuccess]);

  // Write NFC message
  const writeNFC = useCallback(async (message: string) => {
    if (!enableNFC || !state.isSupported || state.isWriting) return;

    try {
      setState(prev => ({ ...prev, isWriting: true, error: null }));

      const writer = new (window as any).NDEFWriter();
      
      const record = {
        recordType: 'text',
        data: new TextEncoder().encode(message),
      };

      await writer.write(record);
      
      setState(prev => ({ ...prev, isWriting: false }));
      onNFCSuccess?.();

    } catch (error) {
      const err = error as Error;
      setState(prev => ({ 
        ...prev, 
        error: err.message, 
        isWriting: false 
      }));
      onNFCError?.(err);
    }
  }, [enableNFC, state.isSupported, state.isWriting, onNFCError, onNFCSuccess]);

  // Stop reading
  const stopReading = useCallback(() => {
    setState(prev => ({ ...prev, isReading: false }));
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Get NFC button props
  const getNFCButtonProps = useCallback(() => {
    if (!enableNFC || !state.isSupported) return null;

    return {
      'data-testid': 'nfc-button',
      'aria-label': state.isReading ? 'Stop NFC reading' : 'Start NFC reading',
      'disabled': !state.isAvailable,
      'title': state.isReading ? 'Stop NFC reading' : 'Start NFC reading',
    };
  }, [enableNFC, state.isSupported, state.isReading, state.isAvailable]);

  // Get NFC status
  const getNFCStatus = useCallback(() => {
    if (!enableNFC) return null;

    if (state.error) {
      return `Error: ${state.error}`;
    }

    if (state.isReading) {
      return 'Reading NFC...';
    }

    if (state.isWriting) {
      return 'Writing NFC...';
    }

    if (state.lastMessage) {
      return `Last message: ${state.lastMessage}`;
    }

    if (!state.isSupported) {
      return 'NFC not supported';
    }

    return 'NFC ready';
  }, [enableNFC, state.error, state.isReading, state.isWriting, state.lastMessage, state.isSupported]);

  return {
    ...state,
    readNFC,
    writeNFC,
    stopReading,
    clearError,
    getNFCButtonProps,
    getNFCStatus,
  };
};
