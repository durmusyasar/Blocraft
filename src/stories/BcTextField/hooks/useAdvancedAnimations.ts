import { useState, useCallback, useMemo, useRef } from 'react';

export interface AnimationOptions {
  enableAnimations?: boolean;
  enableMicroInteractions?: boolean;
  enableAdvancedTransitions?: boolean;
  enableParticleEffects?: boolean;
  enableRippleEffects?: boolean;
  enableGlowEffects?: boolean;
  enableShakeEffects?: boolean;
  enableBounceEffects?: boolean;
  enableFadeEffects?: boolean;
  enableSlideEffects?: boolean;
  enableZoomEffects?: boolean;
  enableRotateEffects?: boolean;
  enableScaleEffects?: boolean;
  enableSkewEffects?: boolean;
  enableMorphEffects?: boolean;
  enableParallaxEffects?: boolean;
  enableScrollAnimations?: boolean;
  enableHoverAnimations?: boolean;
  enableFocusAnimations?: boolean;
  enableClickAnimations?: boolean;
  enableDragAnimations?: boolean;
  enableSwipeAnimations?: boolean;
  enableKeyboardAnimations?: boolean;
  enableVoiceAnimations?: boolean;
  enableAwarenessAnimations?: boolean;
  enableContextAnimations?: boolean;
  enableUserAnimations?: boolean;
  enableSystemAnimations?: boolean;
  enableCustomAnimations?: boolean;
  animationDuration?: number;
  animationDelay?: number;
  animationEasing?: string;
  animationIteration?: number;
  animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  animationFillMode?: 'none' | 'forwards' | 'backs' | 'both';
  animationPlayState?: 'running' | 'paused';
  customAnimations?: Record<string, unknown>;
  animationPresets?: Record<string, unknown>;
  animationLibrary?: 'css' | 'framer-motion' | 'lottie' | 'gsap' | 'anime' | 'custom';
  animationPerformance?: 'low' | 'medium' | 'high' | 'ultra';
  animationQuality?: 'low' | 'medium' | 'high' | 'ultra';
  animationOptimization?: boolean;
  animationReducedMotion?: boolean;
  animationAccessibility?: boolean;
  animationDebugging?: boolean;
  animationProfiling?: boolean;
  animationMonitoring?: boolean;
  animationAnalytics?: boolean;
  animationLogging?: boolean;
  animationErrorHandling?: boolean;
  animationFallbacks?: boolean;
  animationCaching?: boolean;
  animationCompression?: boolean;
  animationEncryption?: boolean;
  animationSecurity?: boolean;
  animationReporting?: boolean;
}

export interface AnimationState {
  isAnimationsEnabled: boolean;
  isAnimating: boolean;
  currentAnimation: string | null;
  animationQueue: Array<string | { name: string; element: HTMLElement; options: unknown }>;
  activeAnimations: Record<string, unknown>;
  animationHistory: Array<{
    id: string;
    name: string;
    startTime: number;
    endTime: number;
    duration: number;
    success: boolean;
    error?: Error;
  }>;
  animationMetrics: {
    totalAnimations: number;
    successfulAnimations: number;
    failedAnimations: number;
    averageDuration: number;
    totalDuration: number;
    performanceScore: number;
  };
  animationErrors: Array<{
    id: string;
    error: Error;
    timestamp: number;
    context: unknown;
  }>;
  animationCache: Record<string, unknown>;
  animationDebugging: {
    logs: Array<{
      id: string;
      level: string;
      message: string;
      timestamp: number;
      context: unknown;
    }>;
    traces: Array<{
      id: string;
      trace: unknown;
      timestamp: number;
    }>;
  };
}

