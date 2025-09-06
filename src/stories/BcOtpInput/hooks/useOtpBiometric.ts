import { useCallback, useState, useEffect } from 'react';

export interface UseOtpBiometricProps {
  enableBiometric?: boolean;
  onBiometricSuccess?: (otp: string) => void;
  onBiometricError?: (error: Error) => void;
}

export const useOtpBiometric = ({
  enableBiometric = false,
  onBiometricSuccess,
  onBiometricError,
}: UseOtpBiometricProps) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (!enableBiometric) return;

    // Check if WebAuthn is supported
    const checkSupport = async () => {
      try {
        if (window.PublicKeyCredential) {
          const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
          setIsSupported(true);
          setIsAvailable(available);
        }
      } catch (error) {
        console.warn('Biometric authentication not supported:', error);
        setIsSupported(false);
        setIsAvailable(false);
      }
    };

    checkSupport();
  }, [enableBiometric]);

  const authenticate = useCallback(async () => {
    if (!enableBiometric || !isSupported || !isAvailable) {
      throw new Error('Biometric authentication not available');
    }

    setIsAuthenticating(true);

    try {
      // Simulate biometric authentication
      // In real implementation, this would use WebAuthn API
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: { name: 'OTP App' },
          user: {
            id: new Uint8Array(16),
            name: 'user@example.com',
            displayName: 'User',
          },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
          },
          timeout: 60000,
          attestation: 'direct',
        },
      });

      // Use credential data to generate deterministic OTP
      if (!credential) {
        throw new Error('Biometric authentication failed - no credential returned');
      }
      
      const credentialId = credential.id;
      const timestamp = Date.now();
      const otp = Math.abs(credentialId.charCodeAt(0) + timestamp).toString().slice(-6).padStart(6, '0');
      
      onBiometricSuccess?.(otp);
      
      return otp;
    } catch (error) {
      const err = error as Error;
      onBiometricError?.(err);
      throw err;
    } finally {
      setIsAuthenticating(false);
    }
  }, [enableBiometric, isSupported, isAvailable, onBiometricSuccess, onBiometricError]);

  const getBiometricButtonProps = useCallback(() => {
    if (!enableBiometric || !isSupported) return null;

    return {
      'data-testid': 'biometric-button',
      'aria-label': 'Authenticate with biometric',
      'disabled': !isAvailable || isAuthenticating,
      'title': isAuthenticating ? 'Authenticating...' : 'Use biometric authentication',
    };
  }, [enableBiometric, isSupported, isAvailable, isAuthenticating]);

  return {
    isSupported,
    isAvailable,
    isAuthenticating,
    authenticate,
    getBiometricButtonProps,
  };
};
