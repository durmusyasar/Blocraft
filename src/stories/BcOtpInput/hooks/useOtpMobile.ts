import { useCallback, useState, useEffect, useRef } from 'react';

export interface UseOtpMobileProps {
  enableMobileOptimizations?: boolean;
  onHapticFeedback?: (type: HapticFeedbackType) => void;
  onTouchGesture?: (gesture: TouchGesture) => void;
  onSwipeGesture?: (direction: SwipeDirection) => void;
  enableHapticFeedback?: boolean;
  enableTouchGestures?: boolean;
  enableSwipeSupport?: boolean;
  enableVibration?: boolean;
  enableOrientationSupport?: boolean;
}

export type HapticFeedbackType = 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning';
export type TouchGesture = 'tap' | 'double-tap' | 'long-press' | 'pinch' | 'rotate';
export type SwipeDirection = 'up' | 'down' | 'left' | 'right';

export interface MobileState {
  isMobile: boolean;
  isTouchDevice: boolean;
  orientation: 'portrait' | 'landscape';
  screenSize: 'small' | 'medium' | 'large';
  isVibrationSupported: boolean;
  isHapticSupported: boolean;
  lastGesture: TouchGesture | null;
  lastSwipe: SwipeDirection | null;
}

export const useOtpMobile = ({
  enableMobileOptimizations = false,
  onHapticFeedback,
  onTouchGesture,
  onSwipeGesture,
  enableHapticFeedback = true,
  enableTouchGestures = true,
  enableSwipeSupport = true,
  enableVibration = true,
  enableOrientationSupport = true,
}: UseOtpMobileProps) => {
  const [state, setState] = useState<MobileState>({
    isMobile: false,
    isTouchDevice: false,
    orientation: 'portrait',
    screenSize: 'medium',
    isVibrationSupported: false,
    isHapticSupported: false,
    lastGesture: null,
    lastSwipe: null,
  });

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const gestureTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile device and capabilities
  useEffect(() => {
    if (!enableMobileOptimizations) return;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isVibrationSupported = 'vibrate' in navigator;
    const isHapticSupported = 'vibrate' in navigator && isMobile;

    // Detect screen size
    const width = window.innerWidth;
    let screenSize: 'small' | 'medium' | 'large' = 'medium';
    if (width < 768) screenSize = 'small';
    else if (width > 1024) screenSize = 'large';

    // Detect orientation
    const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

    setState(prev => ({
      ...prev,
      isMobile,
      isTouchDevice,
      orientation,
      screenSize,
      isVibrationSupported,
      isHapticSupported,
    }));

    // Handle orientation change
    const handleOrientationChange = () => {
      const newOrientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      setState(prev => ({ ...prev, orientation: newOrientation }));
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [enableMobileOptimizations]);

  // Haptic feedback
  const triggerHapticFeedback = useCallback((type: HapticFeedbackType) => {
    if (!enableMobileOptimizations || !enableHapticFeedback || !state.isHapticSupported) return;

    const patterns = {
      light: [10],
      medium: [20],
      heavy: [50],
      success: [10, 10, 10],
      error: [100, 50, 100],
      warning: [50, 50, 50],
    };

    const pattern = patterns[type] || patterns.light;
    navigator.vibrate(pattern);
    onHapticFeedback?.(type);
  }, [enableMobileOptimizations, enableHapticFeedback, state.isHapticSupported, onHapticFeedback]);

  // Touch gesture detection
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enableMobileOptimizations || !enableTouchGestures) return;

    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  }, [enableMobileOptimizations, enableTouchGestures]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!enableMobileOptimizations || !enableTouchGestures || !touchStartRef.current) return;

    const touch = e.changedTouches[0];
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    const start = touchStartRef.current;
    const end = touchEndRef.current;
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const deltaTime = end.time - start.time;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Detect gesture type
    let gesture: TouchGesture | null = null;

    if (deltaTime < 200 && distance < 10) {
      // Single tap
      gesture = 'tap';
    } else if (deltaTime < 200 && distance < 10) {
      // Double tap (simplified)
      gesture = 'double-tap';
    } else if (deltaTime > 500 && distance < 10) {
      // Long press
      gesture = 'long-press';
    } else if (distance > 50) {
      // Swipe gesture
      if (enableSwipeSupport) {
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        
        if (absX > absY) {
          const direction: SwipeDirection = deltaX > 0 ? 'right' : 'left';
          setState(prev => ({ ...prev, lastSwipe: direction }));
          onSwipeGesture?.(direction);
        } else {
          const direction: SwipeDirection = deltaY > 0 ? 'down' : 'up';
          setState(prev => ({ ...prev, lastSwipe: direction }));
          onSwipeGesture?.(direction);
        }
      }
    }

    if (gesture) {
      setState(prev => ({ ...prev, lastGesture: gesture }));
      onTouchGesture?.(gesture);
    }

    // Clear refs
    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [enableMobileOptimizations, enableTouchGestures, enableSwipeSupport, onTouchGesture, onSwipeGesture]);

  // Pinch gesture detection
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!enableMobileOptimizations || !enableTouchGestures || e.touches.length !== 2) return;

    // Pinch gesture detection (simplified)
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const distance = Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );

    // This is a simplified implementation
    // In a real app, you'd track distance changes over time
    if (distance > 100) {
      setState(prev => ({ ...prev, lastGesture: 'pinch' }));
      onTouchGesture?.('pinch');
    }
  }, [enableMobileOptimizations, enableTouchGestures, onTouchGesture]);

  // Get mobile-optimized styles
  const getMobileStyles = useCallback(() => {
    if (!enableMobileOptimizations) return {};

    const baseStyles = {
      touchAction: 'manipulation',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      WebkitTouchCallout: 'none',
    };

    if (state.screenSize === 'small') {
      return {
        ...baseStyles,
        fontSize: '18px', // Prevent zoom on iOS
        minHeight: '44px', // Minimum touch target size
        minWidth: '44px',
      };
    }

    return baseStyles;
  }, [enableMobileOptimizations, state.screenSize]);

  // Get touch event handlers
  const getTouchHandlers = useCallback(() => {
    if (!enableMobileOptimizations || !enableTouchGestures) return {};

    return {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchMove: handleTouchMove,
    };
  }, [enableMobileOptimizations, enableTouchGestures, handleTouchStart, handleTouchEnd, handleTouchMove]);

  // Get mobile button props
  const getMobileButtonProps = useCallback(() => {
    if (!enableMobileOptimizations) return {};

    return {
      'data-mobile-optimized': 'true',
      'data-touch-device': state.isTouchDevice,
      'data-screen-size': state.screenSize,
      'data-orientation': state.orientation,
    };
  }, [enableMobileOptimizations, state.isTouchDevice, state.screenSize, state.orientation]);

  // Get mobile status
  const getMobileStatus = useCallback(() => {
    if (!enableMobileOptimizations) return null;

    return `Mobile: ${state.isMobile ? 'Yes' : 'No'}, Touch: ${state.isTouchDevice ? 'Yes' : 'No'}, Size: ${state.screenSize}, Orientation: ${state.orientation}`;
  }, [enableMobileOptimizations, state.isMobile, state.isTouchDevice, state.screenSize, state.orientation]);

  return {
    ...state,
    triggerHapticFeedback,
    getMobileStyles,
    getTouchHandlers,
    getMobileButtonProps,
    getMobileStatus,
  };
};