export interface AnimationActions {
  playAnimation: (name: string, element: HTMLElement, options?: unknown) => Promise<void>;
  stopAnimation: (name: string) => void;
  pauseAnimation: (name: string) => void;
  resumeAnimation: (name: string) => void;
  reverseAnimation: (name: string) => void;
  resetAnimation: (name: string) => void;
  queueAnimation: (name: string, element: HTMLElement, options?: unknown) => void;
  clearAnimationQueue: () => void;
  addCustomAnimation: (name: string, animation: unknown) => void;
  removeCustomAnimation: (name: string) => void;
  updateAnimationPreset: (name: string, preset: unknown) => void;
  getActiveAnimations: () => Record<string, unknown>;
  getAnimationHistory: () => unknown[];
  clearAnimationHistory: () => void;
  getAnimationMetrics: () => unknown;
  clearAnimationMetrics: () => void;
  getAnimationLogs: () => unknown[];
  clearAnimationLogs: () => void;
  getAnimationTraces: () => unknown[];
  clearAnimationTraces: () => void;
  getAnimationCache: () => unknown;
  clearAnimationCache: () => void;
  exportAnimationData: () => string;
  importAnimationData: (data: string) => void;
  reset: () => void;
}

export function useAdvancedAnimations(options: AnimationOptions = {}) {
  const {
    enableAnimations = false,
    animationDuration = 300,
    animationEasing = 'ease-in-out',
    animationLibrary = 'css',
    animationLogging = true,
  } = options;

  const [state, setState] = useState<AnimationState>({
    isAnimationsEnabled: enableAnimations,
    isAnimating: false,
    currentAnimation: null,
    animationQueue: [],
    activeAnimations: {},
    animationHistory: [],
    animationMetrics: {
      totalAnimations: 0,
      successfulAnimations: 0,
      failedAnimations: 0,
      averageDuration: 0,
      totalDuration: 0,
      performanceScore: 0,
    },
    animationErrors: [],
    animationCache: {},
    animationDebugging: {
      logs: [],
      traces: [],
    },
  });

  const animationIdCounter = useRef(0);
  const errorIdCounter = useRef(0);

  // Log animation event
  const logAnimationEvent = useCallback((level: string, message: string, context?: unknown) => {
    if (!animationLogging) return;

    const log = {
      id: `log-${++errorIdCounter.current}-${Date.now()}`,
      level,
      message,
      timestamp: Date.now(),
      context,
    };

    setState(prev => ({
      ...prev,
      animationDebugging: {
        ...prev.animationDebugging,
        logs: [...prev.animationDebugging.logs, log],
      },
    }));
  }, [animationLogging]);

  // Play animation
  const playAnimation = useCallback(async (name: string, element: HTMLElement, options: unknown = {}): Promise<void> => {
    if (!enableAnimations || !element) return;

    const animationId = `anim-${++animationIdCounter.current}-${Date.now()}`;
    const startTime = performance.now();

    try {
      setState(prev => ({
        ...prev,
        isAnimating: true,
        currentAnimation: name,
        activeAnimations: {
          ...prev.activeAnimations,
          [animationId]: { name, element, options, startTime },
        },
      }));

      // Apply animation based on library
      if (animationLibrary === 'css') {
        element.style.transition = `all ${animationDuration}ms ${animationEasing}`;
        
        // Apply specific animation based on name
        if (name === 'fadeIn') {
          element.style.opacity = '1';
        } else if (name === 'fadeOut') {
          element.style.opacity = '0';
        } else if (name === 'slideIn') {
          element.style.transform = 'translateX(0)';
        } else if (name === 'slideOut') {
          element.style.transform = 'translateX(-100%)';
        } else if (name === 'zoomIn') {
          element.style.transform = 'scale(1)';
        } else if (name === 'zoomOut') {
          element.style.transform = 'scale(0)';
        } else if (name === 'bounce') {
          element.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            element.style.transform = 'translateY(0)';
          }, 150);
        } else if (name === 'shake') {
          element.style.transform = 'translateX(-5px)';
          setTimeout(() => {
            element.style.transform = 'translateX(5px)';
            setTimeout(() => {
              element.style.transform = 'translateX(0)';
            }, 100);
          }, 100);
        }
      }

      // Wait for animation to complete
      await new Promise(resolve => setTimeout(resolve, animationDuration));

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Update metrics
      setState(prev => ({
        ...prev,
        isAnimating: false,
        currentAnimation: null,
        activeAnimations: Object.fromEntries(
          Object.entries(prev.activeAnimations).filter(([id]) => id !== animationId)
        ),
        animationHistory: [...prev.animationHistory, {
          id: animationId,
          name,
          startTime,
          endTime,
          duration,
          success: true,
        }],
        animationMetrics: {
          ...prev.animationMetrics,
          totalAnimations: prev.animationMetrics.totalAnimations + 1,
          successfulAnimations: prev.animationMetrics.successfulAnimations + 1,
          averageDuration: (prev.animationMetrics.averageDuration + duration) / 2,
          totalDuration: prev.animationMetrics.totalDuration + duration,
        },
      }));

      // Log animation completion
      if (animationLogging) {
        logAnimationEvent('info', `Animation ${name} completed`, { duration, element: element.tagName });
      }

    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      setState(prev => ({
        ...prev,
        isAnimating: false,
        currentAnimation: null,
        activeAnimations: Object.fromEntries(
          Object.entries(prev.activeAnimations).filter(([id]) => id !== animationId)
        ),
        animationHistory: [...prev.animationHistory, {
          id: animationId,
          name,
          startTime,
          endTime,
          duration,
          success: false,
          error: error as Error,
        }],
        animationMetrics: {
          ...prev.animationMetrics,
          totalAnimations: prev.animationMetrics.totalAnimations + 1,
          failedAnimations: prev.animationMetrics.failedAnimations + 1,
        },
        animationErrors: [...prev.animationErrors, {
          id: `error-${++errorIdCounter.current}-${Date.now()}`,
          error: error as Error,
          timestamp: Date.now(),
          context: { animationId, name, element: element.tagName },
        }],
      }));

      throw error;
    }
  }, [enableAnimations, animationLibrary, animationDuration, animationEasing, animationLogging, logAnimationEvent]);

  // Stop animation
  const stopAnimation = useCallback((name: string) => {
    if (!enableAnimations) return;

    setState(prev => ({
      ...prev,
      activeAnimations: Object.fromEntries(
        Object.entries(prev.activeAnimations).filter(([, anim]) => (anim as { name: string }).name !== name)
      ),
    }));

    if (animationLogging) {
      logAnimationEvent('info', `Animation ${name} stopped`);
    }
  }, [enableAnimations, animationLogging, logAnimationEvent]);

  // Pause animation
  const pauseAnimation = useCallback((name: string) => {
    if (!enableAnimations) return;

    if (animationLogging) {
      logAnimationEvent('info', `Animation ${name} paused`);
    }
  }, [enableAnimations, animationLogging, logAnimationEvent]);

  // Resume animation
  const resumeAnimation = useCallback((name: string) => {
    if (!enableAnimations) return;

    if (animationLogging) {
      logAnimationEvent('info', `Animation ${name} resumed`);
    }
  }, [enableAnimations, animationLogging, logAnimationEvent]);

  // Reverse animation
  const reverseAnimation = useCallback((name: string) => {
    if (!enableAnimations) return;

    if (animationLogging) {
      logAnimationEvent('info', `Animation ${name} reversed`);
    }
  }, [enableAnimations, animationLogging, logAnimationEvent]);

  // Reset animation
  const resetAnimation = useCallback((name: string) => {
    if (!enableAnimations) return;

    if (animationLogging) {
      logAnimationEvent('info', `Animation ${name} reset`);
    }
  }, [enableAnimations, animationLogging, logAnimationEvent]);

  // Queue animation
  const queueAnimation = useCallback((name: string, element: HTMLElement, options: unknown = {}) => {
    if (!enableAnimations) return;

    setState(prev => ({
      ...prev,
      animationQueue: [...prev.animationQueue, { name, element, options }],
    }));

    if (animationLogging) {
      logAnimationEvent('info', `Animation ${name} queued`);
    }
  }, [enableAnimations, animationLogging, logAnimationEvent]);

  // Clear animation queue
  const clearAnimationQueue = useCallback(() => {
    if (!enableAnimations) return;

    setState(prev => ({
      ...prev,
      animationQueue: [],
    }));

    if (animationLogging) {
      logAnimationEvent('info', 'Animation queue cleared');
    }
  }, [enableAnimations, animationLogging, logAnimationEvent]);

  // Add custom animation
  const addCustomAnimation = useCallback((name: string, animation: unknown) => {
    if (!enableAnimations) return;

    setState(prev => ({
      ...prev,
      animationCache: {
        ...prev.animationCache,
        [name]: animation,
      },
    }));

    if (animationLogging) {
      logAnimationEvent('info', `Custom animation ${name} added`);
    }
  }, [enableAnimations, animationLogging, logAnimationEvent]);

  // Remove custom animation
  const removeCustomAnimation = useCallback((name: string) => {
    if (!enableAnimations) return;

    setState(prev => ({
      ...prev,
      animationCache: Object.fromEntries(
        Object.entries(prev.animationCache).filter(([key]) => key !== name)
      ),
    }));

    if (animationLogging) {
      logAnimationEvent('info', `Custom animation ${name} removed`);
    }
  }, [enableAnimations, animationLogging, logAnimationEvent]);

  // Update animation preset
  const updateAnimationPreset = useCallback((name: string, preset: unknown) => {
    if (!enableAnimations) return;

    setState(prev => ({
      ...prev,
      animationCache: {
        ...prev.animationCache,
        [name]: preset,
      },
    }));

    if (animationLogging) {
      logAnimationEvent('info', `Animation preset ${name} updated`);
    }
  }, [enableAnimations, animationLogging, logAnimationEvent]);

  // Get active animations
  const getActiveAnimations = useCallback(() => {
    return state.activeAnimations;
  }, [state.activeAnimations]);

  // Get animation history
  const getAnimationHistory = useCallback(() => {
    return state.animationHistory;
  }, [state.animationHistory]);

  // Clear animation history
  const clearAnimationHistory = useCallback(() => {
    setState(prev => ({
      ...prev,
      animationHistory: [],
    }));
    if (animationLogging) {
      logAnimationEvent('info', 'Animation history cleared');
    }
  }, [animationLogging, logAnimationEvent]);

  // Get animation metrics
  const getAnimationMetrics = useCallback(() => {
    return state.animationMetrics;
  }, [state.animationMetrics]);

  // Clear animation metrics
  const clearAnimationMetrics = useCallback(() => {
    setState(prev => ({
      ...prev,
      animationMetrics: {
        totalAnimations: 0,
        successfulAnimations: 0,
        failedAnimations: 0,
        averageDuration: 0,
        totalDuration: 0,
        performanceScore: 0,
      },
    }));
    if (animationLogging) {
      logAnimationEvent('info', 'Animation metrics cleared');
    }
  }, [animationLogging, logAnimationEvent]);

  // Get animation logs
  const getAnimationLogs = useCallback(() => {
    return state.animationDebugging.logs;
  }, [state.animationDebugging.logs]);

  // Clear animation logs
  const clearAnimationLogs = useCallback(() => {
    setState(prev => ({
      ...prev,
      animationDebugging: {
        ...prev.animationDebugging,
        logs: [],
      },
    }));
    if (animationLogging) {
      logAnimationEvent('info', 'Animation logs cleared');
    }
  }, [animationLogging, logAnimationEvent]);

  // Get animation traces
  const getAnimationTraces = useCallback(() => {
    return state.animationDebugging.traces;
  }, [state.animationDebugging.traces]);

  // Clear animation traces
  const clearAnimationTraces = useCallback(() => {
    setState(prev => ({
      ...prev,
      animationDebugging: {
        ...prev.animationDebugging,
        traces: [],
      },
    }));
    if (animationLogging) {
      logAnimationEvent('info', 'Animation traces cleared');
    }
  }, [animationLogging, logAnimationEvent]);

  // Get animation cache
  const getAnimationCache = useCallback(() => {
    return state.animationCache;
  }, [state.animationCache]);

  // Clear animation cache
  const clearAnimationCache = useCallback(() => {
    setState(prev => ({
      ...prev,
      animationCache: {},
    }));
    if (animationLogging) {
      logAnimationEvent('info', 'Animation cache cleared');
    }
  }, [animationLogging, logAnimationEvent]);

  // Export animation data
  const exportAnimationData = useCallback(() => {
    return JSON.stringify({
      animationHistory: state.animationHistory,
      animationMetrics: state.animationMetrics,
      animationCache: state.animationCache,
    });
  }, [state.animationHistory, state.animationMetrics, state.animationCache]);

  // Import animation data
  const importAnimationData = useCallback((data: string) => {
    try {
      const imported = JSON.parse(data);
      setState(prev => ({
        ...prev,
        animationHistory: imported.animationHistory || prev.animationHistory,
        animationMetrics: imported.animationMetrics || prev.animationMetrics,
        animationCache: imported.animationCache || prev.animationCache,
      }));
      if (animationLogging) {
        logAnimationEvent('info', 'Animation data imported');
      }
    } catch (error) {
      if (animationLogging) {
        logAnimationEvent('error', 'Failed to import animation data', { error: (error as Error).message });
      }
    }
  }, [animationLogging, logAnimationEvent]);

  // Reset
  const reset = useCallback(() => {
    setState({
      isAnimationsEnabled: enableAnimations,
      isAnimating: false,
      currentAnimation: null,
      animationQueue: [],
      activeAnimations: {},
      animationHistory: [],
      animationMetrics: {
        totalAnimations: 0,
        successfulAnimations: 0,
        failedAnimations: 0,
        averageDuration: 0,
        totalDuration: 0,
        performanceScore: 0,
      },
      animationErrors: [],
      animationCache: {},
      animationDebugging: {
        logs: [],
        traces: [],
      },
    });
  }, [enableAnimations]);

  // Actions object
  const actions: AnimationActions = useMemo(() => ({
    playAnimation,
    stopAnimation,
    pauseAnimation,
    resumeAnimation,
    reverseAnimation,
    resetAnimation,
    queueAnimation,
    clearAnimationQueue,
    addCustomAnimation,
    removeCustomAnimation,
    updateAnimationPreset,
    getActiveAnimations,
    getAnimationHistory,
    clearAnimationHistory,
    getAnimationMetrics,
    clearAnimationMetrics,
    getAnimationLogs,
    clearAnimationLogs,
    getAnimationTraces,
    clearAnimationTraces,
    getAnimationCache,
    clearAnimationCache,
    exportAnimationData,
    importAnimationData,
    reset,
  }), [
    playAnimation,
    stopAnimation,
    pauseAnimation,
    resumeAnimation,
    reverseAnimation,
    resetAnimation,
    queueAnimation,
    clearAnimationQueue,
    addCustomAnimation,
    removeCustomAnimation,
    updateAnimationPreset,
    getActiveAnimations,
    getAnimationHistory,
    clearAnimationHistory,
    getAnimationMetrics,
    clearAnimationMetrics,
    getAnimationLogs,
    clearAnimationLogs,
    getAnimationTraces,
    clearAnimationTraces,
    getAnimationCache,
    clearAnimationCache,
    exportAnimationData,
    importAnimationData,
    reset,
  ]);

  return {
    state,
    actions,
  };
}
