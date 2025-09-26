import { useState, useCallback, useMemo } from 'react';
import { PasswordAnalytics, PasswordStrength } from '../types';

/**
 * Default analytics configuration
 */
const defaultAnalytics: PasswordAnalytics = {
  trackStrengthChanges: true,
  trackVisibilityToggles: true,
  trackGenerationUsage: true,
  trackValidationEvents: true,
  trackSecurityWarnings: true,
};

/**
 * Analytics event types
 */
export type AnalyticsEventType = 
  | 'password_input'
  | 'strength_change'
  | 'visibility_toggle'
  | 'password_generated'
  | 'validation_event'
  | 'security_warning'
  | 'password_copied'
  | 'password_cleared';

/**
 * Analytics event data
 */
export interface AnalyticsEvent {
  type: AnalyticsEventType;
  timestamp: number;
  data: Record<string, unknown>;
  sessionId: string;
  userId?: string;
}

/**
 * Password analytics session data
 */
export interface PasswordAnalyticsSession {
  sessionId: string;
  startTime: number;
  endTime?: number;
  events: AnalyticsEvent[];
  metrics: {
    totalInputs: number;
    strengthChanges: number;
    visibilityToggles: number;
    generationsUsed: number;
    validationsPerformed: number;
    securityWarnings: number;
    averageStrength: number;
    timeSpent: number;
  };
}

/**
 * Hook for password analytics and monitoring
 */
