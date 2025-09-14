import { useState, useCallback, useMemo, useEffect, useRef } from 'react';

export interface MonitoringOptions {
  enableRealTimeMonitoring?: boolean;
  enableAnalytics?: boolean;
  enableErrorReporting?: boolean;
  enablePerformanceMonitoring?: boolean;
  enableUserBehaviorTracking?: boolean;
  enableSecurityMonitoring?: boolean;
  enableCustomEvents?: boolean;
  customEventTypes?: string[];
  apiEndpoint?: string;
  apiKey?: string;
  batchSize?: number;
  flushInterval?: number;
}

export interface MonitoringState {
  isMonitoring: boolean;
  events: Array<{
    id: string;
    type: string;
    timestamp: number;
    data: any;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }>;
  analytics: Record<string, any>;
  errors: Array<{
    id: string;
    message: string;
    stack?: string;
    timestamp: number;
    severity: 'warning' | 'error' | 'critical';
  }>;
  performance: Record<string, number>;
  userBehavior: Record<string, any>;
  security: Record<string, any>;
  customEvents: Record<string, any>;
}

export interface MonitoringActions {
  startMonitoring: () => void;
  stopMonitoring: () => void;
  logEvent: (type: string, data: any, severity?: 'low' | 'medium' | 'high' | 'critical') => void;
  logError: (error: Error, severity?: 'warning' | 'error' | 'critical') => void;
  logAnalytics: (key: string, value: any) => void;
  logPerformance: (key: string, value: number) => void;
  logUserBehavior: (key: string, value: any) => void;
  logSecurity: (key: string, value: any) => void;
  logCustomEvent: (type: string, data: any) => void;
  clearEvents: () => void;
  clearErrors: () => void;
  clearAnalytics: () => void;
  clearPerformance: () => void;
  clearUserBehavior: () => void;
  clearSecurity: () => void;
  clearCustomEvents: () => void;
  flush: () => Promise<void>;
  reset: () => void;
}

