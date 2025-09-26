import { useMemo, useCallback, useRef } from 'react';
import { BcPhoneInputProps } from '../BcPhoneInput.types';

export interface PhoneMonitoringOptions {
  enableMonitoring?: boolean;
  enableRealTimeMonitoring?: boolean;
  enableAnalytics?: boolean;
  enableErrorReporting?: boolean;
  enablePerformanceMonitoring?: boolean;
  enableUserBehaviorTracking?: boolean;
  enableSecurityMonitoring?: boolean;
  enableCustomEvents?: boolean;
  monitoringApiEndpoint?: string;
  monitoringApiKey?: string;
}

export interface PhoneMonitoringReturn {
  analytics: {
    trackEvent: (event: string, data?: unknown) => void;
    trackPageView: (page: string) => void;
    trackUserAction: (action: string, details?: unknown) => void;
    trackError: (error: Error, context?: unknown) => void;
    trackPerformance: (metric: string, value: number) => void;
  };
  monitoring: {
    startSession: () => void;
    endSession: () => void;
    trackSessionDuration: () => void;
    trackUserInteraction: (type: string, data?: unknown) => void;
    trackComponentMount: () => void;
    trackComponentUnmount: () => void;
    trackPropsChange: (oldProps: unknown, newProps: unknown) => void;
  };
  errorTracking: {
    captureException: (error: Error, context?: unknown) => void;
    captureMessage: (message: string, level?: 'info' | 'warning' | 'error') => void;
    setUserContext: (user: unknown) => void;
    setTag: (key: string, value: string) => void;
    setLevel: (level: string) => void;
  };
  security: {
    trackSuspiciousActivity: (activity: string, details?: unknown) => void;
    trackSecurityEvent: (event: string, severity: 'low' | 'medium' | 'high' | 'critical') => void;
    validateInput: (input: string) => boolean;
    sanitizeInput: (input: string) => string;
  };
  customEvents: {
    emit: (event: string, data?: unknown) => void;
    on: (event: string, callback: (data?: unknown) => void) => void;
    off: (event: string, callback?: (data?: unknown) => void) => void;
  };
}

