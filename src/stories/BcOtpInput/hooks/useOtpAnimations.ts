import { useCallback, useState } from 'react';

export interface UseOtpAnimationsProps {
  enableAnimations?: boolean;
  animationDuration?: number;
  enableSuccessAnimation?: boolean;
  enableErrorAnimation?: boolean;
  enableLoadingAnimation?: boolean;
  enableFocusAnimation?: boolean;
  onAnimationComplete?: (animationType: string) => void;
}

export interface AnimationState {
  isAnimating: boolean;
  currentAnimation: string | null;
  animationProgress: number;
}

export const useOtpAnimations = ({
  enableAnimations = true,
  animationDuration = 300,
  enableSuccessAnimation = true,
  enableErrorAnimation = true,
  enableLoadingAnimation = true,
  enableFocusAnimation = true,
  onAnimationComplete,
}: UseOtpAnimationsProps) => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    isAnimating: false,
    currentAnimation: null,
    animationProgress: 0,
  });

  const [inputAnimations, setInputAnimations] = useState<Record<number, string>>({});

  const triggerAnimation = useCallback((animationType: string, inputIndex?: number) => {
    if (!enableAnimations) return;

    setAnimationState({
      isAnimating: true,
      currentAnimation: animationType,
      animationProgress: 0,
    });

    if (inputIndex !== undefined) {
      setInputAnimations(prev => ({
        ...prev,
        [inputIndex]: animationType,
      }));
    }

    // Simulate animation progress
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      setAnimationState(prev => ({
        ...prev,
        animationProgress: progress,
      }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimationState({
          isAnimating: false,
          currentAnimation: null,
          animationProgress: 0,
        });

        if (inputIndex !== undefined) {
          setInputAnimations(prev => {
            const newAnimations = { ...prev };
            delete newAnimations[inputIndex];
            return newAnimations;
          });
        }

        onAnimationComplete?.(animationType);
      }
    };

    requestAnimationFrame(animate);
  }, [enableAnimations, animationDuration, onAnimationComplete]);

  const triggerSuccessAnimation = useCallback((inputIndex?: number) => {
    if (enableSuccessAnimation) {
      triggerAnimation('success', inputIndex);
    }
  }, [enableSuccessAnimation, triggerAnimation]);

  const triggerErrorAnimation = useCallback((inputIndex?: number) => {
    if (enableErrorAnimation) {
      triggerAnimation('error', inputIndex);
    }
  }, [enableErrorAnimation, triggerAnimation]);

  const triggerLoadingAnimation = useCallback((inputIndex?: number) => {
    if (enableLoadingAnimation) {
      triggerAnimation('loading', inputIndex);
    }
  }, [enableLoadingAnimation, triggerAnimation]);

  const triggerFocusAnimation = useCallback((inputIndex?: number) => {
    if (enableFocusAnimation) {
      triggerAnimation('focus', inputIndex);
    }
  }, [enableFocusAnimation, triggerAnimation]);

  const getInputAnimationStyles = useCallback((inputIndex: number) => {
    const animationType = inputAnimations[inputIndex];
    if (!animationType || !enableAnimations) return {};

    const baseStyles = {
      transition: `all ${animationDuration}ms ease-in-out`,
    };

    switch (animationType) {
      case 'success':
        return {
          ...baseStyles,
          transform: 'scale(1.05)',
          boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.3)',
          borderColor: '#4caf50',
        };

      case 'error':
        return {
          ...baseStyles,
          transform: 'scale(1.05)',
          boxShadow: '0 0 0 3px rgba(244, 67, 54, 0.3)',
          borderColor: '#f44336',
          animation: 'shake 0.5s ease-in-out',
        };

      case 'loading':
        return {
          ...baseStyles,
          opacity: 0.7,
          animation: 'pulse 1s ease-in-out infinite',
        };

      case 'focus':
        return {
          ...baseStyles,
          transform: 'scale(1.02)',
          boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.3)',
        };

      default:
        return baseStyles;
    }
  }, [inputAnimations, enableAnimations, animationDuration]);

  const getContainerAnimationStyles = useCallback(() => {
    if (!enableAnimations || !animationState.isAnimating) return {};

    const { currentAnimation, animationProgress } = animationState;

    switch (currentAnimation) {
      case 'success':
        return {
          transform: `scale(${1 + animationProgress * 0.02})`,
          transition: `transform ${animationDuration}ms ease-out`,
        };

      case 'error':
        return {
          transform: `translateX(${Math.sin(animationProgress * Math.PI * 4) * 5}px)`,
          transition: `transform ${animationDuration}ms ease-out`,
        };

      default:
        return {};
    }
  }, [enableAnimations, animationState, animationDuration]);

  const getStatusAnimationStyles = useCallback((status?: string) => {
    if (!enableAnimations) return {};

    const baseStyles = {
      transition: `all ${animationDuration}ms ease-in-out`,
    };

    switch (status) {
      case 'success':
        return {
          ...baseStyles,
          color: '#4caf50',
          transform: 'scale(1.1)',
          animation: 'fadeInScale 0.3s ease-out',
        };

      case 'error':
        return {
          ...baseStyles,
          color: '#f44336',
          transform: 'scale(1.1)',
          animation: 'fadeInScale 0.3s ease-out',
        };

      case 'warning':
        return {
          ...baseStyles,
          color: '#ff9800',
          transform: 'scale(1.05)',
          animation: 'fadeInScale 0.3s ease-out',
        };

      case 'info':
        return {
          ...baseStyles,
          color: '#2196f3',
          transform: 'scale(1.05)',
          animation: 'fadeInScale 0.3s ease-out',
        };

      default:
        return baseStyles;
    }
  }, [enableAnimations, animationDuration]);

  const getKeyframes = useCallback(() => {
    if (!enableAnimations) return '';

    return `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
      }
      
      @keyframes fadeInScale {
        0% { 
          opacity: 0; 
          transform: scale(0.8); 
        }
        100% { 
          opacity: 1; 
          transform: scale(1); 
        }
      }
      
      @keyframes slideIn {
        0% { 
          opacity: 0; 
          transform: translateY(-10px); 
        }
        100% { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
    `;
  }, [enableAnimations]);

  return {
    animationState,
    inputAnimations,
    triggerSuccessAnimation,
    triggerErrorAnimation,
    triggerLoadingAnimation,
    triggerFocusAnimation,
    getInputAnimationStyles,
    getContainerAnimationStyles,
    getStatusAnimationStyles,
    getKeyframes,
  };
};
