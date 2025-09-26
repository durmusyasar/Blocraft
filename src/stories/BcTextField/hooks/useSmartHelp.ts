import { useState, useCallback, useMemo, useEffect } from 'react';

export interface HelpContext {
  fieldName?: string;
  fieldType?: string;
  fieldValue?: string;
  userContext?: Record<string, unknown>;
  formContext?: Record<string, unknown>;
  locale?: string;
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
  deviceType?: 'desktop' | 'tablet' | 'mobile';
  timeSpent?: number;
  errorCount?: number;
}

export interface HelpItem {
  id: string;
  title: string;
  content: string;
  type: 'tip' | 'warning' | 'info' | 'example' | 'tutorial' | 'faq';
  priority: number;
  enabled: boolean;
  context: string[];
  conditions?: (context: HelpContext) => boolean;
  customFunction?: (context: HelpContext) => string;
  metadata?: Record<string, unknown>;
}

export interface UseSmartHelpProps {
  enableSmartHelp?: boolean;
  enableContextualHelp?: boolean;
  enableProgressiveHelp?: boolean;
  enableLearning?: boolean;
  enablePersonalization?: boolean;
  customHelpItems?: HelpItem[];
  helpContext?: HelpContext;
  onHelpShown?: (helpItem: HelpItem, context: HelpContext) => void;
  onHelpDismissed?: (helpItem: HelpItem, context: HelpContext) => void;
}

export interface UseSmartHelpReturn {
  smartHelp: HelpItem[];
  isGenerating: boolean;
  generateHelp: (context?: HelpContext) => HelpItem[];
  addHelpItem: (helpItem: HelpItem) => void;
  removeHelpItem: (helpItemId: string) => void;
  updateHelpItem: (helpItemId: string, updates: Partial<HelpItem>) => void;
  getHelpItems: () => HelpItem[];
  clearHelp: () => void;
  getHelpHistory: () => HelpItem[];
  getHelpStatistics: () => {
    totalItems: number;
    enabledItems: number;
    disabledItems: number;
    itemsByType: Record<string, number>;
    averagePriority: number;
  };
}

/**
 * Smart Help hook'u
 * Akıllı yardım ve bağlamsal rehberlik
 */
