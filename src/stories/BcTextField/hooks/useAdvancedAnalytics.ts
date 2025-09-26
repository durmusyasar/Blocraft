import { useState, useCallback, useMemo, useRef } from 'react';

export interface AdvancedAnalyticsOptions {
  enableAnalytics?: boolean;
  enableHeatmaps?: boolean;
  enableUserJourney?: boolean;
  enableClickTracking?: boolean;
  enableScrollTracking?: boolean;
  enableFormAnalytics?: boolean;
  enableErrorTracking?: boolean;
  enablePerformanceTracking?: boolean;
  enableUserBehavior?: boolean;
  enableConversionTracking?: boolean;
  enableABTesting?: boolean;
  enableRealTimeAnalytics?: boolean;
  analyticsProvider?: 'google' | 'adobe' | 'mixpanel' | 'amplitude' | 'custom';
  apiKey?: string;
  endpoint?: string;
  sampleRate?: number;
  batchSize?: number;
  flushInterval?: number;
}

export interface AnalyticsState {
  isAnalyticsEnabled: boolean;
  isABTestingEnabled: boolean;
  isRealTimeAnalyticsEnabled: boolean;
  currentProvider: string;
  currentApiKey: string;
  currentEndpoint: string;
  currentSampleRate: number;
  currentBatchSize: number;
  currentFlushInterval: number;
  events: Array<{
    id: string;
    type: string;
    data: unknown;
    timestamp: number;
  }>;
  heatmapData: Record<string, unknown>;
  userJourney: Array<{
    step: string;
    timestamp: number;
    data: unknown;
  }>;
  abTests: Array<{
    id: string;
    name: string;
    variant: string;
    startTime: number;
    endTime?: number;
    metrics: Record<string, number>;
  }>;
  realTimeEvents: Array<{
    id: string;
    type: string;
    data: unknown;
    timestamp: number;
  }>;
  batchQueue: Array<{
    id: string;
    type: string;
    data: unknown;
    timestamp: number;
  }>;
  metrics: {
    totalEvents: number;
    uniqueUsers: number;
    sessionDuration: number;
    bounceRate: number;
    conversionRate: number;
    abTestConversions: Record<string, number>;
    realTimeEvents: number;
    batchFlushes: number;
  };
}

export interface AnalyticsActions {
  trackEvent: (type: string, data: unknown) => void;
  trackClick: (element: string, position: { x: number; y: number }) => void;
  trackScroll: (scrollDepth: number) => void;
  trackFormInteraction: (field: string, action: string) => void;
  trackError: (error: Error, context: unknown) => void;
  trackPerformance: (metric: string, value: number) => void;
  trackUserBehavior: (behavior: string, data: unknown) => void;
  trackConversion: (goal: string, value?: number) => void;
  startSession: () => void;
  endSession: () => void;
  startABTest: (testName: string, variant: string) => string;
  endABTest: (testId: string) => void;
  trackABTestEvent: (testId: string, event: string, data: unknown) => void;
  getABTestResults: (testId: string) => unknown;
  sendRealTimeEvent: (type: string, data: unknown) => void;
  flushBatch: () => void;
  setProvider: (provider: string, apiKey?: string, endpoint?: string) => void;
  setSampleRate: (rate: number) => void;
  setBatchSize: (size: number) => void;
  setFlushInterval: (interval: number) => void;
  getMetrics: () => unknown;
  getHeatmapData: () => unknown;
  getUserJourney: () => unknown[];
  getRealTimeEvents: () => unknown[];
  getBatchQueue: () => unknown[];
  clearData: () => void;
  exportData: () => string;
  reset: () => void;
}

