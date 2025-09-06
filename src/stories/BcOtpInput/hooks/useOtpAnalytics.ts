import { useCallback, useState, useEffect, useRef } from 'react';

export interface UseOtpAnalyticsProps {
  enableAnalytics?: boolean;
  onAnalyticsEvent?: (event: AnalyticsEvent) => void;
  onAnalyticsError?: (error: Error) => void;
  enableErrorTracking?: boolean;
  enablePerformanceTracking?: boolean;
  enableUserAnalytics?: boolean;
  enableABTesting?: boolean;
  enableHeatmaps?: boolean;
  enableSessionRecording?: boolean;
  analyticsProvider?: 'google' | 'mixpanel' | 'amplitude' | 'custom';
  customAnalytics?: (event: AnalyticsEvent) => void;
  sessionId?: string;
  userId?: string;
}

export interface AnalyticsEvent {
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
  sessionId: string;
  userId?: string;
  properties?: Record<string, any>;
}

export interface AnalyticsState {
  isEnabled: boolean;
  sessionId: string;
  userId?: string;
  eventCount: number;
  errorCount: number;
  performanceMetrics: PerformanceMetric[];
  userInteractions: UserInteraction[];
  abTests: ABTest[];
  heatmapData: HeatmapPoint[];
  sessionEvents: AnalyticsEvent[];
  lastEvent: AnalyticsEvent | null;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  context?: string;
}

export interface UserInteraction {
  type: 'click' | 'focus' | 'blur' | 'input' | 'complete' | 'error';
  element: string;
  timestamp: number;
  duration?: number;
  properties?: Record<string, any>;
}

export interface ABTest {
  name: string;
  variant: string;
  startTime: number;
  endTime?: number;
  conversions: number;
  impressions: number;
}

export interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
  timestamp: number;
  element: string;
}