export const useSmartHelp = ({
  enableSmartHelp = true,
  enableContextualHelp = true,
  enableProgressiveHelp = true,
  enableLearning = true,
  enablePersonalization = true,
  customHelpItems = [],
  helpContext = {},
  onHelpShown,
  onHelpDismissed,
}: UseSmartHelpProps): UseSmartHelpReturn => {
  
  const [smartHelp, setSmartHelp] = useState<HelpItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [helpHistory, setHelpHistory] = useState<HelpItem[]>([]);
  const [helpItems, setHelpItems] = useState<HelpItem[]>([]);

  // Default help items
  const defaultHelpItems: HelpItem[] = useMemo(() => [
    {
      id: 'email-format-tip',
      title: 'Email Format Tip',
      content: 'Enter a valid email address (e.g., user@example.com)',
      type: 'tip',
      priority: 1,
      enabled: true,
      context: ['email'],
    },
    {
      id: 'password-strength-tip',
      title: 'Password Strength Tip',
      content: 'Use at least 8 characters with uppercase, lowercase, numbers, and symbols',
      type: 'tip',
      priority: 1,
      enabled: true,
      context: ['password'],
    },
    {
      id: 'phone-format-tip',
      title: 'Phone Format Tip',
      content: 'Enter phone number with country code (e.g., +1 234 567 8900)',
      type: 'tip',
      priority: 1,
      enabled: true,
      context: ['phone', 'phoneNumber'],
    },
    {
      id: 'name-format-tip',
      title: 'Name Format Tip',
      content: 'Enter your full name as it appears on official documents',
      type: 'tip',
      priority: 1,
      enabled: true,
      context: ['name', 'fullName'],
    },
    {
      id: 'address-format-tip',
      title: 'Address Format Tip',
      content: 'Enter complete address including street, city, state, and ZIP code',
      type: 'tip',
      priority: 1,
      enabled: true,
      context: ['address'],
    },
    {
      id: 'required-field-warning',
      title: 'Required Field Warning',
      content: 'This field is required and must be filled out',
      type: 'warning',
      priority: 2,
      enabled: true,
      context: ['*'],
      conditions: (context) => !context.fieldValue || context.fieldValue.trim().length === 0,
    },
    {
      id: 'validation-error-warning',
      title: 'Validation Error Warning',
      content: 'Please check your input and try again',
      type: 'warning',
      priority: 2,
      enabled: true,
      context: ['*'],
      conditions: (context) => (context.errorCount || 0) > 0,
    },
    {
      id: 'time-spent-info',
      title: 'Time Spent Info',
      content: 'Take your time to fill out this form accurately',
      type: 'info',
      priority: 3,
      enabled: true,
      context: ['*'],
      conditions: (context) => (context.timeSpent || 0) > 30000, // 30 seconds
    },
    {
      id: 'beginner-tutorial',
      title: 'Beginner Tutorial',
      content: 'This is a step-by-step guide to help you complete this form',
      type: 'tutorial',
      priority: 4,
      enabled: true,
      context: ['*'],
      conditions: (context) => context.userLevel === 'beginner',
    },
    {
      id: 'advanced-tip',
      title: 'Advanced Tip',
      content: 'Pro tip: Use keyboard shortcuts for faster form completion',
      type: 'tip',
      priority: 4,
      enabled: true,
      context: ['*'],
      conditions: (context) => context.userLevel === 'advanced',
    },
    {
      id: 'mobile-optimization-tip',
      title: 'Mobile Optimization Tip',
      content: 'On mobile, use the number pad for numeric fields',
      type: 'tip',
      priority: 3,
      enabled: true,
      context: ['*'],
      conditions: (context) => context.deviceType === 'mobile',
    },
    {
      id: 'desktop-shortcuts-tip',
      title: 'Desktop Shortcuts Tip',
      content: 'Use Tab to move between fields and Enter to submit',
      type: 'tip',
      priority: 3,
      enabled: true,
      context: ['*'],
      conditions: (context) => context.deviceType === 'desktop',
    },
    {
      id: 'email-example',
      title: 'Email Example',
      content: 'Example: john.doe@company.com',
      type: 'example',
      priority: 2,
      enabled: true,
      context: ['email'],
    },
    {
      id: 'phone-example',
      title: 'Phone Example',
      content: 'Example: +1 (555) 123-4567',
      type: 'example',
      priority: 2,
      enabled: true,
      context: ['phone', 'phoneNumber'],
    },
    {
      id: 'password-example',
      title: 'Password Example',
      content: 'Example: MyStr0ng!P@ssw0rd',
      type: 'example',
      priority: 2,
      enabled: true,
      context: ['password'],
    },
    {
      id: 'faq-common-issues',
      title: 'FAQ Common Issues',
      content: 'Common issues: Check for typos, ensure all required fields are filled, and verify format requirements',
      type: 'faq',
      priority: 5,
      enabled: true,
      context: ['*'],
      conditions: (context) => (context.errorCount || 0) > 2,
    },
  ], []);

  // Initialize help items
  useEffect(() => {
    setHelpItems([...defaultHelpItems, ...customHelpItems]);
  }, [defaultHelpItems, customHelpItems]);

  // Generate help
  const generateHelp = useCallback((context?: HelpContext): HelpItem[] => {
    if (!enableSmartHelp) return [];
    
    setIsGenerating(true);
    
    try {
      const fullContext: HelpContext = {
        ...helpContext,
        ...context,
      };
      
      // Find applicable help items
      const applicableItems = helpItems
        .filter(item => item.enabled)
        .filter(item => {
          // Check if item applies to current field
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
      
      // Limit number of help items based on user level
      const maxItems = fullContext.userLevel === 'beginner' ? 5 : 
                      fullContext.userLevel === 'intermediate' ? 3 : 2;
      
      const selectedItems = applicableItems.slice(0, maxItems);
      
      // Add to history
      if (enableLearning) {
        setHelpHistory(prev => [...selectedItems, ...prev].slice(0, 20));
      }
      
      // Notify about shown help
      selectedItems.forEach(item => {
        onHelpShown?.(item, fullContext);
      });
      
      return selectedItems;
    } finally {
      setIsGenerating(false);
    }
  }, [
    enableSmartHelp,
    helpContext,
    helpItems,
    enableLearning,
    onHelpShown
  ]);

  // Add help item
  const addHelpItem = useCallback((helpItem: HelpItem) => {
    setHelpItems(prev => [...prev, helpItem]);
  }, []);

  // Remove help item
  const removeHelpItem = useCallback((helpItemId: string) => {
    setHelpItems(prev => prev.filter(item => item.id !== helpItemId));
  }, []);

  // Update help item
  const updateHelpItem = useCallback((helpItemId: string, updates: Partial<HelpItem>) => {
    setHelpItems(prev => prev.map(item => 
      item.id === helpItemId ? { ...item, ...updates } : item
    ));
  }, []);

  // Get help items
  const getHelpItems = useCallback((): HelpItem[] => {
    return [...helpItems];
  }, [helpItems]);

  // Clear help
  const clearHelp = useCallback(() => {
    setSmartHelp([]);
  }, []);

  // Get help history
  const getHelpHistory = useCallback((): HelpItem[] => {
    return [...helpHistory];
  }, [helpHistory]);

  // Get help statistics
  const getHelpStatistics = useCallback(() => {
    const totalItems = helpItems.length;
    const enabledItems = helpItems.filter(item => item.enabled).length;
    const disabledItems = totalItems - enabledItems;
    
    const itemsByType = helpItems.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const averagePriority = helpItems.length > 0 
      ? helpItems.reduce((sum, item) => sum + item.priority, 0) / helpItems.length
      : 0;
    
    return {
      totalItems,
      enabledItems,
      disabledItems,
      itemsByType,
      averagePriority,
    };
  }, [helpItems]);

  return {
    smartHelp,
    isGenerating,
    generateHelp,
    addHelpItem,
    removeHelpItem,
    updateHelpItem,
    getHelpItems,
    clearHelp,
    getHelpHistory,
    getHelpStatistics,
  };
};
