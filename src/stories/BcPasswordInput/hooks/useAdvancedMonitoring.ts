import { useCallback, useMemo } from 'react';

export interface AdvancedMonitoringCallbacks {
  onChange?: (value: string) => void;
  onError?: (error: Error) => void;
  onPerformance?: (metrics: any) => void;
  onStrengthChange?: (strength: number) => void;
  onPasswordGenerated?: (password: string, method: 'manual' | 'auto') => void;
  onPasswordCopied?: (password: string) => void;
  onPasswordCleared?: () => void;
  onPasswordToggled?: (visible: boolean) => void;
  onValidationStarted?: (password: string) => void;
  onValidationCompleted?: (password: string, isValid: boolean, message?: string) => void;
  onBreachCheckStarted?: (password: string) => void;
  onBreachCheckCompleted?: (password: string, isBreached: boolean, count?: number) => void;
  onKeyboardShortcut?: (shortcut: string, action: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface AdvancedMonitoringOptions {
  enableAnalytics?: boolean;
  enablePerformanceTracking?: boolean;
  enableUserBehaviorTracking?: boolean;
  sessionId?: string;
  userId?: string;
}

export function useAdvancedMonitoring(
  callbacks: AdvancedMonitoringCallbacks = {},
  options: AdvancedMonitoringOptions = {}
) {
  const {
    enableAnalytics = true,
    enablePerformanceTracking = true,
    enableUserBehaviorTracking = true,
    sessionId,
    userId
  } = options;

  const trackEvent = useCallback((eventName: string, data: any = {}) => {
    if (!enableAnalytics) return;

    const eventData = {
      ...data,
      timestamp: Date.now(),
      sessionId,
      userId,
      component: 'BcPasswordInput'
    };

    // Send to analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, eventData);
    }

    // Send to custom analytics
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track(eventName, eventData);
    }

    console.log(`[BcPasswordInput Analytics] ${eventName}:`, eventData);
  }, [enableAnalytics, sessionId, userId]);

  const trackPerformance = useCallback((metrics: any) => {
    if (!enablePerformanceTracking) return;

    const performanceData = {
      ...metrics,
      timestamp: Date.now(),
      sessionId,
      userId,
      component: 'BcPasswordInput'
    };

    // Send to performance monitoring service
    if (typeof window !== 'undefined' && (window as any).performanceObserver) {
      (window as any).performanceObserver.observe(performanceData);
    }

    console.log(`[BcPasswordInput Performance]`, performanceData);
  }, [enablePerformanceTracking, sessionId, userId]);

  const trackUserBehavior = useCallback((action: string, data: any = {}) => {
    if (!enableUserBehaviorTracking) return;

    const behaviorData = {
      action,
      ...data,
      timestamp: Date.now(),
      sessionId,
      userId,
      component: 'BcPasswordInput'
    };

    // Send to user behavior tracking service
    if (typeof window !== 'undefined' && (window as any).userBehaviorTracker) {
      (window as any).userBehaviorTracker.track(behaviorData);
    }

    console.log(`[BcPasswordInput User Behavior] ${action}:`, behaviorData);
  }, [enableUserBehaviorTracking, sessionId, userId]);

  const enhancedCallbacks = useMemo(() => ({
    onChange: (value: string) => {
      trackEvent('password_changed', { valueLength: value.length });
      trackUserBehavior('password_input', { valueLength: value.length });
      callbacks.onChange?.(value);
    },
    onError: (error: Error) => {
      trackEvent('password_error', { error: error.message, stack: error.stack });
      callbacks.onError?.(error);
    },
    onPerformance: (metrics: any) => {
      trackPerformance(metrics);
      callbacks.onPerformance?.(metrics);
    },
    onStrengthChange: (strength: number) => {
      trackEvent('password_strength_changed', { strength });
      callbacks.onStrengthChange?.(strength);
    },
    onPasswordGenerated: (password: string, method: 'manual' | 'auto') => {
      trackEvent('password_generated', { method, passwordLength: password.length });
      trackUserBehavior('password_generated', { method, passwordLength: password.length });
      callbacks.onPasswordGenerated?.(password, method);
    },
    onPasswordCopied: (password: string) => {
      trackEvent('password_copied', { passwordLength: password.length });
      trackUserBehavior('password_copied', { passwordLength: password.length });
      callbacks.onPasswordCopied?.(password);
    },
    onPasswordCleared: () => {
      trackEvent('password_cleared');
      trackUserBehavior('password_cleared');
      callbacks.onPasswordCleared?.();
    },
    onPasswordToggled: (visible: boolean) => {
      trackEvent('password_toggled', { visible });
      trackUserBehavior('password_toggled', { visible });
      callbacks.onPasswordToggled?.(visible);
    },
    onValidationStarted: (password: string) => {
      trackEvent('validation_started', { passwordLength: password.length });
      callbacks.onValidationStarted?.(password);
    },
    onValidationCompleted: (password: string, isValid: boolean, message?: string) => {
      trackEvent('validation_completed', { isValid, message, passwordLength: password.length });
      callbacks.onValidationCompleted?.(password, isValid, message);
    },
    onBreachCheckStarted: (password: string) => {
      trackEvent('breach_check_started', { passwordLength: password.length });
      callbacks.onBreachCheckStarted?.(password);
    },
    onBreachCheckCompleted: (password: string, isBreached: boolean, count?: number) => {
      trackEvent('breach_check_completed', { isBreached, count, passwordLength: password.length });
      callbacks.onBreachCheckCompleted?.(password, isBreached, count);
    },
    onKeyboardShortcut: (shortcut: string, action: string) => {
      trackEvent('keyboard_shortcut_used', { shortcut, action });
      trackUserBehavior('keyboard_shortcut_used', { shortcut, action });
      callbacks.onKeyboardShortcut?.(shortcut, action);
    },
    onFocus: () => {
      trackEvent('password_focused');
      trackUserBehavior('password_focused');
      callbacks.onFocus?.();
    },
    onBlur: () => {
      trackEvent('password_blurred');
      trackUserBehavior('password_blurred');
      callbacks.onBlur?.();
    }
  }), [callbacks, trackEvent, trackPerformance, trackUserBehavior]);

  return enhancedCallbacks;
}