export const useOtpAnalytics = ({
  enableAnalytics = false,
  onAnalyticsEvent,
  onAnalyticsError,
  enableErrorTracking = true,
  enablePerformanceTracking = true,
  enableUserAnalytics = true,
  enableABTesting = false,
  enableHeatmaps = false,
  enableSessionRecording = false,
  analyticsProvider = 'custom',
  customAnalytics,
  sessionId: providedSessionId,
  userId,
}: UseOtpAnalyticsProps) => {
  const [state, setState] = useState<AnalyticsState>({
    isEnabled: false,
    sessionId: providedSessionId || generateSessionId(),
    userId,
    eventCount: 0,
    errorCount: 0,
    performanceMetrics: [],
    userInteractions: [],
    abTests: [],
    heatmapData: [],
    sessionEvents: [],
    lastEvent: null,
  });

  const performanceObserverRef = useRef<PerformanceObserver | null>(null);

  // Generate session ID
  function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Initialize analytics
  useEffect(() => {
    if (!enableAnalytics) return;

    setState(prev => ({ ...prev, isEnabled: true }));

    // Initialize performance tracking
    if (enablePerformanceTracking) {
      initializePerformanceTracking();
    }

    // Initialize heatmap tracking
    if (enableHeatmaps) {
      initializeHeatmapTracking();
    }

    // Initialize session recording
    if (enableSessionRecording) {
      initializeSessionRecording();
    }

    return () => {
      if (performanceObserverRef.current) {
        performanceObserverRef.current.disconnect();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableAnalytics, enablePerformanceTracking, enableHeatmaps, enableSessionRecording]);

  // Initialize performance tracking
  const initializePerformanceTracking = useCallback(() => {
    if (!enablePerformanceTracking) return;

    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const metric: PerformanceMetric = {
            name: entry.name,
            value: entry.duration,
            unit: 'ms',
            timestamp: Date.now(),
            context: entry.entryType,
          };

          setState(prev => ({
            ...prev,
            performanceMetrics: [...prev.performanceMetrics.slice(-99), metric],
          }));
        });
      });

      observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
      performanceObserverRef.current = observer;
    }
  }, [enablePerformanceTracking]);

  // Initialize heatmap tracking
  const initializeHeatmapTracking = useCallback(() => {
    if (!enableHeatmaps) return;

    // This would typically integrate with a heatmap service
    // For now, we'll just track mouse movements
    const trackMouseMove = (e: MouseEvent) => {
      const point: HeatmapPoint = {
        x: e.clientX,
        y: e.clientY,
        intensity: 1,
        timestamp: Date.now(),
        element: (e.target as Element)?.tagName || 'unknown',
      };

      setState(prev => ({
        ...prev,
        heatmapData: [...prev.heatmapData.slice(-999), point],
      }));
    };

    document.addEventListener('mousemove', trackMouseMove);
    return () => document.removeEventListener('mousemove', trackMouseMove);
  }, [enableHeatmaps]);

  // Initialize session recording
  const initializeSessionRecording = useCallback(() => {
    if (!enableSessionRecording) return;

    // This would typically integrate with a session recording service
    // For now, we'll just track key events
    console.log('Session recording initialized');
  }, [enableSessionRecording]);

  // Track event
  const trackEvent = useCallback((
    name: string,
    category: string,
    action: string,
    label?: string,
    value?: number,
    properties?: Record<string, any>
  ) => {
    if (!enableAnalytics) return;

    const event: AnalyticsEvent = {
      name,
      category,
      action,
      label,
      value,
      timestamp: Date.now(),
      sessionId: state.sessionId,
      userId: state.userId,
      properties,
    };

    setState(prev => ({
      ...prev,
      eventCount: prev.eventCount + 1,
      sessionEvents: [...prev.sessionEvents.slice(-99), event],
      lastEvent: event,
    }));

    // Send to analytics provider
    if (customAnalytics) {
      customAnalytics(event);
    } else {
      onAnalyticsEvent?.(event);
    }
  }, [enableAnalytics, state.sessionId, state.userId, customAnalytics, onAnalyticsEvent]);

  // Track user interaction
  const trackUserInteraction = useCallback((
    type: UserInteraction['type'],
    element: string,
    duration?: number,
    properties?: Record<string, any>
  ) => {
    if (!enableAnalytics || !enableUserAnalytics) return;

    const interaction: UserInteraction = {
      type,
      element,
      timestamp: Date.now(),
      duration,
      properties,
    };

    setState(prev => ({
      ...prev,
      userInteractions: [...prev.userInteractions.slice(-99), interaction],
    }));

    trackEvent('user_interaction', 'interaction', type, element, duration, properties);
  }, [enableAnalytics, enableUserAnalytics, trackEvent]);

  // Track error
  const trackError = useCallback((
    error: Error,
    context?: string,
    properties?: Record<string, any>
  ) => {
    if (!enableAnalytics || !enableErrorTracking) return;

    setState(prev => ({ ...prev, errorCount: prev.errorCount + 1 }));

    trackEvent('error', 'error', 'occurred', error.message, undefined, {
      ...properties,
      errorName: error.name,
      errorStack: error.stack,
      context,
    });

    onAnalyticsError?.(error);
  }, [enableAnalytics, enableErrorTracking, trackEvent, onAnalyticsError]);

  // Track performance
  const trackPerformance = useCallback((
    name: string,
    value: number,
    unit: string = 'ms',
    context?: string
  ) => {
    if (!enableAnalytics || !enablePerformanceTracking) return;

    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: Date.now(),
      context,
    };

    setState(prev => ({
      ...prev,
      performanceMetrics: [...prev.performanceMetrics.slice(-99), metric],
    }));

    trackEvent('performance', 'performance', 'measured', name, value, { unit, context });
  }, [enableAnalytics, enablePerformanceTracking, trackEvent]);

  // Start A/B test
  const startABTest = useCallback((
    name: string,
    variant: string
  ) => {
    if (!enableAnalytics || !enableABTesting) return;

    const abTest: ABTest = {
      name,
      variant,
      startTime: Date.now(),
      conversions: 0,
      impressions: 1,
    };

    setState(prev => ({
      ...prev,
      abTests: [...prev.abTests, abTest],
    }));

    trackEvent('ab_test', 'experiment', 'started', name, undefined, { variant });
  }, [enableAnalytics, enableABTesting, trackEvent]);

  // End A/B test
  const endABTest = useCallback((
    name: string,
    conversions: number = 0
  ) => {
    if (!enableAnalytics || !enableABTesting) return;

    setState(prev => ({
      ...prev,
      abTests: prev.abTests.map(test => 
        test.name === name 
          ? { ...test, endTime: Date.now(), conversions }
          : test
      ),
    }));

    trackEvent('ab_test', 'experiment', 'ended', name, conversions);
  }, [enableAnalytics, enableABTesting, trackEvent]);

  // Get analytics data
  const getAnalyticsData = useCallback(() => {
    if (!enableAnalytics) return null;

    return {
      sessionId: state.sessionId,
      userId: state.userId,
      eventCount: state.eventCount,
      errorCount: state.errorCount,
      performanceMetrics: state.performanceMetrics,
      userInteractions: state.userInteractions,
      abTests: state.abTests,
      heatmapData: state.heatmapData,
      sessionEvents: state.sessionEvents,
      lastEvent: state.lastEvent,
    };
  }, [enableAnalytics, state]);

  // Export analytics data
  const exportAnalyticsData = useCallback((format: 'json' | 'csv' = 'json') => {
    if (!enableAnalytics) return null;

    const data = getAnalyticsData();
    if (!data) return null;

    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    } else if (format === 'csv') {
      const csv = [
        'timestamp,event,category,action,label,value',
        ...data.sessionEvents.map(event => 
          `${event.timestamp},${event.name},${event.category},${event.action},${event.label || ''},${event.value || ''}`
        )
      ].join('\n');
      return csv;
    }

    return null;
  }, [enableAnalytics, getAnalyticsData]);

  // Clear analytics data
  const clearAnalyticsData = useCallback(() => {
    if (!enableAnalytics) return;

    setState(prev => ({
      ...prev,
      eventCount: 0,
      errorCount: 0,
      performanceMetrics: [],
      userInteractions: [],
      abTests: [],
      heatmapData: [],
      sessionEvents: [],
      lastEvent: null,
    }));
  }, [enableAnalytics]);

  return {
    ...state,
    trackEvent,
    trackUserInteraction,
    trackError,
    trackPerformance,
    startABTest,
    endABTest,
    getAnalyticsData,
    exportAnalyticsData,
    clearAnalyticsData,
  };
};
