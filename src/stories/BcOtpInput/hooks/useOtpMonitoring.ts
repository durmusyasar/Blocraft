import { useCallback, useEffect } from 'react';

export interface UseOtpMonitoringProps {
  monitoring?: {
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    onClear?: () => void;
    onError?: (error: Error) => void;
    onPerformance?: (metrics: any) => void;
  };
  enableAdvancedMonitoring?: boolean;
  value: string;
  length: number;
}

export const useOtpMonitoring = ({
  monitoring,
  enableAdvancedMonitoring = false,
  value,
  length,
}: UseOtpMonitoringProps) => {
  const trackEvent = useCallback((eventName: string, data?: any) => {
    if (!monitoring || !enableAdvancedMonitoring) return;

    try {
      // Advanced monitoring logic
      const eventData = {
        event: eventName,
        timestamp: Date.now(),
        value: value,
        length: length,
        completion: (value.length / length) * 100,
        ...data,
      };

      if (monitoring.onPerformance) {
        monitoring.onPerformance(eventData);
      }
    } catch (error) {
      if (monitoring.onError) {
        monitoring.onError(error as Error);
      }
    }
  }, [monitoring, enableAdvancedMonitoring, value, length]);

  const trackChange = useCallback((newValue: string) => {
    trackEvent('otp_change', { newValue });
  }, [trackEvent]);

  const trackComplete = useCallback((completedValue: string) => {
    trackEvent('otp_complete', { completedValue });
  }, [trackEvent]);

  const trackClear = useCallback(() => {
    trackEvent('otp_clear');
  }, [trackEvent]);

  const trackError = useCallback((error: Error) => {
    trackEvent('otp_error', { error: error.message });
  }, [trackEvent]);

  const trackPerformance = useCallback((metrics: any) => {
    trackEvent('otp_performance', metrics);
  }, [trackEvent]);

  // Track completion percentage
  useEffect(() => {
    if (value.length > 0) {
      const completion = (value.length / length) * 100;
      trackEvent('otp_progress', { completion });
    }
  }, [value.length, length, trackEvent]);

  return {
    trackChange,
    trackComplete,
    trackClear,
    trackError,
    trackPerformance,
    trackEvent,
  };
};
