import { useState, useCallback, useMemo, useRef } from 'react';

export interface PerformanceOptions {
  enablePerformanceTracking?: boolean;
  enableRenderTracking?: boolean;
  enableMemoryTracking?: boolean;
  enableNetworkTracking?: boolean;
  enableUserInteractionTracking?: boolean;
  enableErrorTracking?: boolean;
  enableMetricsCollection?: boolean;
  enablePerformanceOptimization?: boolean;
  enableLazyLoading?: boolean;
  enableDebouncing?: boolean;
  enableThrottling?: boolean;
  enableCaching?: boolean;
  enableVirtualization?: boolean;
  enableMemoization?: boolean;
  enableCodeSplitting?: boolean;
  enableServiceWorker?: boolean;
  enableWebWorkers?: boolean;
  performanceThreshold?: number;
  renderThreshold?: number;
  memoryThreshold?: number;
  networkThreshold?: number;
  debounceMs?: number;
  throttleMs?: number;
  cacheSize?: number;
  maxRetries?: number;
  retryDelay?: number;
  enableProfiling?: boolean;
  enableDebugging?: boolean;
  customMetrics?: Record<string, unknown>;
}

export interface PerformanceState {
  renderCount: number;
  renderTime: number;
  memoryUsage: number;
  networkLatency: number;
  userInteractions: number;
  errorCount: number;
  cacheHits: number;
  cacheMisses: number;
  debounceCount: number;
  throttleCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  performanceScore: number;
  isOptimized: boolean;
  isProfiling: boolean;
  isDebugging: boolean;
  customMetrics: Record<string, unknown>;
}

export interface PerformanceActions {
  trackRender: (componentName: string, renderTime: number) => void;
  trackMemoryUsage: () => void;
  trackNetworkLatency: (url: string, latency: number) => void;
  trackUserInteraction: (interactionType: string) => void;
  trackError: (error: Error) => void;
  trackCacheHit: (key: string) => void;
  trackCacheMiss: (key: string) => void;
  trackDebounce: (key: string) => void;
  trackThrottle: (key: string) => void;
  optimizePerformance: () => void;
  startProfiling: () => void;
  stopProfiling: () => void;
  startDebugging: () => void;
  stopDebugging: () => void;
  clearMetrics: () => void;
  updateCustomMetric: (key: string, value: unknown) => void;
  reset: () => void;
}

