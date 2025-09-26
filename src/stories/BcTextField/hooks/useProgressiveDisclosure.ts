import { useState, useCallback, useMemo, useEffect } from 'react';

export interface DisclosureContext {
  fieldName?: string;
  fieldType?: string;
  fieldValue?: string;
  userContext?: Record<string, unknown>;
  formContext?: Record<string, unknown>;
  locale?: string;
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
  deviceType?: 'desktop' | 'tablet' | 'mobile';
  timeSpent?: number;
  interactionCount?: number;
  errorCount?: number;
}

export interface DisclosureRule {
  id: string;
  name: string;
  description: string;
  trigger: 'immediate' | 'onFocus' | 'onError' | 'onTimeout' | 'onInteraction' | 'custom';
  delay?: number;
  priority: number;
  enabled: boolean;
  context: string[];
  conditions?: (context: DisclosureContext) => boolean;
  customFunction?: (context: DisclosureContext) => boolean;
  metadata?: Record<string, unknown>;
}

export interface DisclosureContent {
  id: string;
  title: string;
  content: string;
  type: 'tooltip' | 'popover' | 'modal' | 'inline' | 'sidebar' | 'overlay';
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  size?: 'small' | 'medium' | 'large' | 'full';
  priority: number;
  enabled: boolean;
  context: string[];
  conditions?: (context: DisclosureContext) => boolean;
  customFunction?: (context: DisclosureContext) => string;
  metadata?: Record<string, unknown>;
}

export interface UseProgressiveDisclosureProps {
  enableProgressiveDisclosure?: boolean;
  enableContextualDisclosure?: boolean;
  enableLearning?: boolean;
  enablePersonalization?: boolean;
  customRules?: DisclosureRule[];
  customContent?: DisclosureContent[];
  disclosureContext?: DisclosureContext;
  onDisclosureShown?: (content: DisclosureContent, context: DisclosureContext) => void;
  onDisclosureDismissed?: (content: DisclosureContent, context: DisclosureContext) => void;
}

export interface UseProgressiveDisclosureReturn {
  disclosureContent: DisclosureContent[];
  isGenerating: boolean;
  generateDisclosure: (context?: DisclosureContext) => DisclosureContent[];
  addRule: (rule: DisclosureRule) => void;
  removeRule: (ruleId: string) => void;
  updateRule: (ruleId: string, updates: Partial<DisclosureRule>) => void;
  addContent: (content: DisclosureContent) => void;
  removeContent: (contentId: string) => void;
  updateContent: (contentId: string, updates: Partial<DisclosureContent>) => void;
  getRules: () => DisclosureRule[];
  getContent: () => DisclosureContent[];
  clearDisclosure: () => void;
  getDisclosureHistory: () => DisclosureContent[];
  getDisclosureStatistics: () => {
    totalRules: number;
    enabledRules: number;
    disabledRules: number;
    totalContent: number;
    enabledContent: number;
    disabledContent: number;
    contentByType: Record<string, number>;
    averagePriority: number;
  };
}

/**
 * Progressive Disclosure hook'u
 * Aşamalı açıklama ve kullanıcı rehberliği
 */
