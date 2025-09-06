import { useCallback, useState, useEffect, useRef } from 'react';

export interface UseOtpMetricsProps {
  enableMetrics?: boolean;
  onMetricUpdate?: (metrics: OTPMetrics) => void;
  onPerformanceIssue?: (issue: PerformanceIssue) => void;
}

export interface OTPMetrics {
  // User interaction metrics
  totalInputs: number;
  totalDeletes: number;
  totalPastes: number;
  totalValidations: number;
  totalCompletions: number;
  totalErrors: number;
  
  // Performance metrics
  averageInputTime: number;
  averageValidationTime: number;
  averageCompletionTime: number;
  renderCount: number;
  lastRenderTime: number;
  
  // User experience metrics
  completionRate: number;
  errorRate: number;
  averageAttemptsToComplete: number;
  timeToComplete: number;
  
  // Accessibility metrics
  keyboardNavigationCount: number;
  screenReaderUsage: boolean;
  highContrastUsage: boolean;
  
  // Session metrics
  sessionStartTime: number;
  sessionDuration: number;
  totalSessions: number;
}

export interface PerformanceIssue {
  type: 'slow_render' | 'slow_validation' | 'high_error_rate' | 'accessibility_issue';
  severity: 'low' | 'medium' | 'high';
  message: string;
  data: any;
}

