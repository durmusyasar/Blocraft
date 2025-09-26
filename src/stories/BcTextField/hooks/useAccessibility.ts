import { useState, useCallback, useMemo } from 'react';

export interface AccessibilityOptions {
  enableScreenReaderSupport?: boolean;
  enableKeyboardNavigation?: boolean;
  enableHighContrast?: boolean;
  enableReducedMotion?: boolean;
  enableFocusManagement?: boolean;
  enableARIALabels?: boolean;
  enableLiveRegions?: boolean;
  enableSkipLinks?: boolean;
  enableTooltips?: boolean;
  enableErrorAnnouncements?: boolean;
  enableStatusAnnouncements?: boolean;
  enableProgressAnnouncements?: boolean;
  enableCustomAnnouncements?: boolean;
  announcementDelay?: number;
  focusTrapEnabled?: boolean;
  focusReturnEnabled?: boolean;
  focusVisibleEnabled?: boolean;
  customARIALabels?: Record<string, string>;
  customAnnouncements?: Record<string, string>;
  screenReaderOnlyText?: string;
  skipLinkText?: string;
  tooltipText?: string;
  errorAnnouncementText?: string;
  statusAnnouncementText?: string;
  progressAnnouncementText?: string;
}

export interface AccessibilityContext {
  fieldName?: string;
  fieldType?: string;
  fieldValue?: string;
  fieldStatus?: 'idle' | 'validating' | 'valid' | 'invalid' | 'warning' | 'info';
  fieldError?: string;
  fieldWarning?: string;
  fieldInfo?: string;
  fieldProgress?: number;
  fieldRequired?: boolean;
  fieldDisabled?: boolean;
  fieldReadonly?: boolean;
  userContext?: Record<string, unknown>;
  formContext?: Record<string, unknown>;
  locale?: string;
  deviceType?: 'desktop' | 'tablet' | 'mobile';
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
  timeSpent?: number;
  interactionCount?: number;
  errorCount?: number;
}

export interface AccessibilityState {
  isScreenReaderActive: boolean;
  isKeyboardActive: boolean;
  isHighContrastActive: boolean;
  isReducedMotionActive: boolean;
  isFocused: boolean;
  isHovered: boolean;
  isPressed: boolean;
  isExpanded: boolean;
  isCollapsed: boolean;
  isVisible: boolean;
  isAnnouncing: boolean;
  currentAnnouncement: string;
  lastAnnouncement: string;
  announcementQueue: string[];
  focusHistory: string[];
  keyboardShortcuts: Record<string, string>;
  ariaLabels: Record<string, string>;
  liveRegions: Record<string, string>;
  tooltips: Record<string, string>;
  skipLinks: Record<string, string>;
  errorAnnouncements: Record<string, string>;
  statusAnnouncements: Record<string, string>;
  progressAnnouncements: Record<string, string>;
  customAnnouncements: Record<string, string>;
}

export interface AccessibilityActions {
  announce: (message: string, priority?: 'polite' | 'assertive' | 'off') => void;
  announceError: (error: string) => void;
  announceStatus: (status: string) => void;
  announceProgress: (progress: number, message?: string) => void;
  announceCustom: (key: string, message: string) => void;
  setFocus: (elementId: string) => void;
  returnFocus: () => void;
  trapFocus: (containerId: string) => void;
  releaseFocus: () => void;
  showTooltip: (message: string, targetId?: string) => void;
  hideTooltip: (targetId?: string) => void;
  showSkipLink: (targetId: string, text: string) => void;
  hideSkipLink: (targetId: string) => void;
  updateARIALabel: (key: string, value: string) => void;
  updateLiveRegion: (key: string, value: string) => void;
  addKeyboardShortcut: (key: string, description: string) => void;
  removeKeyboardShortcut: (key: string) => void;
  enableHighContrast: () => void;
  disableHighContrast: () => void;
  enableReducedMotion: () => void;
  disableReducedMotion: () => void;
  enableScreenReader: () => void;
  disableScreenReader: () => void;
  enableKeyboard: () => void;
  disableKeyboard: () => void;
  enableFocus: () => void;
  disableFocus: () => void;
  enableARIALabels: () => void;
  disableARIALabels: () => void;
  enableLiveRegions: () => void;
  disableLiveRegions: () => void;
  enableTooltips: () => void;
  disableTooltips: () => void;
  enableSkipLinks: () => void;
  disableSkipLinks: () => void;
  enableErrorAnnouncements: () => void;
  disableErrorAnnouncements: () => void;
  enableStatusAnnouncements: () => void;
  disableStatusAnnouncements: () => void;
  enableProgressAnnouncements: () => void;
  disableProgressAnnouncements: () => void;
  enableCustomAnnouncements: () => void;
  disableCustomAnnouncements: () => void;
  updateContext: (context: Partial<AccessibilityContext>) => void;
  reset: () => void;
}

