import { useCallback, useState, useEffect } from 'react';

export interface UseOtpResponsiveProps {
  responsiveWidth?: boolean;
  enableMobileOptimizations?: boolean;
}

export const useOtpResponsive = ({
  responsiveWidth = true,
  enableMobileOptimizations = true,
}: UseOtpResponsiveProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setIsMobile(true);
        setScreenSize('xs');
      } else if (width < 960) {
        setIsMobile(false);
        setScreenSize('sm');
      } else if (width < 1280) {
        setIsMobile(false);
        setScreenSize('md');
      } else if (width < 1920) {
        setIsMobile(false);
        setScreenSize('lg');
      } else {
        setIsMobile(false);
        setScreenSize('xl');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getContainerStyles = useCallback(() => {
    const baseStyles = {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
    };

    if (responsiveWidth) {
      return {
        ...baseStyles,
        width: '100%',
        minWidth: isMobile ? 200 : 300,
        maxWidth: isMobile ? 400 : 500,
      };
    }

    return baseStyles;
  }, [responsiveWidth, isMobile]);

  const getInputStyles = useCallback(() => {
    const baseStyles = {
      textAlign: 'center' as const,
      fontSize: isMobile ? 20 : 22,
      width: isMobile ? 32 : 36,
      height: isMobile ? 40 : 44,
      borderRadius: isMobile ? 4 : 6,
      // Spinner'ları kapat
      WebkitAppearance: 'none',
      MozAppearance: 'textfield',
    };

    if (enableMobileOptimizations) {
      return {
        ...baseStyles,
        // Mobile-specific optimizations
        touchAction: 'manipulation',
      };
    }

    return baseStyles;
  }, [isMobile, enableMobileOptimizations]);

  const getGapStyles = useCallback(() => {
    if (isMobile) {
      return { gap: 1 };
    }
    return { gap: 1.5 };
  }, [isMobile]);

  const getLabelStyles = useCallback(() => {
    return {
      fontSize: isMobile ? 14 : 16,
      marginBottom: isMobile ? 0.5 : 1,
    };
  }, [isMobile]);

  const getHelperTextStyles = useCallback(() => {
    return {
      fontSize: isMobile ? 11 : 12,
      marginTop: isMobile ? 0.25 : 0.5,
    };
  }, [isMobile]);

  const getButtonStyles = useCallback(() => {
    return {
      padding: isMobile ? '4px' : '6px',
      minWidth: isMobile ? 32 : 40,
      minHeight: isMobile ? 32 : 40,
    };
  }, [isMobile]);

  return {
    isMobile,
    screenSize,
    getContainerStyles,
    getInputStyles,
    getGapStyles,
    getLabelStyles,
    getHelperTextStyles,
    getButtonStyles,
  };
};