export function useMonitoring(options: MonitoringOptions = {}) {
  const {
    enableRealTimeMonitoring = true,
    enableAnalytics = true,
    enableErrorReporting = true,
    enablePerformanceMonitoring = true,
    enableUserBehaviorTracking = true,
    enableSecurityMonitoring = false,
    enableCustomEvents = false,
    customEventTypes = [],
    apiEndpoint,
    apiKey,
    batchSize = 50,
    flushInterval = 5000,
  } = options;

  const [state, setState] = useState<MonitoringState>({
    isMonitoring: false,
    events: [],
    analytics: {},
    errors: [],
    performance: {},
    userBehavior: {},
    security: {},
    customEvents: {},
  });

  const flushIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Flush function
  const flush = useCallback(async () => {
    if (!apiEndpoint || !apiKey) return;

    try {
      // Use batchSize to limit the data sent
      const payload = {
        events: state.events.slice(0, batchSize),
        analytics: state.analytics,
        errors: state.errors.slice(0, batchSize),
        performance: state.performance,
        userBehavior: state.userBehavior,
        security: state.security,
        customEvents: state.customEvents,
        timestamp: Date.now(),
        batchInfo: {
          batchSize,
          totalEvents: state.events.length,
          totalErrors: state.errors.length,
        },
      };

      await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      // Clear data after successful flush (only the batched amount)
      setState(prev => ({
        ...prev,
        events: prev.events.slice(batchSize),
        errors: prev.errors.slice(batchSize),
      }));

      console.log(`Monitoring data flushed: ${payload.events.length} events, ${payload.errors.length} errors`);
    } catch (error) {
      console.error('Failed to flush monitoring data:', error);
    }
  }, [apiEndpoint, apiKey, state, batchSize]);

  // Auto flush with interval
  useEffect(() => {
    if (state.isMonitoring && flushInterval > 0) {
      flushIntervalRef.current = setInterval(() => {
        if (state.events.length > 0 || state.errors.length > 0) {
          flush();
        }
      }, flushInterval);

      return () => {
        if (flushIntervalRef.current) {
          clearInterval(flushIntervalRef.current);
        }
      };
    }
  }, [state.isMonitoring, state.events.length, state.errors.length, flushInterval, flush]);

  const startMonitoring = useCallback(() => {
    setState(prev => ({ ...prev, isMonitoring: true }));
  }, []);

  const stopMonitoring = useCallback(() => {
    setState(prev => ({ ...prev, isMonitoring: false }));
    
    // Clear flush interval when stopping
    if (flushIntervalRef.current) {
      clearInterval(flushIntervalRef.current);
      flushIntervalRef.current = null;
    }
  }, []);

  const logEvent = useCallback((type: string, data: any, severity: 'low' | 'medium' | 'high' | 'critical' = 'low') => {
    if (!state.isMonitoring || !enableRealTimeMonitoring) return;

    const event = {
      id: `event-${Date.now()}-${Math.random()}`,
      type,
      timestamp: Date.now(),
      data,
      severity,
    };

    setState(prev => ({
      ...prev,
      events: [...prev.events, event],
    }));
  }, [state.isMonitoring, enableRealTimeMonitoring]);

  const logError = useCallback((error: Error, severity: 'warning' | 'error' | 'critical' = 'error') => {
    if (!state.isMonitoring || !enableErrorReporting) return;

    const errorLog = {
      id: `error-${Date.now()}-${Math.random()}`,
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      severity,
    };

    setState(prev => ({
      ...prev,
      errors: [...prev.errors, errorLog],
    }));
  }, [state.isMonitoring, enableErrorReporting]);

  const logAnalytics = useCallback((key: string, value: any) => {
    if (!state.isMonitoring || !enableAnalytics) return;

    setState(prev => ({
      ...prev,
      analytics: {
        ...prev.analytics,
        [key]: value,
      },
    }));
  }, [state.isMonitoring, enableAnalytics]);

  const logPerformance = useCallback((key: string, value: number) => {
    if (!state.isMonitoring || !enablePerformanceMonitoring) return;

    setState(prev => ({
      ...prev,
      performance: {
        ...prev.performance,
        [key]: value,
      },
    }));
  }, [state.isMonitoring, enablePerformanceMonitoring]);

  const logUserBehavior = useCallback((key: string, value: any) => {
    if (!state.isMonitoring || !enableUserBehaviorTracking) return;

    setState(prev => ({
      ...prev,
      userBehavior: {
        ...prev.userBehavior,
        [key]: value,
      },
    }));
  }, [state.isMonitoring, enableUserBehaviorTracking]);

  const logSecurity = useCallback((key: string, value: any) => {
    if (!state.isMonitoring || !enableSecurityMonitoring) return;

    setState(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value,
      },
    }));
  }, [state.isMonitoring, enableSecurityMonitoring]);

  const logCustomEvent = useCallback((type: string, data: any) => {
    if (!state.isMonitoring || !enableCustomEvents || !customEventTypes.includes(type)) return;

    setState(prev => ({
      ...prev,
      customEvents: {
        ...prev.customEvents,
        [type]: data,
      },
    }));
  }, [state.isMonitoring, enableCustomEvents, customEventTypes]);

  const clearEvents = useCallback(() => {
    setState(prev => ({ ...prev, events: [] }));
  }, []);

  const clearErrors = useCallback(() => {
    setState(prev => ({ ...prev, errors: [] }));
  }, []);

  const clearAnalytics = useCallback(() => {
    setState(prev => ({ ...prev, analytics: {} }));
  }, []);

  const clearPerformance = useCallback(() => {
    setState(prev => ({ ...prev, performance: {} }));
  }, []);

  const clearUserBehavior = useCallback(() => {
    setState(prev => ({ ...prev, userBehavior: {} }));
  }, []);

  const clearSecurity = useCallback(() => {
    setState(prev => ({ ...prev, security: {} }));
  }, []);

  const clearCustomEvents = useCallback(() => {
    setState(prev => ({ ...prev, customEvents: {} }));
  }, []);

  const reset = useCallback(() => {
    setState({
      isMonitoring: false,
      events: [],
      analytics: {},
      errors: [],
      performance: {},
      userBehavior: {},
      security: {},
      customEvents: {},
    });
  }, []);

  const actions: MonitoringActions = useMemo(() => ({
    startMonitoring,
    stopMonitoring,
    logEvent,
    logError,
    logAnalytics,
    logPerformance,
    logUserBehavior,
    logSecurity,
    logCustomEvent,
    clearEvents,
    clearErrors,
    clearAnalytics,
    clearPerformance,
    clearUserBehavior,
    clearSecurity,
    clearCustomEvents,
    flush,
    reset,
  }), [
    startMonitoring,
    stopMonitoring,
    logEvent,
    logError,
    logAnalytics,
    logPerformance,
    logUserBehavior,
    logSecurity,
    logCustomEvent,
    clearEvents,
    clearErrors,
    clearAnalytics,
    clearPerformance,
    clearUserBehavior,
    clearSecurity,
    clearCustomEvents,
    flush,
    reset,
  ]);

  return {
    state,
    actions,
  };
}
