import { useCallback, useState, useEffect, useRef } from 'react';

export interface UseOtpDebugProps {
  enableDebug?: boolean;
  componentName?: string;
  onDebugLog?: (message: string, data?: any) => void;
  onPerformanceMetric?: (metric: string, value: number) => void;
}

export interface DebugInfo {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  totalInteractions: number;
  validationAttempts: number;
  errors: Array<{ timestamp: number; error: string }>;
  performance: {
    mountTime: number;
    unmountTime?: number;
    totalLifecycle: number;
  };
}

export const useOtpDebug = ({
  enableDebug = false,
  componentName = 'BcOtpInput',
  onDebugLog,
  onPerformanceMetric,
}: UseOtpDebugProps) => {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
    totalInteractions: 0,
    validationAttempts: 0,
    errors: [],
    performance: {
      mountTime: Date.now(),
      totalLifecycle: 0,
    },
  });

  const renderTimes = useRef<number[]>([]);
  const mountTime = useRef<number>(Date.now());

  useEffect(() => {
    if (!enableDebug) return;

    const renderStart = performance.now();
    
    setDebugInfo(prev => {
      const newRenderTime = performance.now() - renderStart;
      const newRenderTimes = [...renderTimes.current, newRenderTime];
      renderTimes.current = newRenderTimes;

      const averageRenderTime = newRenderTimes.reduce((a, b) => a + b, 0) / newRenderTimes.length;

      onPerformanceMetric?.('renderTime', newRenderTime);
      onDebugLog?.(`${componentName} rendered`, { renderTime: newRenderTime });

      return {
        ...prev,
        renderCount: prev.renderCount + 1,
        lastRenderTime: newRenderTime,
        averageRenderTime,
      };
    });
  }, [enableDebug, onPerformanceMetric, onDebugLog, componentName]);

  useEffect(() => {
    if (!enableDebug) return;

    const currentMountTime = mountTime.current;

    return () => {
      const unmountTime = Date.now();
      const totalLifecycle = unmountTime - currentMountTime;
      
      setDebugInfo(prev => ({
        ...prev,
        performance: {
          ...prev.performance,
          unmountTime,
          totalLifecycle,
        },
      }));

      onDebugLog?.(`${componentName} unmounted`, { totalLifecycle });
    };
  }, [enableDebug, componentName, onDebugLog]);

  const logInteraction = useCallback((interaction: string, data?: any) => {
    if (!enableDebug) return;

    setDebugInfo(prev => ({
      ...prev,
      totalInteractions: prev.totalInteractions + 1,
    }));

    onDebugLog?.(`${componentName} interaction: ${interaction}`, data);
  }, [enableDebug, componentName, onDebugLog]);

  const logValidation = useCallback((result: boolean, data?: any) => {
    if (!enableDebug) return;

    setDebugInfo(prev => ({
      ...prev,
      validationAttempts: prev.validationAttempts + 1,
    }));

    onDebugLog?.(`${componentName} validation: ${result ? 'success' : 'failed'}`, data);
  }, [enableDebug, componentName, onDebugLog]);

  const logError = useCallback((error: string, data?: any) => {
    if (!enableDebug) return;

    const errorEntry = {
      timestamp: Date.now(),
      error,
    };

    setDebugInfo(prev => ({
      ...prev,
      errors: [...prev.errors, errorEntry].slice(-10), // Keep last 10 errors
    }));

    onDebugLog?.(`${componentName} error: ${error}`, data);
  }, [enableDebug, componentName, onDebugLog]);

  const getDebugInfo = useCallback(() => {
    return debugInfo;
  }, [debugInfo]);

  const clearDebugInfo = useCallback(() => {
    setDebugInfo({
      renderCount: 0,
      lastRenderTime: 0,
      averageRenderTime: 0,
      totalInteractions: 0,
      validationAttempts: 0,
      errors: [],
      performance: {
        mountTime: Date.now(),
        totalLifecycle: 0,
      },
    });
    renderTimes.current = [];
  }, []);

  const exportDebugInfo = useCallback(() => {
    const exportData = {
      ...debugInfo,
      exportedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${componentName}-debug-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [debugInfo, componentName]);

  return {
    debugInfo,
    logInteraction,
    logValidation,
    logError,
    getDebugInfo,
    clearDebugInfo,
    exportDebugInfo,
  };
};
