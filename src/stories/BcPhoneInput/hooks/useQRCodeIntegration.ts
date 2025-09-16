import { useState, useCallback } from 'react';
import { CountryType } from '../types';

export interface QRCodeData {
  phone: string;
  country: string;
  formattedPhone: string;
  internationalPhone: string;
  vcardData?: string;
  qrCodeUrl?: string;
}

export interface UseQRCodeIntegrationProps {
  country: string;
  countryList: CountryType[];
  enableQRCode?: boolean;
  enableVCard?: boolean;
  qrCodeSize?: number;
  qrCodeErrorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  onQRCodeGenerated?: (qrData: QRCodeData) => void;
  onQRCodeError?: (error: Error) => void;
}

export interface UseQRCodeIntegrationReturn {
  qrData: QRCodeData | null;
  isGenerating: boolean;
  generateQRCode: (phone: string) => Promise<QRCodeData | null>;
  generateVCard: (phone: string, name?: string, organization?: string) => string;
  downloadQRCode: () => void;
  copyQRCodeToClipboard: () => Promise<void>;
  clearQRCode: () => void;
  getQRCodeText: (phone: string) => string;
}

/**
 * QR Code entegrasyonu hook'u
 * Telefon numarasını QR olarak gösterme
 */
export const useQRCodeIntegration = ({
  country,
  countryList,
  enableQRCode = true,
  enableVCard = true,
  qrCodeSize = 256,
  qrCodeErrorCorrectionLevel = 'M',
  onQRCodeGenerated,
  onQRCodeError,
}: UseQRCodeIntegrationProps): UseQRCodeIntegrationReturn => {
  
  const [qrData, setQrData] = useState<QRCodeData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // QR Code metnini oluştur
  const getQRCodeText = useCallback((phone: string): string => {
    if (!phone) return '';
    
    const countryData = countryList.find(c => c.code === country);
    const internationalPhone = `+${countryData?.dial || ''}${phone.replace(/\D/g, '')}`;
    
    return `tel:${internationalPhone}`;
  }, [country, countryList]);

  // VCard oluştur
  const generateVCard = useCallback((phone: string, name?: string, organization?: string): string => {
    if (!phone) return '';
    
    const countryData = countryList.find(c => c.code === country);
    const internationalPhone = `+${countryData?.dial || ''}${phone.replace(/\D/g, '')}`;
    
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      name ? `FN:${name}` : '',
      organization ? `ORG:${organization}` : '',
      `TEL:${internationalPhone}`,
      `TEL;TYPE=CELL:${internationalPhone}`,
      'END:VCARD'
    ].filter(Boolean).join('\n');
    
    return vcard;
  }, [country, countryList]);

  // Telefon numarasını formatla
  const formatPhoneNumber = useCallback((phone: string, mask: string): string => {
    const digits = phone.replace(/\D/g, '');
    const maskChars = mask.split('');
    let formatted = '';
    let digitIndex = 0;

    for (let i = 0; i < maskChars.length && digitIndex < digits.length; i++) {
      if (maskChars[i] === '9') {
        formatted += digits[digitIndex];
        digitIndex++;
      } else {
        formatted += maskChars[i];
      }
    }

    return formatted;
  }, []);


  // QR Code oluştur
  const generateQRCode = useCallback(async (phone: string): Promise<QRCodeData | null> => {
    if (!enableQRCode || !phone) return null;

    setIsGenerating(true);

    try {
      const countryData = countryList.find(c => c.code === country);
      const digits = phone.replace(/\D/g, '');
      const internationalPhone = `+${countryData?.dial || ''}${digits}`;
      const formattedPhone = formatPhoneNumber(phone, countryData?.mask || '(999) 999-9999');
      
      const qrText = getQRCodeText(phone);
      const vcardData = enableVCard ? generateVCard(phone) : undefined;
      
      // QR Code URL oluştur (QR Server API kullanarak)
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrCodeSize}x${qrCodeSize}&data=${encodeURIComponent(qrText)}&ecc=${qrCodeErrorCorrectionLevel}`;
      
      const qrData: QRCodeData = {
        phone,
        country,
        formattedPhone,
        internationalPhone,
        vcardData,
        qrCodeUrl,
      };

      setQrData(qrData);
      onQRCodeGenerated?.(qrData);
      
      return qrData;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('QR Code generation failed');
      onQRCodeError?.(err);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [enableQRCode, countryList, formatPhoneNumber, getQRCodeText, enableVCard, generateVCard, qrCodeSize, qrCodeErrorCorrectionLevel, country, onQRCodeGenerated, onQRCodeError]);


  // QR Code'u indir
  const downloadQRCode = useCallback(() => {
    if (!qrData?.qrCodeUrl) return;

    try {
      const link = document.createElement('a');
      link.href = qrData.qrCodeUrl;
      link.download = `phone-qr-${qrData.country}-${qrData.phone.replace(/\D/g, '')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.warn('Failed to download QR code:', error);
    }
  }, [qrData]);

  // QR Code'u panoya kopyala
  const copyQRCodeToClipboard = useCallback(async (): Promise<void> => {
    if (!qrData?.qrCodeUrl) return;

    try {
      // QR Code resmini fetch et
      const response = await fetch(qrData.qrCodeUrl);
      const blob = await response.blob();
      
      // Clipboard API kullanarak kopyala
      if (navigator.clipboard && 'write' in navigator.clipboard) {
        const clipboardItem = new ClipboardItem({
          'image/png': blob
        });
        await navigator.clipboard.write([clipboardItem]);
      } else {
        // Fallback: QR Code URL'ini metin olarak kopyala
        try {
          await (navigator.clipboard as { writeText: (text: string) => Promise<void> }).writeText(qrData.qrCodeUrl);
        } catch (fallbackError) {
          console.warn('Failed to copy QR code URL:', fallbackError);
        }
      }
    } catch (error) {
      console.warn('Failed to copy QR code to clipboard:', error);
      // Fallback: QR Code URL'ini metin olarak kopyala
      try {
        await navigator.clipboard.writeText(qrData.qrCodeUrl);
      } catch (fallbackError) {
        console.warn('Failed to copy QR code URL:', fallbackError);
      }
    }
  }, [qrData]);

  // QR Code'u temizle
  const clearQRCode = useCallback(() => {
    setQrData(null);
  }, []);

  return {
    qrData,
    isGenerating,
    generateQRCode,
    generateVCard,
    downloadQRCode,
    copyQRCodeToClipboard,
    clearQRCode,
    getQRCodeText,
  };
};
