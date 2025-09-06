import { useCallback, useState, useMemo } from 'react';

export interface UseOtpQRCodeProps {
  enableQRCode?: boolean;
  qrCodeData?: string;
  onQRCodeGenerated?: (qrCodeUrl: string) => void;
  onQRCodeError?: (error: Error) => void;
}

export const useOtpQRCode = ({
  enableQRCode = false,
  qrCodeData,
  onQRCodeGenerated,
  onQRCodeError,
}: UseOtpQRCodeProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = useCallback(async (data: string) => {
    if (!enableQRCode) return '';

    setIsGenerating(true);

    try {
      // Simulate QR code generation
      // In real implementation, this would use a QR code library like qrcode
      const qrCodeDataUrl = `data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="white"/>
          <text x="100" y="100" text-anchor="middle" font-family="monospace" font-size="12">
            QR: ${data}
          </text>
        </svg>
      `)}`;
      
      setQrCodeUrl(qrCodeDataUrl);
      onQRCodeGenerated?.(qrCodeDataUrl);
      
      return qrCodeDataUrl;
    } catch (error) {
      const err = error as Error;
      onQRCodeError?.(err);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, [enableQRCode, onQRCodeGenerated, onQRCodeError]);

  const downloadQRCode = useCallback(() => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'otp-qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qrCodeUrl]);

  const getQRCodeProps = useCallback(() => {
    if (!enableQRCode) return null;

    return {
      'data-testid': 'qr-code-button',
      'aria-label': 'Generate QR code for OTP',
      'disabled': isGenerating,
      'title': isGenerating ? 'Generating QR code...' : 'Generate QR code',
    };
  }, [enableQRCode, isGenerating]);

  const qrCodeImageProps = useMemo(() => {
    if (!qrCodeUrl) return null;

    return {
      src: qrCodeUrl,
      alt: 'OTP QR Code',
      'data-testid': 'qr-code-image',
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #ccc',
        borderRadius: '8px',
      },
    };
  }, [qrCodeUrl]);

  return {
    qrCodeUrl,
    isGenerating,
    generateQRCode,
    downloadQRCode,
    getQRCodeProps,
    qrCodeImageProps,
  };
};