export function useAccessibility(options: AccessibilityOptions = {}) {
  const {
    enableScreenReaderSupport = true,
    enableKeyboardNavigation = true,
    enableHighContrast = false,
    enableReducedMotion = false,
    enableFocusManagement = true,
    enableARIALabels = true,
    enableLiveRegions = true,
    enableSkipLinks = false,
    enableTooltips = true,
    enableErrorAnnouncements = true,
    enableStatusAnnouncements = true,
    enableProgressAnnouncements = true,
    enableCustomAnnouncements = false,
    announcementDelay = 100,
    focusTrapEnabled = false,
    focusReturnEnabled = true,
    customARIALabels = {},
    customAnnouncements = {},
    errorAnnouncementText = 'Error',
    statusAnnouncementText = 'Status',
    progressAnnouncementText = 'Progress',
  } = options;

  const [state, setState] = useState<AccessibilityState>({
    isScreenReaderActive: false,
    isKeyboardActive: false,
    isHighContrastActive: enableHighContrast,
    isReducedMotionActive: enableReducedMotion,
    isFocused: false,
    isHovered: false,
    isPressed: false,
    isExpanded: false,
    isCollapsed: true,
    isVisible: true,
    isAnnouncing: false,
    currentAnnouncement: '',
    lastAnnouncement: '',
    announcementQueue: [],
    focusHistory: [],
    keyboardShortcuts: {},
    ariaLabels: { ...customARIALabels },
    liveRegions: {},
    tooltips: {},
    skipLinks: {},
    errorAnnouncements: {},
    statusAnnouncements: {},
    progressAnnouncements: {},
    customAnnouncements: { ...customAnnouncements },
  });

  const [context, setContext] = useState<AccessibilityContext>({});

  // Announce message to screen readers
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' | 'off' = 'polite') => {
    if (!enableScreenReaderSupport || !state.isScreenReaderActive) return;

    setState(prev => ({
      ...prev,
      isAnnouncing: true,
      currentAnnouncement: message,
      lastAnnouncement: message,
      announcementQueue: [...prev.announcementQueue, message],
    }));

    // Clear announcement after delay
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isAnnouncing: false,
        currentAnnouncement: '',
        announcementQueue: prev.announcementQueue.slice(1),
      }));
    }, announcementDelay);
  }, [enableScreenReaderSupport, state.isScreenReaderActive, announcementDelay]);

  // Announce error message
  const announceError = useCallback((error: string) => {
    if (!enableErrorAnnouncements) return;
    announce(`${errorAnnouncementText}: ${error}`, 'assertive');
  }, [enableErrorAnnouncements, announce, errorAnnouncementText]);

  // Announce status message
  const announceStatus = useCallback((status: string) => {
    if (!enableStatusAnnouncements) return;
    announce(`${statusAnnouncementText}: ${status}`, 'polite');
  }, [enableStatusAnnouncements, announce, statusAnnouncementText]);

  // Announce progress message
  const announceProgress = useCallback((progress: number, message?: string) => {
    if (!enableProgressAnnouncements) return;
    const progressMessage = message || `${progressAnnouncementText}: ${progress}%`;
    announce(progressMessage, 'polite');
  }, [enableProgressAnnouncements, announce, progressAnnouncementText]);

  // Announce custom message
  const announceCustom = useCallback((key: string, message: string) => {
    if (!enableCustomAnnouncements) return;
    announce(message, 'polite');
  }, [enableCustomAnnouncements, announce]);

  // Focus management
  const setFocus = useCallback((elementId: string) => {
    if (!enableFocusManagement) return;
    
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
      setState(prev => ({
        ...prev,
        focusHistory: [...prev.focusHistory, elementId],
        isFocused: true,
      }));
    }
  }, [enableFocusManagement]);

  const returnFocus = useCallback(() => {
    if (!enableFocusManagement || !focusReturnEnabled) return;
    
    const lastFocused = state.focusHistory[state.focusHistory.length - 1];
    if (lastFocused) {
      setFocus(lastFocused);
    }
  }, [enableFocusManagement, focusReturnEnabled, state.focusHistory, setFocus]);

  const trapFocus = useCallback((containerId: string) => {
    if (!enableFocusManagement || !focusTrapEnabled) return;
    
    const container = document.getElementById(containerId);
    if (container) {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        firstElement.focus();
        
        // Add keyboard event listeners for focus trapping
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              }
            } else {
              if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        };
        
        container.addEventListener('keydown', handleKeyDown);
        
        // Cleanup function
        return () => {
          container.removeEventListener('keydown', handleKeyDown);
        };
      }
    }
  }, [enableFocusManagement, focusTrapEnabled]);

  const releaseFocus = useCallback(() => {
    if (!enableFocusManagement) return;
    
    setState(prev => ({
      ...prev,
      isFocused: false,
      focusHistory: [],
    }));
  }, [enableFocusManagement]);

  // Tooltip management
  const showTooltip = useCallback((message: string, targetId?: string) => {
    if (!enableTooltips) return;
    
    const key = targetId || 'default';
    setState(prev => ({
      ...prev,
      tooltips: {
        ...prev.tooltips,
        [key]: message,
      },
    }));
  }, [enableTooltips]);

  const hideTooltip = useCallback((targetId?: string) => {
    if (!enableTooltips) return;
    
    const key = targetId || 'default';
    setState(prev => ({
      ...prev,
      tooltips: {
        ...prev.tooltips,
        [key]: '',
      },
    }));
  }, [enableTooltips]);

  // Skip link management
  const showSkipLink = useCallback((targetId: string, text: string) => {
    if (!enableSkipLinks) return;
    
    setState(prev => ({
      ...prev,
      skipLinks: {
        ...prev.skipLinks,
        [targetId]: text,
      },
    }));
  }, [enableSkipLinks]);

  const hideSkipLink = useCallback((targetId: string) => {
    if (!enableSkipLinks) return;
    
    setState(prev => ({
      ...prev,
      skipLinks: {
        ...prev.skipLinks,
        [targetId]: '',
      },
    }));
  }, [enableSkipLinks]);

  // ARIA label management
  const updateARIALabel = useCallback((key: string, value: string) => {
    if (!enableARIALabels) return;
    
    setState(prev => ({
      ...prev,
      ariaLabels: {
        ...prev.ariaLabels,
        [key]: value,
      },
    }));
  }, [enableARIALabels]);

  // Live region management
  const updateLiveRegion = useCallback((key: string, value: string) => {
    if (!enableLiveRegions) return;
    
    setState(prev => ({
      ...prev,
      liveRegions: {
        ...prev.liveRegions,
        [key]: value,
      },
    }));
  }, [enableLiveRegions]);

  // Keyboard shortcut management
  const addKeyboardShortcut = useCallback((key: string, description: string) => {
    if (!enableKeyboardNavigation) return;
    
    setState(prev => ({
      ...prev,
      keyboardShortcuts: {
        ...prev.keyboardShortcuts,
        [key]: description,
      },
    }));
  }, [enableKeyboardNavigation]);

  const removeKeyboardShortcut = useCallback((key: string) => {
    if (!enableKeyboardNavigation) return;
    
    setState(prev => ({
      ...prev,
      keyboardShortcuts: {
        ...prev.keyboardShortcuts,
        [key]: '',
      },
    }));
  }, [enableKeyboardNavigation]);

  // Toggle functions
  const toggleHighContrast = useCallback(() => {
    setState(prev => ({ ...prev, isHighContrastActive: true }));
  }, []);

  const disableHighContrast = useCallback(() => {
    setState(prev => ({ ...prev, isHighContrastActive: false }));
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setState(prev => ({ ...prev, isReducedMotionActive: true }));
  }, []);

  const disableReducedMotion = useCallback(() => {
    setState(prev => ({ ...prev, isReducedMotionActive: false }));
  }, []);

  const toggleScreenReader = useCallback(() => {
    setState(prev => ({ ...prev, isScreenReaderActive: true }));
  }, []);

  const disableScreenReader = useCallback(() => {
    setState(prev => ({ ...prev, isScreenReaderActive: false }));
  }, []);

  const toggleKeyboard = useCallback(() => {
    setState(prev => ({ ...prev, isKeyboardActive: true }));
  }, []);

  const disableKeyboard = useCallback(() => {
    setState(prev => ({ ...prev, isKeyboardActive: false }));
  }, []);

  const toggleFocus = useCallback(() => {
    setState(prev => ({ ...prev, isFocused: true }));
  }, []);

  const disableFocus = useCallback(() => {
    setState(prev => ({ ...prev, isFocused: false }));
  }, []);

  const toggleARIALabels = useCallback(() => {
    setState(prev => ({ ...prev, ariaLabels: { ...prev.ariaLabels } }));
  }, []);

  const disableARIALabels = useCallback(() => {
    setState(prev => ({ ...prev, ariaLabels: {} }));
  }, []);

  const toggleLiveRegions = useCallback(() => {
    setState(prev => ({ ...prev, liveRegions: { ...prev.liveRegions } }));
  }, []);

  const disableLiveRegions = useCallback(() => {
    setState(prev => ({ ...prev, liveRegions: {} }));
  }, []);

  const toggleTooltips = useCallback(() => {
    setState(prev => ({ ...prev, tooltips: { ...prev.tooltips } }));
  }, []);

  const disableTooltips = useCallback(() => {
    setState(prev => ({ ...prev, tooltips: {} }));
  }, []);

  const toggleSkipLinks = useCallback(() => {
    setState(prev => ({ ...prev, skipLinks: { ...prev.skipLinks } }));
  }, []);

  const disableSkipLinks = useCallback(() => {
    setState(prev => ({ ...prev, skipLinks: {} }));
  }, []);

  const toggleErrorAnnouncements = useCallback(() => {
    setState(prev => ({ ...prev, errorAnnouncements: { ...prev.errorAnnouncements } }));
  }, []);

  const disableErrorAnnouncements = useCallback(() => {
    setState(prev => ({ ...prev, errorAnnouncements: {} }));
  }, []);

  const toggleStatusAnnouncements = useCallback(() => {
    setState(prev => ({ ...prev, statusAnnouncements: { ...prev.statusAnnouncements } }));
  }, []);

  const disableStatusAnnouncements = useCallback(() => {
    setState(prev => ({ ...prev, statusAnnouncements: {} }));
  }, []);

  const toggleProgressAnnouncements = useCallback(() => {
    setState(prev => ({ ...prev, progressAnnouncements: { ...prev.progressAnnouncements } }));
  }, []);

  const disableProgressAnnouncements = useCallback(() => {
    setState(prev => ({ ...prev, progressAnnouncements: {} }));
  }, []);

  const toggleCustomAnnouncements = useCallback(() => {
    setState(prev => ({ ...prev, customAnnouncements: { ...prev.customAnnouncements } }));
  }, []);

  const disableCustomAnnouncements = useCallback(() => {
    setState(prev => ({ ...prev, customAnnouncements: {} }));
  }, []);

  // Update context
  const updateContext = useCallback((newContext: Partial<AccessibilityContext>) => {
    setContext(prev => ({ ...prev, ...newContext }));
  }, []);

  // Reset function
  const reset = useCallback(() => {
    setState({
      isScreenReaderActive: false,
      isKeyboardActive: false,
      isHighContrastActive: enableHighContrast,
      isReducedMotionActive: enableReducedMotion,
      isFocused: false,
      isHovered: false,
      isPressed: false,
      isExpanded: false,
      isCollapsed: true,
      isVisible: true,
      isAnnouncing: false,
      currentAnnouncement: '',
      lastAnnouncement: '',
      announcementQueue: [],
      focusHistory: [],
      keyboardShortcuts: {},
      ariaLabels: { ...customARIALabels },
      liveRegions: {},
      tooltips: {},
      skipLinks: {},
      errorAnnouncements: {},
      statusAnnouncements: {},
      progressAnnouncements: {},
      customAnnouncements: { ...customAnnouncements },
    });
    setContext({});
  }, [enableHighContrast, enableReducedMotion, customARIALabels, customAnnouncements]);

  // Actions object
  const actions: AccessibilityActions = useMemo(() => ({
    announce,
    announceError,
    announceStatus,
    announceProgress,
    announceCustom,
    setFocus,
    returnFocus,
    trapFocus,
    releaseFocus,
    showTooltip,
    hideTooltip,
    showSkipLink,
    hideSkipLink,
    updateARIALabel,
    updateLiveRegion,
    addKeyboardShortcut,
    removeKeyboardShortcut,
    enableHighContrast: toggleHighContrast,
    disableHighContrast,
    enableReducedMotion: toggleReducedMotion,
    disableReducedMotion,
    enableScreenReader: toggleScreenReader,
    disableScreenReader,
    enableKeyboard: toggleKeyboard,
    disableKeyboard,
    enableFocus: toggleFocus,
    disableFocus,
    enableARIALabels: toggleARIALabels,
    disableARIALabels,
    enableLiveRegions: toggleLiveRegions,
    disableLiveRegions,
    enableTooltips: toggleTooltips,
    disableTooltips,
    enableSkipLinks: toggleSkipLinks,
    disableSkipLinks,
    enableErrorAnnouncements: toggleErrorAnnouncements,
    disableErrorAnnouncements,
    enableStatusAnnouncements: toggleStatusAnnouncements,
    disableStatusAnnouncements,
    enableProgressAnnouncements: toggleProgressAnnouncements,
    disableProgressAnnouncements,
    enableCustomAnnouncements: toggleCustomAnnouncements,
    disableCustomAnnouncements,
    updateContext,
    reset,
  }), [
    announce,
    announceError,
    announceStatus,
    announceProgress,
    announceCustom,
    setFocus,
    returnFocus,
    trapFocus,
    releaseFocus,
    showTooltip,
    hideTooltip,
    showSkipLink,
    hideSkipLink,
    updateARIALabel,
    updateLiveRegion,
    addKeyboardShortcut,
    removeKeyboardShortcut,
    toggleHighContrast,
    disableHighContrast,
    toggleReducedMotion,
    disableReducedMotion,
    toggleScreenReader,
    disableScreenReader,
    toggleKeyboard,
    disableKeyboard,
    toggleFocus,
    disableFocus,
    toggleARIALabels,
    disableARIALabels,
    toggleLiveRegions,
    disableLiveRegions,
    toggleTooltips,
    disableTooltips,
    toggleSkipLinks,
    disableSkipLinks,
    toggleErrorAnnouncements,
    disableErrorAnnouncements,
    toggleStatusAnnouncements,
    disableStatusAnnouncements,
    toggleProgressAnnouncements,
    disableProgressAnnouncements,
    toggleCustomAnnouncements,
    disableCustomAnnouncements,
    updateContext,
    reset,
  ]);

  return {
    state,
    context,
    actions,
  };
}