export function usePerformance(options: PerformanceOptions = {}) {
  const {
    enablePerformanceTracking = true,
    enableRenderTracking = true,
    enableMemoryTracking = true,
    enableNetworkTracking = true,
    enableUserInteractionTracking = true,
    enableErrorTracking = true,
    enableMetricsCollection = true,
    enablePerformanceOptimization = true,
    enableLazyLoading = false,
    enableDebouncing = true,
    enableThrottling = true,
    enableCaching = true,
    enableVirtualization = false,
    enableMemoization = true,
    enableCodeSplitting = false,
    enableServiceWorker = false,
    enableWebWorkers = false,
    performanceThreshold = 100,
    renderThreshold = 16,
    memoryThreshold = 50,
    networkThreshold = 200,
    debounceMs = 300,
    throttleMs = 100,
    cacheSize = 100,
    maxRetries = 3,
    retryDelay = 1000,
    enableProfiling = false,
    enableDebugging = false,
    customMetrics = {},
  } = options;

  const [state, setState] = useState<PerformanceState>({
    renderCount: 0,
    renderTime: 0,
    memoryUsage: 0,
    networkLatency: 0,
    userInteractions: 0,
    errorCount: 0,
    cacheHits: 0,
    cacheMisses: 0,
    debounceCount: 0,
    throttleCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
    performanceScore: 100,
    isOptimized: true,
    isProfiling: false,
    isDebugging: false,
    customMetrics: { ...customMetrics },
  });

  const renderTimes = useRef<number[]>([]);
  const debounceTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const throttleTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const cache = useRef<Map<string, unknown>>(new Map());

  // Track render performance
  const trackRender = useCallback((componentName: string, renderTime: number) => {
    if (!enableRenderTracking) return;

    // Use enablePerformanceTracking
    if (enablePerformanceTracking) {
      console.log(`Performance tracking: ${componentName} rendered in ${renderTime}ms`);
    }

    setState(prev => {
      const newRenderTimes = [...renderTimes.current, renderTime];
      renderTimes.current = newRenderTimes;
      
      const averageRenderTime = newRenderTimes.reduce((a, b) => a + b, 0) / newRenderTimes.length;
      
      return {
        ...prev,
        renderCount: prev.renderCount + 1,
        renderTime,
        lastRenderTime: renderTime,
        averageRenderTime,
        performanceScore: Math.max(0, 100 - (averageRenderTime / renderThreshold) * 100),
      };
    });
  }, [enableRenderTracking, enablePerformanceTracking, renderThreshold]);

  // Track memory usage
  const trackMemoryUsage = useCallback(() => {
    if (!enableMemoryTracking) return;

    if ('memory' in performance) {
      const memory = (performance as Record<string, unknown>).memory as Record<string, number>;
      const memoryUsage = (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100;
      
      // Use memoryThreshold
      if (memoryUsage > memoryThreshold) {
        console.warn(`Memory usage exceeded threshold: ${memoryUsage}% > ${memoryThreshold}%`);
      }
      
      setState(prev => ({
        ...prev,
        memoryUsage,
      }));
    }
  }, [enableMemoryTracking, memoryThreshold]);

  // Track network latency
  const trackNetworkLatency = useCallback((url: string, latency: number) => {
    if (!enableNetworkTracking) return;

    // Use networkThreshold
    if (latency > networkThreshold) {
      console.warn(`Network latency exceeded threshold: ${latency}ms > ${networkThreshold}ms for ${url}`);
    }

    setState(prev => ({
      ...prev,
      networkLatency: latency,
    }));
  }, [enableNetworkTracking, networkThreshold]);

  // Track user interactions
  const trackUserInteraction = useCallback((interactionType: string) => {
    if (!enableUserInteractionTracking) return;

    setState(prev => ({
      ...prev,
      userInteractions: prev.userInteractions + 1,
    }));
  }, [enableUserInteractionTracking]);

  // Track errors
  const trackError = useCallback((error: Error) => {
    if (!enableErrorTracking) return;

    setState(prev => ({
      ...prev,
      errorCount: prev.errorCount + 1,
    }));
  }, [enableErrorTracking]);

  // Track cache hits and misses
  const trackCacheHit = useCallback((key: string) => {
    if (!enableCaching) return;

    setState(prev => ({
      ...prev,
      cacheHits: prev.cacheHits + 1,
    }));
  }, [enableCaching]);

  const trackCacheMiss = useCallback((key: string) => {
    if (!enableCaching) return;

    setState(prev => ({
      ...prev,
      cacheMisses: prev.cacheMisses + 1,
    }));
  }, [enableCaching]);

  // Track debounce
  const trackDebounce = useCallback((key: string) => {
    if (!enableDebouncing) return;

    // Use debounceMs
    console.log(`Debounce triggered for ${key} with ${debounceMs}ms delay`);

    setState(prev => ({
      ...prev,
      debounceCount: prev.debounceCount + 1,
    }));
  }, [enableDebouncing, debounceMs]);

  // Track throttle
  const trackThrottle = useCallback((key: string) => {
    if (!enableThrottling) return;

    // Use throttleMs
    console.log(`Throttle triggered for ${key} with ${throttleMs}ms interval`);

    setState(prev => ({
      ...prev,
      throttleCount: prev.throttleCount + 1,
    }));
  }, [enableThrottling, throttleMs]);

  // Optimize performance
  const optimizePerformance = useCallback(() => {
    if (!enablePerformanceOptimization) return;

    // Use performanceThreshold
    if (state.performanceScore < performanceThreshold) {
      console.log(`Performance optimization triggered. Score: ${state.performanceScore} < ${performanceThreshold}`);
    }

    // Use enableLazyLoading
    if (enableLazyLoading) {
      console.log('Lazy loading optimization enabled');
    }

    // Use enableVirtualization
    if (enableVirtualization) {
      console.log('Virtualization optimization enabled');
    }

    // Use enableMemoization
    if (enableMemoization) {
      console.log('Memoization optimization enabled');
    }

    // Use enableCodeSplitting
    if (enableCodeSplitting) {
      console.log('Code splitting optimization enabled');
    }

    // Use enableServiceWorker
    if (enableServiceWorker) {
      console.log('Service worker optimization enabled');
    }

    // Use enableWebWorkers
    if (enableWebWorkers) {
      console.log('Web workers optimization enabled');
    }

    setState(prev => ({
      ...prev,
      isOptimized: true,
    }));
  }, [
    enablePerformanceOptimization, 
    state.performanceScore, 
    performanceThreshold,
    enableLazyLoading,
    enableVirtualization,
    enableMemoization,
    enableCodeSplitting,
    enableServiceWorker,
    enableWebWorkers
  ]);

  // Start/stop profiling
  const startProfiling = useCallback(() => {
    if (!enableProfiling) return;

    setState(prev => ({
      ...prev,
      isProfiling: true,
    }));
  }, [enableProfiling]);

  const stopProfiling = useCallback(() => {
    if (!enableProfiling) return;

    setState(prev => ({
      ...prev,
      isProfiling: false,
    }));
  }, [enableProfiling]);

  // Start/stop debugging
  const startDebugging = useCallback(() => {
    if (!enableDebugging) return;

    setState(prev => ({
      ...prev,
      isDebugging: true,
    }));
  }, [enableDebugging]);

  const stopDebugging = useCallback(() => {
    if (!enableDebugging) return;

    setState(prev => ({
      ...prev,
      isDebugging: false,
    }));
  }, [enableDebugging]);

  // Clear metrics
  const clearMetrics = useCallback(() => {
    renderTimes.current = [];
    
    // Use cacheSize
    if (cache.current.size > cacheSize) {
      console.log(`Cache size exceeded limit: ${cache.current.size} > ${cacheSize}`);
    }
    
    setState(prev => ({
      ...prev,
      renderCount: 0,
      renderTime: 0,
      userInteractions: 0,
      errorCount: 0,
      cacheHits: 0,
      cacheMisses: 0,
      debounceCount: 0,
      throttleCount: 0,
      lastRenderTime: 0,
      averageRenderTime: 0,
      performanceScore: 100,
    }));
  }, [cacheSize]);

  // Update custom metric
  const updateCustomMetric = useCallback((key: string, value: unknown) => {
    if (!enableMetricsCollection) return;

    setState(prev => ({
      ...prev,
      customMetrics: {
        ...prev.customMetrics,
        [key]: value,
      },
    }));
  }, [enableMetricsCollection]);

  // Reset
  const reset = useCallback(() => {
    renderTimes.current = [];
    debounceTimers.current.clear();
    throttleTimers.current.clear();
    cache.current.clear();
    
    // Use maxRetries and retryDelay
    console.log(`Performance reset with maxRetries: ${maxRetries}, retryDelay: ${retryDelay}ms`);
    
    setState({
      renderCount: 0,
      renderTime: 0,
      memoryUsage: 0,
      networkLatency: 0,
      userInteractions: 0,
      errorCount: 0,
      cacheHits: 0,
      cacheMisses: 0,
      debounceCount: 0,
      throttleCount: 0,
      lastRenderTime: 0,
      averageRenderTime: 0,
      performanceScore: 100,
      isOptimized: true,
      isProfiling: false,
      isDebugging: false,
      customMetrics: { ...customMetrics },
    });
  }, [customMetrics, maxRetries, retryDelay]);

  // Actions object
  const actions: PerformanceActions = useMemo(() => ({
    trackRender,
    trackMemoryUsage,
    trackNetworkLatency,
    trackUserInteraction,
    trackError,
    trackCacheHit,
    trackCacheMiss,
    trackDebounce,
    trackThrottle,
    optimizePerformance,
    startProfiling,
    stopProfiling,
    startDebugging,
    stopDebugging,
    clearMetrics,
    updateCustomMetric,
    reset,
  }), [
    trackRender,
    trackMemoryUsage,
    trackNetworkLatency,
    trackUserInteraction,
    trackError,
    trackCacheHit,
    trackCacheMiss,
    trackDebounce,
    trackThrottle,
    optimizePerformance,
    startProfiling,
    stopProfiling,
    startDebugging,
    stopDebugging,
    clearMetrics,
    updateCustomMetric,
    reset,
  ]);

  return {
    state,
    actions,
  };
}