export const usePasswordAnalytics = (config: Partial<PasswordAnalytics> = {}) => {
  const analyticsConfig = useMemo(() => ({
    ...defaultAnalytics,
    ...config,
  }), [config]);

  const [currentSession, setCurrentSession] = useState<PasswordAnalyticsSession | null>(null);
  const [sessions, setSessions] = useState<PasswordAnalyticsSession[]>([]);

  /**
   * Start a new analytics session
   */
  const startSession = useCallback((userId?: string) => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newSession: PasswordAnalyticsSession = {
      sessionId,
      startTime: Date.now(),
      events: [],
      metrics: {
        totalInputs: 0,
        strengthChanges: 0,
        visibilityToggles: 0,
        generationsUsed: 0,
        validationsPerformed: 0,
        securityWarnings: 0,
        averageStrength: 0,
        timeSpent: 0,
      },
    };

    setCurrentSession(newSession);
    return sessionId;
  }, []);

  /**
   * End current analytics session
   */
  const endSession = useCallback(() => {
    if (!currentSession) return;

    const endedSession = {
      ...currentSession,
      endTime: Date.now(),
      metrics: {
        ...currentSession.metrics,
        timeSpent: Date.now() - currentSession.startTime,
      },
    };

    setSessions(prev => [...prev, endedSession]);
    setCurrentSession(null);
    
    return endedSession;
  }, [currentSession]);

  /**
   * Track an analytics event
   */
  const trackEvent = useCallback((
    type: AnalyticsEventType,
    data: Record<string, unknown> = {},
    userId?: string
  ) => {
    if (!currentSession) return;

    const event: AnalyticsEvent = {
      type,
      timestamp: Date.now(),
      data,
      sessionId: currentSession.sessionId,
      userId,
    };

    setCurrentSession(prev => {
      if (!prev) return null;
      
      const updatedSession = {
        ...prev,
        events: [...prev.events, event],
        metrics: {
          ...prev.metrics,
          totalInputs: type === 'password_input' ? prev.metrics.totalInputs + 1 : prev.metrics.totalInputs,
          strengthChanges: type === 'strength_change' ? prev.metrics.strengthChanges + 1 : prev.metrics.strengthChanges,
          visibilityToggles: type === 'visibility_toggle' ? prev.metrics.visibilityToggles + 1 : prev.metrics.visibilityToggles,
          generationsUsed: type === 'password_generated' ? prev.metrics.generationsUsed + 1 : prev.metrics.generationsUsed,
          validationsPerformed: type === 'validation_event' ? prev.metrics.validationsPerformed + 1 : prev.metrics.validationsPerformed,
          securityWarnings: type === 'security_warning' ? prev.metrics.securityWarnings + 1 : prev.metrics.securityWarnings,
        },
      };

      // Update average strength
      if (type === 'strength_change' && data.score !== undefined) {
        const strengthEvents = updatedSession.events.filter(e => e.type === 'strength_change');
        const totalScore = strengthEvents.reduce((sum, e) => sum + ((e.data.score as number) || 0), 0);
        updatedSession.metrics.averageStrength = totalScore / strengthEvents.length;
      }

      return updatedSession;
    });

    // Call external analytics callbacks
    switch (type) {
      case 'strength_change':
        if (analyticsConfig.onStrengthChange && data.strength && data.score !== undefined) {
          analyticsConfig.onStrengthChange(data.strength as PasswordStrength, data.score as number);
        }
        break;
      case 'visibility_toggle':
        if (analyticsConfig.onVisibilityToggle && data.visible !== undefined) {
          analyticsConfig.onVisibilityToggle(data.visible as boolean);
        }
        break;
      case 'password_generated':
        if (analyticsConfig.onPasswordGenerated && data.password) {
          analyticsConfig.onPasswordGenerated(data.password as string);
        }
        break;
      case 'validation_event':
        if (analyticsConfig.onValidationEvent) {
          analyticsConfig.onValidationEvent(type, data);
        }
        break;
      case 'security_warning':
        if (analyticsConfig.onSecurityWarning && data.warning && data.severity) {
          analyticsConfig.onSecurityWarning(data.warning as string, data.severity as 'low' | 'medium' | 'high');
        }
        break;
    }
  }, [currentSession, analyticsConfig]);

  /**
   * Track password input
   */
  const trackPasswordInput = useCallback((password: string, userId?: string) => {
    if (!analyticsConfig.trackStrengthChanges) return;
    
    trackEvent('password_input', {
      passwordLength: password.length,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumbers: /[0-9]/.test(password),
      hasSpecialChars: /[^a-zA-Z0-9]/.test(password),
    }, userId);
  }, [analyticsConfig.trackStrengthChanges, trackEvent]);

  /**
   * Track strength change
   */
  const trackStrengthChange = useCallback((strength: string, score: number, userId?: string) => {
    if (!analyticsConfig.trackStrengthChanges) return;
    
    trackEvent('strength_change', {
      strength,
      score,
      previousStrength: currentSession?.events
        .filter(e => e.type === 'strength_change')
        .slice(-1)[0]?.data.strength,
    }, userId);
  }, [analyticsConfig.trackStrengthChanges, trackEvent, currentSession]);

  /**
   * Track visibility toggle
   */
  const trackVisibilityToggle = useCallback((visible: boolean, userId?: string) => {
    if (!analyticsConfig.trackVisibilityToggles) return;
    
    trackEvent('visibility_toggle', {
      visible,
      toggleCount: currentSession?.metrics.visibilityToggles || 0,
    }, userId);
  }, [analyticsConfig.trackVisibilityToggles, trackEvent, currentSession]);

  /**
   * Track password generation
   */
  const trackPasswordGeneration = useCallback((password: string, options: Record<string, unknown>, userId?: string) => {
    if (!analyticsConfig.trackGenerationUsage) return;
    
    trackEvent('password_generated', {
      passwordLength: password.length,
      options,
      generationCount: currentSession?.metrics.generationsUsed || 0,
    }, userId);
  }, [analyticsConfig.trackGenerationUsage, trackEvent, currentSession]);

  /**
   * Track validation event
   */
  const trackValidationEvent = useCallback((eventType: string, data: Record<string, unknown>, userId?: string) => {
    if (!analyticsConfig.trackValidationEvents) return;
    
    trackEvent('validation_event', {
      eventType,
      ...data,
    }, userId);
  }, [analyticsConfig.trackValidationEvents, trackEvent]);

  /**
   * Track security warning
   */
  const trackSecurityWarning = useCallback((warning: string, severity: string, userId?: string) => {
    if (!analyticsConfig.trackSecurityWarnings) return;
    
    trackEvent('security_warning', {
      warning,
      severity,
      warningCount: currentSession?.metrics.securityWarnings || 0,
    }, userId);
  }, [analyticsConfig.trackSecurityWarnings, trackEvent, currentSession]);

  /**
   * Track password copy
   */
  const trackPasswordCopy = useCallback((password: string, userId?: string) => {
    trackEvent('password_copied', {
      passwordLength: password.length,
      copyCount: currentSession?.events.filter(e => e.type === 'password_copied').length || 0,
    }, userId);
  }, [trackEvent, currentSession]);

  /**
   * Track password clear
   */
  const trackPasswordClear = useCallback((userId?: string) => {
    trackEvent('password_cleared', {
      clearCount: currentSession?.events.filter(e => e.type === 'password_cleared').length || 0,
    }, userId);
  }, [trackEvent, currentSession]);

  /**
   * Get current session metrics
   */
  const getCurrentSessionMetrics = useCallback(() => {
    if (!currentSession) return null;
    
    return {
      ...currentSession.metrics,
      timeSpent: Date.now() - currentSession.startTime,
      eventCount: currentSession.events.length,
    };
  }, [currentSession]);

  /**
   * Clear analytics data
   */
  const clearAnalyticsData = useCallback(() => {
    setSessions([]);
    setCurrentSession(null);
  }, []);

  return {
    currentSession,
    sessions,
    startSession,
    endSession,
    trackEvent,
    trackPasswordInput,
    trackStrengthChange,
    trackVisibilityToggle,
    trackPasswordGeneration,
    trackValidationEvent,
    trackSecurityWarning,
    trackPasswordCopy,
    trackPasswordClear,
    getCurrentSessionMetrics,
    clearAnalyticsData,
  };
};