export const useOtpMetrics = ({
  enableMetrics = false,
  onMetricUpdate,
  onPerformanceIssue,
}: UseOtpMetricsProps) => {
  const [metrics, setMetrics] = useState<OTPMetrics>({
    totalInputs: 0,
    totalDeletes: 0,
    totalPastes: 0,
    totalValidations: 0,
    totalCompletions: 0,
    totalErrors: 0,
    averageInputTime: 0,
    averageValidationTime: 0,
    averageCompletionTime: 0,
    renderCount: 0,
    lastRenderTime: 0,
    completionRate: 0,
    errorRate: 0,
    averageAttemptsToComplete: 0,
    timeToComplete: 0,
    keyboardNavigationCount: 0,
    screenReaderUsage: false,
    highContrastUsage: false,
    sessionStartTime: Date.now(),
    sessionDuration: 0,
    totalSessions: 1,
  });

  const inputTimes = useRef<number[]>([]);
  const validationTimes = useRef<number[]>([]);
  const completionTimes = useRef<number[]>([]);
  const sessionStartTime = useRef<number>(Date.now());
  const lastUpdateTime = useRef<number>(Date.now());

  const checkPerformanceIssues = useCallback((currentMetrics: OTPMetrics) => {
    if (!onPerformanceIssue) return;

    // Check for slow renders
    if (currentMetrics.lastRenderTime > 16) { // 60fps threshold
      onPerformanceIssue({
        type: 'slow_render',
        severity: currentMetrics.lastRenderTime > 50 ? 'high' : 'medium',
        message: `Slow render detected: ${currentMetrics.lastRenderTime.toFixed(2)}ms`,
        data: { renderTime: currentMetrics.lastRenderTime },
      });
    }

    // Check for high error rate
    if (currentMetrics.totalInputs > 0) {
      const errorRate = currentMetrics.totalErrors / currentMetrics.totalInputs;
      if (errorRate > 0.3) {
        onPerformanceIssue({
          type: 'high_error_rate',
          severity: errorRate > 0.5 ? 'high' : 'medium',
          message: `High error rate detected: ${(errorRate * 100).toFixed(1)}%`,
          data: { errorRate, totalErrors: currentMetrics.totalErrors, totalInputs: currentMetrics.totalInputs },
        });
      }
    }

    // Check for slow validation
    if (currentMetrics.averageValidationTime > 1000) {
      onPerformanceIssue({
        type: 'slow_validation',
        severity: currentMetrics.averageValidationTime > 3000 ? 'high' : 'medium',
        message: `Slow validation detected: ${currentMetrics.averageValidationTime.toFixed(2)}ms average`,
        data: { averageValidationTime: currentMetrics.averageValidationTime },
      });
    }
  }, [onPerformanceIssue]);


  useEffect(() => {
    if (!enableMetrics) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const sessionDuration = now - sessionStartTime.current;
      
      setMetrics(prev => {
        const newMetrics = {
          ...prev,
          sessionDuration,
          renderCount: prev.renderCount + 1,
          lastRenderTime: now - lastUpdateTime.current,
        };

        // Check for performance issues
        checkPerformanceIssues(newMetrics);
        
        onMetricUpdate?.(newMetrics);
        lastUpdateTime.current = now;
        
        return newMetrics;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [checkPerformanceIssues, enableMetrics, onMetricUpdate]);

  const recordInput = useCallback((inputTime: number = 0) => {
    if (!enableMetrics) return;

    setMetrics(prev => {
      const newInputTimes = [...inputTimes.current, inputTime];
      inputTimes.current = newInputTimes;
      
      const averageInputTime = newInputTimes.reduce((a, b) => a + b, 0) / newInputTimes.length;
      
      return {
        ...prev,
        totalInputs: prev.totalInputs + 1,
        averageInputTime,
      };
    });
  }, [enableMetrics]);

  const recordDelete = useCallback(() => {
    if (!enableMetrics) return;

    setMetrics(prev => ({
      ...prev,
      totalDeletes: prev.totalDeletes + 1,
    }));
  }, [enableMetrics]);

  const recordPaste = useCallback(() => {
    if (!enableMetrics) return;

    setMetrics(prev => ({
      ...prev,
      totalPastes: prev.totalPastes + 1,
    }));
  }, [enableMetrics]);

  const recordValidation = useCallback((validationTime: number = 0, success: boolean) => {
    if (!enableMetrics) return;

    setMetrics(prev => {
      const newValidationTimes = [...validationTimes.current, validationTime];
      validationTimes.current = newValidationTimes;
      
      const averageValidationTime = newValidationTimes.reduce((a, b) => a + b, 0) / newValidationTimes.length;
      
      return {
        ...prev,
        totalValidations: prev.totalValidations + 1,
        averageValidationTime,
        totalErrors: success ? prev.totalErrors : prev.totalErrors + 1,
      };
    });
  }, [enableMetrics]);

  const recordCompletion = useCallback((completionTime: number = 0) => {
    if (!enableMetrics) return;

    setMetrics(prev => {
      const newCompletionTimes = [...completionTimes.current, completionTime];
      completionTimes.current = newCompletionTimes;
      
      const averageCompletionTime = newCompletionTimes.reduce((a, b) => a + b, 0) / newCompletionTimes.length;
      const timeToComplete = Date.now() - sessionStartTime.current;
      
      return {
        ...prev,
        totalCompletions: prev.totalCompletions + 1,
        averageCompletionTime,
        timeToComplete,
        completionRate: prev.totalCompletions / Math.max(prev.totalInputs, 1),
      };
    });
  }, [enableMetrics]);

  const recordKeyboardNavigation = useCallback(() => {
    if (!enableMetrics) return;

    setMetrics(prev => ({
      ...prev,
      keyboardNavigationCount: prev.keyboardNavigationCount + 1,
    }));
  }, [enableMetrics]);

  const recordAccessibilityUsage = useCallback((screenReader: boolean, highContrast: boolean) => {
    if (!enableMetrics) return;

    setMetrics(prev => ({
      ...prev,
      screenReaderUsage: screenReader,
      highContrastUsage: highContrast,
    }));
  }, [enableMetrics]);

  const getMetrics = useCallback(() => {
    return metrics;
  }, [metrics]);

  const resetMetrics = useCallback(() => {
    setMetrics({
      totalInputs: 0,
      totalDeletes: 0,
      totalPastes: 0,
      totalValidations: 0,
      totalCompletions: 0,
      totalErrors: 0,
      averageInputTime: 0,
      averageValidationTime: 0,
      averageCompletionTime: 0,
      renderCount: 0,
      lastRenderTime: 0,
      completionRate: 0,
      errorRate: 0,
      averageAttemptsToComplete: 0,
      timeToComplete: 0,
      keyboardNavigationCount: 0,
      screenReaderUsage: false,
      highContrastUsage: false,
      sessionStartTime: Date.now(),
      sessionDuration: 0,
      totalSessions: metrics.totalSessions + 1,
    });
    
    inputTimes.current = [];
    validationTimes.current = [];
    completionTimes.current = [];
    sessionStartTime.current = Date.now();
  }, [metrics.totalSessions]);

  const exportMetrics = useCallback(() => {
    const exportData = {
      ...metrics,
      exportedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `otp-metrics-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [metrics]);

  return {
    metrics,
    recordInput,
    recordDelete,
    recordPaste,
    recordValidation,
    recordCompletion,
    recordKeyboardNavigation,
    recordAccessibilityUsage,
    getMetrics,
    resetMetrics,
    exportMetrics,
  };
};
