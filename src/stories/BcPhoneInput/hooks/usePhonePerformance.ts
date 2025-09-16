import { useMemo, useCallback, useRef } from 'react';
import { BcPhoneInputProps } from '../BcPhoneInput.types';

export interface PhonePerformanceOptions {
  enablePerformanceTracking?: boolean;
  enableRenderTracking?: boolean;
  enableMemoryTracking?: boolean;
  enableNetworkTracking?: boolean;
  enableUserInteractionTracking?: boolean;
  enablePerformanceOptimization?: boolean;
  enableDebouncing?: boolean;
  enableThrottling?: boolean;
  enableCaching?: boolean;
  enableMemoization?: boolean;
}

export interface PhonePerformanceReturn {
  metrics: {
    renderTime: number;
    memoryUsage: number;
    networkRequests: number;
    userInteractions: number;
    cacheHits: number;
    cacheMisses: number;
  };
  optimization: {
    debounceMs: number;
    throttleMs: number;
    cacheSize: number;
    memoizationEnabled: boolean;
  };
  tracking: {
    startRender: () => void;
    endRender: () => void;
    trackInteraction: (type: string) => void;
    trackCacheHit: () => void;
    trackCacheMiss: () => void;
    trackNetworkRequest: () => void;
    trackMemoryUsage: () => void;
  };
  cache: {
    get: (key: string) => any;
    set: (key: string, value: any) => void;
    clear: () => void;
    size: () => number;
  };
}

export const usePhonePerformance = (props: BcPhoneInputProps): PhonePerformanceReturn => {
  const {
    enablePerformanceTracking = false,
    enableRenderTracking = false,
    enableMemoryTracking = false,
    enableNetworkTracking = false,
    enableUserInteractionTracking = false,
    enablePerformanceOptimization = true,
    enableDebouncing = true,
    enableThrottling = true,
    enableCaching = true,
    enableMemoization = true,
  } = props;

  const renderStartTime = useRef<number>(0);
  const metricsRef = useRef({
    renderTime: 0,
    memoryUsage: 0,
    networkRequests: 0,
    userInteractions: 0,
    cacheHits: 0,
    cacheMisses: 0,
  });

  const cacheRef = useRef<Map<string, any>>(new Map());

  const startRender = useCallback(() => {
    if (enableRenderTracking) {
      renderStartTime.current = performance.now();
    }
  }, [enableRenderTracking]);

  const endRender = useCallback(() => {
    if (enablePerformanceTracking && enableRenderTracking && renderStartTime.current > 0) {
      const renderTime = performance.now() - renderStartTime.current;
      metricsRef.current.renderTime = renderTime;
    }
  }, [enablePerformanceTracking, enableRenderTracking]);

  const trackInteraction = useCallback((type: string) => {
    if (enablePerformanceTracking && enableUserInteractionTracking) {
      metricsRef.current.userInteractions++;
      // Track specific interaction types
      console.log(`Phone interaction: ${type}`);
    }
  }, [enablePerformanceTracking, enableUserInteractionTracking]);

  const trackCacheHit = useCallback(() => {
    if (enableCaching) {
      metricsRef.current.cacheHits++;
    }
  }, [enableCaching]);

  const trackCacheMiss = useCallback(() => {
    if (enableCaching) {
      metricsRef.current.cacheMisses++;
    }
  }, [enableCaching]);

  const trackNetworkRequest = useCallback(() => {
    if (enablePerformanceTracking && enableNetworkTracking) {
      metricsRef.current.networkRequests++;
    }
  }, [enablePerformanceTracking, enableNetworkTracking]);

  const trackMemoryUsage = useCallback(() => {
    if (enablePerformanceTracking && enableMemoryTracking && 'memory' in performance) {
      const memory = (performance as any).memory;
      metricsRef.current.memoryUsage = memory.usedJSHeapSize;
    }
  }, [enablePerformanceTracking, enableMemoryTracking]);

  const cache = useMemo(() => ({
    get: (key: string) => {
      const value = cacheRef.current.get(key);
      if (value !== undefined) {
        trackCacheHit();
        return value;
      }
      trackCacheMiss();
      return undefined;
    },
    set: (key: string, value: any) => {
      if (enableCaching) {
        cacheRef.current.set(key, value);
      }
    },
    clear: () => {
      cacheRef.current.clear();
    },
    size: () => cacheRef.current.size,
  }), [enableCaching, trackCacheHit, trackCacheMiss]);

  const optimization = useMemo(() => ({
    debounceMs: enablePerformanceOptimization && enableDebouncing ? 300 : 0,
    throttleMs: enablePerformanceOptimization && enableThrottling ? 100 : 0,
    cacheSize: cacheRef.current.size,
    memoizationEnabled: enablePerformanceOptimization && enableMemoization,
    performanceOptimizationEnabled: enablePerformanceOptimization,
  }), [enablePerformanceOptimization, enableDebouncing, enableThrottling, enableMemoization]);

  const metrics = useMemo(() => metricsRef.current, []);

  const tracking = useMemo(() => ({
    startRender,
    endRender,
    trackInteraction,
    trackCacheHit,
    trackCacheMiss,
    trackNetworkRequest,
    trackMemoryUsage,
  }), [
    startRender,
    endRender,
    trackInteraction,
    trackCacheHit,
    trackCacheMiss,
    trackNetworkRequest,
    trackMemoryUsage,
  ]);

  return {
    metrics,
    optimization,
    tracking,
    cache,
  };
};