export const usePhoneMonitoring = (props: BcPhoneInputProps): PhoneMonitoringReturn => {
  const {
    enableMonitoring = false,
    enableRealTimeMonitoring = false,
    enableAnalytics = false,
    enableErrorReporting = false,
    enablePerformanceMonitoring = false,
    enableUserBehaviorTracking = false,
    enableSecurityMonitoring = false,
    enableCustomEvents = false,
    monitoringApiEndpoint,
    monitoringApiKey,
  } = props;

  const sessionStartTime = useRef<number>(0);
  const eventListeners = useRef<Map<string, Set<Function>>>(new Map());

  const trackEvent = useCallback((event: string, data?: unknown) => {
    if (enableAnalytics) {
      console.log(`Analytics Event: ${event}`, data);
      // Send to analytics service
      if (monitoringApiEndpoint) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 saniye timeout
          
          fetch(monitoringApiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${monitoringApiKey}`,
            },
            body: JSON.stringify({
              event,
              data,
              timestamp: Date.now(),
              component: 'BcPhoneInput',
            }),
            signal: controller.signal,
          }).then(() => {
            clearTimeout(timeoutId);
          }).catch((error) => {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
              console.warn('Analytics request was aborted');
            } else {
              console.error('Analytics tracking failed:', error);
            }
          });
        } catch (error) {
          console.error('Analytics setup failed:', error);
        }
      }
    }
  }, [enableAnalytics, monitoringApiEndpoint, monitoringApiKey]);

  const trackPageView = useCallback((page: string) => {
    if (enableAnalytics) {
      trackEvent('page_view', { page });
    }
  }, [enableAnalytics, trackEvent]);

  const trackUserAction = useCallback((action: string, details?: unknown) => {
    if (enableUserBehaviorTracking) {
      trackEvent('user_action', { action, details });
    }
  }, [enableUserBehaviorTracking, trackEvent]);

  const trackError = useCallback((error: Error, context?: unknown) => {
    if (enableErrorReporting) {
      console.error('Phone Input Error:', error, context);
      trackEvent('error', {
        message: error.message,
        stack: error.stack,
        context,
      });
    }
  }, [enableErrorReporting, trackEvent]);

  const trackPerformance = useCallback((metric: string, value: number) => {
    if (enablePerformanceMonitoring) {
      trackEvent('performance_metric', { metric, value });
    }
  }, [enablePerformanceMonitoring, trackEvent]);

  const startSession = useCallback(() => {
    if (enableMonitoring) {
      sessionStartTime.current = Date.now();
      trackEvent('session_start', { timestamp: sessionStartTime.current });
    }
  }, [enableMonitoring, trackEvent]);

  const endSession = useCallback(() => {
    if (enableMonitoring && sessionStartTime.current > 0) {
      const duration = Date.now() - sessionStartTime.current;
      trackEvent('session_end', { duration });
    }
  }, [enableMonitoring, trackEvent]);

  const trackSessionDuration = useCallback(() => {
    if (enableRealTimeMonitoring && sessionStartTime.current > 0) {
      const duration = Date.now() - sessionStartTime.current;
      trackPerformance('session_duration', duration);
    }
  }, [enableRealTimeMonitoring, trackPerformance]);

  const trackUserInteraction = useCallback((type: string, data?: unknown) => {
    if (enableUserBehaviorTracking) {
      trackUserAction(`interaction_${type}`, data);
    }
  }, [enableUserBehaviorTracking, trackUserAction]);

  const trackComponentMount = useCallback(() => {
    if (enableMonitoring) {
      trackEvent('component_mount', { component: 'BcPhoneInput' });
    }
  }, [enableMonitoring, trackEvent]);

  const trackComponentUnmount = useCallback(() => {
    if (enableMonitoring) {
      trackEvent('component_unmount', { component: 'BcPhoneInput' });
    }
  }, [enableMonitoring, trackEvent]);

  const trackPropsChange = useCallback((oldProps: unknown, newProps: unknown) => {
    if (enableMonitoring) {
      trackEvent('props_change', { oldProps, newProps });
    }
  }, [enableMonitoring, trackEvent]);

  const captureException = useCallback((error: Error, context?: unknown) => {
    if (enableErrorReporting) {
      trackError(error, context);
    }
  }, [enableErrorReporting, trackError]);

  const captureMessage = useCallback((message: string, level: 'info' | 'warning' | 'error' = 'info') => {
    if (enableErrorReporting) {
      trackEvent('message', { message, level });
    }
  }, [enableErrorReporting, trackEvent]);

  const setUserContext = useCallback((user: unknown) => {
    if (enableAnalytics) {
      trackEvent('user_context', { user });
    }
  }, [enableAnalytics, trackEvent]);

  const setTag = useCallback((key: string, value: string) => {
    if (enableAnalytics) {
      trackEvent('tag_set', { key, value });
    }
  }, [enableAnalytics, trackEvent]);

  const setLevel = useCallback((level: string) => {
    if (enableAnalytics) {
      trackEvent('level_set', { level });
    }
  }, [enableAnalytics, trackEvent]);

  const trackSuspiciousActivity = useCallback((activity: string, details?: unknown) => {
    if (enableSecurityMonitoring) {
      trackEvent('suspicious_activity', { activity, details });
    }
  }, [enableSecurityMonitoring, trackEvent]);

  const trackSecurityEvent = useCallback((event: string, severity: 'low' | 'medium' | 'high' | 'critical') => {
    if (enableSecurityMonitoring) {
      trackEvent('security_event', { event, severity });
    }
  }, [enableSecurityMonitoring, trackEvent]);

  const validateInput = useCallback((input: string): boolean => {
    if (enableSecurityMonitoring) {
      // Basic input validation
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /eval\(/i,
        /expression\(/i,
      ];
      
      const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(input));
      if (isSuspicious) {
        trackSuspiciousActivity('malicious_input', { input });
        return false;
      }
    }
    return true;
  }, [enableSecurityMonitoring, trackSuspiciousActivity]);

  const sanitizeInput = useCallback((input: string): string => {
    if (enableSecurityMonitoring) {
      return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, ''); // Remove event handlers
    }
    return input;
  }, [enableSecurityMonitoring]);

  const emit = useCallback((event: string, data?: unknown) => {
    if (enableCustomEvents) {
      const listeners = eventListeners.current.get(event);
      if (listeners) {
        listeners.forEach(listener => listener(data));
      }
    }
  }, [enableCustomEvents]);

  const on = useCallback((event: string, callback: (data?: unknown) => void) => {
    if (enableCustomEvents) {
      if (!eventListeners.current.has(event)) {
        eventListeners.current.set(event, new Set());
      }
      eventListeners.current.get(event)!.add(callback);
    }
  }, [enableCustomEvents]);

  const off = useCallback((event: string, callback?: (data?: unknown) => void) => {
    if (enableCustomEvents) {
      const listeners = eventListeners.current.get(event);
      if (listeners) {
        if (callback) {
          listeners.delete(callback);
        } else {
          listeners.clear();
        }
      }
    }
  }, [enableCustomEvents]);

  const analytics = useMemo(() => ({
    trackEvent,
    trackPageView,
    trackUserAction,
    trackError,
    trackPerformance,
  }), [trackEvent, trackPageView, trackUserAction, trackError, trackPerformance]);

  const monitoring = useMemo(() => ({
    startSession,
    endSession,
    trackSessionDuration,
    trackUserInteraction,
    trackComponentMount,
    trackComponentUnmount,
    trackPropsChange,
  }), [
    startSession,
    endSession,
    trackSessionDuration,
    trackUserInteraction,
    trackComponentMount,
    trackComponentUnmount,
    trackPropsChange,
  ]);

  const errorTracking = useMemo(() => ({
    captureException,
    captureMessage,
    setUserContext,
    setTag,
    setLevel,
  }), [captureException, captureMessage, setUserContext, setTag, setLevel]);

  const security = useMemo(() => ({
    trackSuspiciousActivity,
    trackSecurityEvent,
    validateInput,
    sanitizeInput,
  }), [trackSuspiciousActivity, trackSecurityEvent, validateInput, sanitizeInput]);

  const customEvents = useMemo(() => ({
    emit,
    on,
    off,
  }), [emit, on, off]);

  return {
    analytics,
    monitoring,
    errorTracking,
    security,
    customEvents,
  };
};