export const useProgressiveDisclosure = ({
  enableProgressiveDisclosure = true,
  enableContextualDisclosure = true,
  enableLearning = true,
  enablePersonalization = true,
  customRules = [],
  customContent = [],
  disclosureContext = {},
  onDisclosureShown,
  onDisclosureDismissed,
}: UseProgressiveDisclosureProps): UseProgressiveDisclosureReturn => {
  
  const [disclosureContent, setDisclosureContent] = useState<DisclosureContent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [disclosureHistory, setDisclosureHistory] = useState<DisclosureContent[]>([]);
  const [rules, setRules] = useState<DisclosureRule[]>([]);
  const [content, setContent] = useState<DisclosureContent[]>([]);

  // Default disclosure rules
  const defaultRules: DisclosureRule[] = useMemo(() => [
    {
      id: 'immediate-beginner',
      name: 'Immediate Beginner',
      description: 'Show immediate help for beginners',
      trigger: 'immediate',
      priority: 1,
      enabled: true,
      context: ['*'],
      conditions: (context) => context.userLevel === 'beginner',
    },
    {
      id: 'on-focus-intermediate',
      name: 'On Focus Intermediate',
      description: 'Show help on focus for intermediate users',
      trigger: 'onFocus',
      priority: 2,
      enabled: true,
      context: ['*'],
      conditions: (context) => context.userLevel === 'intermediate',
    },
    {
      id: 'on-error-any',
      name: 'On Error Any',
      description: 'Show help on error for any user',
      trigger: 'onError',
      priority: 3,
      enabled: true,
      context: ['*'],
      conditions: (context) => (context.errorCount || 0) > 0,
    },
    {
      id: 'on-timeout-advanced',
      name: 'On Timeout Advanced',
      description: 'Show help on timeout for advanced users',
      trigger: 'onTimeout',
      delay: 10000, // 10 seconds
      priority: 4,
      enabled: true,
      context: ['*'],
      conditions: (context) => context.userLevel === 'advanced' && (context.timeSpent || 0) > 10000,
    },
    {
      id: 'on-interaction-mobile',
      name: 'On Interaction Mobile',
      description: 'Show help on interaction for mobile users',
      trigger: 'onInteraction',
      priority: 3,
      enabled: true,
      context: ['*'],
      conditions: (context) => context.deviceType === 'mobile' && (context.interactionCount || 0) > 3,
    },
  ], []);

  // Default disclosure content
  const defaultContent: DisclosureContent[] = useMemo(() => [
    {
      id: 'email-format-tooltip',
      title: 'Email Format',
      content: 'Enter a valid email address (e.g., user@example.com)',
      type: 'tooltip',
      position: 'top',
      priority: 1,
      enabled: true,
      context: ['email'],
    },
    {
      id: 'password-strength-popover',
      title: 'Password Strength',
      content: 'Use at least 8 characters with uppercase, lowercase, numbers, and symbols',
      type: 'popover',
      position: 'right',
      size: 'medium',
      priority: 1,
      enabled: true,
      context: ['password'],
    },
    {
      id: 'phone-format-modal',
      title: 'Phone Format',
      content: 'Enter phone number with country code (e.g., +1 234 567 8900)',
      type: 'modal',
      position: 'center',
      size: 'medium',
      priority: 1,
      enabled: true,
      context: ['phone', 'phoneNumber'],
    },
    {
      id: 'name-format-inline',
      title: 'Name Format',
      content: 'Enter your full name as it appears on official documents',
      type: 'inline',
      priority: 1,
      enabled: true,
      context: ['name', 'fullName'],
    },
    {
      id: 'address-format-sidebar',
      title: 'Address Format',
      content: 'Enter complete address including street, city, state, and ZIP code',
      type: 'sidebar',
      position: 'right',
      size: 'medium',
      priority: 1,
      enabled: true,
      context: ['address'],
    },
    {
      id: 'required-field-overlay',
      title: 'Required Field',
      content: 'This field is required and must be filled out',
      type: 'overlay',
      position: 'center',
      size: 'small',
      priority: 2,
      enabled: true,
      context: ['*'],
      conditions: (context) => !context.fieldValue || context.fieldValue.trim().length === 0,
    },
    {
      id: 'validation-error-overlay',
      title: 'Validation Error',
      content: 'Please check your input and try again',
      type: 'overlay',
      position: 'center',
      size: 'small',
      priority: 2,
      enabled: true,
      context: ['*'],
      conditions: (context) => (context.errorCount || 0) > 0,
    },
    {
      id: 'time-spent-info-tooltip',
      title: 'Time Spent',
      content: 'Take your time to fill out this form accurately',
      type: 'tooltip',
      position: 'bottom',
      priority: 3,
      enabled: true,
      context: ['*'],
      conditions: (context) => (context.timeSpent || 0) > 30000, // 30 seconds
    },
    {
      id: 'beginner-tutorial-modal',
      title: 'Beginner Tutorial',
      content: 'This is a step-by-step guide to help you complete this form',
      type: 'modal',
      position: 'center',
      size: 'large',
      priority: 4,
      enabled: true,
      context: ['*'],
      conditions: (context) => context.userLevel === 'beginner',
    },
    {
      id: 'advanced-tip-tooltip',
      title: 'Advanced Tip',
      content: 'Pro tip: Use keyboard shortcuts for faster form completion',
      type: 'tooltip',
      position: 'top',
      priority: 4,
      enabled: true,
      context: ['*'],
      conditions: (context) => context.userLevel === 'advanced',
    },
    {
      id: 'mobile-optimization-popover',
      title: 'Mobile Optimization',
      content: 'On mobile, use the number pad for numeric fields',
      type: 'popover',
      position: 'bottom',
      size: 'small',
      priority: 3,
      enabled: true,
      context: ['*'],
      conditions: (context) => context.deviceType === 'mobile',
    },
    {
      id: 'desktop-shortcuts-tooltip',
      title: 'Desktop Shortcuts',
      content: 'Use Tab to move between fields and Enter to submit',
      type: 'tooltip',
      position: 'top',
      priority: 3,
      enabled: true,
      context: ['*'],
      conditions: (context) => context.deviceType === 'desktop',
    },
  ], []);

  // Initialize rules and content
  useEffect(() => {
    setRules([...defaultRules, ...customRules]);
    setContent([...defaultContent, ...customContent]);
  }, [defaultRules, customRules, defaultContent, customContent]);

  // Generate disclosure content
  const generateDisclosure = useCallback((context?: DisclosureContext): DisclosureContent[] => {
    if (!enableProgressiveDisclosure) return [];
    
    setIsGenerating(true);
    
    try {
      const fullContext: DisclosureContext = {
        ...disclosureContext,
        ...context,
      };
      
      // Find applicable content
      const applicableContent = content
        .filter(item => item.enabled)
        .filter(item => {
          // Check if content applies to current field
          if (item.context.includes('*')) return true;
          if (fullContext.fieldName && item.context.includes(fullContext.fieldName)) return true;
          if (fullContext.fieldType && item.context.includes(fullContext.fieldType)) return true;
          return false;
        })
        .filter(item => {
          // Check conditions
          if (item.conditions) {
            return item.conditions(fullContext);
          }
          return true;
        })
        .sort((a, b) => a.priority - b.priority);
      
      // Limit number of content based on user level and device
      const maxContent = fullContext.userLevel === 'beginner' ? 3 : 
                        fullContext.userLevel === 'intermediate' ? 2 : 1;
      
      const selectedContent = applicableContent.slice(0, maxContent);
      
      // Add to history
      if (enableLearning) {
        setDisclosureHistory(prev => [...selectedContent, ...prev].slice(0, 20));
      }
      
      // Notify about shown content
      selectedContent.forEach(item => {
        onDisclosureShown?.(item, fullContext);
      });
      
      return selectedContent;
    } finally {
      setIsGenerating(false);
    }
  }, [
    enableProgressiveDisclosure,
    disclosureContext,
    content,
    enableLearning,
    onDisclosureShown
  ]);

  // Add rule
  const addRule = useCallback((rule: DisclosureRule) => {
    setRules(prev => [...prev, rule]);
  }, []);

  // Remove rule
  const removeRule = useCallback((ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
  }, []);

  // Update rule
  const updateRule = useCallback((ruleId: string, updates: Partial<DisclosureRule>) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, ...updates } : rule
    ));
  }, []);

  // Add content
  const addContent = useCallback((contentItem: DisclosureContent) => {
    setContent(prev => [...prev, contentItem]);
  }, []);

  // Remove content
  const removeContent = useCallback((contentId: string) => {
    setContent(prev => prev.filter(item => item.id !== contentId));
  }, []);

  // Update content
  const updateContent = useCallback((contentId: string, updates: Partial<DisclosureContent>) => {
    setContent(prev => prev.map(item => 
      item.id === contentId ? { ...item, ...updates } : item
    ));
  }, []);

  // Get rules
  const getRules = useCallback((): DisclosureRule[] => {
    return [...rules];
  }, [rules]);

  // Get content
  const getContent = useCallback((): DisclosureContent[] => {
    return [...content];
  }, [content]);

  // Clear disclosure
  const clearDisclosure = useCallback(() => {
    setDisclosureContent([]);
  }, []);

  // Get disclosure history
  const getDisclosureHistory = useCallback((): DisclosureContent[] => {
    return [...disclosureHistory];
  }, [disclosureHistory]);

  // Get disclosure statistics
  const getDisclosureStatistics = useCallback(() => {
    const totalRules = rules.length;
    const enabledRules = rules.filter(rule => rule.enabled).length;
    const disabledRules = totalRules - enabledRules;
    
    const totalContent = content.length;
    const enabledContent = content.filter(item => item.enabled).length;
    const disabledContent = totalContent - enabledContent;
    
    const contentByType = content.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const averagePriority = content.length > 0 
      ? content.reduce((sum, item) => sum + item.priority, 0) / content.length
      : 0;
    
    return {
      totalRules,
      enabledRules,
      disabledRules,
      totalContent,
      enabledContent,
      disabledContent,
      contentByType,
      averagePriority,
    };
  }, [rules, content]);

  return {
    disclosureContent,
    isGenerating,
    generateDisclosure,
    addRule,
    removeRule,
    updateRule,
    addContent,
    removeContent,
    updateContent,
    getRules,
    getContent,
    clearDisclosure,
    getDisclosureHistory,
    getDisclosureStatistics,
  };
};
