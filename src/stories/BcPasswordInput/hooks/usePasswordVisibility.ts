import { useState, useCallback } from 'react';

/**
 * Password visibility state interface
 */
export interface PasswordVisibilityState {
  isVisible: boolean;
  toggleVisibility: () => void;
  setVisibility: (visible: boolean) => void;
  resetVisibility: () => void;
}

/**
 * Password visibility configuration
 */
export interface PasswordVisibilityConfig {
  defaultVisible?: boolean;
  rememberVisibility?: boolean;
  storageKey?: string;
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * Hook for managing password visibility state
 */
export const usePasswordVisibility = (config: PasswordVisibilityConfig = {}) => {
  const {
    defaultVisible = false,
    rememberVisibility = false,
    storageKey = 'bc-password-visibility',
    onVisibilityChange,
  } = config;

  // Get initial visibility state from localStorage if rememberVisibility is enabled
  const getInitialVisibility = useCallback(() => {
    if (rememberVisibility && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        return stored ? JSON.parse(stored) : defaultVisible;
      } catch (error) {
        console.warn('Failed to load password visibility state from localStorage:', error);
        return defaultVisible;
      }
    }
    return defaultVisible;
  }, [defaultVisible, rememberVisibility, storageKey]);

  const [isVisible, setIsVisible] = useState<boolean>(getInitialVisibility);

  /**
   * Toggle password visibility
   */
  const toggleVisibility = useCallback(() => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    
    // Save to localStorage if rememberVisibility is enabled
    if (rememberVisibility && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(newVisibility));
      } catch (error) {
        console.warn('Failed to save password visibility state to localStorage:', error);
      }
    }
    
    // Call onVisibilityChange callback
    if (onVisibilityChange) {
      onVisibilityChange(newVisibility);
    }
  }, [isVisible, rememberVisibility, storageKey, onVisibilityChange]);

  /**
   * Set password visibility
   */
  const setVisibility = useCallback((visible: boolean) => {
    setIsVisible(visible);
    
    // Save to localStorage if rememberVisibility is enabled
    if (rememberVisibility && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(visible));
      } catch (error) {
        console.warn('Failed to save password visibility state to localStorage:', error);
      }
    }
    
    // Call onVisibilityChange callback
    if (onVisibilityChange) {
      onVisibilityChange(visible);
    }
  }, [rememberVisibility, storageKey, onVisibilityChange]);

  /**
   * Reset password visibility to default
   */
  const resetVisibility = useCallback(() => {
    setVisibility(defaultVisible);
  }, [setVisibility, defaultVisible]);

  /**
   * Get visibility toggle props for input
   */
  const getToggleProps = useCallback(() => ({
    type: isVisible ? 'text' : 'password',
    'aria-label': isVisible ? 'Şifreyi gizle' : 'Şifreyi göster',
    'aria-pressed': isVisible,
  }), [isVisible]);

  /**
   * Get visibility toggle button props
   */
  const getToggleButtonProps = useCallback(() => ({
    'aria-label': isVisible ? 'Şifreyi gizle' : 'Şifreyi göster',
    'aria-pressed': isVisible,
    'aria-expanded': isVisible,
    title: isVisible ? 'Şifreyi gizle' : 'Şifreyi göster',
  }), [isVisible]);

  /**
   * Get visibility icon props
   */
  const getVisibilityIconProps = useCallback(() => ({
    'aria-hidden': true,
    style: {
      transition: 'transform 0.2s ease',
      transform: isVisible ? 'rotate(0deg)' : 'rotate(180deg)',
    },
  }), [isVisible]);

  return {
    isVisible,
    toggleVisibility,
    setVisibility,
    resetVisibility,
    getToggleProps,
    getToggleButtonProps,
    getVisibilityIconProps,
  };
};