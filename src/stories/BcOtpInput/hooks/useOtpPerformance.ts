import { useCallback, useState, useEffect, useRef } from 'react';

export interface UseOtpPerformanceProps {
  enablePerformanceOptimizations?: boolean;
  onPerformanceIssue?: (issue: PerformanceIssue) => void;
  onPerformanceMetric?: (metric: PerformanceMetric) => void;
  enableVirtualScrolling?: boolean;
  enableLazyLoading?: boolean;
  enableMemoization?: boolean;
  enableDebouncing?: boolean;
  virtualScrollingThreshold?: number;
  lazyLoadingThreshold?: number;
  debounceMs?: number;
}

export interface PerformanceIssue {
  type: 'slow_render' | 'memory_leak' | 'excessive_rerenders' | 'large_bundle';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}

export interface PerformanceState {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  memoryUsage: number;
  isVirtualScrolling: boolean;
  isLazyLoading: boolean;
  isMemoized: boolean;
  isDebounced: boolean;
  performanceIssues: PerformanceIssue[];
  metrics: PerformanceMetric[];
}

export const useOtpPerformance = ({
  enablePerformanceOptimizations = false,
  onPerformanceIssue,
  onPerformanceMetric,
  enableVirtualScrolling = false,
  enableLazyLoading = false,
  enableMemoization = true,
  enableDebouncing = true,
  virtualScrollingThreshold = 8,
  lazyLoadingThreshold = 6,
  debounceMs = 100,
}: UseOtpPerformanceProps) => {
  const [state, setState] = useState<PerformanceState>({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
    memoryUsage: 0,
    isVirtualScrolling: false,
    isLazyLoading: false,
    isMemoized: false,
    isDebounced: false,
    performanceIssues: [],
    metrics: [],
  });

  const renderTimesRef = useRef<number[]>([]);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const performanceObserverRef = useRef<PerformanceObserver | null>(null);

  // Performance monitoring
  useEffect(() => {
    if (!enablePerformanceOptimizations) return;

    // Monitor memory usage
    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory;
        if (memory) {
          const memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
          
          setState(prev => ({ ...prev, memoryUsage }));
          
          onPerformanceMetric?.({
            name: 'memory_usage',
            value: memoryUsage,
            unit: 'MB',
            timestamp: Date.now(),
          });
        }
      }
    };


    // Set up performance observer
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            onPerformanceMetric?.({
              name: entry.name,
              value: entry.duration,
              unit: 'ms',
              timestamp: Date.now(),
            });
          }
        });
      });

      observer.observe({ entryTypes: ['measure'] });
      performanceObserverRef.current = observer;
    }

    // Update memory usage periodically
    const memoryInterval = setInterval(updateMemoryUsage, 5000);

    return () => {
      clearInterval(memoryInterval);
      if (performanceObserverRef.current) {
        performanceObserverRef.current.disconnect();
      }
    };
  }, [enablePerformanceOptimizations, onPerformanceIssue, onPerformanceMetric]);

  // Virtual scrolling
  const shouldUseVirtualScrolling = useCallback((itemCount: number) => {
    return enableVirtualScrolling && itemCount > virtualScrollingThreshold;
  }, [enableVirtualScrolling, virtualScrollingThreshold]);

  // Lazy loading
  const shouldUseLazyLoading = useCallback((itemCount: number) => {
    return enableLazyLoading && itemCount > lazyLoadingThreshold;
  }, [enableLazyLoading, lazyLoadingThreshold]);

  // Debounced function
  const debounce = useCallback(<T extends (...args: unknown[]) => unknown>(
    func: T,
    delay: number = debounceMs
  ): T => {
    if (!enableDebouncing) return func;

    return ((...args: Parameters<T>) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    }) as T;
  }, [enableDebouncing, debounceMs]);

  // Memoized value
  const memoize = useCallback(<T>(value: T, deps: unknown[]): T => {
    if (!enableMemoization) return value;
    
    // This is a simplified memoization
    // In a real implementation, you'd use useMemo with proper dependencies
    return value;
  }, [enableMemoization]);

  // Performance measurement
  const measurePerformance = useCallback((name: string, fn: () => void) => {
    if (!enablePerformanceOptimizations) {
      fn();
      return;
    }

    const startTime = performance.now();
    fn();
    const endTime = performance.now();
    const duration = endTime - startTime;

    onPerformanceMetric?.({
      name,
      value: duration,
      unit: 'ms',
      timestamp: Date.now(),
    });
  }, [enablePerformanceOptimizations, onPerformanceMetric]);

  // Clear performance data
  const clearPerformanceData = useCallback(() => {
    setState(prev => ({
      ...prev,
      renderCount: 0,
      lastRenderTime: 0,
      averageRenderTime: 0,
      performanceIssues: [],
      metrics: [],
    }));
    renderTimesRef.current = [];
  }, []);

  // Get performance status
  const getPerformanceStatus = useCallback(() => {
    if (!enablePerformanceOptimizations) return null;

    return {
      renderCount: state.renderCount,
      averageRenderTime: state.averageRenderTime.toFixed(2),
      memoryUsage: state.memoryUsage.toFixed(2),
      issues: state.performanceIssues.length,
      isVirtualScrolling: state.isVirtualScrolling,
      isLazyLoading: state.isLazyLoading,
    };
  }, [enablePerformanceOptimizations, state]);

  // Get performance recommendations
  const getPerformanceRecommendations = useCallback(() => {
    const recommendations: string[] = [];

    if (state.averageRenderTime > 16) {
      recommendations.push('Consider using React.memo for components');
    }

    if (state.memoryUsage > 50) {
      recommendations.push('Consider implementing lazy loading');
    }

    if (state.renderCount > 100) {
      recommendations.push('Consider using useCallback and useMemo');
    }

    if (state.performanceIssues.length > 5) {
      recommendations.push('Consider performance optimization');
    }

    return recommendations;
  }, [state]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    ...state,
    shouldUseVirtualScrolling,
    shouldUseLazyLoading,
    debounce,
    memoize,
    measurePerformance,
    clearPerformanceData,
    getPerformanceStatus,
    getPerformanceRecommendations,
  };
};