export function useAdvancedAnalytics(options: AdvancedAnalyticsOptions = {}) {
  const {
    enableAnalytics = false,
    enableHeatmaps = true,
    enableUserJourney = true,
    enableClickTracking = true,
    enableScrollTracking = true,
    enableFormAnalytics = true,
    enableErrorTracking = true,
    enablePerformanceTracking = true,
    enableUserBehavior = true,
    enableConversionTracking = true,
    enableABTesting = false,
    enableRealTimeAnalytics = false,
    analyticsProvider = 'custom',
    apiKey = '',
    endpoint = '',
    sampleRate = 1.0,
    batchSize = 100,
    flushInterval = 30000,
  } = options;

  const [state, setState] = useState<AnalyticsState>({
    isAnalyticsEnabled: enableAnalytics,
    isABTestingEnabled: enableABTesting,
    isRealTimeAnalyticsEnabled: enableRealTimeAnalytics,
    currentProvider: analyticsProvider,
    currentApiKey: apiKey,
    currentEndpoint: endpoint,
    currentSampleRate: sampleRate,
    currentBatchSize: batchSize,
    currentFlushInterval: flushInterval,
    events: [],
    heatmapData: {},
    userJourney: [],
    abTests: [],
    realTimeEvents: [],
    batchQueue: [],
    metrics: {
      totalEvents: 0,
      uniqueUsers: 0,
      sessionDuration: 0,
      bounceRate: 0,
      conversionRate: 0,
      abTestConversions: {},
      realTimeEvents: 0,
      batchFlushes: 0,
    },
  });

  const eventIdCounter = useRef(0);
  const sessionStartTime = useRef(Date.now());
  const batchFlushTimer = useRef<NodeJS.Timeout | null>(null);
  const abTestIdCounter = useRef(0);

  // Track event
  const trackEvent = useCallback((type: string, data: unknown) => {
    if (!enableAnalytics) return;

    // Apply sampling
    if (Math.random() > state.currentSampleRate) return;

    const event = {
      id: `event-${++eventIdCounter.current}-${Date.now()}`,
      type,
      data,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      events: [...prev.events, event],
      metrics: {
        ...prev.metrics,
        totalEvents: prev.metrics.totalEvents + 1,
      },
    }));

    // Add to batch queue if batching is enabled
    if (state.currentBatchSize > 0) {
      setState(prev => {
        const newBatchQueue = [...prev.batchQueue, event];
        
        // Auto-flush if batch is full
        if (newBatchQueue.length >= state.currentBatchSize) {
          // Flush immediately
          setTimeout(() => {
            setState(prevState => ({
              ...prevState,
              batchQueue: [],
              metrics: {
                ...prevState.metrics,
                batchFlushes: prevState.metrics.batchFlushes + 1,
              },
            }));
          }, 0);
          return {
            ...prev,
            batchQueue: [],
          };
        }
        
        return {
          ...prev,
          batchQueue: newBatchQueue,
        };
      });
    }

    // Send real-time event if enabled
    if (enableRealTimeAnalytics) {
      // Add to real-time events
      setState(prev => ({
        ...prev,
        realTimeEvents: [...prev.realTimeEvents, {
          id: `realtime-${++eventIdCounter.current}-${Date.now()}`,
          type,
          data,
          timestamp: Date.now(),
        }],
        metrics: {
          ...prev.metrics,
          realTimeEvents: prev.metrics.realTimeEvents + 1,
        },
      }));
    }
  }, [enableAnalytics, state.currentSampleRate, state.currentBatchSize, enableRealTimeAnalytics]);

  // Track click
  const trackClick = useCallback((element: string, position: { x: number; y: number }) => {
    if (!enableAnalytics || !enableClickTracking) return;

    trackEvent('click', { element, position });

    // Update heatmap data
    if (enableHeatmaps) {
      setState(prev => ({
        ...prev,
        heatmapData: {
          ...prev.heatmapData,
          [element]: ((prev.heatmapData[element] as number) || 0) + 1,
        },
      }));
    }
  }, [enableAnalytics, enableClickTracking, enableHeatmaps, trackEvent]);

  // Track scroll
  const trackScroll = useCallback((scrollDepth: number) => {
    if (!enableAnalytics || !enableScrollTracking) return;

    trackEvent('scroll', { scrollDepth });
  }, [enableAnalytics, enableScrollTracking, trackEvent]);

  // Track form interaction
  const trackFormInteraction = useCallback((field: string, action: string) => {
    if (!enableAnalytics || !enableFormAnalytics) return;

    trackEvent('form_interaction', { field, action });

    // Update user journey
    if (enableUserJourney) {
      setState(prev => ({
        ...prev,
        userJourney: [...prev.userJourney, {
          step: `${field}_${action}`,
          timestamp: Date.now(),
          data: { field, action },
        }],
      }));
    }
  }, [enableAnalytics, enableFormAnalytics, enableUserJourney, trackEvent]);

  // Track error
  const trackError = useCallback((error: Error, context: unknown) => {
    if (!enableAnalytics || !enableErrorTracking) return;

    trackEvent('error', {
      message: error.message,
      stack: error.stack,
      context,
    });
  }, [enableAnalytics, enableErrorTracking, trackEvent]);

  // Track performance
  const trackPerformance = useCallback((metric: string, value: number) => {
    if (!enableAnalytics || !enablePerformanceTracking) return;

    trackEvent('performance', { metric, value });
  }, [enableAnalytics, enablePerformanceTracking, trackEvent]);

  // Track user behavior
  const trackUserBehavior = useCallback((behavior: string, data: unknown) => {
    if (!enableAnalytics || !enableUserBehavior) return;

    trackEvent('user_behavior', { behavior, data });
  }, [enableAnalytics, enableUserBehavior, trackEvent]);

  // Track conversion
  const trackConversion = useCallback((goal: string, value?: number) => {
    if (!enableAnalytics || !enableConversionTracking) return;

    trackEvent('conversion', { goal, value });

    setState(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        conversionRate: prev.metrics.conversionRate + 1,
      },
    }));
  }, [enableAnalytics, enableConversionTracking, trackEvent]);

  // Start session
  const startSession = useCallback(() => {
    if (!enableAnalytics) return;

    sessionStartTime.current = Date.now();
    trackEvent('session_start', { timestamp: sessionStartTime.current });
  }, [enableAnalytics, trackEvent]);

  // End session
  const endSession = useCallback(() => {
    if (!enableAnalytics) return;

    const sessionDuration = Date.now() - sessionStartTime.current;
    trackEvent('session_end', { duration: sessionDuration });

    setState(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        sessionDuration: sessionDuration,
      },
    }));
  }, [enableAnalytics, trackEvent]);

  // Get metrics
  const getMetrics = useCallback(() => {
    return state.metrics;
  }, [state.metrics]);

  // Get heatmap data
  const getHeatmapData = useCallback(() => {
    return state.heatmapData;
  }, [state.heatmapData]);

  // Get user journey
  const getUserJourney = useCallback(() => {
    return state.userJourney;
  }, [state.userJourney]);

  // Clear data
  const clearData = useCallback(() => {
    setState(prev => ({
      ...prev,
      events: [],
      heatmapData: {},
      userJourney: [],
      abTests: [],
      realTimeEvents: [],
      batchQueue: [],
      metrics: {
        totalEvents: 0,
        uniqueUsers: 0,
        sessionDuration: 0,
        bounceRate: 0,
        conversionRate: 0,
        abTestConversions: {},
        realTimeEvents: 0,
        batchFlushes: 0,
      },
    }));
  }, []);

  // Export data
  const exportData = useCallback(() => {
    return JSON.stringify({
      events: state.events,
      heatmapData: state.heatmapData,
      userJourney: state.userJourney,
      abTests: state.abTests,
      realTimeEvents: state.realTimeEvents,
      batchQueue: state.batchQueue,
      metrics: state.metrics,
    });
  }, [state]);

  // Start AB Test
  const startABTest = useCallback((testName: string, variant: string): string => {
    if (!enableAnalytics || !enableABTesting) return '';

    const testId = `abtest-${++abTestIdCounter.current}-${Date.now()}`;
    const abTest = {
      id: testId,
      name: testName,
      variant,
      startTime: Date.now(),
      metrics: {},
    };

    setState(prev => ({
      ...prev,
      abTests: [...prev.abTests, abTest],
    }));

    return testId;
  }, [enableAnalytics, enableABTesting]);

  // End AB Test
  const endABTest = useCallback((testId: string) => {
    if (!enableAnalytics || !enableABTesting) return;

    setState(prev => ({
      ...prev,
      abTests: prev.abTests.map(test =>
        test.id === testId
          ? { ...test, endTime: Date.now() }
          : test
      ),
    }));
  }, [enableAnalytics, enableABTesting]);

  // Track AB Test Event
  const trackABTestEvent = useCallback((testId: string, event: string, data: unknown) => {
    if (!enableAnalytics || !enableABTesting) return;

    const abTest = state.abTests.find(test => test.id === testId);
    if (!abTest) return;

    setState(prev => ({
      ...prev,
      abTests: prev.abTests.map(test =>
        test.id === testId
          ? {
              ...test,
              metrics: {
                ...test.metrics,
                [event]: (test.metrics[event] || 0) + 1,
              },
            }
          : test
      ),
      metrics: {
        ...prev.metrics,
        abTestConversions: {
          ...prev.metrics.abTestConversions,
          [testId]: (prev.metrics.abTestConversions[testId] || 0) + 1,
        },
      },
    }));
  }, [enableAnalytics, enableABTesting, state.abTests]);

  // Get AB Test Results
  const getABTestResults = useCallback((testId: string) => {
    return state.abTests.find(test => test.id === testId);
  }, [state.abTests]);

  // Send Real Time Event
  const sendRealTimeEvent = useCallback((type: string, data: unknown) => {
    if (!enableAnalytics || !enableRealTimeAnalytics) return;

    const event = {
      id: `realtime-${++eventIdCounter.current}-${Date.now()}`,
      type,
      data,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      realTimeEvents: [...prev.realTimeEvents, event],
      metrics: {
        ...prev.metrics,
        realTimeEvents: prev.metrics.realTimeEvents + 1,
      },
    }));

    // Send to external provider if configured
    if (state.currentProvider !== 'custom' && state.currentEndpoint) {
      // Simulate sending to external provider
      console.log(`Sending real-time event to ${state.currentProvider}:`, event);
    }
  }, [enableAnalytics, enableRealTimeAnalytics, state.currentProvider, state.currentEndpoint]);

  // Flush Batch
  const flushBatch = useCallback(() => {
    if (!enableAnalytics || state.batchQueue.length === 0) return;

    const batch = [...state.batchQueue];
    
    setState(prev => ({
      ...prev,
      batchQueue: [],
      metrics: {
        ...prev.metrics,
        batchFlushes: prev.metrics.batchFlushes + 1,
      },
    }));

    // Send batch to external provider if configured
    if (state.currentProvider !== 'custom' && state.currentEndpoint) {
      console.log(`Sending batch to ${state.currentProvider}:`, batch);
    }
  }, [enableAnalytics, state.batchQueue, state.currentProvider, state.currentEndpoint]);

  // Set Provider
  const setProvider = useCallback((provider: string, apiKey?: string, endpoint?: string) => {
    setState(prev => ({
      ...prev,
      currentProvider: provider,
      currentApiKey: apiKey || prev.currentApiKey,
      currentEndpoint: endpoint || prev.currentEndpoint,
    }));
  }, []);

  // Set Sample Rate
  const setSampleRate = useCallback((rate: number) => {
    setState(prev => ({
      ...prev,
      currentSampleRate: Math.max(0, Math.min(1, rate)),
    }));
  }, []);

  // Set Batch Size
  const setBatchSize = useCallback((size: number) => {
    setState(prev => ({
      ...prev,
      currentBatchSize: Math.max(1, size),
    }));
  }, []);

  // Set Flush Interval
  const setFlushInterval = useCallback((interval: number) => {
    setState(prev => ({
      ...prev,
      currentFlushInterval: Math.max(1000, interval),
    }));

    // Clear existing timer
    if (batchFlushTimer.current) {
      clearInterval(batchFlushTimer.current);
    }

    // Set new timer
    if (interval > 0) {
      batchFlushTimer.current = setInterval(() => {
        flushBatch();
      }, interval);
    }
  }, [flushBatch]);

  // Get Real Time Events
  const getRealTimeEvents = useCallback(() => {
    return state.realTimeEvents;
  }, [state.realTimeEvents]);

  // Get Batch Queue
  const getBatchQueue = useCallback(() => {
    return state.batchQueue;
  }, [state.batchQueue]);

  // Reset
  const reset = useCallback(() => {
    // Clear batch flush timer
    if (batchFlushTimer.current) {
      clearInterval(batchFlushTimer.current);
      batchFlushTimer.current = null;
    }

    setState({
      isAnalyticsEnabled: enableAnalytics,
      isABTestingEnabled: enableABTesting,
      isRealTimeAnalyticsEnabled: enableRealTimeAnalytics,
      currentProvider: analyticsProvider,
      currentApiKey: apiKey,
      currentEndpoint: endpoint,
      currentSampleRate: sampleRate,
      currentBatchSize: batchSize,
      currentFlushInterval: flushInterval,
      events: [],
      heatmapData: {},
      userJourney: [],
      abTests: [],
      realTimeEvents: [],
      batchQueue: [],
      metrics: {
        totalEvents: 0,
        uniqueUsers: 0,
        sessionDuration: 0,
        bounceRate: 0,
        conversionRate: 0,
        abTestConversions: {},
        realTimeEvents: 0,
        batchFlushes: 0,
      },
    });
  }, [enableAnalytics, enableABTesting, enableRealTimeAnalytics, analyticsProvider, apiKey, endpoint, sampleRate, batchSize, flushInterval]);

  // Actions object
  const actions: AnalyticsActions = useMemo(() => ({
    trackEvent,
    trackClick,
    trackScroll,
    trackFormInteraction,
    trackError,
    trackPerformance,
    trackUserBehavior,
    trackConversion,
    startSession,
    endSession,
    startABTest,
    endABTest,
    trackABTestEvent,
    getABTestResults,
    sendRealTimeEvent,
    flushBatch,
    setProvider,
    setSampleRate,
    setBatchSize,
    setFlushInterval,
    getMetrics,
    getHeatmapData,
    getUserJourney,
    getRealTimeEvents,
    getBatchQueue,
    clearData,
    exportData,
    reset,
  }), [
    trackEvent,
    trackClick,
    trackScroll,
    trackFormInteraction,
    trackError,
    trackPerformance,
    trackUserBehavior,
    trackConversion,
    startSession,
    endSession,
    startABTest,
    endABTest,
    trackABTestEvent,
    getABTestResults,
    sendRealTimeEvent,
    flushBatch,
    setProvider,
    setSampleRate,
    setBatchSize,
    setFlushInterval,
    getMetrics,
    getHeatmapData,
    getUserJourney,
    getRealTimeEvents,
    getBatchQueue,
    clearData,
    exportData,
    reset,
  ]);

  return {
    state,
    actions,
  };
}
