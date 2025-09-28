import { useCallback, useState, useEffect } from 'react';

// WebOTP API Type Definitions
interface CredentialRequestOptions {
  otp: {
    transport: string[];
  };
}

interface OTPCredential extends Credential {
  code: string;
}

declare global {
  interface CredentialsContainer {
    get(options: CredentialRequestOptions): Promise<OTPCredential | null>;
  }
}

export interface UseOtpSMSProps {
  enableSMS?: boolean;
  phoneNumber?: string;
  onSMSSent?: (phoneNumber: string) => void;
  onSMSError?: (error: Error) => void;
  onSMSReceived?: (otp: string) => void;
}

export const useOtpSMS = ({
  enableSMS = false,
  phoneNumber,
  onSMSSent,
  onSMSError,
  onSMSReceived,
}: UseOtpSMSProps) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [lastSentTo, setLastSentTo] = useState<string>('');

  useEffect(() => {
    if (!enableSMS) return;

    // Check if SMS API is available (WebOTP API)
    const checkSupport = () => {
      if ('OTPCredential' in window) {
        setIsSupported(true);
      }
    };

    checkSupport();
  }, [enableSMS]);

  const sendSMS = useCallback(async (phone: string) => {
    if (!enableSMS || !isSupported) {
      throw new Error('SMS not supported');
    }

    setIsSending(true);

    try {
      // Simulate SMS sending
      // In real implementation, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLastSentTo(phone);
      onSMSSent?.(phone);
    } catch (error) {
      const err = error as Error;
      onSMSError?.(err);
      throw err;
    } finally {
      setIsSending(false);
    }
  }, [enableSMS, isSupported, onSMSSent, onSMSError]);

  const listenForSMS = useCallback(async () => {
    if (!enableSMS || !isSupported) return;

    try {
      // Listen for incoming SMS with OTP
      const otpCredential = await navigator.credentials.get({
        otp: { transport: ['sms'] }
      }) as OTPCredential | null;

      if (otpCredential?.code) {
        onSMSReceived?.(otpCredential.code);
      }
    } catch (error) {
      console.warn('SMS listening failed:', error);
    }
  }, [enableSMS, isSupported, onSMSReceived]);

  const getSMSButtonProps = useCallback(() => {
    if (!enableSMS || !isSupported) return null;

    return {
      'data-testid': 'sms-button',
      'aria-label': 'Send OTP via SMS',
      'disabled': isSending || !phoneNumber,
      'title': isSending ? 'Sending SMS...' : 'Send OTP via SMS',
    };
  }, [enableSMS, isSupported, isSending, phoneNumber]);

  const getSMSStatus = useCallback(() => {
    if (!enableSMS) return null;

    if (isSending) {
      return 'Sending SMS...';
    }

    if (lastSentTo) {
      return `SMS sent to ${lastSentTo}`;
    }

    return 'SMS not sent';
  }, [enableSMS, isSending, lastSentTo]);

  return {
    isSupported,
    isSending,
    lastSentTo,
    sendSMS,
    listenForSMS,
    getSMSButtonProps,
    getSMSStatus,
  };
};
