import { useCallback, useState, useRef, useEffect } from 'react';

export interface UseOtpCameraProps {
  enableCamera?: boolean;
  onQRCodeDetected?: (code: string) => void;
  onCameraError?: (error: Error) => void;
  onCameraSuccess?: () => void;
  scanInterval?: number;
  constraints?: MediaStreamConstraints;
}

export interface CameraState {
  isSupported: boolean;
  isActive: boolean;
  isScanning: boolean;
  hasPermission: boolean;
  error: string | null;
  stream: MediaStream | null;
}

export const useOtpCamera = ({
  enableCamera = false,
  onQRCodeDetected,
  onCameraError,
  onCameraSuccess,
  scanInterval = 100,
  constraints = {
    video: {
      facingMode: 'environment',
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
  },
}: UseOtpCameraProps) => {
  const [state, setState] = useState<CameraState>({
    isSupported: false,
    isActive: false,
    isScanning: false,
    hasPermission: false,
    error: null,
    stream: null,
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastScannedCodeRef = useRef<string | null>(null);

  // Check for camera support
  /*useEffect(() => {
    if (!enableCamera) return;

    const isSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    setState(prev => ({ ...prev, isSupported }));
  }, [enableCamera]);
*/
  // QR Code detection using simple pattern matching
  const detectQRCode = useCallback((canvas: HTMLCanvasElement): string | null => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Simple QR code pattern detection (this is a simplified version)
    // In a real implementation, you would use a proper QR code library like qr-scanner
    const patterns = [];
    let currentPattern = '';
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = (r + g + b) / 3;
      
      currentPattern += brightness > 128 ? '1' : '0';
      
      if (currentPattern.length === 8) {
        patterns.push(currentPattern);
        currentPattern = '';
      }
    }

    // Look for QR code patterns (simplified)
    const qrPattern = patterns.join('');
    const qrMatch = qrPattern.match(/1010101010101010/g);
    
    if (qrMatch && qrMatch.length > 0) {
      // Extract potential QR code data (simplified)
      const startIndex = qrPattern.indexOf('1010101010101010');
      const endIndex = qrPattern.lastIndexOf('1010101010101010');
      
      if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        const extractedData = qrPattern.substring(startIndex, endIndex);
        // Convert binary to text (simplified)
        let result = '';
        for (let i = 0; i < extractedData.length; i += 8) {
          const byte = extractedData.substring(i, i + 8);
          if (byte.length === 8) {
            const charCode = parseInt(byte, 2);
            if (charCode >= 32 && charCode <= 126) {
              result += String.fromCharCode(charCode);
            }
          }
        }
        return result.length > 0 ? result : null;
      }
    }

    return null;
  }, []);

  // Start scanning
  const startScanning = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || state.isScanning) return;

    setState(prev => ({ ...prev, isScanning: true }));

    const scan = () => {
      if (!videoRef.current || !canvasRef.current || !state.isActive) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const detectedCode = detectQRCode(canvas);
      
      if (detectedCode && detectedCode !== lastScannedCodeRef.current) {
        lastScannedCodeRef.current = detectedCode;
        onQRCodeDetected?.(detectedCode);
        stopScanning();
      }
    };

    scanIntervalRef.current = setInterval(scan, scanInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isScanning, state.isActive, detectQRCode, onQRCodeDetected, scanInterval]);

  // Stop scanning
  const stopScanning = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setState(prev => ({ ...prev, isScanning: false }));
  }, []);

  // Start camera
  const startCamera = useCallback(async () => {
    if (!enableCamera || !state.isSupported || state.isActive) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      setState(prev => ({
        ...prev,
        isActive: true,
        hasPermission: true,
        stream,
        error: null,
      }));

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      onCameraSuccess?.();
    } catch (error) {
      const err = error as Error;
      setState(prev => ({
        ...prev,
        error: err.message,
        hasPermission: false,
      }));
      onCameraError?.(err);
    }
  }, [enableCamera, state.isSupported, state.isActive, constraints, onCameraSuccess, onCameraError]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (state.stream) {
      state.stream.getTracks().forEach(track => track.stop());
    }

    setState(prev => ({
      ...prev,
      isActive: false,
      stream: null,
    }));

    stopScanning();
  }, [state.stream, stopScanning]);

  // Toggle camera
  const toggleCamera = useCallback(() => {
    if (state.isActive) {
      stopCamera();
    } else {
      startCamera();
    }
  }, [state.isActive, startCamera, stopCamera]);

  // Start camera and scanning
  const startCameraAndScan = useCallback(async () => {
    await startCamera();
    if (state.isActive) {
      startScanning();
    }
  }, [startCamera, state.isActive, startScanning]);

  // Get camera button props
  const getCameraButtonProps = useCallback(() => {
    if (!enableCamera || !state.isSupported) return null;

    return {
      'data-testid': 'camera-button',
      'aria-label': state.isActive ? 'Stop camera' : 'Start camera',
      'disabled': !state.hasPermission && !state.isActive,
      'title': state.isActive ? 'Stop camera' : 'Start camera',
    };
  }, [enableCamera, state.isSupported, state.isActive, state.hasPermission]);

  // Get camera status
  const getCameraStatus = useCallback(() => {
    if (!enableCamera) return null;

    if (state.error) {
      return `Error: ${state.error}`;
    }

    if (state.isScanning) {
      return 'Scanning for QR code...';
    }

    if (state.isActive) {
      return 'Camera active - ready to scan';
    }

    if (!state.hasPermission) {
      return 'Camera permission required';
    }

    return 'Camera ready';
  }, [enableCamera, state.error, state.isScanning, state.isActive, state.hasPermission]);

  // Cleanup
  /*useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);
*/
  return {
    ...state,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    toggleCamera,
    startScanning,
    stopScanning,
    startCameraAndScan,
    getCameraButtonProps,
    getCameraStatus,
  };
};
